"use client";

import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const requestData = {
    service: searchParams.get("service"),
    technician: searchParams.get("technician"),
    location: searchParams.get("location"),
    city: searchParams.get("city"),
    description: searchParams.get("description"),
    date: searchParams.get("date"),
  };

  const handleNewRequest = () => {
    router.push("/request");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-medium text-green-600">
              تم إرسال طلبك بنجاح
            </h3>
            <p className="text-gray-600 text-lg">
              تم إرسال طلبك إلى {requestData.technician}
            </p>

            <div className="bg-gray-50 p-8 rounded-lg w-full mt-4">
              <h4 className="text-xl font-medium mb-6 text-right">
                تفاصيل الطلب:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                <div className="space-y-3">
                  <p>
                    <span className="font-medium ml-2">الخدمة:</span>{" "}
                    {requestData.service}
                  </p>
                  <p>
                    <span className="font-medium ml-2">الفني:</span>{" "}
                    {requestData.technician}
                  </p>
                  <p>
                    <span className="font-medium ml-2">العنوان:</span>{" "}
                    {requestData.location}, {requestData.city}
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium ml-2">وصف المشكلة:</span>{" "}
                    {requestData.description}
                  </p>
                  <p>
                    <span className="font-medium ml-2">الموعد المحدد:</span>{" "}
                    {new Date(requestData.date || "").toLocaleDateString("ar-SA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 w-full max-w-md mx-auto">
            
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md whitespace-nowrap cursor-pointer w-full py-6 text-lg"
                onClick={handleNewRequest}
              >
                طلب خدمة جديدة
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
