import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Clock, MapPin, User } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  getTechnicianOrdersByStatus,
  getCustomerOrdersByStatus,
  deleteOrder,
  updateOrderStatus,
  completeOrder,
} from "@/app/(routes)/profile/services";

import CompleteOrderDialog from "./CompleteOrderDialog";

// Helper function to format address
const formatAddress = (address: any): string => {
  if (!address) return "عنوان غير محدد";

  const parts = [
    address.street,
    address.buildingNumber && `مبنى ${address.buildingNumber}`,
    address.apartmentNumber && `شقة ${address.apartmentNumber}`,
    address.city,
    address.governorate,
  ].filter(Boolean);

  return parts.join("، ");
};

// Helper function to map API status numbers to status types
const mapOrderStatusNumber = (statusNumber: number): "جديد" | "مفعل" | "موجل" | "مكتمل" => {
  switch (statusNumber) {
    case 1:
      return "جديد";
    case 2:
      return "مفعل";
    case 3:
      return "موجل";
    case 4:
      return "مكتمل";
    default:
      return "جديد";
  }
};

// Helper function to get status label in Arabic
const getStatusLabel = (status: "جديد" | "مفعل" | "موجل" | "مكتمل"): string => {
  switch (status) {
    case "جديد":
      return "طلب جديد";
    case "مفعل":
      return "قيد التنفيذ";
    case "موجل":
      return "موجل";
    case "مكتمل":
      return "مكتمل";
    default:
      return "غير معروف";
  }
};

interface ProfileOrdersProps {
  userId: string | null;
  userType: string | null;
  isTechnician: boolean;
}

export default function ProfileOrders({ userId, userType, isTechnician }: ProfileOrdersProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [orderStatusTab, setOrderStatusTab] = useState("مفعل");
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [completeFormData, setCompleteFormData] = useState({
    totalPayment: 0,
    rate: 0,
    description: ""
  });

  // Map status string to number
  const getStatusNumber = (status: string): number => {
    switch (status) {
      case "مفعل": return 2;
      case "مكتمل": return 4;
      case "جديد": return 1;
      case "موجل": return 3;
      default: return 2;
    }
  };

  // Fetch orders based on status
  const { 
    data: ordersData, 
    isLoading: isOrdersLoading 
  } = useQuery({
    queryKey: ['orders', userId, userType, getStatusNumber(orderStatusTab)],
    queryFn: async () => {
      if (!userId) return { data: { items: [] } };
      
      const statusNumber = getStatusNumber(orderStatusTab);
      
      if (userType === 'technician') {
        return await getTechnicianOrdersByStatus(userId, statusNumber);
      } else {
        return await getCustomerOrdersByStatus(userId, statusNumber);
      }
    },
    enabled: !!userId && !!userType,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
    onSuccess: () => {
      toast.success("تم حذف الطلب بنجاح");
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders', userId, userType, getStatusNumber(orderStatusTab)] });
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      toast.error("حدث خطأ أثناء حذف الطلب");
    }
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => 
      updateOrderStatus(orderId),
    onSuccess: () => {
      toast.success("تم قبول الطلب بنجاح");
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error("Error updating order status:", error);
      toast.error("حدث خطأ أثناء تحديث حالة الطلب");
    }
  });

  // Complete order mutation
  const completeOrderMutation = useMutation({
    mutationFn: (completeData: {
      id: number;
      totalPayment: number;
      rate: number;
      description: string;
    }) => completeOrder(completeData),
    onSuccess: () => {
      toast.success("تم إكمال الطلب بنجاح");
      setIsCompleteDialogOpen(false);
      // Reset form data
      setCompleteFormData({
        totalPayment: 0,
        rate: 0,
        description: ""
      });
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error("Error completing order:", error);
      toast.error("حدث خطأ أثناء إكمال الطلب");
    }
  });

  // Handle delete order
  const handleDeleteOrder = (orderId: number) => {
    deleteOrderMutation.mutate(orderId);
  };

  // Handle accept order
  const handleAcceptOrder = (orderId: number) => {
    updateOrderStatusMutation.mutate({ orderId });
  };

  // Handle reject order
  const handleRejectOrder = (orderId: number) => {
    // You may want to use a different status for rejected orders or delete them
    deleteOrderMutation.mutate(orderId);
  };

  // Handle complete order
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId) return;

    completeOrderMutation.mutate({
      id: selectedOrderId,
      ...completeFormData
    });
  };

  // Handle opening the complete dialog
  const openCompleteDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsCompleteDialogOpen(true);
  };

  // Handle form input changes
  const handleCompleteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompleteFormData(prev => ({
      ...prev,
      [name]: name === 'totalPayment' || name === 'rate' ? Number(value) : value
    }));
  };

  return (
    <>
      <Card className="p-6">
        <Tabs
          defaultValue="مفعل"
          className="w-full"
          onValueChange={setOrderStatusTab}
          dir="rtl"
        >
          <TabsList className="grid w-full grid-cols-4 rtl mb-6">
            <TabsTrigger value="مفعل">قيد التنفيذ</TabsTrigger>
            <TabsTrigger value="مكتمل">مكتملة</TabsTrigger>
            <TabsTrigger value="جديد">{isTechnician ? "الطلبات الواردة" : "طلبات جديدة"}</TabsTrigger>
            <TabsTrigger value="موجل">مؤجلة</TabsTrigger>
          </TabsList>

          {["مفعل", "مكتمل", "جديد", "موجل"].map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              {isOrdersLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {ordersData?.data?.items?.length > 0 ? (
                    ordersData.data.items.map((order: any) => (
                      <Card
                        key={order.id}
                        className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-gray-100 relative"
                      >
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge
                            variant={
                              order.statusName === "مكتمل"
                                ? "default"
                                : order.statusName === "مفعل"
                                  ? "secondary"
                                  : order.statusName === "موجل"
                                    ? "destructive"
                                    : "outline"
                            }
                            className="text-sm font-medium"
                          >
                            {getStatusLabel(order.statusName)}
                          </Badge>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                <DotsHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!isTechnician && (
                                <DropdownMenuItem onClick={() => router.push(`/orders/${order.id}/edit`)}>
                                  تعديل
                                </DropdownMenuItem>
                              )}
                              
                              {/* Add Complete Order button for customers */}
                              {!isTechnician && order.statusName === "مفعل" && (
                                <DropdownMenuItem onSelect={(e) => {
                                  e.preventDefault();
                                  openCompleteDialog(order.id);
                                }}>
                                  إكمال
                                </DropdownMenuItem>
                              )}
                              
                              {!isTechnician && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      حذف
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>هل أنت متأكد من حذف هذا الطلب؟</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        حذف
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="mb-4 mt-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {order.serviceName || order.service || "خدمة غير محددة"}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            طلب رقم: #{String(order.id).padStart(4, "0")}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  تاريخ الطلب
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.requestDateTime
                                    ? new Date(order.requestDateTime).toLocaleString("ar-EG")
                                    : order.createdDateTime 
                                      ? new Date(order.createdDateTime).toLocaleString("ar-EG")
                                      : "غير محدد"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  الموقع
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.location || formatAddress(order.address) || "غير محدد"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {isTechnician ? "العميل" : "الصنايعي"}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {isTechnician ? order.customerName : order?.userTech?.fullName || order.technicianName || "غير محدد"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              تفاصيل الطلب
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {order.description || "لا يوجد وصف"}
                            </p>
                          </div>
                        </div>

                        {isTechnician && order.statusName === "جديد" && (
                          <div className="flex gap-3 mt-6 border-t border-gray-100 pt-4 col-span-2">
                            <Button
                              variant="default"
                              className="w-1/2 py-6 text-base font-medium hover:bg-primary/90 transition-colors"
                              onClick={() => handleAcceptOrder(order.id)}
                              disabled={updateOrderStatusMutation.isPending}
                            >
                              {updateOrderStatusMutation.isPending ? "جاري القبول..." : "قبول الطلب"}
                            </Button>
                            <Button
                              variant="destructive"
                              className="w-1/2 py-6 text-base font-medium hover:bg-destructive/90 transition-colors"
                              onClick={() => handleRejectOrder(order.id)}
                              disabled={deleteOrderMutation.isPending}
                            >
                              {deleteOrderMutation.isPending ? "جاري الرفض..." : "رفض الطلب"}
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">لا توجد طلبات {getStatusLabel(status as any)} حالياً</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Complete Order Dialog */}
      <CompleteOrderDialog
        isOpen={isCompleteDialogOpen}
        onOpenChange={setIsCompleteDialogOpen}
        formData={completeFormData}
        onChange={handleCompleteFormChange}
        onSubmit={handleCompleteOrder}
        isPending={completeOrderMutation.isPending}
      />
    </>
  );
}