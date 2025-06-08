"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Mail, MapPin, Phone, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getCustomerProfile, 
  getTechnicianProfile, 
  // Other imports...
} from "./services";

interface Order {
  id: number;
  service: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  date: string;
  client: string;
  location: string;
  description: string;
}

interface Address {
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  governorate: string;
}

interface CustomerProfile {
  id: number;
  userName: string;
  email: string;
  bsd: string;
  address: Address;
  fullName: string;
  imageBase64: string;
  phoneNumber: string;
  createdDateTime: string;
}

interface TechnicianProfile {
  id: number;
  userName: string;
  email: string;
  bsd: string;
  address: Address;
  fullName: string;
  imageBase64: string;
  phoneNumber: string;
  serviceId: number;
  createdDateTime: string;
  serviceName: string;
  serviceDescription: string;
  averageRate: number;
}

type UserProfile = CustomerProfile | TechnicianProfile;

// Helper function to map API order to our Order interface
const mapApiOrderToOrder = (apiOrder: any): Order => {
  return {
    id: apiOrder.id,
    service: apiOrder.serviceName || "خدمة غير محددة",
    status: mapOrderStatus(apiOrder.status),
    date: new Date(apiOrder.createdDateTime).toLocaleDateString('ar-EG'),
    client: apiOrder.customerName || "عميل غير محدد",
    location: formatAddress(apiOrder.address),
    description: apiOrder.description || "لا يوجد وصف",
  };
};

// Helper function to map API status to our status type
const mapOrderStatus = (apiStatus: string): "pending" | "accepted" | "rejected" | "completed" => {
  switch (apiStatus?.toLowerCase()) {
    case "accepted":
      return "accepted";
    case "rejected":
    case "cancelled":
      return "rejected";
    case "completed":
    case "done":
      return "completed";
    default:
      return "pending";
  }
};

// Helper function to format address
const formatAddress = (address: any): string => {
  if (!address) return "عنوان غير محدد";
  
  const parts = [
    address.street,
    address.buildingNumber && `مبنى ${address.buildingNumber}`,
    address.apartmentNumber && `شقة ${address.apartmentNumber}`,
    address.city,
    address.governorate
  ].filter(Boolean);
  
  return parts.join('، ');
};

export default function Profile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  // Initialize user data from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userType');
    
    if (!storedUserId) {
      router.push('/login');
      return;
    }
    
    setUserId(storedUserId);
    setUserType(storedUserType);
  }, [router]);

  // Get user profile based on user type
  const { data: profileData, isLoading: isProfileLoading, isSuccess: isProfileSuccess, error: profileError } = useQuery({
    queryKey: ['profile', userId, userType],
    queryFn: async () => {
      if (!userId) return null;
      
      const response = userType === 'technician' 
        ? await getTechnicianProfile(userId)
        : await getCustomerProfile(userId);
        
      console.log("API Response:", response);
      return response;
    },
    enabled: !!userId && !!userType,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(()=>{
    if(isProfileSuccess&&profileData && profileData?.data?.imageBase64){
      localStorage.setItem('imageBase64', profileData?.data?.imageBase64);
      console.log("profileData", profileData?.data);
    }
  },[isProfileSuccess , profileData])

  // Get orders based on user type
  // const { data: ordersData, isLoading: isOrdersLoading } = useQuery({
  //   queryKey: ['orders', userId, userType],
  //   queryFn: () => {
  //     if (!userId) return null;
      
  //     return userType === 'technician' 
  //       ? getTechnicianOrders(userId)
  //       : getCustomerOrders(userId);
  //   },
  //   enabled: !!userId && !!userType
  // });

  // Accept order mutation
  // const acceptOrderMutation = useMutation({
  //   mutationFn: (orderId: number) => acceptOrder(orderId),
  //   onSuccess: () => {
  //     toast.success("تم قبول الطلب بنجاح");
  //     queryClient.invalidateQueries({ queryKey: ['orders'] });
  //   },
  //   onError: () => {
  //     toast.error("حدث خطأ أثناء قبول الطلب");
  //   }
  // });

  // Reject order mutation
  // const rejectOrderMutation = useMutation({
  //   mutationFn: (orderId: number) => rejectOrder(orderId),
  //   onSuccess: () => {
  //     toast.success("تم رفض الطلب بنجاح");
  //     queryClient.invalidateQueries({ queryKey: ['orders'] });
  //   },
  //   onError: () => {
  //     toast.error("حدث خطأ أثناء رفض الطلب");
  //   }
  // });

  // Update profile mutation
  // const updateProfileMutation = useMutation({
  //   mutationFn: (data: any) => {
  //     if (!userId) throw new Error("User ID is missing");
      
  //     return userType === 'technician' 
  //       ? updateTechnicianProfile(userId, data)
  //       : updateCustomerProfile(userId, data);
  //   },
  //   onSuccess: () => {
  //     toast.success("تم تحديث البيانات بنجاح");
  //     queryClient.invalidateQueries({ queryKey: ['profile'] });
  //   },
  //   onError: () => {
  //     toast.error("حدث خطأ أثناء تحديث البيانات");
  //   }
  // });

  // const handleOrderAction = async (orderId: number, action: "accept" | "reject") => {
  //   if (action === "accept") {
  //     acceptOrderMutation.mutate(orderId);
  //   } else {
  //     rejectOrderMutation.mutate(orderId);
  //   }
  // };

  // const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
    
  //   const updatedData = {
  //     fullName: formData.get('fullName'),
  //     email: formData.get('email'),
  //     phoneNumber: formData.get('phoneNumber'),
  //     address: {
  //       street: formData.get('street'),
  //       buildingNumber: formData.get('buildingNumber'),
  //       apartmentNumber: formData.get('apartmentNumber'),
  //       postalCode: formData.get('postalCode'),
  //       city: formData.get('city'),
  //       governorate: formData.get('governorate')
  //     }
  //   };
    
  //   updateProfileMutation.mutate(updatedData);
  // };

  // const isLoading = isProfileLoading || isOrdersLoading || 
  //                   acceptOrderMutation.isPending || 
  //                   rejectOrderMutation.isPending || 
  //                   updateProfileMutation.isPending;

  // Show loading state
  if (isProfileLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right"
        dir="rtl"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Handle profile error
  if (profileError) {
    console.error("Profile error:", profileError);
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right"
        dir="rtl"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-4">حدث خطأ أثناء تحميل البيانات</h2>
              <Button onClick={() => router.push('/login')}>العودة إلى تسجيل الدخول</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Handle no profile data
  if (!profileData?.data) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right"
        dir="rtl"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-4">لم يتم العثور على بيانات المستخدم</h2>
              <Button onClick={() => router.push('/login')}>العودة إلى تسجيل الدخول</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const userProfile = profileData.data;
  const birthDate = userProfile.bsd ? new Date(userProfile.bsd).toLocaleDateString('ar-EG') : 'غير محدد';
  
  // Check if user is a technician
  const isTechnician = 'serviceId' in userProfile;
  
  // Extract address information
  const address = userProfile.address;
  
  // Format full address for display
  const fullAddress = `${address.street || ''}${address.buildingNumber ? `، مبنى ${address.buildingNumber}` : ''}${address.apartmentNumber ? `، شقة ${address.apartmentNumber}` : ''}${address.city ? `، ${address.city}` : ''}${address.governorate ? `، ${address.governorate}` : ''}`;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right"
      dir="rtl"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
          <p className="text-gray-600 mt-2">
            {!isTechnician
              ? "إدارة حسابك وطلباتك"
              : "إدارة حسابك والطلبات الواردة"}
          </p>
        </div>
        <Card className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="w-24 h-24">
              {userProfile.imageBase64 ? (
                <AvatarImage src={userProfile.imageBase64} alt={userProfile.fullName} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {userProfile.fullName ? userProfile.fullName[0].toUpperCase() : 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-2">{userProfile.fullName}</h1>
              <div className="flex items-center gap-4">
                {isTechnician && (
                  <>
                    <Badge variant="secondary" className="text-sm">
                      صنايعي
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{(userProfile as TechnicianProfile).averageRate}</span>
                    </div>
                    <Badge variant="outline">
                      {(userProfile as TechnicianProfile).serviceName}
                    </Badge>
                  </>
                )}
                {!isTechnician && (
                  <Badge variant="secondary" className="text-sm">
                    عميل
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
            dir="rtl"
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-1/2 rtl">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="orders">
                {!isTechnician ? "طلباتي" : "الطلبات الواردة"}
              </TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-right">
                    المعلومات الشخصية
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-right">{userProfile.email}</span>
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-right">{userProfile.phoneNumber}</span>
                      <Phone className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-right">{fullAddress}</span>
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <div className="text-right">
                        <span>{birthDate}</span>
                        <span className="text-gray-600 mr-1">:تاريخ الميلاد</span>
                      </div>
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </Card>

                {isTechnician && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-right">
                      معلومات العمل
                    </h3>
                    <div className="space-y-4">
                      <div className="text-right">
                        <Label className="block mb-1">التخصص</Label>
                        <p className="text-gray-600">
                          {(userProfile as TechnicianProfile).serviceName}
                        </p>
                      </div>
                      <div className="text-right">
                        <Label className="block mb-1">الوصف</Label>
                        <p className="text-gray-600">
                          {(userProfile as TechnicianProfile).serviceDescription || 'لا يوجد وصف'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Label className="block mb-1">التقييم</Label>
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-lg">{(userProfile as TechnicianProfile).averageRate}</span>
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* <TabsContent value="orders" className="mt-6">
              {isOrdersLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <Card
                        key={order.id}
                        className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-gray-100"
                      >
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "accepted"
                                  ? "secondary"
                                  : order.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                            }
                            className="text-sm font-medium"
                          >
                            {order.status === "pending"
                              ? "قيد الانتظار"
                              : order.status === "accepted"
                                ? "مقبول"
                                : order.status === "rejected"
                                  ? "مرفوض"
                                  : "مكتمل"}
                          </Badge>
                        </div>
                        <div className="mb-4 mt-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {order.service}
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
                                  {order.date}
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
                                  {order.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  العميل
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.client}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              تفاصيل الطلب
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {order.description}
                            </p>
                          </div>
                        </div>
                        {isTechnician &&
                          order.status === "pending" && (
                            <div className="flex gap-3 mt-6 border-t border-gray-100 pt-4 col-span-2">
                              <Button
                                variant="default"
                                className="w-full py-6 text-base font-medium hover:bg-primary/90 transition-colors"
                                onClick={() =>
                                  handleOrderAction(order.id, "accept")
                                }
                                disabled={isLoading}
                              >
                                قبول الطلب
                              </Button>
                              <Button
                                variant="destructive"
                                className="w-full py-6 text-base font-medium hover:bg-destructive/90 transition-colors"
                                onClick={() =>
                                  handleOrderAction(order.id, "reject")
                                }
                                disabled={isLoading}
                              >
                                رفض الطلب
                              </Button>
                            </div>
                          )}
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">لا توجد طلبات حالياً</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent> */}

            <TabsContent value="settings" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-right">
                  تحديث المعلومات الشخصية
                </h3>
                <form className="space-y-4" 
                // onSubmit={handleUpdateProfile}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-right">
                      <Label htmlFor="fullName" className="block">الاسم</Label>
                      <Input id="fullName" name="fullName" defaultValue={userProfile.fullName} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="email" className="block">البريد الإلكتروني</Label>
                      <Input id="email" name="email" defaultValue={userProfile.email} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="phoneNumber" className="block">رقم الهاتف</Label>
                      <Input id="phoneNumber" name="phoneNumber" defaultValue={userProfile.phoneNumber} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="street" className="block">الشارع</Label>
                      <Input id="street" name="street" defaultValue={address.street} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="buildingNumber" className="block">رقم المبنى</Label>
                      <Input id="buildingNumber" name="buildingNumber" defaultValue={address.buildingNumber} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="apartmentNumber" className="block">رقم الشقة</Label>
                      <Input id="apartmentNumber" name="apartmentNumber" defaultValue={address.apartmentNumber} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="city" className="block">المدينة</Label>
                      <Input id="city" name="city" defaultValue={address.city} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="governorate" className="block">المحافظة</Label>
                      <Input id="governorate" name="governorate" defaultValue={address.governorate} className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="postalCode" className="block">الرمز البريدي</Label>
                      <Input id="postalCode" name="postalCode" defaultValue={address.postalCode} className="text-right" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button type="submit">
                      حفظ التغييرات
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
