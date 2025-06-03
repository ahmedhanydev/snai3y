"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Testimonials: React.FC = () => {
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

  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "عميل",
      service: "كهرباء",
      comment: "خدمة ممتازة وسريعة. الفني كان محترف جداً وأنجز العمل بإتقان.",
      rating: 5,
    },
    {
      id: 2,
      name: "سارة أحمد",
      role: "عميلة",
      service: "تنظيف",
      comment: "تجربة رائعة مع صنايعي. سهولة في الحجز وجودة في التنفيذ.",
      rating: 5,
    },
    {
      id: 3,
      name: "محمد علي",
      role: "عميل",
      service: "سباكة",
      comment: "أسعار معقولة وخدمة احترافية. أنصح بالتعامل معهم.",
      rating: 4,
    },
    {
      id: 4,
      name: "نورا حسين",
      role: "عميلة",
      service: "دهان",
      comment: "النتيجة فاقت توقعاتي. الفني كان محترف ودقيق في عمله.",
      rating: 2,
    },
    {
      id: 5,
      name: "يوسف محمود",
      role: "عميل",
      service: "نجارة",
      comment: "العمل كان ممتاز والتنفيذ كان سريع. شكراً لكم.",
      rating: 5,
    },
    {
      id: 6,
      name: "ليلى كريم",
      role: "عميلة",
      service: "صيانة",
      comment: "خدمة ممتازة وفريق عمل محترف. سأعود للتعامل معهم مرة أخرى.",
      rating: 3,
    },
  ];

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
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] pl-4"
                >
                  <Card className="p-4 flex flex-col justify-center items-end w-full hover:shadow-lg transition-shadow h-full bg-white mx-2">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-2 text-base">
                      &quot;الخدمة: {testimonial.service}&quot;
                    </p>
                    <p className="text-gray-600 mb-4 text-end text-sm">
                      {testimonial.comment}
                    </p>
                    <div className="border-t pt-3 w-full flex flex-col items-end">
                      <h4 className="font-semibold text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
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
