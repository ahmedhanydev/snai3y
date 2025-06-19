"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  getCustomerProfile,
  getTechnicianProfile,
  getTechnicianNewOrdersCount, // Add this new service function
} from "./services";

// Import our separated components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileOrders from "@/components/profile/ProfileOrders";
import ProfileReviews from "@/components/profile/ProfileReviews";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [orderStatusTab, setOrderStatusTab] = useState("مفعل"); // New state for order status tab

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

  // Get user profile based on user type
  const { 
    data: profileData, 
    isLoading: isProfileLoading, 
    isSuccess: isProfileSuccess, 
    error: profileError 
  } = useQuery({
    queryKey: ['profile', userId, userType],
    queryFn: async () => {
      if (!userId) return null;

      const response = userType === 'technician' 
        ? await getTechnicianProfile(userId)
        : await getCustomerProfile(userId);

      // console.log("API Response:", response);
      return response;
    },
    enabled: !!userId && !!userType,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Get new orders count for technicians
  const { data: newOrdersData } = useQuery({
    queryKey: ['newOrdersCount', userId],
    queryFn: async () => {
      if (!userId || userType !== 'technician') return null;
      return await getTechnicianNewOrdersCount(userId);
    },
    enabled: !!userId && userType === 'technician',
    refetchInterval: 30000 // Refresh every 30 seconds to get updated count
  });



  useEffect(() => {
    if (newOrdersData && newOrdersData.data) {
      setNewOrdersCount(newOrdersData.data);
    }
  }, [newOrdersData]);

  // Update profile image in localStorage when profile data is fetched
  useEffect(() => {
    if (isProfileSuccess && profileData && profileData?.data?.imageBase64) {
      localStorage.setItem('imageBase64', profileData?.data?.imageBase64);
    }
  }, [isProfileSuccess, profileData]);

  // Show loading state
  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right" dir="rtl">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right" dir="rtl">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-4">حدث خطأ أثناء تحميل البيانات</h2>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => router.push('/login')}
              >
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Handle no profile data
  if (!profileData?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right" dir="rtl">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-4">لم يتم العثور على بيانات المستخدم</h2>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => router.push('/login')}
              >
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const userProfile = profileData.data;
  // Check if user is a technician
  const isTechnician = 'serviceId' in userProfile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 text-right" dir="rtl">
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
          {/* Profile Header Component */}
          <ProfileHeader 
            userProfile={userProfile} 
            isTechnician={isTechnician} 
            setActiveTab={setActiveTab}
            setOrderStatusTab={setOrderStatusTab} // Pass the new function
            newOrdersCount={newOrdersCount} 
          />

          {/* Profile Tabs */}
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
            dir="rtl"
            value={activeTab}
          >
            <TabsList className={`grid w-full ${isTechnician ? 'grid-cols-4' : 'grid-cols-3'} lg:w-1/2 rtl`}>
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="orders" className="relative">
                {!isTechnician ? (
                  "طلباتي"
                ) : (
                  <span className="flex items-center">
                   جميع الطلبات
                    {/* {newOrdersCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="mx-2 h-5 w-5 p-0 flex items-center justify-center text-xs font-bold rounded-full animate-pulse"
                      >
                        {newOrdersCount}
                      </Badge>
                    )} */}
                  </span>
                )}
              </TabsTrigger>
              {isTechnician && (
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              )}
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ProfileOverview userProfile={userProfile} isTechnician={isTechnician} />
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <ProfileOrders 
                userId={userId} 
                userType={userType}
                isTechnician={isTechnician}
                orderStatusTab={orderStatusTab} // Pass the current order status tab
                setOrderStatusTab={setOrderStatusTab} // Pass the setter
                onOrdersStatusChange={(newCount) => {
                  // Update new orders count when orders status changes
                  if (isTechnician) {
                    setNewOrdersCount(newCount);
                  }
                }}
              />
            </TabsContent>

            {isTechnician && (
              <TabsContent value="reviews" className="mt-6">
                <ProfileReviews userId={userId} userProfile={userProfile} />
              </TabsContent>
            )}

            <TabsContent value="settings" className="mt-6">
              <ProfileSettings 
                userProfile={userProfile} 
                isTechnician={isTechnician} 
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
