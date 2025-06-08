"use client";
import { useState } from "react";
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
import { requestService } from "./services";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, MapPin, Clock, FileText, User } from "lucide-react";
import { requestSchema, type RequestFormData } from "./validations";
import { toast } from "sonner";

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
  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: requestService.getAllServices,
  });

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

  const onSubmit: SubmitHandler<RequestFormData> = async (data) => {
    try {
      const payload = {
        userCustomerId: Number(localStorage.getItem("userId")) || 0,
        userTechId: data.technician.id,
        description: data.description,
        location: data.location,
        dateTime: data.date.toISOString(),
        status: 1,
        serviceId: data.service.id,
        attachmentBase64: data.attachmentBase64,
      };

      await createRequestMutation.mutateAsync(payload);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError(error instanceof Error ? error.message : "حدث خطأ أثناء إرسال الطلب");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("attachmentBase64", base64String.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const isLoading = isLoadingServices || isLoadingGovernorates || isLoadingCities;

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
    <div className="container mx-auto px-4 py-8">
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
              <Select
                value={selectedService?.id.toString()}
                onValueChange={(value) => {
                  console.log("Selected service value:", value);
                  const service = services.find((s) => s.id.toString() === value);
                  console.log("Found service:", service);
                  if (service) {
                    setValue("service", {
                      id: service.id,
                      name: service.name,
                    }, { shouldValidate: true });
                  }
                }}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="اختر الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <SelectTrigger className="h-12 text-lg">
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
                <SelectTrigger className="h-12 text-lg">
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
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}

              <Input
                placeholder="العنوان التفصيلي"
                className="h-12 text-lg"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location.message}</p>
              )}
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">وصف المشكلة</h2>
                <p className="text-gray-600">اشرح المشكلة بالتفصيل لمساعدتنا في تقديم أفضل خدمة</p>
              </div>
              <Textarea
                placeholder="وصف المشكلة بالتفصيل"
                className="h-32 text-lg resize-none"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    إرفاق صورة (اختياري)
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    اختر التاريخ والوقت
                  </label>
                  <Calendar
                    mode="single"
                    selected={watch("date")}
                    onSelect={(date) => {
                      if (date) {
                        setValue("date", date);
                      }
                    }}
                    className="rounded-md border shadow-sm"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date.message}</p>
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
                        {technician.imageBase64 && (
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img
                              src={`data:image/jpeg;base64,${technician.imageBase64}`}
                              alt={technician.fullName}
                              className="w-full h-full object-cover"
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
          <div className="flex justify-between mt-8 pt-6 border-t">
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
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
