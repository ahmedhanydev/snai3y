"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, FileText, Clock, CheckCircle, XCircle, Phone, Mail, MapPin, Star } from 'lucide-react';

interface Order {
  id: number;
  service: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  date: string;
  client: string;
  location: string;
  description: string;
}

// Add this at the top of your imports
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'client' | 'craftsman';
  rating?: number;
  specialization?: string;
  completedJobs?: number;
}

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Simulating getting user data from an API or auth service
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        // TODO: Replace with actual API call
        // This is mock data - in reality, you would fetch this from your backend
        const mockUser: UserProfile = {
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '01234567890',
          address: 'القاهرة، مصر',
          type: 'craftsman', // This would come from your auth service
          rating: 4.8,
          specialization: 'كهرباء',
          completedJobs: 156
        };
        setUserProfile(mockUser);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        router.push('/login'); // Redirect to login if not authenticated
      }
    };

    getUserProfile();
  }, [router]);

  const handleOrderAction = async (orderId: number, action: 'accept' | 'reject') => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update order status
      console.log(`Order ${orderId} ${action}ed`);
      // Update local state after successful API call
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
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

  const orders: Order[] = [
    {
      id: 1,
      service: 'تركيب وحدات إضاءة',
      status: 'pending',
      date: '2025-05-02',
      client: 'محمد أحمد',
      location: 'المعادي، القاهرة',
      description: 'تركيب 3 وحدات إضاءة LED في غرفة المعيشة'
    },
    // Add more orders as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
          <p className="text-gray-600 mt-2">{userProfile.type === 'client' ? 'إدارة حسابك وطلباتك' : 'إدارة حسابك والطلبات الواردة'}</p>
        </div>
        <Card className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-2">{userProfile.name}</h1>
              <div className="flex items-center gap-4">
                {userProfile.type === 'craftsman' && (
                  <>
                    <Badge variant="secondary" className="text-sm">صنايعي</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{userProfile.rating}</span>
                    </div>
                    <Badge variant="outline">{userProfile.completedJobs} مهمة مكتملة</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="orders">{userProfile.type === 'client' ? 'طلباتي' : 'الطلبات الواردة'}</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              {/* Removed account switch tab as it's now determined by auth */}
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{userProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{userProfile.address}</span>
                    </div>
                  </div>
                </Card>

                {userProfile.type === 'craftsman' && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">معلومات العمل</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>التخصص</Label>
                        <p className="text-gray-600">{userProfile.specialization}</p>
                      </div>
                      <div>
                        <Label>التقييم</Label>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg">{userProfile.rating}</span>
                        </div>
                      </div>
                      <div>
                        <Label>المهام المكتملة</Label>
                        <p className="text-gray-600">{userProfile.completedJobs}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-gray-100">
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={order.status === 'completed' ? 'default' : 
                                order.status === 'accepted' ? 'secondary' :
                                order.status === 'rejected' ? 'destructive' : 'outline'}
                        className="text-sm font-medium"
                      >
                        {order.status === 'pending' ? 'قيد الانتظار' :
                         order.status === 'accepted' ? 'مقبول' :
                         order.status === 'rejected' ? 'مرفوض' : 'مكتمل'}
                      </Badge>
                    </div>
                    <div className="mb-4 mt-6">
                      <h3 className="text-xl font-semibold text-gray-900">{order.service}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        طلب رقم: #{String(order.id).padStart(4, '0')}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">تاريخ الطلب</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">الموقع</p>
                            <p className="text-sm text-gray-600">{order.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">العميل</p>
                            <p className="text-sm text-gray-600">{order.client}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">تفاصيل الطلب</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{order.description}</p>
                      </div>
                    </div>
                    {userProfile.type === 'craftsman' && order.status === 'pending' && (
                      <div className="flex gap-3 mt-6 border-t border-gray-100 pt-4 col-span-2">
                        <Button 
                          variant="default" 
                          className="w-full py-6 text-base font-medium hover:bg-primary/90 transition-colors"
                          onClick={() => handleOrderAction(order.id, 'accept')}
                        >
                          قبول الطلب
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="w-full py-6 text-base font-medium hover:bg-destructive/90 transition-colors"
                          onClick={() => handleOrderAction(order.id, 'reject')}
                        >
                          رفض الطلب
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">تحديث المعلومات الشخصية</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>الاسم</Label>
                      <Input defaultValue={userProfile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>البريد الإلكتروني</Label>
                      <Input defaultValue={userProfile.email} />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الهاتف</Label>
                      <Input defaultValue={userProfile.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label>العنوان</Label>
                      <Input defaultValue={userProfile.address} />
                    </div>
                  </div>
                  {userProfile.type === 'craftsman' && (
                    <div className="space-y-2">
                      <Label>التخصص</Label>
                      <Input defaultValue={userProfile.specialization} />
                    </div>
                  )}
                  <Button type="submit" className="mt-4">حفظ التغييرات</Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}