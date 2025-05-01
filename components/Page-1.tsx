// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Bolt, Droplet, Hammer, Paintbrush, Leaf, Brush } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from './home/Heading';
import { PopularServices } from './home/PopularServices';
import { HowItWorks } from './home/HowItWorks';
import { Testimonials } from './home/Testimonials';


const Main: React.FC = () => {


  const popularServices = [
    { name: "الكهرباء", icon: Bolt },
    { name: "السباكة", icon: Droplet },
    { name: "النجارة", icon: Hammer },
    { name: "الدهان", icon: Paintbrush },
    { name: "البستنة", icon: Leaf },
    { name: "التنظيف", icon: Brush }
  ];
 



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
     <Heading/>

      {/* Popular Services */}
      <PopularServices popularServices={popularServices} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Main;

