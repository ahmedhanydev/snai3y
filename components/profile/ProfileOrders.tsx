/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  getTechnicianOrdersByStatus,
  getCustomerOrdersByStatus,
  deleteOrder,
  updateOrderStatus,
  completeOrder,
  rejectOrderStatus,
} from "@/app/(routes)/profile/services";

import CompleteOrderDialog from "./CompleteOrderDialog";
import Link from "next/link";

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
// const mapOrderStatusNumber = (statusNumber: number): "جديد" | "مفعل" | "مرفوض" | "مكتمل" => {
//   switch (statusNumber) {
//     case 1:
//       return "جديد";
//     case 2:
//       return "مفعل";
//     case 3:
//       return "مرفوض";
//     case 4:
//       return "مكتمل";
//     default:
//       return "جديد";
//   }
// };

// Helper function to get status label in Arabic
const getStatusLabel = (status: "جديد" | "مفعل" | "مرفوض" | "مكتمل"): string => {
  switch (status) {
    case "جديد":
      return "طلب جديد";
    case "مفعل":
      return "قيد التنفيذ";
    case "مرفوض":
      return "مرفوض";
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
  orderStatusTab?: string; // Add this prop
  setOrderStatusTab?: (tab: string) => void; // Add this prop
  onOrdersStatusChange?: (newOrdersCount: number) => void;
}

export default function ProfileOrders({ 
  userId, 
  userType, 
  isTechnician,
  orderStatusTab: externalOrderStatusTab, // Rename to avoid conflict
  setOrderStatusTab: externalSetOrderStatusTab,
  onOrdersStatusChange
}: ProfileOrdersProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [completeFormData, setCompleteFormData] = useState({
    totalPayment: 0,
    rate: 0,
    description: ""
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of orders per page

  // Use the external state if provided, otherwise use local state
  const [localOrderStatusTab, setLocalOrderStatusTab] = useState("مفعل");
  
  // Determine which state to use (external or local)
  const orderStatusTab = externalOrderStatusTab || localOrderStatusTab;
  const setOrderStatusTab = (value: string) => {
    if (externalSetOrderStatusTab) {
      externalSetOrderStatusTab(value);
    } else {
      setLocalOrderStatusTab(value);
    }
  };

  // Map status string to number
  const getStatusNumber = (status: string): number => {
    switch (status) {
      case "مفعل": return 2;
      case "مكتمل": return 4;
      case "جديد": return 1;
      case "مرفوض": return 3;
      default: return 2;
    }
  };

  // Fetch orders based on status and pagination
  const { 
    data: ordersData, 
    isLoading: isOrdersLoading 
  } = useQuery({
    queryKey: ['orders', userId, userType, getStatusNumber(orderStatusTab), currentPage, pageSize],
    queryFn: async () => {
      if (!userId) return { data: { items: [], totalCount: 0, totalPages: 0 } };
      
      const statusNumber = getStatusNumber(orderStatusTab);
      
      if (userType === 'technician') {
        return await getTechnicianOrdersByStatus(userId, statusNumber, currentPage, pageSize);
      } else {
        return await getCustomerOrdersByStatus(userId, statusNumber, currentPage, pageSize);
      }
    },
    enabled: !!userId && !!userType,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Reset page when tab changes
  const handleTabChange = (value: string) => {
    setOrderStatusTab(value);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => 
      updateOrderStatus(orderId),
    onSuccess: () => {
      toast.success("تم قبول الطلب بنجاح");
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['newOrdersCount'] });
      
      // If there's a callback to update the new orders count
      if (onOrdersStatusChange && orderStatusTab === "جديد") {
        const remainingNewOrders = (ordersData?.data?.items || []).length - 1;
        onOrdersStatusChange(Math.max(0, remainingNewOrders));
      }
    },
    onError: (error) => {
      console.error("Error updating order status:", error);
      toast.error("حدث خطأ أثناء تحديث حالة الطلب");
    }
  });
  
  // Delete order mutation with similar update for the count
  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
    onSuccess: () => {
      toast.success("تم حذف الطلب بنجاح");
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['newOrdersCount'] });
      
      // If there's a callback to update the new orders count
      if (onOrdersStatusChange && orderStatusTab === "جديد") {
        const remainingNewOrders = (ordersData?.data?.items || []).length - 1;
        onOrdersStatusChange(Math.max(0, remainingNewOrders));
      }
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      toast.error("حدث خطأ أثناء حذف الطلب");
    }
  });

    const rejectOrderStatusMutation = useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => 
      rejectOrderStatus(orderId),
    onSuccess: () => {
      toast.success("تم رفض الطلب بنجاح");
      // Invalidate and refetch orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['newOrdersCount'] });
      
      // If there's a callback to update the new orders count
      if (onOrdersStatusChange && orderStatusTab === "جديد") {
        const remainingNewOrders = (ordersData?.data?.items || []).length - 1;
        onOrdersStatusChange(Math.max(0, remainingNewOrders));
      }
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
  // const handleRejectOrder = (orderId: number) => {
  //   // You may want to use a different status for rejected orders or delete them
  //   deleteOrderMutation.mutate(orderId);
  // };

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

  // Calculate total pages
  const totalItems = ordersData?.data?.totalCount || 0;
  const totalPages = ordersData?.data?.totalPages || Math.ceil(totalItems / pageSize) || 1;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible page range
      let start = Math.max(2, currentPage - 1);
      // eslint-disable-next-line prefer-const
      let end = Math.min(start + 2, totalPages - 1);
      
      // Adjust if we're near the end
      if (end === totalPages - 1) {
        start = Math.max(2, end - 2);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('ellipsis1');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis2');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };



  return (
    <>
      <Card className="p-6">
        <Tabs
          defaultValue="مفعل"
          className="w-full"
          onValueChange={handleTabChange}
          dir="rtl"
          value={orderStatusTab} // Use the determined value
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rtl mb-6 gap-1">
            <TabsTrigger value="مفعل" className="text-xs sm:text-sm whitespace-nowrap">
              قيد التنفيذ
            </TabsTrigger>
            <TabsTrigger value="مكتمل" className="text-xs sm:text-sm whitespace-nowrap">
              مكتملة
            </TabsTrigger>
            <TabsTrigger value="جديد" className="text-xs sm:text-sm whitespace-nowrap">
              {isTechnician ? "الطلبات الواردة" : "طلبات جديدة"}
            </TabsTrigger>
            <TabsTrigger value="مرفوض" className="text-xs sm:text-sm whitespace-nowrap">
              مرفوض
            </TabsTrigger>
          </TabsList>

          {["مفعل", "مكتمل", "جديد", "مرفوض"].map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              {isOrdersLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {ordersData?.data?.items?.length > 0 ? (
                      ordersData.data.items.map((order: any) => (
                        <Card
                         onClick={() => router.push(`/orders/${order.id}`)}
                          key={order.id}
                          className="p-6 hover:shadow-lg cursor-pointer transition-all duration-300 border-2 border-gray-100 relative"
                        >
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge
                              variant={
                                order.statusName === "مكتمل"
                                  ? "default"
                                  : order.statusName === "مفعل"
                                    ? "secondary"
                                    : order.statusName === "مرفوض"
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
                                {/* Only show Edit option for customers and only for new or rejected orders */}
                                {!isTechnician && (order.statusName === "جديد" || order.statusName === "مرفوض") && (
                                    <Link href={`/orders/${order.id}/edit`}>
                                  <DropdownMenuItem onClick={(e) => {e.stopPropagation();}}>
                                    تعديل
                                  </DropdownMenuItem>
                                    </Link>
                                )}
                                
                                {/* Add Complete Order button for customers - only for in-progress orders */}
                                {!isTechnician && order.statusName === "مفعل" && (
                                  <DropdownMenuItem onSelect={(e) => {
                                    e.preventDefault();
                                    openCompleteDialog(order.id);
                                  }}>
                                    إكمال
                                  </DropdownMenuItem>
                                )}
                                
                                {/* Only show Delete option for customers and only for new or rejected orders */}
                                {!isTechnician && (order.statusName === "جديد" || order.statusName === "مرفوض") && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem 
                                        onClick={(e) => {
                                          e.stopPropagation();  // Add this to stop propagation
                                        }}
                                        onSelect={(e) => e.preventDefault()}
                                      >
                                        حذف
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>هل أنت متأكد من حذف هذا الطلب؟</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>إلغاء</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={(e) => { 
                                            e.stopPropagation();
                                            handleDeleteOrder(order.id);
                                          }}
                                          className="bg-destructive text-white hover:bg-destructive/90"
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
                                onClick={(e) =>{ handleAcceptOrder(order.id)
                                  e.stopPropagation();  // Prevent card click
                                }}
                                disabled={updateOrderStatusMutation.isPending}
                              >
                                {updateOrderStatusMutation.isPending ? "جاري القبول..." : "قبول الطلب"}
                              </Button>
                              <Button
                                variant="destructive"
                                className="w-1/2 py-6 text-base font-medium hover:bg-destructive/90 transition-colors"
                                onClick={(e) =>{ rejectOrderStatusMutation.mutate({ orderId: order.id })
                                  e.stopPropagation();  // Prevent card click
                                }}
                                disabled={rejectOrderStatusMutation.isPending}
                              >
                                {rejectOrderStatusMutation.isPending ? "جاري الرفض..." : "رفض الطلب"}
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
                  
                  {/* Pagination - Show when we have items */}
                  {ordersData?.data?.items?.length > 0 && (
                    <div className="mt-8">
                      <Pagination dir="ltr">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                              }}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          
                          {getPageNumbers().map((pageNumber, index) => (
                            pageNumber === 'ellipsis1' || pageNumber === 'ellipsis2' ? (
                              <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink 
                                  href="#" 
                                  isActive={currentPage === pageNumber}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(Number(pageNumber));
                                  }}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                              }}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      
                      <div className="text-center text-sm text-gray-500 mt-2">
                        صفحة {currentPage} من {totalPages} ({totalItems} طلب)
                      </div>
                    </div>
                  )}
                </>
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