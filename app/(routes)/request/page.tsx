"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bolt, Droplet, Hammer, Paintbrush, Leaf, Brush, ArrowRight, ArrowLeft, Star, UserCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Service {
  icon: React.ElementType;
  name: string;
}

interface Craftsman {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  available: boolean;
  specialization: string;
}

interface RequestStep {
  id: number;
  name: string;
}

const popularServices: Service[] = [
  { name: "الكهرباء", icon: Bolt },
  { name: "السباكة", icon: Droplet },
  { name: "النجارة", icon: Hammer },
  { name: "الدهان", icon: Paintbrush },
  { name: "البستنة", icon: Leaf },
  { name: "التنظيف", icon: Brush }
];

const dummyCraftsmen: Craftsman[] = [
  {
    id: 1,
    name: "أحمد محمد",
    rating: 4.8,
    completedJobs: 156,
    hourlyRate: 50,
    available: true,
    specialization: "كهربائي"
  },
  {
    id: 2,
    name: "محمد علي",
    rating: 4.5,
    completedJobs: 98,
    hourlyRate: 45,
    available: true,
    specialization: "سباك"
  },
  {
    id: 3,
    name: "عمر حسن",
    rating: 4.9,
    completedJobs: 203,
    hourlyRate: 60,
    available: true,
    specialization: "نجار"
  },
  {
    id: 4,
    name: "خالد إبراهيم",
    rating: 4.7,
    completedJobs: 178,
    hourlyRate: 55,
    available: true,
    specialization: "دهان"
  },
  {
    id: 5,
    name: "يوسف أحمد",
    rating: 4.6,
    completedJobs: 132,
    hourlyRate: 65,
    available: true,
    specialization: "كهربائي"
  },
  {
    id: 6,
    name: "مصطفى سعيد",
    rating: 4.9,
    completedJobs: 245,
    hourlyRate: 70,
    available: true,
    specialization: "سباك"
  },
  {
    id: 7,
    name: "عبدالله محمود",
    rating: 4.4,
    completedJobs: 87,
    hourlyRate: 40,
    available: true,
    specialization: "نجار"
  },
  {
    id: 8,
    name: "حسن علي",
    rating: 4.7,
    completedJobs: 167,
    hourlyRate: 58,
    available: true,
    specialization: "دهان"
  },
  {
    id: 9,
    name: "كريم سامح",
    rating: 4.8,
    completedJobs: 192,
    hourlyRate: 63,
    available: true,
    specialization: "بستنة"
  },
  {
    id: 10,
    name: "طارق جمال",
    rating: 4.6,
    completedJobs: 143,
    hourlyRate: 52,
    available: true,
    specialization: "تنظيف"
  }
];

const requestSteps: RequestStep[] = [
  { id: 1, name: "اختر خدمة" },
  { id: 2, name: "تفاصيل الموقع" },
  { id: 3, name: "وصف المشكلة" },
  { id: 4, name: "اختر الفني" }
];

export default function RequestService() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<{
    category: string;
    id: string;
    name: string;
    price: string;
    duration: string;
  } | null>(null);
  const [availableCraftsmen, setAvailableCraftsmen] = useState<Craftsman[]>(dummyCraftsmen);
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [problemDetails, setProblemDetails] = useState({
    title: "",
    description: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      zipCode: ""
    },
    urgency: "medium"
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const category = searchParams.get('category');
    const serviceId = searchParams.get('service');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const duration = searchParams.get('duration');

    if (category && serviceId && name && price && duration) {
      setSelectedService({
        category,
        id: serviceId,
        name,
        price,
        duration
      });
      setActiveStep(2);
    }
  }, []);

  const handleServiceSelection = (service: Service) => {
    setSelectedService({
      category: service.name,
      id: service.name.toLowerCase(),
      name: service.name,
      price: "50", // Default price
      duration: "1" // Default duration in hours
    });
    setActiveStep(2);
  };

  const handleAddressChange = (field: string, value: string) => {
    setProblemDetails(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleProblemDetailsChange = (field: string, value: string) => {
    setProblemDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCraftsmanSelection = async (craftsman: Craftsman) => {
    setSelectedCraftsman(craftsman);
    setIsSubmitting(true);
    
    // Generate a reference number
    const reference = `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to success page with request details
    const searchParams = new URLSearchParams({
      reference,
      craftsman: craftsman.name,
      service: selectedService?.name || '',
      address: problemDetails.address.line1,
      city: problemDetails.address.city,
      title: problemDetails.title,
      urgency: problemDetails.urgency
    });
    
    router.push(`/request/success?${searchParams.toString()}`)
    // router.push(`/request/success`); 
  };

  const handleRequestComplete = () => {
    // Reset form
    setActiveStep(1);
    setSelectedService(null);
    setSelectedCraftsman(null);
    setProblemDetails({
      title: "",
      description: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        zipCode: ""
      },
      urgency: "medium"
    });
  };

  return (
    <div dir="rtl" className="w-full px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md mb-6">
          <div className="flex items-center w-full mb-6">
            {activeStep > 1 && (
              <Button 
                variant="ghost" 
                className="text-blue-600 cursor-pointer"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                <ArrowRight className="ml-2" /> رجوع
              </Button>
            )}
            <h2 className="text-2xl font-bold ml-2">طلب خدمة</h2>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {requestSteps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step.id}
                  </div>
                  <span className="text-xs text-center">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-1 bg-gray-200 relative">
            <div 
              className="absolute top-0 right-0 h-full bg-blue-600"
              style={{ width: `${(activeStep - 1) / (requestSteps.length - 1) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step 1: Select Service */}
        {activeStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-6">اختر الخدمة التي تحتاجها</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <Card
                    key={index}
                    className={`p-6 cursor-pointer transition-all hover:border-blue-500 ${selectedService?.name === service.name ? 'border-blue-500' : ''}`}
                    onClick={() => handleServiceSelection(service)}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <ServiceIcon className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium text-center">{service.name}</h3>
                  </Card>
                );
              })}
            </div>
            <div className="pt-6 flex justify-between">
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-md whitespace-nowrap cursor-pointer"
                disabled
              >
                <ArrowRight className="ml-2" /> السابق
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md whitespace-nowrap cursor-pointer"
                onClick={() => setActiveStep(2)}
                disabled={!selectedService}
              >
                التالي <ArrowLeft className="mr-2" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Address Details */}
        {activeStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-6">أدخل تفاصيل العنوان</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="line1" className="block text-sm font-medium mb-2">الشارع</label>
                <Input
                  id="line1"
                  value={problemDetails.address.line1}
                  onChange={(e) => handleAddressChange('line1', e.target.value)}
                  placeholder="أدخل اسم الشارع"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="line2" className="block text-sm font-medium mb-2">الحي / المنطقة</label>
                <Input
                  id="line2"
                  value={problemDetails.address.line2}
                  onChange={(e) => handleAddressChange('line2', e.target.value)}
                  placeholder="أدخل الحي أو المنطقة"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">المدينة</label>
                <Input
                  id="city"
                  value={problemDetails.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="أدخل المدينة"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-2">الرمز البريدي</label>
                <Input
                  id="zipCode"
                  value={problemDetails.address.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  placeholder="أدخل الرمز البريدي"
                  className="w-full"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-md whitespace-nowrap cursor-pointer"
                  onClick={() => setActiveStep(1)}
                >
                  <ArrowRight className="ml-2" /> السابق
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md whitespace-nowrap cursor-pointer"
                  onClick={() => setActiveStep(3)}
                  disabled={!problemDetails.address.line1 || !problemDetails.address.city}
                >
                  التالي <ArrowLeft className="mr-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Problem Description */}
        {activeStep === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-6">وصف المشكلة</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">عنوان المشكلة</label>
                <Input
                  id="title"
                  value={problemDetails.title}
                  onChange={(e) => handleProblemDetailsChange('title', e.target.value)}
                  placeholder="مثال: صنبور يتسرب، انقطاع كهرباء"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">وصف المشكلة</label>
                <Textarea
                  id="description"
                  value={problemDetails.description}
                  onChange={(e) => handleProblemDetailsChange('description', e.target.value)}
                  placeholder="يرجى وصف المشكلة بالتفصيل..."
                  className="w-full"
                  rows={4}
                />
              </div>
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium mb-2">مستوى الإلحاح</label>
                <Select 
                  value={problemDetails.urgency}
                  onValueChange={(value) => handleProblemDetailsChange('urgency', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر مستوى الإلحاح" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض - خلال أسبوع</SelectItem>
                    <SelectItem value="medium">متوسط - خلال يومين</SelectItem>
                    <SelectItem value="high">عالي - اليوم</SelectItem>
                    <SelectItem value="urgent">عاجل - في أقرب وقت</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-between">
                <Button
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-md whitespace-nowrap cursor-pointer"
                  onClick={() => setActiveStep(2)}
                >
                  <ArrowRight className="ml-2" /> السابق
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md whitespace-nowrap cursor-pointer"
                  onClick={() => setActiveStep(4)}
                  disabled={!problemDetails.title || !problemDetails.description}
                >
                  التالي <ArrowLeft className="mr-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Select Craftsman */}
        {activeStep === 4 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-6">اختر الفني المناسب</h3>
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {availableCraftsmen.filter(craftsman => craftsman.available).map((craftsman) => (
                  <Card 
                    key={craftsman.id} 
                    className="p-4 cursor-pointer hover:border-blue-500 transition-colors hover:shadow-md"
                    onClick={() => handleCraftsmanSelection(craftsman)}
                  >
                    <div className="flex items-start">
                      <div className="bg-gray-200 p-3 rounded-full ml-4">
                        <UserCircle className="w-12 h-12 text-gray-600" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium">{craftsman.name}</h4>
                            <p className="text-sm text-gray-600">{craftsman.specialization}</p>
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-blue-600 mb-1">{craftsman.hourlyRate} جنيه / ساعة</div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                              <span className="text-sm">{craftsman.rating} ({craftsman.completedJobs} مهمة)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #666;
              }
            `}</style>
            <div className="pt-4 flex justify-between mt-4 border-t">
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-md whitespace-nowrap cursor-pointer"
                onClick={() => setActiveStep(3)}
              >
                <ArrowRight className="ml-2" /> السابق
              </Button>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg text-gray-600">جاري إرسال طلبك...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
