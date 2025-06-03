import { Award, Building2, Target, Users2, Wrench } from "lucide-react";

export default function About() {
  const stats = [
    { number: "1000+", label: "عميل سعيد", icon: Users2 },
    { number: "500+", label: "حرفي محترف", icon: Wrench },
    { number: "50+", label: "مدينة", icon: Building2 },
    { number: "98%", label: "نسبة رضا العملاء", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            من نحن
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            نحن منصة رائدة تربط بين الحرفيين المهرة وأصحاب المنازل، نقدم خدمات
            موثوقة وعالية الجودة لجميع احتياجات منزلك
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-primary ml-3" />
                <h2 className="text-2xl font-bold">رؤيتنا</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                أن نكون المنصة الرائدة في مجال الخدمات المنزلية في الشرق الأوسط،
                نوفر حلولاً مبتكرة تجمع بين التكنولوجيا والمهارة الحرفية لتحسين
                حياة الناس.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-primary ml-3" />
                <h2 className="text-2xl font-bold">مهمتنا</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                توفير منصة سهلة الاستخدام تربط بين الحرفيين المهرة والعملاء، مع
                ضمان جودة الخدمة وتوفير فرص عمل للحرفيين المحليين.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">الجودة</h3>
              <p className="text-gray-600">
                نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">الموثوقية</h3>
              <p className="text-gray-600">
                نضمن تقديم خدمات موثوقة وآمنة لجميع عملائنا
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">الاحترافية</h3>
              <p className="text-gray-600">
                نعمل بمهنية عالية ونلتزم بالمواعيد والمعايير المهنية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
