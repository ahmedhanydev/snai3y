import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompleteOrderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    totalPayment: number;
    rate: number;
    description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export default function CompleteOrderDialog({
  isOpen,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
  isPending,
}: CompleteOrderDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>إكمال الطلب</DialogTitle>
          <DialogDescription>
            يرجى تقييم الخدمة وإدخال المبلغ المدفوع لإكمال الطلب.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="totalPayment">المبلغ المدفوع</Label>
              <Input
                id="totalPayment"
                name="totalPayment"
                type="number"
                min="0"
                className="text-right"
                value={formData.totalPayment}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">التقييم (من 1 إلى 5)</Label>
              <Input
                id="rate"
                name="rate"
                type="number"
                min="1"
                max="5"
                className="text-right"
                value={formData.rate}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">تعليق (اختياري)</Label>
              <Textarea
                id="description"
                name="description"
                className="text-right"
                value={formData.description}
                onChange={onChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? "جاري الإكمال..." : "إكمال الطلب"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}