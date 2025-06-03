"use client";

import {
  Bolt,
  Brush,
  Droplet,
  Hammer,
  Paintbrush,
  Search,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "electrical", name: "الكهرباء", icon: Bolt },
    { id: "plumbing", name: "السباكة", icon: Droplet },
    { id: "carpentry", name: "النجارة", icon: Hammer },
    { id: "painting", name: "الدهان", icon: Paintbrush },
    { id: "maintenance", name: "الصيانة", icon: Wrench },
    { id: "cleaning", name: "التنظيف", icon: Brush },
  ];

  const services = {
    electrical: [
      { id: 1, name: "تركيب وحدات إضاءة", duration: "1-2" },
      { id: 2, name: "صيانة الكهرباء", duration: "2-3" },
      { id: 3, name: "تركيب مراوح", duration: "1" },
    ],
    plumbing: [
      { id: 4, name: "إصلاح تسريبات", duration: "1-2" },
      { id: 5, name: "تركيب أدوات صحية", duration: "2-3" },
      { id: 6, name: "إصلاح سخانات", duration: "1-2" },
    ],
    carpentry: [
      { id: 7, name: "تركيب أثاث", duration: "2-4" },
      { id: 8, name: "إصلاح أبواب ونوافذ", duration: "1-3" },
      { id: 9, name: "صناعة أثاث مخصص", duration: "3-5" },
    ],
    painting: [
      { id: 10, name: "دهان داخلي", duration: "2-3" },
      { id: 11, name: "دهان خارجي", duration: "3-4" },
      { id: 12, name: "ورق حائط", duration: "2-3" },
    ],
    maintenance: [
      { id: 13, name: "صيانة عامة", duration: "2-4" },
      { id: 14, name: "تركيب أجهزة", duration: "1-2" },
      { id: 15, name: "إصلاح أجهزة", duration: "2-3" },
    ],
    cleaning: [
      { id: 16, name: "تنظيف منزلي", duration: "3-4" },
      { id: 17, name: "تنظيف مكاتب", duration: "4-5" },
      { id: 18, name: "تنظيف واجهات", duration: "3-4" },
    ],
  };

  const filteredServices = (categoryId: string) => {
    return services[categoryId as keyof typeof services].filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            اختر من مجموعة واسعة من الخدمات المنزلية المتخصصة
          </p>
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="ابحث عن خدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-gray-900"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={categories[0].id} className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <Icon className="w-5 h-5" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices(category.id).map((service) => (
                    <Card key={service.id} className="p-6">
                      <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                      <div className="flex justify-end items-center mb-4">
                        <span className="text-gray-600">
                          المدة: {service.duration} ساعة
                        </span>
                      </div>
                      <Button asChild className="w-full">
                        <Link
                          href={`/request?category=${category.id}&service=${service.id}&name=${service.name}&duration=${service.duration}`}
                        >
                          احجز الآن
                        </Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
