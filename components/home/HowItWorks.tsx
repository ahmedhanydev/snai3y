import React from "react";

import { Card } from "@/components/ui/card";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "اختر الخدمة",
      description: "تصفح مجموعة واسعة من الخدمات واختر ما يناسب احتياجاتك",
    },
    {
      title: "حدد موعداً",
      description: "اختر الوقت المناسب لك وحدد تفاصيل الخدمة المطلوبة",
    },
    {
      title: "استمتع بالخدمة",
      description:
        "سيصل الفني المتخصص في الموعد المحدد لتنفيذ الخدمة باحترافية",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          كيف يعمل صنايعي؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
