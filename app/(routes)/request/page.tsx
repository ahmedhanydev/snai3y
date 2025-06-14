"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestService, type Service, type ApiResponse } from "./services";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, MapPin, Clock, FileText, User } from "lucide-react";
import { requestSchema, type RequestFormData } from "./validations";
import { toast } from "sonner";
import Image from "next/image";

interface RequestStep {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const requestSteps: RequestStep[] = [
  { id: 1, name: "اختر خدمة", icon: <FileText className="w-5 h-5" /> },
  { id: 2, name: "تفاصيل الموقع", icon: <MapPin className="w-5 h-5" /> },
  { id: 3, name: "وصف المشكلة", icon: <Clock className="w-5 h-5" /> },
  { id: 4, name: "اختر الفني", icon: <User className="w-5 h-5" /> },
];

export default function RequestService() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RequestFormData>({
    resolver: yupResolver(requestSchema),
    mode: "onSubmit",
    defaultValues: {
      attachmentBase64: "",
    },
  });

  // React Query hooks
  const { data: servicesResponse = { data: [], success: true, message: "", errors: [] } as ApiResponse<Service[]>, isLoading: isLoadingServices } = useQuery<ApiResponse<Service[]>>({
    queryKey: ["services"],
    queryFn: requestService.getAllServices,
  });

  // Extract the services array from the response
  const services = servicesResponse.data || [];

  const { data: governorates = [], isLoading: isLoadingGovernorates } = useQuery({
    queryKey: ["governorates"],
    queryFn: requestService.getAllGovernorates,
  });

  const { data: allCities = [], isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: requestService.getAllCities,
  });

  const selectedGovernorate = watch("governorate");
  const selectedCity = watch("city");
  const selectedService = watch("service");

  // Add logging for services data
  useEffect(() => {
    console.log("Services data updated:", services);
    if (services && !Array.isArray(services)) {
      console.error("Services is not an array:", services);
    }
  }, [services]);

  useEffect(() => {
    if (typeof window === "undefined" || !Array.isArray(services) || services.length === 0) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("serviceId");
    const serviceName = params.get("serviceName");
    const serviceDescription = params.get("serviceDescription");
    
    if (!serviceId || !serviceName) {
      return;
    }

    try {
      const foundService = Array.isArray(services) ? 
        services.find(s => s.id === parseInt(serviceId)) : 
        null;
      
      if (foundService) {
        setValue("service", {
          id: foundService.id,
          name: serviceName,
        }, { shouldValidate: true });
        
        if (serviceDescription) {
          setValue("description", serviceDescription, { shouldValidate: false });
        }
        
        setActiveStep(2);
      }
    } catch (error) {
      console.error("Error processing URL parameters:", error);
    }
  }, [services, setValue, setActiveStep]);

  const { data: technicians = [], isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ["technicians", selectedCity?.id, selectedService?.id],
    queryFn: () => {
      if (!selectedCity?.id || !selectedService?.id) return Promise.resolve([]);
      return requestService.getTechniciansByCityAndService(
        selectedCity.id,
        selectedService.id,
      );
    },
    enabled: !!selectedCity?.id && !!selectedService?.id,
  });

  const createRequestMutation = useMutation({
    mutationFn: requestService.createRequest,
    onSuccess: (response) => {
      if (response.success) {
        const formData = watch();
        const searchParams = new URLSearchParams({
          service: formData.service.name,
          technician: formData.technician.fullName,
          location: formData.location,
          city: formData.city.name,
          description: formData.description,
          date: formData.date.toISOString(),
        });
        
        console.log("Date being passed to success page:", formData.date, formData.date.toISOString());
        
        router.push(`/request/success?${searchParams.toString()}`);
      } else {
        toast.error(response.message || "حدث خطأ أثناء إرسال الطلب");
      }
    },
    onError: (error) => {
      console.error("Error creating request:", error);
      toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء إرسال الطلب");
    },
  });

  const handleNextStep = async () => {
    try {
      let fieldsToValidate: (keyof RequestFormData)[] = [];
      
      // Only validate fields for the current step
      switch (activeStep) {
        case 1:
          fieldsToValidate = ['service'];
          break;
        case 2:
          fieldsToValidate = ['governorate', 'city', 'location'];
          break;
        case 3:
          fieldsToValidate = ['description', 'date'];
          break;
        case 4:
          fieldsToValidate = ['technician'];
          break;
      }

      const isValid = await trigger(fieldsToValidate);
      console.log("Form validation result:", isValid);
      console.log("Current form errors:", errors);
      
      if (isValid) {
        setError(null);
        setActiveStep((prev) => prev + 1);
      } else {
        // Show the first error message for the current step
        const firstError = fieldsToValidate
          .map(field => errors[field])
          .find(error => error?.message);
        
        if (firstError?.message) {
          setError(firstError.message);
        }
      }
    } catch (error) {
      console.error("Error in handleNextStep:", error);
      setError("حدث خطأ أثناء التحقق من البيانات");
    }
  };

  const handlePreviousStep = () => {
    setError(null);
    setActiveStep((prev) => prev - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن لا يتجاوز 10 ميجابايت");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("يرجى اختيار ملف صورة صالح");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64String = reader.result as string;
          // Validate base64 string
          if (!base64String.startsWith('data:image/')) {
            toast.error("صيغة الصورة غير صالحة");
            return;
          }
          const base64Data = base64String.split(",")[1];
          console.log("Setting attachmentBase64:", base64Data.substring(0, 50) + "...");
          setValue("attachmentBase64", base64Data, { shouldValidate: true });
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error("حدث خطأ أثناء معالجة الصورة");
        }
      };
      reader.onerror = () => {
        toast.error("حدث خطأ أثناء قراءة الملف");
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<RequestFormData> = async (data) => {
    try {
      console.log("Form data before submission:", {
        ...data,
        attachmentBase64: data.attachmentBase64 ? data.attachmentBase64.substring(0, 50) + "..." : ""
      });
      
      const payload = {
        userCustomerId: Number(localStorage.getItem("userId")) || 0,
        userTechId: data.technician.id,
        description: data.description,
        location: data.location,
        dateTime: data.date.toISOString(),
        status: 1,
        serviceId: data.service.id,
        attachmentBase64: data.attachmentBase64 || "",
      };

      console.log("Payload being sent:", {
        ...payload,
        attachmentBase64: payload.attachmentBase64 ? payload.attachmentBase64.substring(0, 50) + "..." : ""
      });

      await createRequestMutation.mutateAsync(payload);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError(error instanceof Error ? error.message : "حدث خطأ أثناء إرسال الطلب");
    }
  };

  const isLoading = isLoadingServices || isLoadingGovernorates || isLoadingCities;

  useEffect(() => {
    // Extract and process URL parameters when the component mounts
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceId = params.get("service");
      const serviceName = params.get("name");
      const serviceDescription = params.get("description");
      
      if (serviceId && serviceName) {
        // Find the matching service in the loaded services
        const foundService = services.find(s => s.id.toString() === serviceId);
        
        if (foundService) {
          // Set the service in the form using the passed service name (category name)
          // instead of the foundService.name
          setValue("service", {
            id: foundService.id,
            name: serviceName, // Use the name from URL params instead of foundService.name
          }, { shouldValidate: true });
          
          // Pre-fill the description field with the service description
          if (serviceDescription) {
            setValue("description", `${serviceDescription}`, { shouldValidate: false });
          }
          
          // Automatically advance to the next step if service is selected
          setActiveStep(2);
        }
      }
    }
  }, [services, setValue]);

  useEffect(() => {
    // Only show error if we have a response and it's not successful
    if (servicesResponse && !isLoadingServices && !servicesResponse.success) {
      console.error("Failed to load services:", servicesResponse.message);
      toast.error(servicesResponse.message || "حدث خطأ أثناء تحميل الخدمات");
    }
  }, [servicesResponse, isLoadingServices]);

  if (isLoading && activeStep === 1) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Steps Progress */}
      <div className="mb-12">
        <div className="flex justify-between relative">
          {/* Progress Bar */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((activeStep - 1) / (requestSteps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {requestSteps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                step.id <= activeStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  step.id <= activeStep
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200"
                }`}
              >
                {step.icon}
              </div>
              <div className="text-sm font-medium">{step.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-8 max-w-3xl mx-auto shadow-lg">
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">اختر الخدمة</h2>
                <p className="text-gray-600">اختر الخدمة التي تحتاجها</p>
              </div>
              {isLoadingServices ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : !servicesResponse.success ? (
                <div className="text-red-500">{servicesResponse.message || "حدث خطأ في تحميل الخدمات"}</div>
              ) : !Array.isArray(services) ? (
                <div className="text-red-500">حدث خطأ في تحميل الخدمات</div>
              ) : (
                <Select
                  value={selectedService?.id.toString()}
                  onValueChange={(value) => {
                    console.log("Selected service value:", value);
                    const service = services.find((s: Service) => s.id.toString() === value);
                    console.log("Found service:", service);
                    if (service) {
                      setValue("service", {
                        id: service.id,
                        name: service.name,
                      }, { shouldValidate: true });
                    }
                  }}
                >
                  <SelectTrigger className="py-8 text-xl w-[100%]">
                    <SelectValue placeholder="اختر الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service: Service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.service && (
                <p className="text-red-500 text-sm">{errors.service.message}</p>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">تفاصيل الموقع</h2>
                <p className="text-gray-600">حدد موقعك بدقة لتسهيل وصول الفني</p>
              </div>
              <Select
                value={selectedGovernorate?.id.toString()}
                onValueChange={(value) => {
                  const governorate = governorates.find(
                    (g) => g.id.toString() === value,
                  );
                  if (governorate) {
                    setValue("governorate", {
                      id: governorate.id,
                      name: governorate.name,
                    });
                    setValue("city", {
                      id: 0,
                      name: "",
                      governorateName: "",
                    });
                  }
                }}
              >
                <SelectTrigger className="h-12 py-8 text-xl w-[100%]">
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {governorates.map((governorate) => (
                    <SelectItem key={governorate.id} value={governorate.id.toString()}>
                      {governorate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.governorate && (
                <p className="text-red-500 text-sm">{errors.governorate.message}</p>
              )}

              <Select
                value={selectedCity?.id.toString()}
                onValueChange={(value) => {
                  const city = allCities.find((c) => c.id.toString() === value);
                  if (city) {
                    setValue("city", {
                      id: city.id,
                      name: city.name,
                      governorateName: city.governorateName,
                    });
                  }
                }}
                disabled={!selectedGovernorate}
              >
                <SelectTrigger className="h-12 text-xl py-8 w-[100%]">
                  <SelectValue placeholder={isLoadingCities ? "جاري التحميل..." : "اختر المدينة"} />
                </SelectTrigger>
                <SelectContent>
                  {allCities
                    .filter((city) => city.governorateName === selectedGovernorate?.name)
                    .map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-red-500 text-base">{errors.city.message}</p>
              )}

              <Input
                placeholder="العنوان التفصيلي"
                className="h-12 text-xl py-8 w-[100%]"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 text-base">{errors.location.message}</p>
              )}
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">وصف المشكلة</h2>
                <p className="text-gray-600">اشرح المشكلة بالتفصيل لمساعدتنا في تقديم أفضل خدمة</p>
              </div>
              
              {/* Problem description card */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start space-x-4 gap-3 rtl:space-x-reverse mb-4">
                  {/* <div className="rounded-full bg-blue-100  p-2 text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div> */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">اشرح المشكلة</h3>
                    <p className="text-sm text-gray-600">كلما كان وصفك دقيقًا، كلما كان الصنايعي أكثر استعدادًا لحل المشكلة</p>
                  </div>
                </div>
                
                <Textarea
                  placeholder="وصف المشكلة بالتفصيل (مثال: لدي مشكلة في تسريب المياه من الحمام...)"
                  className="h-36 text-lg resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                )}
              </div>
              
              {/* Date selection card */}
              <div className=" rounded-lg py-6 border border-green-100">
                <div className="flex items-start space-x-4 gap-3 px-6 rtl:space-x-reverse mb-4">
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">حدد الموعد المناسب</h3>
                    <p className="text-sm text-gray-600">اختر التاريخ المناسب لزيارة الصنايعي</p>
                  </div>
                </div>
                
                <div className="bg-white w-full rounded-lg shadow-sm  ">
                  <div className="flex  w-full">
                    {/* Mobile Calendar (hidden on desktop) */}
                    <div className="sm:hidden  w-full">
                      <Calendar
                        mode="single"
                        selected={watch("date")}
                        onSelect={(date) => {
                          if (date) {
                            setValue("date", date);
                          }
                        }}
                        className="w-full "
                        classNames={{
                          root: "w-full",
                          month: "w-full",
                          table: "w-full border-collapse",
                          // row: "flex w-full justify-between",
                          // cell: "text-center p-0 relative w-[14.28%] before:pt-[100%]",
                          // day: "absolute inset-0 flex items-center justify-center p-0 text-xs font-normal hover:bg-green-100 rounded-full aria-selected:bg-green-600 aria-selected:text-white",
                          // nav_button: "h-7 w-7 bg-green-50 p-0 hover:bg-green-100 rounded-full flex items-center justify-center",
                          // nav_button_previous: "absolute left-1",
                          // nav_button_next: "absolute right-1",
                          // caption: "relative flex items-center justify-center py-2 px-4",
                          // caption_label: "text-sm font-medium",
                          // head_cell: "text-xs text-gray-500 font-normal text-center py-1",
                          // day_today: "font-bold border border-green-600 text-green-600",
                          // day_outside: "text-gray-300",
                          // day_disabled: "text-gray-300 hover:bg-transparent",
                          // day_range_middle: "rounded-none",
                          // day_hidden: "invisible",
                        }}
                        disabled={(date) => {
                          return date < new Date(new Date().setHours(0, 0, 0, 0));
                        }}
                        fromDate={new Date()}
                      />
                    </div>
                    
         {/* Desktop Calendar (hidden on mobile) - with fixed day names */}
<div className="hidden sm:block w-full">
  <div className="flex items-center justify-center w-full">
    <Calendar
      mode="single"
      selected={watch("date")}
      onSelect={(date) => {
        if (date) {
          setValue("date", date);
        }
      }}
      className="w-full mx-auto"
      classNames={{
        root: "w-full",
        month: "w-full",
        table: "w-full border-collapse",
        row: "flex w-full justify-between",
        cell: "flex-1 text-center p-0",
        day: "w-full h-10 flex items-center justify-center text-base rounded-md hover:bg-green-100 aria-selected:bg-green-600 aria-selected:text-white",
        nav_button: "h-9 w-9 bg-green-50 p-0 hover:bg-green-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        caption: "relative flex items-center justify-center py-4 px-10",
        caption_label: "text-lg font-semibold",
        head_row: "flex w-full justify-between",
        head_cell: "flex-1 text-gray-500 font-medium text-center text-sm py-2",
        day_today: "font-bold border border-green-600 text-green-600",
        day_outside: "text-gray-300",
        day_disabled: "text-gray-300 hover:bg-transparent",
      }}
      disabled={(date) => {
        return date < new Date(new Date().setHours(0, 0, 0, 0));
      }}
      fromDate={new Date()}
    />
  </div>
</div>
    </div>
  </div>
  {errors.date && (
    <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>
  )}
</div>
              
              {/* Image upload card */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <div className="flex items-start space-x-4 gap-3 rtl:space-x-reverse mb-4">
                  <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">إرفاق صورة (اختياري)</h3>
                    <p className="text-sm text-gray-600">يمكنك إرفاق صورة توضح المشكلة لمساعدة الصنايعي</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">اضغط لرفع صورة</span> أو اسحب الصورة هنا</p>
                      <p className="text-xs text-gray-500">PNG, JPG أو JPEG (الحد الأقصى 10MB)</p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {/* Uploaded image preview */}
                  {watch("attachmentBase64") && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                        <Image 
                          src={`data:image/jpeg;base64,${watch("attachmentBase64")}`}
                          alt="Uploaded preview" 
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                          onError={(e) => {
                            console.error("Error loading image:", e);
                            toast.error("حدث خطأ أثناء عرض الصورة");
                            setValue("attachmentBase64", "");
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setValue("attachmentBase64", "")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">اختر الفني</h2>
                <p className="text-gray-600">اختر الفني المناسب لخدمتك</p>
              </div>
              {isLoadingTechnicians ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : technicians.length === 0 ? (
                <div className="text-center text-gray-600 py-4">
                  لا يوجد فنيين متاحين في هذه المنطقة لهذه الخدمة
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {technicians.map((technician) => (
                    <Card
                      key={technician.id}
                      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        watch("technician")?.id === technician.id
                          ? "border-2 border-blue-600 bg-blue-50"
                          : "hover:border-blue-200"
                      }`}
                      onClick={() => setValue("technician", {
                        id: technician.id,
                        fullName: technician.fullName,
                      })}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Technician image */}
                        {technician.imageBase64 && (
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <Image
                              src={`data:image/jpeg;base64,${technician.imageBase64}`}
                              alt={technician.fullName}
                              className="w-full h-full object-cover"
                              width={64}
                              height={64}
                              onError={(e) => {
                                console.error("Error loading technician image:", e);
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {technician.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {technician.serviceName}
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            {technician.serviceDescription}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span>{technician.averageRate.toFixed(1)}</span>
                            </div>
                            <span className="mx-2">•</span>
                            <span>{technician.address.city}</span>
                            <span className="mx-2">•</span>
                            <span className="text-green-600">
                              {technician.phoneNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {errors.technician && (
                <p className="text-red-500 text-sm">{errors.technician.message}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`flex ${activeStep > 1 ? "justify-between" : "justify-end"}   mt-8 pt-6 border-t`}>
            {activeStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                className="h-12 px-8"
              >
                السابق
              </Button>
            )}
            {activeStep < 4 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="h-12 px-8"
              >
                التالي
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={createRequestMutation.isPending}
                className="h-12 px-8"
              >
                {createRequestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  "إرسال الطلب"
                )}
              </Button>
            )}
          </div>
        </Card>
      </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
      </div>
  )
}