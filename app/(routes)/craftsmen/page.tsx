"use client";

import { MapPin, Phone, Search, Star, Wrench } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Craftsman {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  available: boolean;
}

export default function Craftsmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] =
    useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "busy"
  >("all");

  // Mock data - replace with real data from your backend
  const craftsmen: Craftsman[] = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "01234567890",
      location: "المعادي، القاهرة",
      specialization: "كهرباء",
      rating: 4.8,
      completedJobs: 156,
      hourlyRate: 50,
      available: true,
    },
    {
      id: 2,
      name: "محمد علي",
      email: "mohamed@example.com",
      phone: "01234567891",
      location: "مدينة نصر، القاهرة",
      specialization: "سباكة",
      rating: 4.5,
      completedJobs: 98,
      hourlyRate: 45,
      available: true,
    },
    {
      id: 3,
      name: "عمر أحمد",
      email: "omar@example.com",
      phone: "01234567892",
      location: "الدقي، الجيزة",
      specialization: "نجارة",
      rating: 4.9,
      completedJobs: 203,
      hourlyRate: 60,
      available: false,
    },
  ];

  const specializations = [...new Set(craftsmen.map((c) => c.specialization))];

  const filteredCraftsmen = craftsmen.filter((craftsman) => {
    const matchesSearch =
      craftsman.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craftsman.specialization
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      craftsman.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization =
      specializationFilter === "all" ||
      craftsman.specialization === specializationFilter;

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && craftsman.available) ||
      (availabilityFilter === "busy" && !craftsman.available);

    return matchesSearch && matchesSpecialization && matchesAvailability;
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8"
      dir="rtl"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">الصنايعية</h1>
          <p className="text-gray-600 mt-2">ابحث عن صنايعي محترف في مجالك</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="ابحث باسم الصنايعي، التخصص، أو المنطقة..."
              className="pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            value={specializationFilter}
            onValueChange={setSpecializationFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر التخصص" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل التخصصات</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={availabilityFilter}
            onValueChange={(value: string ) =>
              setAvailabilityFilter(value as "all" | "available" | "busy")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="available">متاح</SelectItem>
              <SelectItem value="busy">مشغول</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Craftsmen Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCraftsmen.map((craftsman) => (
            <Card
              key={craftsman.id}
              className="p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">
                      {craftsman.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{craftsman.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Wrench className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {craftsman.specialization}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={craftsman.available ? "default" : "secondary"}>
                  {craftsman.available ? "متاح" : "مشغول"}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{craftsman.rating}</span>
                  </div>
                  <Badge variant="outline">
                    {craftsman.completedJobs} مهمة مكتملة
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{craftsman.location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{craftsman.phone}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">السعر بالساعة:</span>
                  <span className="font-semibold text-lg">
                    {craftsman.hourlyRate} جنيه
                  </span>
                </div>
                <Button className="w-full" variant="default">
                  احجز الآن
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredCraftsmen.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              لا يوجد صنايعية مطابقين لمعايير البحث
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
