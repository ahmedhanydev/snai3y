"use client";

import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const requestData = {
    reference: searchParams.get("reference"),
    craftsman: searchParams.get("craftsman"),
    service: searchParams.get("service"),
    address: searchParams.get("address"),
    city: searchParams.get("city"),
    title: searchParams.get("title"),
    urgency: searchParams.get("urgency"),
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
            <div className="text-xl font-medium text-blue-600">
              رقم الطلب: {requestData.reference}
            </div>
            <p className="text-gray-600 text-lg">
              تم إرسال طلبك إلى {requestData.craftsman}
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
                    {requestData.craftsman}
                  </p>
                  <p>
                    <span className="font-medium ml-2">العنوان:</span>{" "}
                    {requestData.address}, {requestData.city}
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium ml-2">المشكلة:</span>{" "}
                    {requestData.title}
                  </p>
                  <p>
                    <span className="font-medium ml-2">مستوى الإلحاح:</span>{" "}
                    {
                      {
                        low: "منخفض - خلال أسبوع",
                        medium: "متوسط - خلال يومين",
                        high: "عالي - اليوم",
                        urgent: "عاجل - في أقرب وقت",
                      }[requestData.urgency || "medium"]
                    }
                  </p>
                  <p>
                    <span className="font-medium ml-2">
                      الوقت المتوقع للوصول:
                    </span>{" "}
                    {
                      {
                        low: "خلال 2-7 أيام",
                        medium: "خلال 24-48 ساعة",
                        high: "خلال 12 ساعة",
                        urgent: "خلال 1-3 ساعات",
                      }[requestData.urgency || "medium"]
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 w-full max-w-md mx-auto">
              <p className="text-gray-600">
                سيتم إرسال تأكيد إلى بريدك الإلكتروني مع تفاصيل الطلب
              </p>
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
