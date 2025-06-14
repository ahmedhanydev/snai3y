"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRequestById, updateRequest } from "@/app/(routes)/profile/services";
import { requestService } from "@/app/(routes)/request/services";
import Image from "next/image";

export default function EditRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use
  const {id} = use(params);
  const requestId = parseInt(id);
  
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
  const { data: servicesResponse = { data: [], success: true, message: "", errors: [] } } = useQuery({
    queryKey: ['services'],
    queryFn: requestService.getAllServices,
  });

  // Extract the services array from the response
  const services = servicesResponse.data || [];


  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      requestDateTime: new Date().toISOString(), 
    }));
  }, []);
  // Add logging for services data
  useEffect(() => {
    console.log("Services data updated:", services);
    if (services && !Array.isArray(services)) {
      console.error("Services is not an array:", services);
    }
  }, [services]);

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

  const  normalizeBase64 =(base64: string): string => {
    // إذا كانت القيمة تبدأ بـ data: => نعيدها كما هي
    if (base64.startsWith("data:image/")) return base64;
    // وإلا نضيف prefix مناسب (افتراض PNG، غيّره لو تحتاج)
    return `data:image/png;base64,${base64}`;
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                {selectedImage ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md mx-auto mb-4">
                      <Image
                          src={normalizeBase64(selectedImage)}
                        alt="صورة الطلب"
                        width={400}
                        height={300}
                        className="rounded-lg object-contain w-full h-auto"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          const input = document.getElementById('image-upload') as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        تغيير الصورة
                      </Button>
                      <Button 
                        type="button" 
                        variant="destructive" 
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
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-4 rounded-full bg-gray-50">
                        <svg 
                          className="w-8 h-8 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <label 
                        htmlFor="image-upload" 
                        className="cursor-pointer text-primary hover:text-primary/80 font-medium"
                      >
                        انقر لتحميل صورة
                      </label>
                      <p className="text-sm text-gray-500">
                        أو اسحب الصورة وأفلتها هنا
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG حتى 5MB
                      </p>
                    </div>
                  </div>
                )}
                <input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Check file size (5MB limit)
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("حجم الصورة يجب أن لا يتجاوز 5 ميجابايت");
                        return;
                      }
                      
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
                  }}
                />
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