"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { use } from "react"; // Import use from React
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRequestById, updateRequest } from "@/app/(routes)/profile/services";
import { requestService } from "@/app/(routes)/request/services";

export default function EditRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use
  const resolvedParams = use(params);
  const requestId = parseInt(resolvedParams.id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: requestId,
    userCustomerId: 0,
    userTechId: 0,
    description: "",
    location: "",
    requestDateTime: new Date().toISOString(),
    status: 1,
    serviceId: 1,
    attachmentBase64: "",
    serviceName: ""
  });

  // Fetch services for the dropdown
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: requestService.getAllServices,
  });

  // Fetch request data
  const { data: requestData, isLoading: isRequestLoading, error } = useQuery({
    queryKey: ['request', requestId],
    queryFn: () => getRequestById(requestId),
    enabled: !!requestId,
  });

  useEffect(() => {
    if (requestData?.data) {
      setFormData({
        id: requestData.data.id,
        userCustomerId: requestData.data.userCustomerId,
        userTechId: requestData.data.userTechId,
        description: requestData.data.description || "",
        location: requestData.data.location || "",
        requestDateTime: requestData.data.requestDateTime,
        status: requestData.data.status,
        serviceId: requestData.data.serviceId,
        attachmentBase64: requestData.data.attachmentBase64 || "",
        serviceName: requestData.data.serviceName || ""
      });

      if (requestData.data.attachmentBase64) {
        setSelectedImage(requestData.data.attachmentBase64);
      }
    }
  }, [requestData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching request:", error);
      toast.error("حدث خطأ أثناء تحميل بيانات الطلب");
      router.push('/profile');
    }
  }, [error, router]);

  const queryClient = useQueryClient();
  // Update request mutation
  const updateRequestMutation = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      toast.success("تم تحديث الطلب بنجاح");
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push('/profile?tab=orders');
    },
    onError: (error) => {
      console.error("Error updating request:", error);
      toast.error("حدث خطأ أثناء تحديث الطلب");
      setIsLoading(false);
    }
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle service selection
  const handleServiceChange = (value: string) => {
    const serviceId = parseInt(value);
    const selectedService = services.find(service => service.id === serviceId);
    
    setFormData(prev => ({
      ...prev,
      serviceId,
      serviceName: selectedService?.name || ""
    }));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setFormData(prev => ({
          ...prev,
          attachmentBase64: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.description || !formData.location) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      setIsLoading(false);
      return;
    }

    updateRequestMutation.mutate(formData);
  };

  // Show loading state
  if (isRequestLoading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">تعديل الطلب</h1>
          <p className="text-gray-600 mt-2">
            يمكنك تعديل تفاصيل طلبك هنا
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="serviceId" className="text-base font-medium">
                نوع الخدمة <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.serviceId.toString()} 
                onValueChange={handleServiceChange}
              >
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="اختر نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem 
                      key={service.id} 
                      value={service.id.toString()}
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium">
                الموقع <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="أدخل عنوان الموقع بالتفصيل"
                className="text-right"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                وصف المشكلة <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="اشرح المشكلة بالتفصيل"
                className="min-h-[150px] text-right"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-base font-medium">
                صورة توضيحية (اختياري)
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {selectedImage ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="max-h-64 max-w-full mb-4 rounded-lg" 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => {
                        setSelectedImage(null);
                        setFormData(prev => ({
                          ...prev,
                          attachmentBase64: ""
                        }));
                      }}
                    >
                      إزالة الصورة
                    </Button>
                  </div>
                ) : (
                  <div className="py-4">
                    <label 
                      htmlFor="image-upload" 
                      className="cursor-pointer text-primary hover:text-primary/80"
                    >
                      انقر لتحميل صورة
                    </label>
                    <p className="text-sm text-gray-500 mt-1">أو اسحب الصورة وأفلتها هنا</p>
                    <input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleImageChange} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/profile?tab=orders')}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                    جاري الحفظ...
                  </span>
                ) : (
                  "حفظ التعديلات"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}