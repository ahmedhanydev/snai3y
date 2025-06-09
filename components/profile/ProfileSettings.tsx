import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  updateCustomerProfile, 
  updateTechnicianProfile,
  getAllServices,
  getAllCities,
  getAllGovernorates,
  Service,
  City,
  Governorate
} from "@/app/(routes)/profile/services";

interface ProfileSettingsProps {
  userProfile: any;
  isTechnician?: boolean;
}

export default function ProfileSettings({ userProfile, isTechnician = false }: ProfileSettingsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(userProfile.imageBase64 || null);
  
  // Initialize form state with current profile data
  const [formData, setFormData] = useState({
    id: userProfile.id || 0,
    bsd: userProfile.bsd || new Date().toISOString(),
    fullName: userProfile.fullName || "",
    imageBase64: userProfile.imageBase64 || "",
    phoneNumber: userProfile.phoneNumber || "",
    serviceId: userProfile.serviceId || 1,
    apartmentNumber: userProfile.address?.apartmentNumber || "",
    buildingNumber: userProfile.address?.buildingNumber || "",
    cityId: userProfile.address?.cityId || 1,
    governorateId: userProfile.address?.governorateId || 1,
    street: userProfile.address?.street || "",
    postalCode: userProfile.address?.postalCode || "",
  });

  // Fetch services, cities, and governorates
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: getAllServices,
  });

  const { data: governorates = [] } = useQuery<Governorate[]>({
    queryKey: ['governorates'],
    queryFn: getAllGovernorates,
  });

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ['cities'],
    queryFn: getAllCities,
  });

  // Filter cities by selected governorate
  const filteredCities = cities.filter(city => {
    // If governorateId is available in city, use it for filtering
    if ('governorateId' in city) {
      return city.governorateId === formData.governorateId;
    }
    // Otherwise, use the name for approximate matching
    const selectedGovernorate = governorates.find(g => g.id === formData.governorateId);
    return city.governorateName === selectedGovernorate?.name;
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    const numValue = parseInt(value);
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));

    // If governorate changes, reset cityId
    if (name === 'governorateId') {
      setFormData(prev => ({
        ...prev,
        cityId: 0 // Reset city when governorate changes
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setFormData(prev => ({
          ...prev,
          imageBase64: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (isTechnician) {
        return await updateTechnicianProfile(data.id.toString(), data);
      } else {
        return await updateCustomerProfile(data.id.toString(), data);
      }
    },
    onSuccess: () => {
      toast.success("تم تحديث البيانات بنجاح");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("حدث خطأ أثناء تحديث البيانات");
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.fullName || !formData.phoneNumber || !formData.cityId) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      setIsLoading(false);
      return;
    }
    
    // Update profile
    updateProfileMutation.mutate(formData);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6 text-right">
        تحديث المعلومات الشخصية
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mb-3">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="صورة الملف الشخصي" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                {userProfile.fullName ? userProfile.fullName[0].toUpperCase() : 'U'}
              </div>
            )}
          </div>
          <Label 
            htmlFor="profileImage" 
            className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 py-1 px-3 rounded-md transition-colors"
          >
            تغيير الصورة
          </Label>
          <Input 
            id="profileImage" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div className="space-y-2 text-right">
            <Label htmlFor="fullName" className="block">الاسم <span className="text-red-500">*</span></Label>
            <Input 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange}
              className="text-right" 
              required
            />
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="phoneNumber" className="block">رقم الهاتف <span className="text-red-500">*</span></Label>
            <Input 
              id="phoneNumber" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange}
              className="text-right" 
              required
            />
          </div>

          {/* Service selection for technicians */}
          {isTechnician && (
            <div className="space-y-2 text-right">
              <Label htmlFor="serviceId" className="block">الخدمة <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.serviceId.toString()} 
                onValueChange={(value) => handleSelectChange("serviceId", value)}
              >
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Address Information */}
          <div className="space-y-2 text-right">
            <Label htmlFor="governorateId" className="block">المحافظة <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.governorateId.toString()} 
              onValueChange={(value) => handleSelectChange("governorateId", value)}
            >
              <SelectTrigger className="text-right">
                <SelectValue placeholder="اختر المحافظة" />
              </SelectTrigger>
              <SelectContent>
                {governorates.map(governorate => (
                  <SelectItem key={governorate.id} value={governorate.id.toString()}>
                    {governorate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="cityId" className="block">المدينة <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.cityId.toString()} 
              onValueChange={(value) => handleSelectChange("cityId", value)}
              disabled={formData.governorateId === 0}
            >
              <SelectTrigger className="text-right">
                <SelectValue placeholder={formData.governorateId === 0 ? "اختر المحافظة أولاً" : "اختر المدينة"} />
              </SelectTrigger>
              <SelectContent>
                {filteredCities.map(city => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="street" className="block">الشارع <span className="text-red-500">*</span></Label>
            <Input 
              id="street" 
              name="street" 
              value={formData.street} 
              onChange={handleChange}
              className="text-right" 
              required
            />
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="buildingNumber" className="block">رقم المبنى <span className="text-red-500">*</span></Label>
            <Input 
              id="buildingNumber" 
              name="buildingNumber" 
              value={formData.buildingNumber} 
              onChange={handleChange}
              className="text-right" 
              required
            />
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="apartmentNumber" className="block">رقم الشقة</Label>
            <Input 
              id="apartmentNumber" 
              name="apartmentNumber" 
              value={formData.apartmentNumber} 
              onChange={handleChange}
              className="text-right" 
            />
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="postalCode" className="block">الرمز البريدي</Label>
            <Input 
              id="postalCode" 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange}
              className="text-right" 
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                جاري الحفظ...
              </span>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}