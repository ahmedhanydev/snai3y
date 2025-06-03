import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Search,
  Shield,
  UserCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "اختر الخدمة",
      description: "تصفح مجموعتنا الواسعة من الخدمات واختر ما يناسبك",
    },
    {
      icon: Calendar,
      title: "حدد موعداً",
      description: "اختر الوقت المناسب لك وحدد تفاصيل الخدمة",
    },
    {
      icon: UserCheck,
      title: "استقبل الحرفي",
      description: "سيصل الحرفي المتخصص في الموعد المحدد",
    },
    {
      icon: CheckCircle,
      title: "استمتع بالخدمة",
      description: "قيّم الخدمة وشارك تجربتك مع الآخرين",
    },
  ];

  const features = [
    {
      icon: Wrench,
      title: "حرفيون محترفون",
      description: "جميع الحرفيين مدربون ومؤهلون ولديهم خبرة مثبتة",
    },
    {
      icon: Clock,
      title: "خدمة سريعة",
      description: "نضمن وصول الحرفي في الوقت المحدد وإنجاز العمل بسرعة",
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "نقدم ضمان على جميع الخدمات المقدمة",
    },
    {
      icon: CreditCard,
      title: "دفع آمن",
      description: "طرق دفع متعددة وآمنة لراحتك",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            كيف يعمل صنايعي؟
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            عملية بسيطة وسهلة للحصول على الخدمة التي تحتاجها
          </p>
          <Button asChild className="bg-white text-primary hover:bg-gray-100">
            <Link href="/services">ابدأ الآن</Link>
          </Button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا تختار صنايعي؟
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">جاهز للبدء؟</h2>
          <p className="text-xl text-gray-600 mb-8">
            احصل على الخدمة التي تحتاجها الآن
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Link href="/services">استكشف الخدمات</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
