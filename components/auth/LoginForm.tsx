"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginCustomer, loginTechnician } from "@/app/(auth)/services";
import { LoginCredentials, loginSchema } from "@/validations/userSchema";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [callbackUrl, setCallbackUrl] = useState<string>("/profile");
  const router = useRouter();

  // Extract callback URL from window.location on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const callback = urlParams.get("callbackUrl");
      if (callback) {
        setCallbackUrl(callback);
      }
    }
  }, []);

  console.log("LoginForm rendered with activeTab:", activeTab);
  console.log("Callback URL:", callbackUrl);

  // Customer login form
  const {
    register: registerCustomerForm,
    handleSubmit: handleSubmitCustomer,
    formState: { errors: customerErrors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Technician login form
  const {
    register: registerTechForm,
    handleSubmit: handleSubmitTech,
    formState: { errors: techErrors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Customer login mutation
  const customerMutation = useMutation({
    mutationFn: loginCustomer,
    onSuccess: (res) => {
      console.log("success", res);
      // Check if the response is successful and contains data
      if (res.success && res.data) {
        // Store token and user information
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("access_token", res.data.token); // Also store as access_token for consistency
        localStorage.setItem("userType", "customer");
        localStorage.setItem("userId", res.data.id.toString());
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("expiryDate", res.data.expiryDate);

        toast.success("تم تسجيل الدخول بنجاح");
        router.push(callbackUrl); // Redirect to callback URL or profile
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });

  // Technician login mutation
  const technicianMutation = useMutation({
    mutationFn: loginTechnician,
    onSuccess: (res) => {
      console.log("success", res);
      // Check if the response is successful and contains data
      if (res.success && res.data) {
        // Store token and user information
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("access_token", res.data.token); // Also store as access_token for consistency
        localStorage.setItem("userType", "technician");
        localStorage.setItem("userId", res.data.id.toString());
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("expiryDate", res.data.expiryDate);

        toast.success("تم تسجيل الدخول بنجاح");
        router.push(callbackUrl); // Redirect to callback URL or profile
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });

  const onSubmitCustomer = (data: LoginCredentials) => {
    customerMutation.mutate(data);
  };

  const onSubmitTechnician = (data: LoginCredentials) => {
    technicianMutation.mutate(data);
  };

  return (
    <div className="flex justify-center w-full">
      {callbackUrl !== "/profile" && (
        <div className="absolute top-24 w-full md:w-1/2 text-center bg-blue-50 p-3 rounded-lg text-blue-700">
          يرجى تسجيل الدخول للاستمرار في العملية
        </div>
      )}
      <Tabs
        dir="rtl"
        defaultValue="customer"
        className="w-full md:w-1/2 bg-white p-8 mt-10 rounded-lg shadow-md"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="customer" className="text-center py-2">
            كعميل
          </TabsTrigger>
          <TabsTrigger value="technician" className="text-center py-2">
            كصنايعي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <form
            onSubmit={handleSubmitCustomer(onSubmitCustomer)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="loginUsername"
                className="block text-sm font-medium mb-2"
              >
                اسم المستخدم
              </label>
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
              <label
                htmlFor="loginPassword"
                className="block text-sm font-medium mb-2"
              >
                كلمة المرور
              </label>
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
              {customerMutation.isPending
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="technician">
          <form
            onSubmit={handleSubmitTech(onSubmitTechnician)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="loginUsernameTech"
                className="block text-sm font-medium mb-2"
              >
                اسم المستخدم
              </label>
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
              <label
                htmlFor="loginPasswordTech"
                className="block text-sm font-medium mb-2"
              >
                كلمة المرور
              </label>
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
              {technicianMutation.isPending
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
