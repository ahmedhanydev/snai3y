"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { use } from "react";
// Update these import paths to the actual locations of your UI components.
// For example, if you are using shadcn/ui, the imports might look like this:
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Calendar, Clock, MapPin, Wrench, FileText, Image as ImageIcon, Star, 
  Phone, DollarSign, ArrowLeft, CheckCircle, XCircle, MessageCircle, User
} from "lucide-react";
import { getRequestById, updateOrderStatus, completeOrder, deleteOrder, rejectOrderStatus } from "@/app/(routes)/profile/services";
import Image from "next/image";


export default function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
const router = useRouter();
const [userType, setUserType] = useState<string | null>(null);
const [,setUserId] = useState<string | null>(null);
 // New state for order status tab

// Initialize user data from localStorage
useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserType = localStorage.getItem("userType");

    if (!storedUserId) {
        router.push("/login");
        return;
    }

    setUserId(storedUserId);
    setUserType(storedUserType);
}, [router]);
  
  const queryClient = useQueryClient();
  
  // Unwrap params using React.use
  const resolvedParams = use(params);
  const requestId = parseInt(resolvedParams.id);

  // Determine if the current user is a technician
  const isTechnician = userType === 'technician';
  
  // State for dialogs
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  
  // Fetch request data
  const { data: requestData, isLoading, error } = useQuery({
    queryKey: ['request', requestId],
    queryFn: () => getRequestById(requestId),
    enabled: !!requestId,
  });

  // Accept order mutation
  const acceptOrderMutation = useMutation({
    mutationFn: () => updateOrderStatus(requestId), // Pass only the order ID
    onSuccess: () => {
      toast.success("تم قبول الطلب بنجاح");
      queryClient.invalidateQueries({ queryKey: ['request', requestId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء قبول الطلب");
      console.error(error);
    }
  });

  // Reject order mutation
  const rejectOrderMutation = useMutation({
    mutationFn: () => rejectOrderStatus(requestId), // Use a dedicated reject function
    onSuccess: () => {
      toast.success("تم رفض الطلب");
      setIsRejectDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['request', requestId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء رفض الطلب");
      console.error(error);
    }
  });

  // Complete order mutation
  const completeOrderMutation = useMutation({
    mutationFn: () => completeOrder({
      id: requestId,
      rate: rating,
      description: reviewComment,
      // Add totalPayment if required by the API, e.g.:
      // totalPayment: request?.totalPayment ?? 0
    totalPayment: request?.totalPayment ?? 0
    }),
    onSuccess: () => {
      toast.success("تم إكمال الطلب بنجاح");
      setIsCompleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['request', requestId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء إكمال الطلب");
      console.error(error);
    }
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: () => deleteOrder(requestId),
    onSuccess: () => {
      toast.success("تم حذف الطلب بنجاح");
      router.push('/profile?tab=orders');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء حذف الطلب");
      console.error(error);
    }
  });

  // Handle accept order
  const handleAcceptOrder = () => {
    acceptOrderMutation.mutate();
  };

  // Handle reject order
  const handleRejectOrder = () => {
    rejectOrderMutation.mutate();
  };

  // Handle complete order
  const handleCompleteOrder = () => {
    completeOrderMutation.mutate();
  };

  // Handle delete order
  const handleDeleteOrder = () => {
    deleteOrderMutation.mutate();
  };

  // Handle direct call
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "جديد":
        return "bg-blue-100 text-blue-800";
      case "مفعل":
        return "bg-green-100 text-green-800";
      case "مكتمل":
        return "bg-purple-100 text-purple-800";
      case "مرفوض":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-red-600 mb-2">حدث خطأ</h2>
              <p className="text-gray-600 mb-4">لا يمكن تحميل بيانات الطلب</p>
              <Button onClick={() => router.push('/profile')}>
                العودة للملف الشخصي
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const request = requestData;

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">لا توجد بيانات</h2>
              <p className="text-gray-600 mb-4">لم يتم العثور على بيانات لهذا الطلب</p>
              <Button onClick={() => router.push('/profile')}>
                العودة للملف الشخصي
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">تفاصيل الطلب</h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.push('/profile?tab=orders')}
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للطلبات
          </Button>
        </div>

        {/* Status Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary-50 to-white border-r-4 border-r-primary">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-1">طلب {request.serviceName}</h2>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(request.statusName)} px-3 py-1 text-sm`}>
                  {request.statusName}
                </Badge>
                <span className="text-gray-500 text-sm">رقم الطلب: #{request.id}</span>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{formatDate(request.requestDateTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{formatTime(request.requestDateTime)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="md:col-span-2 space-y-6">
            {/* Request Details Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                تفاصيل الطلب
              </h3>
              
              <div className="space-y-4">
                {/* Service Type */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">نوع الخدمة</h4>
                    <p>{request.serviceName}</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">الموقع</h4>
                    <p>{request.location}</p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">وصف المشكلة</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{request.description}</p>
                  </div>
                </div>
                
                {/* Payment Amount (if available) */}
                {request.totalPayment > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">المبلغ المدفوع</h4>
                      <p className="text-lg font-semibold text-green-600">{request.totalPayment} جنيه</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Image Attachment (if available) */}
            {request.attachmentBase64 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                  الصورة المرفقة
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image 
                    src={request.attachmentBase64.startsWith('data:') 
                      ? request.attachmentBase64 
                      : `data:image/jpeg;base64,${request.attachmentBase64}`} 
                    alt="صورة توضيحية" 
                    width={500} // Add width property
                    height={300} // Add height property optionally
                    className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                    onError={(e) => {
                      console.error("Image failed to load");
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </Card>
            )}
            
            {/* Review Section (if request is completed) */}
            {request.statusName === "مكتمل" && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  التقييم
                </h3>
                
                {request.reviewRate > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < request.reviewRate ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-gray-600 mr-2">({request.reviewRate}/5)</span>
                    </div>
                    
                    {request.reviewDescription && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 italic">{request.reviewDescription}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    {isTechnician ? 
                      "لم يقم العميل بتقييم الخدمة بعد" : 
                      "يمكنك تقييم الخدمة من صفحة الطلبات المكتملة"
                    }
                  </div>
                )}
              </Card>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              {/* Customer: Edit Button (Only for new/rejected requests) */}
              {!isTechnician && (request.statusName === "جديد" || request.statusName === "مرفوض") && (
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/orders/${request.id}/edit`)}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  تعديل الطلب
                </Button>
              )}
              
              {/* Customer: Delete Button (Only for new/rejected requests) */}
              {!isTechnician && (request.statusName === "جديد" || request.statusName === "مرفوض") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      حذف الطلب
                    </Button>
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
                        onClick={handleDeleteOrder}
                        className="bg-destructive text-white hover:bg-destructive/90"
                      >
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              {/* Technician: Accept Button (Only for new requests) */}
              {isTechnician && request.statusName === "جديد" && (
                <Button 
                  variant="default"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  onClick={handleAcceptOrder}
                  disabled={acceptOrderMutation.isPending}
                >
                  {acceptOrderMutation.isPending ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                      جاري القبول...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      قبول الطلب
                    </>
                  )}
                </Button>
              )}
              
              {/* Technician: Reject Button (Only for new requests) */}
              {isTechnician && request.statusName === "جديد" && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setIsRejectDialogOpen(true)}
                  disabled={rejectOrderMutation.isPending}
                >
                  <XCircle className="h-4 w-4" />
                  رفض الطلب
                </Button>
              )}
              
              {/* Customer: Complete Button (Only for active requests) */}
              {!isTechnician && request.statusName === "مفعل" && (
                <Button 
                  variant="default"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setIsCompleteDialogOpen(true)}
                  disabled={completeOrderMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4" />
                  إكمال الطلب
                </Button>
              )}
              
              {/* Both: Contact Button */}
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsContactDialogOpen(true)}
              >
                <MessageCircle className="h-4 w-4" />
                التواصل
              </Button>
            </div>
          </div>
          
          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-6">
            {/* Customer/Technician Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                {isTechnician ? "معلومات العميل" : "معلومات الفني"}
              </h3>
              
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage 
                    src={isTechnician 
                      ? request.userCustomer?.imageBase64 
                      : request.userTech?.imageBase64
                    } 
                    alt="Profile" 
                  />
                  <AvatarFallback className="text-lg">
                    {isTechnician 
                      ? request.userCustomer?.fullName?.charAt(0) 
                      : request.userTech?.fullName?.charAt(0)
                    }
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-lg font-medium">
                  {isTechnician 
                    ? request.userCustomer?.fullName 
                    : request.userTech?.fullName
                  }
                </h4>
                
                {/* Show rating for technician */}
                {!isTechnician && request.userTech?.averageRate > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-600 text-sm">{request.userTech.averageRate.toFixed(1)}/5</span>
                    <span className="text-gray-500 text-xs">
                      ({request.userTech.countRequestComplate} طلب)
                    </span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">
                    {isTechnician 
                      ? request.userCustomer?.phoneNumber 
                      : request.userTech?.phoneNumber
                    }
                  </span>
                </div>
                
                {/* Additional info for technician */}
                {!isTechnician && (
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{request.userTech?.serviceName}</span>
                  </div>
                )}
                
                {/* Address info */}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <div className="text-gray-700">
                    {isTechnician ? (
                      <>
                        <div>{request.userCustomer?.address?.governorate}</div>
                        <div>{request.userCustomer?.address?.city}</div>
                        <div>{request.userCustomer?.address?.street}</div>
                        <div>عمارة {request.userCustomer?.address?.buildingNumber}، شقة {request.userCustomer?.address?.apartmentNumber}</div>
                      </>
                    ) : (
                      <>
                        <div>{request.userTech?.address?.governorate}</div>
                        <div>{request.userTech?.address?.city}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Contact Button */}
              <Button 
                className="w-full mt-4 flex items-center justify-center gap-2"
                onClick={() => handleCall(isTechnician 
                  ? request.userCustomer?.phoneNumber 
                  : request.userTech?.phoneNumber
                )}
              >
                <Phone className="h-4 w-4" />
                اتصال
              </Button>
            </Card>
            
            {/* Order Timeline Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                مسار الطلب
              </h3>
              
              <div className="space-y-6">
                {/* Step 1 - Created */}
                <div className="relative flex items-start">
                  <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">تم إنشاء الطلب</h4>
                    <p className="text-sm text-gray-500">{formatDate(request.requestDateTime)}</p>
                  </div>
                </div>
                
                {/* Step 2 - Accepted */}
                <div className="relative flex items-start">
                  <div className={`absolute top-0 left-4 h-full w-0.5 ${request.statusName !== "جديد" ? "bg-gray-200" : "bg-gray-100"}`}></div>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                    request.statusName === "مفعل" || request.statusName === "مكتمل" 
                      ? "bg-green-500" 
                      : request.statusName === "مرفوض" 
                        ? "bg-red-500" 
                        : "bg-gray-200"
                  }`}>
                    {request.statusName === "مرفوض" ? (
                      <XCircle className="h-5 w-5 text-white" />
                    ) : (
                      <CheckCircle className={`h-5 w-5 ${
                        request.statusName === "مفعل" || request.statusName === "مكتمل" 
                          ? "text-white" 
                          : "text-gray-400"
                      }`} />
                    )}
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">
                      {request.statusName === "مرفوض" 
                        ? "تم رفض الطلب" 
                        : "تم قبول الطلب"
                      }
                    </h4>
                    <p className={`text-sm ${request.statusName === "جديد" ? "text-gray-400" : "text-gray-500"}`}>
                      {request.statusName === "جديد" 
                        ? "في انتظار الموافقة" 
                        : request.statusName === "مرفوض"
                          ? "تم الرفض بواسطة الفني" 
                          : "تم القبول بواسطة الفني"
                      }
                    </p>
                  </div>
                </div>
                
                {/* Step 3 - Completed */}
                <div className="relative flex items-start">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center z-10 bg-gray-200">
                    <CheckCircle className={`h-5 w-5 ${request.statusName === "مكتمل" ? "text-purple-600 fill-purple-600" : "text-gray-400"}`} />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium">تم إكمال الطلب</h4>
                    <p className={`text-sm ${request.statusName === "مكتمل" ? "text-gray-500" : "text-gray-400"}`}>
                      {request.statusName === "مكتمل" 
                        ? "تم إكمال الخدمة بنجاح"
                        : "في انتظار الإكمال"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفض الطلب</DialogTitle>
            <DialogDescription>
              يرجى توضيح سبب رفض الطلب للعميل.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">سبب الرفض</Label>
              <Textarea
                id="rejectReason"
                placeholder="يرجى كتابة سبب الرفض..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRejectDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectOrder}
              disabled={rejectOrderMutation.isPending}
            >
              {rejectOrderMutation.isPending ? "جاري الرفض..." : "رفض الطلب"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Order Dialog */}
      <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إكمال الطلب</DialogTitle>
            <DialogDescription>
              يرجى تقييم الخدمة المقدمة من الفني.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>التقييم</Label>
              <div className="flex items-center justify-center gap-2 py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-8 w-8 cursor-pointer ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewComment">تعليق (اختياري)</Label>
              <Textarea
                id="reviewComment"
                placeholder="اكتب تعليقك عن الخدمة..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCompleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="default" 
              onClick={handleCompleteOrder}
              disabled={completeOrderMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {completeOrderMutation.isPending ? "جاري الإكمال..." : "إكمال الطلب"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>خيارات التواصل</DialogTitle>
            <DialogDescription>
              يمكنك التواصل مع {isTechnician ? "العميل" : "الفني"} بالطرق التالية.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleCall(isTechnician 
                ? request.userCustomer?.phoneNumber 
                : request.userTech?.phoneNumber
              )}
            >
              <Phone className="h-5 w-5" />
              اتصال هاتفي
            </Button>
            
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                const phoneNumber = isTechnician 
                  ? request.userCustomer?.phoneNumber 
                  : request.userTech?.phoneNumber;
                window.open(`https://wa.me/${phoneNumber?.replace(/^0/, '2010')}`, '_blank');
              }}
            >
              <MessageCircle className="h-5 w-5" />
              واتساب
            </Button>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsContactDialogOpen(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}