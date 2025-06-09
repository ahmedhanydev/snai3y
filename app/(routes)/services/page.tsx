/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Bolt,
  Brush,
  Droplet,
  Hammer,
  Paintbrush,
  Search,
  Wrench,
  Loader2,

} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Service {
  id: number;
  name: string;
  description: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors: string[];
  data: T;
}


type ServicesByCategory = Record<string, Service[]>;

// Add this function to fetch services
 const getServices = async (): Promise<ApiResponse<Service[]>> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get<ApiResponse<Service[]>>(`${baseURL}/Lookups/GetAllServices`);
  return res.data;
};

// Define the category icons mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "الكهرباء": Bolt,
  "السباكة": Droplet,
  "النجارة": Hammer,
  "الدهان": Paintbrush,
  "الصيانة": Wrench,
  "التنظيف": Brush,
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch services from the API
  const { data: servicesData, isLoading: isLoadingServices } = useQuery<ApiResponse<Service[]>>({
    queryKey: ["services"],
    queryFn: getServices,
  });

  // Extract unique categories from the fetched services
  interface Category {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  }


  // Let's create a mapping to categorize the services based on their names
  const serviceCategories: Record<string, string> = {
    "كهرباء": "الكهرباء",
    "سباكة": "السباكة",
    "نجارة": "النجارة",
    "دهانات": "الدهان",
    "تكييف وتبريد": "الصيانة",
    "إصلاح الأجهزة المنزلية": "الصيانة",
    "خدمات التنظيف": "التنظيف",
    "النجف والإضاءة": "الكهرباء",
    "شبكات الكمبيوتر": "الكهرباء",
    "أنظمة الأمان والكاميرات": "الكهرباء",
    "ميكانيكا سيارات": "الصيانة",
    "أعمال البناء": "النجارة",
    "تصميم داخلي": "الدهان",
    "الحدادة": "النجارة",
    "النجيلة والحدائق": "التنظيف",
    "المقاولات العامة": "النجارة",
  };

  // Create a function to get the category for a service
  const getServiceCategory = (serviceName: string): string => {
    return serviceCategories[serviceName] || "الصيانة"; // Default to "الصيانة" if no mapping
  };

  // Now update the categories logic
  const uniqueCategories = useMemo(() =>
    Object.values(serviceCategories).filter((value, index, self) => self.indexOf(value) === index),
    []
  );

  const categories: Category[] = useMemo(() =>
    servicesData?.data
      ? uniqueCategories.map((category: string) => ({
          id: category,
          name: category,
          icon: categoryIcons[category] || Wrench,
        }))
      : [],
    [servicesData, uniqueCategories]
  );

  // And update the servicesByCategory logic
  const servicesByCategory: ServicesByCategory = useMemo(() =>
    servicesData?.data
      ? servicesData.data.reduce<ServicesByCategory>((acc, service) => {
          const category = getServiceCategory(service.name);
          if (!acc[category]) acc[category] = [];
          acc[category].push(service);
          return acc;
        }, {})
      : {},
    [servicesData]
  );

    
  // Set default selected category once data is loaded
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);
  
  // Filter services based on search query
  const filteredServices = (categoryId: string): Service[] => {
    if (!servicesByCategory || !servicesByCategory[categoryId]) return [];
    return servicesByCategory[categoryId].filter((service: Service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary to-primary/80 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا المميزة</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            استكشف مجموعة واسعة من الخدمات المنزلية المتخصصة التي نقدمها لك بجودة عالية وأسعار منافسة
          </p>
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="ابحث عن خدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-gray-900 h-12 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {isLoadingServices ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-gray-600 text-lg">جاري تحميل الخدمات...</p>
              </div>
            </div>
          ) : categories.length > 0 ? (
            <Tabs defaultValue={categories[0].id} className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 mb-12 bg-transparent">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={String(category.id)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border-2 data-[state=active]:border-primary"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-base">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(filteredServices(category.id)) && filteredServices(category.id).length > 0 ? (
                      filteredServices(category.id).map((service: Service) => {
                        const CategoryIcon = category.icon;
                        return (
                          <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 border-b">
                              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                                <CategoryIcon className="w-8 h-8 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                              <p className="text-gray-600 mb-4">{service.description || 'خدمة منزلية احترافية توفر لك الوقت والجهد'}</p>
                            </div>
                            <div className="p-6 bg-white">
                              <Button asChild className="w-full h-12 text-base font-medium">
                                <Link
                                  href={`/request?category=${encodeURIComponent(category.id)}&service=${encodeURIComponent(service.id)}&name=${encodeURIComponent(category.name)}&description=${encodeURIComponent(service.name)}`}
                                >
                                  احجز الآن
                                </Link>
                              </Button>
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-10 text-gray-500">
                        لا توجد خدمات مطابقة لبحثك
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">لا توجد خدمات متاحة حاليًا</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Call to action section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">لم تجد ما تبحث عنه؟</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            يمكنك التواصل معنا مباشرة وسنساعدك في العثور على الخدمة المناسبة لاحتياجاتك
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg">
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
