"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerSchema, technicianSchema, UserCustomer, UserTechnician } from "@/validations/userSchema";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Select } from 'antd';
import { yupResolver } from "@hookform/resolvers/yup"

import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useForm } from "react-hook-form";
import { registerCustomer, registerTechnician, getCities, getServices } from "@/app/(auth)/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define city interface based on the response
interface City {
  id: number;
  name: string;
  governorateName: string;
}

// Define service interface based on the expected response
interface Service {
  id: number;
  name: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();
  
  // Fetch cities
  const { data: citiesResponse, isLoading: loadingCities } = useQuery({
    queryKey: ['cities'],
    queryFn: getCities
  });
  
  // Fetch services
  const { data: servicesResponse, isLoading: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });
  
  const cities = citiesResponse?.data || [];
  const services = servicesResponse?.data || [];

  // Customer form
  const {
    register: registerCustomerForm,
    handleSubmit: handleSubmitCustomer,
    setValue: setCustomerValue,
    formState: { errors: customerErrors }
  } = useForm<UserCustomer>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      bsd: "",
      fullName: "",
      imageBase64: "",
      phoneNumber: "",
      apartmentNumber: "",
      buildingNumber: "",
      cityId: 0,
      street: "",
      postalCode: ""
    }
  });

  // Technician form
  const {
    register: registerTechForm,
    handleSubmit: handleSubmitTech,
    setValue: setTechValue,
    formState: { errors: techErrors }
  } = useForm<UserTechnician>({
    resolver: yupResolver(technicianSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      bsd: "",
      fullName: "",
      imageBase64: "",
      phoneNumber: "",
      serviceId: 0,
      apartmentNumber: "",
      buildingNumber: "",
      cityId: 0,
      street: "",
      postalCode: ""
    }
  });

  // Handle city selection for customer
  const handleCustomerCityChange = (value: number) => {
    setCustomerValue("cityId", value);
  };

  // Handle city selection for technician
  const handleTechnicianCityChange = (value: number) => {
    setTechValue("cityId", value);
  };
  
  // Handle service selection for technician
  const handleServiceChange = (value: number) => {
    setTechValue("serviceId", value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setValueFn: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValueFn("imageBase64", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Customer registration mutation
  const customerMutation = useMutation({
    mutationFn: registerCustomer,
    onSuccess: (res) => {
      console.log("success", res);
      if(res.success === true){
 toast.success("تم انشاء الحساب بنجاح");
      router.push("/login");
      }else{
        toast.error(res.message || "حدث خطأ أثناء إنشاء الحساب");
      }
     
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء إنشاء الحساب");
    }
  });

  // Technician registration mutation
  const technicianMutation = useMutation({
    mutationFn: registerTechnician,
    onSuccess: (res) => {
      console.log("success", res);
      toast.success("تم انشاء الحساب بنجاح");
      router.push("/login");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء إنشاء الحساب");
    }
  });

  const onSubmitCustomer = (data: UserCustomer) => {
    customerMutation.mutate(data);
  };

  const onSubmitTechnician = (data: UserTechnician) => {
    technicianMutation.mutate(data);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    // When a file is uploaded, convert it to base64 and update based on active tab
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      getBase64(newFileList[0].originFileObj as FileType).then(base64String => {
        if (activeTab === "customer") {
          setCustomerValue("imageBase64", base64String);
        } else {
          setTechValue("imageBase64", base64String);
        }
      });
    } else {
      // Clear the image if no file is selected
      if (activeTab === "customer") {
        setCustomerValue("imageBase64", "");
      } else {
        setTechValue("imageBase64", "");
      }
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="flex justify-center w-full">
      <Tabs dir="rtl" defaultValue="customer" className="w-full md:w-1/2 bg-white p-8 mt-10 rounded-lg shadow-md" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="customer" className="text-center py-2">كعميل</TabsTrigger>
          <TabsTrigger value="technician" className="text-center py-2">كصنايعي</TabsTrigger>
        </TabsList>
        
        <TabsContent value="customer">
          <form onSubmit={handleSubmitCustomer(onSubmitCustomer)} className="space-y-6">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <Input id="userName" type="text" {...registerCustomerForm("userName")} placeholder="اكتب اسم المستخدم" className="w-full" />
              <p className="text-red-500">{customerErrors.userName?.message}</p>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">الاسم كامل</label>
              <Input id="fullName" type="text" {...registerCustomerForm("fullName")} placeholder="اكتب اسمك بالكامل" className="w-full" />
              <p className="text-red-500">{customerErrors.fullName?.message}</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">الايميل</label>
              <Input id="email" type="email" {...registerCustomerForm("email")} placeholder="اكتب ايميلك" className="w-full" />
              <p className="text-red-500">{customerErrors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input id="password" type="password" {...registerCustomerForm("password")} placeholder="انشاء كلمة مرور" className="w-full" />
              <p className="text-red-500">{customerErrors.password?.message}</p>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">الموبيل</label>
              <Input id="phoneNumber" type="tel" {...registerCustomerForm("phoneNumber")} placeholder="اكتب رقم موبيلك" className="w-full" />
              <p className="text-red-500">{customerErrors.phoneNumber?.message}</p>
            </div>

            <div>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-circle"
                fileList={fileList}
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    console.error('You can only upload image files!');
                    return false;
                  }
                  return true;
                }}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </div>

            <div>
              <label htmlFor="bsd" className="block text-sm font-medium mb-2">تاريخ الميلاد</label>
              <Input id="bsd" type="date" {...registerCustomerForm("bsd")} className="w-full" />
              <p className="text-red-500">{customerErrors.bsd?.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="buildingNumber" className="block text-sm font-medium mb-2">رقم المبنى</label>
                <Input id="buildingNumber" type="text" {...registerCustomerForm("buildingNumber")} placeholder="رقم المبنى" className="w-full" />
                <p className="text-red-500">{customerErrors.buildingNumber?.message}</p>
              </div>

              <div>
                <label htmlFor="apartmentNumber" className="block text-sm font-medium mb-2">رقم الشقة</label>
                <Input id="apartmentNumber" type="text" {...registerCustomerForm("apartmentNumber")} placeholder="رقم الشقة" className="w-full" />
                <p className="text-red-500">{customerErrors.apartmentNumber?.message}</p>
              </div>
            </div>

            <div>
              <label htmlFor="street" className="block text-sm font-medium mb-2">الشارع</label>
              <Input id="street" type="text" {...registerCustomerForm("street")} placeholder="اسم الشارع" className="w-full" />
              <p className="text-red-500">{customerErrors.street?.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cityId" className="block text-sm font-medium mb-2">المدينة</label>
                <Select
                  id="cityId"
                  placeholder="اختر المدينة"
                  loading={loadingCities}
                  className="w-full"
                  onChange={handleCustomerCityChange}
                  options={cities.map((city: City) => ({
                    value: city.id,
                    label: `${city.name} - ${city.governorateName}`
                  }))}
                />
                <p className="text-red-500">{customerErrors.cityId?.message}</p>
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-2">الرمز البريدي</label>
                <Input id="postalCode" type="text" {...registerCustomerForm("postalCode")} placeholder="الرمز البريدي" className="w-full" />
                <p className="text-red-500">{customerErrors.postalCode?.message}</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
              disabled={customerMutation.isPending}
            >
              {customerMutation.isPending ? "جاري التسجيل..." : "انشاء حساب"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="technician">
          <form onSubmit={handleSubmitTech(onSubmitTechnician)} className="space-y-6">
            <div>
              <label htmlFor="userNameTech" className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <Input id="userNameTech" type="text" {...registerTechForm("userName")} placeholder="اكتب اسم المستخدم" className="w-full" />
              <p className="text-red-500">{techErrors.userName?.message}</p>
            </div>
            
            <div>
              <label htmlFor="fullNameTech" className="block text-sm font-medium mb-2">اسمك بالكامل</label>
              <Input id="fullNameTech" type="text" {...registerTechForm("fullName")} placeholder="اكتب اسمك بالكامل" className="w-full" />
              <p className="text-red-500">{techErrors.fullName?.message}</p>
            </div>
            
            <div>
              <label htmlFor="emailTech" className="block text-sm font-medium mb-2">الايميل</label>
              <Input id="emailTech" type="email" {...registerTechForm("email")} placeholder="اكتب ايميلك" className="w-full" />
              <p className="text-red-500">{techErrors.email?.message}</p>
            </div>
            
            <div>
              <label htmlFor="phoneTech" className="block text-sm font-medium mb-2">الموبيل</label>
              <Input id="phoneTech" dir="rtl" type="tel" {...registerTechForm("phoneNumber")} placeholder="اكتب رقم موبيلك" className="w-full" />
              <p className="text-red-500">{techErrors.phoneNumber?.message}</p>
            </div>
            
            <div>
              <label htmlFor="passwordTech" className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input id="passwordTech" type="password" {...registerTechForm("password")} placeholder="انشاء كلمة مرور" className="w-full" />
              <p className="text-red-500">{techErrors.password?.message}</p>
            </div>
            
            <div>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-circle"
                fileList={fileList}
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    console.error('You can only upload image files!');
                    return false;
                  }
                  return true;
                }}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            
            <div>
              <label htmlFor="bsdTech" className="block text-sm font-medium mb-2">تاريخ الميلاد</label>
              <Input id="bsdTech" type="date" {...registerTechForm("bsd")} className="w-full" />
              <p className="text-red-500">{techErrors.bsd?.message}</p>
            </div>
            
            <div>
              <label htmlFor="serviceIdTech" className="block text-sm font-medium mb-2">نوع الخدمة</label>
              <Select
                id="serviceIdTech"
                placeholder="اختر نوع الخدمة"
                loading={loadingServices}
                className="w-full"
                onChange={handleServiceChange}
                options={services.map((service: Service) => ({
                  value: service.id,
                  label: service.name
                }))}
              />
              <p className="text-red-500">{techErrors.serviceId?.message}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="buildingNumberTech" className="block text-sm font-medium mb-2">رقم المبنى</label>
                <Input id="buildingNumberTech" type="text" {...registerTechForm("buildingNumber")} placeholder="رقم المبنى" className="w-full" />
                <p className="text-red-500">{techErrors.buildingNumber?.message}</p>
              </div>

              <div>
                <label htmlFor="apartmentNumberTech" className="block text-sm font-medium mb-2">رقم الشقة</label>
                <Input id="apartmentNumberTech" type="text" {...registerTechForm("apartmentNumber")} placeholder="رقم الشقة" className="w-full" />
                <p className="text-red-500">{techErrors.apartmentNumber?.message}</p>
              </div>
            </div>

            <div>
              <label htmlFor="streetTech" className="block text-sm font-medium mb-2">الشارع</label>
              <Input id="streetTech" type="text" {...registerTechForm("street")} placeholder="اسم الشارع" className="w-full" />
              <p className="text-red-500">{techErrors.street?.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cityIdTech" className="block text-sm font-medium mb-2">المدينة</label>
                <Select
                  id="cityIdTech"
                  placeholder="اختر المدينة"
                  loading={loadingCities}
                  className="w-full"
                  onChange={handleTechnicianCityChange}
                  options={cities.map((city: City) => ({
                    value: city.id,
                    label: `${city.name} - ${city.governorateName}`
                  }))}
                />
                <p className="text-red-500">{techErrors.cityId?.message}</p>
              </div>

              <div>
                <label htmlFor="postalCodeTech" className="block text-sm font-medium mb-2">الرمز البريدي</label>
                <Input id="postalCodeTech" type="text" {...registerTechForm("postalCode")} placeholder="الرمز البريدي" className="w-full" />
                <p className="text-red-500">{techErrors.postalCode?.message}</p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
              disabled={technicianMutation.isPending}
            >
              {technicianMutation.isPending ? "جاري التسجيل..." : "انشاء حساب"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};