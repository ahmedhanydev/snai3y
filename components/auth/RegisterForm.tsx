"use client"
import { useState } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"



export const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");


    return (
        <div  className=" flex justify-center w-full ">
        <Tabs dir="rtl" defaultValue="customer" className="w-full md:w-1/2 bg-white p-8 mt-10 rounded-lg shadow-md" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-8">
            <TabsTrigger value="customer" className="text-center py-2">كعميل</TabsTrigger>
            <TabsTrigger value="technician" className="text-center py-2">كصنايعي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">الاسم كامل</label>
                <Input id="fullName" type="text" placeholder="اكتب اسمك بالكامل" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">الايميل</label>
                <Input id="email" type="email" placeholder="اكتب ايميلك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">كلمةالمرور</label>
                <Input id="password" type="password" placeholder="انشاء كلمة مرور " className="w-full" />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">تاكيد كلمةالمرور</label>
                <Input id="confirmPassword" type="password" placeholder="تاكيد كلمة مرورك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">العنوان</label>
                <Input id="address" type="text" placeholder="اكتب عنوانك" className="w-full" />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                انشاء حساب
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="technician">
            <form className="space-y-6">
              <div>
                <label htmlFor="fullNameTech" className="block text-sm font-medium mb-2">اسمك بالكامل</label>
                <Input id="fullNameTech" type="text" placeholder="اكتب اسمك بالكامل" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="emailTech" className="block text-sm font-medium mb-2">الايميل</label>
                <Input id="emailTech" type="email" placeholder="اكتب ايميلك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="phoneTech" className="block text-sm font-medium mb-2">الموبيل</label>
                <Input id="phoneTech" dir="rtl" type="tel" placeholder="اكتب رقم موبيلك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="passwordTech" className="block text-sm font-medium mb-2">كلمة المرور</label>
                <Input id="passwordTech" type="password" placeholder="انشاء كلمة المرور" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="confirmPasswordTech" className="block text-sm font-medium mb-2">تاكيد كلمة المرور</label>
                <Input id="confirmPasswordTech" type="password" placeholder="تاكيد كلمة مرورك" className="w-full" />
              </div>
              
              <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium mb-2">تحميل صورة شخصية (اختياري)</label>
                <Input id="profilePhoto" type="file" className="w-full" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="addressTech" className="block text-sm font-medium mb-2">عنوان الشارع</label>
                  <Input id="addressTech" type="text" placeholder="أدخل عنوانك" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium mb-2">الرقم القومي</label>
                  <Input id="licenseNumber" type="text" placeholder="اكتب رقمك القومي" className="w-full" />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                انشاء حساب
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    )
}