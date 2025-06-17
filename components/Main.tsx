// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import { Bolt, Brush, Droplet, Hammer, Leaf, Paintbrush } from "lucide-react";
import React from "react";

import { Heading } from "./home/Heading";
import { HowItWorks } from "./home/HowItWorks";
import { PopularServices } from "./home/PopularServices";
import { Testimonials } from "./home/Testimonials";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/app/services";

const Main: React.FC = () => {
  const popularServices = [
    { name: "الكهرباء", icon: Bolt },
    { name: "السباكة", icon: Droplet },
    { name: "النجارة", icon: Hammer },
    { name: "الدهان", icon: Paintbrush },
    { name: "البستنة", icon: Leaf },
    { name: "التنظيف", icon: Brush },
  ];

  const {data:reviews} = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews()
  })



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Heading />

      {/* Popular Services */}
      <PopularServices
        popularServices={popularServices.map((service, idx) => ({
          id: idx + 1,
          name: service.name,
          icon: service.icon,
          description: "",
          image: "",
        }))}
      />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials reviews={reviews} />
    </div>
  );
};

export default Main;
