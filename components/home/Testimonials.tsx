import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "أحمد محمد",
      role: "عميل",
      comment: "خدمة ممتازة وسريعة. الفني كان محترف جداً وأنجز العمل بإتقان.",
      rating: 5
    },
    {
      name: "سارة أحمد",
      role: "عميلة",
      comment: "تجربة رائعة مع صنايعي. سهولة في الحجز وجودة في التنفيذ.",
      rating: 5
    },
    {
      name: "محمد علي",
      role: "عميل",
      comment: "أسعار معقولة وخدمة احترافية. أنصح بالتعامل معهم.",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">ماذا يقول عملاؤنا</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.comment}</p>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
