"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Bolt, Droplet, Hammer, Paintbrush, Leaf, Brush, ArrowRight, ArrowLeft, Star , UserCircle, StarHalf, Calendar, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";



interface Service {
    icon: any;
    name: string;
  }
  
  interface PopularServicesProps {
    popularServices: Service[];
  }

  const popularServices = [
    { name: "الكهرباء", icon: Bolt },
    { name: "السباكة", icon: Droplet },
    { name: "النجارة", icon: Hammer },
    { name: "الدهان", icon: Paintbrush },
    { name: "البستنة", icon: Leaf },
    { name: "التنظيف", icon: Brush }
  ];

export default function RequestService() {
    const [activeTab, setActiveTab] = useState<string>("customer");
    const [activeStep, setActiveStep] = useState<number>(1);
    const [selectedService, setSelectedService] = useState<{
        category: string;
        id: string;
        name: string;
        price: string;
        duration: string;
    } | null>(null);

    // Get query parameters
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    
    // Set selected service from query parameters when component mounts
    useState(() => {
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
            // Move to the next step since service is already selected
            setActiveStep(2);
        }
    });

    const technicians = [
        {
          id: 1,
          name: "جون دو",
          service: "كهرباء",
          rating: 4.8,
          location: "وسط المدينة",
          image: "https://public.readdy.ai/ai/img_res/9bba0cfc07912a60aac84a09f983b1ea.jpg",
        },
        {
          id: 2,
          name: "أحمد حسن",
          service: "سباكة",
          rating: 4.7,
          location: "الجانب الغربي",
          image: "https://public.readdy.ai/ai/img_res/94d4349c645fb6bf9fbc9b579cf39fbb.jpg",
        },
        {
          id: 3,
          name: "فاطمة علي",
          service: "نجارة",
          rating: 4.9,
          location: "الجانب الشمالي",
          image: "https://public.readdy.ai/ai/img_res/5eee522ed28c8dbb39b1fc3b3e8b1f30.jpg",
        },
        {
          id: 4,
          name: "مرقس إبراهيم",
          service: "دهان",
          rating: 4.6,
          location: "الجانب الشرقي",
          image: "https://public.readdy.ai/ai/img_res/a62ea49f5184c94c3b60de10bb918d0b.jpg",
        },
      ];
    
      const requestSteps = [
        { id: 1, name: "اختر خدمة" },
        { id: 2, name: "تفاصيل الموقع" },
        { id: 3, name: "وصف المشكلة" },
        { id: 4, name: "اختر الفني" }
      ];
    return(
      <div  dir="rtl" className=" w-full  px-6 py-12  gap-8">
      {/* Step-by-Step Request Process */}
      <div className=" w-full p-8 rounded-lg shadow-md">
        <div className="flex items-center w-full mb-6">
          <Button variant="ghost" className="text-blue-600 cursor-pointer">
          <ArrowRight className="ml-2" /> رجوع
          </Button>
          <h2 className="text-2xl font-bold ml-2">طلب خدمة</h2>
        </div>
        
        <div className="mb-8">
          <div dir="rtl" className="flex items-center justify-between mb-4">
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
          <div className="h-1 bg-gray-200 relative">
            <div 
     
              className="absolute top-0 right-0 h-full bg-blue-600"
              style={{ width: `${(activeStep - 1) / (requestSteps.length - 1) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {activeStep === 1 && (
          <div>
            <h3 className="text-lg font-medium mb-4">اختر الخدمة</h3>
            <div className="grid grid-cols-2 gap-4">
              {popularServices.map((service, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer hover:border-blue-500"
                  onClick={() => setActiveStep(2)}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center me-3">
                    <service.icon className={` text-blue-600 `}/>
                  </div>
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeStep === 2 && (
     

         <div  dir="rtl">
           <h3 className="text-lg font-medium mb-4">تفاصيل الموقع</h3>
           <form className="space-y-4">
             <div>
               <label htmlFor="addressLine1" className="block text-sm font-medium mb-2">
                 العنوان الأول
               </label>
               <Input
                 id="addressLine1"
                 type="text"
                 placeholder="أدخل عنوان الشارع"
                 className="w-full"
               />
             </div>
         
             <div>
               <label htmlFor="addressLine2" className="block text-sm font-medium mb-2">
                 العنوان الثاني (اختياري)
               </label>
               <Input
                 id="addressLine2"
                 type="text"
                 placeholder="شقة، جناح، إلخ."
                 className="w-full"
               />
             </div>
         
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label htmlFor="city" className="block text-sm font-medium mb-2">
                   المدينة
                 </label>
                 <Input id="city" type="text" placeholder="المدينة" className="w-full" />
               </div>
         
               <div>
                 <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                   الرمز البريدي
                 </label>
                 <Input
                   id="zipCode"
                   type="text"
                   placeholder="الرمز البريدي"
                   className="w-full"
                 />
               </div>
             </div>
         
             <div className="pt-4 flex justify-start">
               <Button
                 className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                 onClick={() => setActiveStep(3)}
               >
                 التالي <ArrowLeft className="mr-2" />
               </Button>
             </div>
           </form>
         </div>
        )}
        
        {activeStep === 3 && (

         <div dir="rtl">
           <h3 className="text-lg font-medium mb-4">وصف المشكلة</h3>
           <form className="space-y-4">
             <div>
               <label htmlFor="problemTitle" className="block text-sm font-medium mb-2">
                 عنوان المشكلة
               </label>
               <Input
                 id="problemTitle"
                 type="text"
                 placeholder="مثال: صنبور يتسرب، انقطاع كهرباء"
                 className="w-full"
               />
             </div>
         
             <div>
               <label htmlFor="problemDescription" className="block text-sm font-medium mb-2">
                 وصف المشكلة
               </label>
               <textarea
                 id="problemDescription"
                 rows={4}
                 placeholder="يرجى وصف المشكلة بالتفصيل..."
                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
               ></textarea>
             </div>
         
             <div>
               <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                 مستوى الإلحاح
               </label>
               <select
                 id="urgency"
                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option value="low">منخفض - خلال أسبوع</option>
                 <option value="medium">متوسط - خلال 2-3 أيام</option>
                 <option value="high">مرتفع - خلال 24 ساعة</option>
                 <option value="emergency">طارئ - في أقرب وقت ممكن</option>
               </select>
             </div>
         
             <div>
               <label htmlFor="attachPhotos" className="block text-sm font-medium mb-2">
                 إرفاق صور (اختياري)
               </label>
               <Input id="attachPhotos" type="file" multiple className="w-full" />
             </div>
         
             <div className="pt-4 flex justify-start">
               <Button
                 className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                 onClick={() => setActiveStep(4)}
               >
                 التالي <ArrowLeft className="mr-2" />
               </Button>
             </div>
           </form>
         </div>
        )}
        
        {activeStep === 4 && (


<div >
  <h3 className="text-lg font-medium mb-4">اختر فني</h3>
  <div className="space-y-4">
    {technicians.slice(0, 3).map((tech) => (
      <div
        key={tech.id}
        className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer"
      >
        <div className="flex items-center">
          <img
            src={tech.image}
            alt={tech.name}
            className="w-12 h-12 rounded-full object-cover ml-4"
          />
          <div className="flex-1">
            <h4 className="font-medium">{tech.name}</h4>
            <div className="flex items-center text-sm text-gray-600">
              <span className="ml-2">{tech.service}</span>
              <div className="flex items-center text-yellow-400">
                <Star className="ml-1" />
                <span>{tech.rating}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 !rounded-button whitespace-nowrap cursor-pointer"
          >
            عرض التفاصيل
          </Button>
        </div>
      </div>
    ))}

    <div className="pt-4 flex justify-start">
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
      >
        إكمال الطلب
      </Button>
    </div>
  </div>
</div>
        )}
      </div>
      
      {/* Dashboard View */}
  
{/* <div dir="rtl" className="bg-white p-8 rounded-lg shadow-md">
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-bold">مرحبًا، جون!</h2>
      <p className="text-gray-600">مرحبًا بك في لوحة التحكم الخاصة بك</p>
    </div>
    <Button variant="ghost" className="text-gray-500 hover:text-gray-700 cursor-pointer">
      <UserCircle className="text-xl" />
    </Button>
  </div>

  <div className="mb-8">
    <h3 className="text-lg font-medium mb-4">طلبات الخدمة الخاصة بي</h3>
    <div className="space-y-4">
      {technicians.map((tech) => (
        <Card key={tech.id} className="p-4">
          <div className="flex items-center">
            <img
              src={tech.image}
              alt={tech.name}
              className="w-12 h-12 rounded-full object-cover ml-4"
            />
            <div className="flex-1">
              <h4 className="font-medium">{tech.name}</h4>
              <div className="flex items-center text-sm">
                <span className="ml-2">{tech.service}</span>
                <div className="flex items-center text-yellow-400">
                  <Star className="ml-1" />
                  <Star className="ml-1" />
                  <Star className="ml-1" />
                  <Star className="ml-1" />
                  <StarHalf className="ml-1" />
                </div>
              </div>
            </div>
            <Button
              variant="link"
              className="text-blue-600 !rounded-button whitespace-nowrap cursor-pointer"
            >
              عرض التفاصيل
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>

  <div>
    <h3 className="text-lg font-medium mb-4">المواعيد القادمة</h3>
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-4">
          <Calendar className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">خدمة سباكة</h4>
          <p className="text-sm text-gray-600">غدًا، 10:00 صباحًا - 12:00 ظهرًا</p>
          <p className="text-sm text-gray-600">الفني: أحمد حسن</p>
        </div>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 !rounded-button whitespace-nowrap cursor-pointer"
        >
          إعادة جدولة
        </Button>
      </div>
    </div>

    <div className="bg-green-50 border border-green-100 rounded-lg p-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center ml-4">
          <CheckCircle className="text-green-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">إصلاح كهرباء</h4>
          <p className="text-sm text-gray-600">تم الانتهاء في 7 أبريل 2025</p>
          <p className="text-sm text-gray-600">الفني: جون دو</p>
        </div>
        <Button
          variant="outline"
          className="text-green-600 border-green-600 !rounded-button whitespace-nowrap cursor-pointer"
        >
          ترك تقييم
        </Button>
      </div>
    </div>
  </div>
</div> */}
    </div>
    )
}