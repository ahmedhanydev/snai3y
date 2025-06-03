"use client";
import { useState } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useMutation } from "@tanstack/react-query";
import { loginSchema, LoginCredentials } from "@/validations/userSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { loginCustomer, loginTechnician, getCustomerById, getTechnicianById } from "@/app/(auth)/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const router = useRouter();

  // Customer login form
  const {
    register: registerCustomerForm,
    handleSubmit: handleSubmitCustomer,
    formState: { errors: customerErrors }
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // Technician login form
  const {
    register: registerTechForm,
    handleSubmit: handleSubmitTech,
    formState: { errors: techErrors }
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  
  // Customer login mutation
  const customerMutation = useMutation({
    mutationFn: loginCustomer,
    onSuccess:  (res) => {
      console.log("success", res);
      // Check if the response is successful and contains data
      if (res.success && res.data) {
        // Store token and user information
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', 'customer');
        localStorage.setItem('userId', res.data.id.toString());
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('expiryDate', res.data.expiryDate);
        

        toast.success("تم تسجيل الدخول بنجاح");
        router.push("/profile"); // Redirect to customer dashboard
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  });

  // Technician login mutation
  const technicianMutation = useMutation({
    mutationFn: loginTechnician,
    onSuccess:  (res) => {
      console.log("success", res);
      // Check if the response is successful and contains data
      if (res.success && res.data) {
        // Store token and user information
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', 'technician');
        localStorage.setItem('userId', res.data.id.toString());
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('expiryDate', res.data.expiryDate);
        
        
        toast.success("تم تسجيل الدخول بنجاح");
        router.push("/profile"); // Redirect to technician dashboard
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  });

  const onSubmitCustomer = (data: LoginCredentials) => {
    customerMutation.mutate(data);
  };

  const onSubmitTechnician = (data: LoginCredentials) => {
    technicianMutation.mutate(data);
  };

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
              <label htmlFor="loginUsername" className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <Input 
                id="loginUsername" 
                type="text" 
                placeholder="اكتب اسم المستخدم" 
                className="w-full" 
                {...registerCustomerForm("username")}
              />
              <p className="text-red-500">{customerErrors.username?.message}</p>
            </div>
            
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input 
                id="loginPassword" 
                type="password" 
                placeholder="اكتب كلمة المرور" 
                className="w-full" 
                {...registerCustomerForm("password")}
              />
              <p className="text-red-500">{customerErrors.password?.message}</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
              disabled={customerMutation.isPending}
            >
              {customerMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="technician">
          <form onSubmit={handleSubmitTech(onSubmitTechnician)} className="space-y-6">
            <div>
              <label htmlFor="loginUsernameTech" className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <Input 
                id="loginUsernameTech" 
                type="text" 
                placeholder="اكتب اسم المستخدم" 
                className="w-full" 
                {...registerTechForm("username")}
              />
              <p className="text-red-500">{techErrors.username?.message}</p>
            </div>
            
            <div>
              <label htmlFor="loginPasswordTech" className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input 
                id="loginPasswordTech" 
                type="password" 
                placeholder="اكتب كلمة المرور" 
                className="w-full" 
                {...registerTechForm("password")}
              />
              <p className="text-red-500">{techErrors.password?.message}</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
              disabled={technicianMutation.isPending}
            >
              {technicianMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};