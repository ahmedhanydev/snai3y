"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Define the type for the review data
interface Address {
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  governorate: string;
}

interface User {
  id: number;
  userName: string | null;
  email: string;
  bsd: string;
  address: Address;
  fullName: string;
  imageBase64: string | null;
  phoneNumber: string;
  createdDateTime: string;
  countRequestComplate: number;
}

interface UserTech extends User {
  serviceId: number;
  serviceName: string | null;
  serviceDescription: string | null;
  averageRate: number;
}

interface Review {
  description: string;
  id: number;
  rate: number;
  userTechId: number;
  userCustomerId: number;
  requestServiceId: number;
  userCustomer: User;
  userTech: UserTech;
  requestDateTIme: string;
  serviceId: number;
  serviceName: string;
}

export const Testimonials: React.FC<{ reviews: Review[] }> = ({ reviews }) => {


  console.log("Reviews:", reviews);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()],
  );
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <Star className="absolute w-5 h-5 text-yellow-400" />
          <div className="absolute w-2.5 h-5 overflow-hidden">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-400" />
      );
    }

    return stars;
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          ماذا يقول عملاؤنا
        </h2>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] pl-4"
                >
                  <Card className="p-4 flex flex-col justify-center items-end w-full hover:shadow-lg transition-shadow h-full bg-white mx-2">
                    <div className="flex gap-1 mb-4">
                      {renderStars(review.rate)}
                    </div>
                    <div className="flex items-center justify-end w-full mb-3 gap-2">
                      <p className="text-gray-700 font-semibold text-base">
                        {review.serviceName}
                      </p>
                      <p className="text-gray-600 text-base">الخدمة:</p>
                    </div>
                    <p className="text-gray-600 mb-4 text-end text-sm">
                      {review.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-3 self-start">
                      {formatDate(review.requestDateTIme)}
                    </p>
                    <div className="border-t pt-3 w-full flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        الفني: {review.userTech.fullName}
                      </div>
                      <div className="flex flex-col items-end">
                        <h4 className="font-semibold text-base">
                          {review.userCustomer.fullName}
                        </h4>
                        <p className="text-gray-500 text-sm">عميل</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
