"use client";

import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PageProps {
  params: {
    category: string;
    id: string;
  };
}

export default function BookingPage({ params }: PageProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log({
      category: params.category,
      serviceId: params.id,
      date,
      time,
      address,
      notes,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">حجز خدمة</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">اختر التاريخ</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {date
                      ? format(date, "PPP", { locale: ar })
                      : "اختر تاريخاً"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">اختر الوقت</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={time === slot ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">العنوان</label>
              <Textarea
                placeholder="أدخل عنوان تنفيذ الخدمة بالتفصيل"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                ملاحظات إضافية
              </label>
              <Textarea
                placeholder="أي تفاصيل إضافية ترغب في إضافتها"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              تأكيد الحجز
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
