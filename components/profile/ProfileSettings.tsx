import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileSettingsProps {
  userProfile: any;
}

export default function ProfileSettings({ userProfile }: ProfileSettingsProps) {
  const address = userProfile.address || {};

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6 text-right">
        تحديث المعلومات الشخصية
      </h3>
      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <Label htmlFor="fullName" className="block">الاسم</Label>
            <Input id="fullName" name="fullName" defaultValue={userProfile.fullName} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="email" className="block">البريد الإلكتروني</Label>
            <Input id="email" name="email" defaultValue={userProfile.email} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="phoneNumber" className="block">رقم الهاتف</Label>
            <Input id="phoneNumber" name="phoneNumber" defaultValue={userProfile.phoneNumber} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="street" className="block">الشارع</Label>
            <Input id="street" name="street" defaultValue={address.street} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="buildingNumber" className="block">رقم المبنى</Label>
            <Input id="buildingNumber" name="buildingNumber" defaultValue={address.buildingNumber} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="apartmentNumber" className="block">رقم الشقة</Label>
            <Input id="apartmentNumber" name="apartmentNumber" defaultValue={address.apartmentNumber} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="city" className="block">المدينة</Label>
            <Input id="city" name="city" defaultValue={address.city} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="governorate" className="block">المحافظة</Label>
            <Input id="governorate" name="governorate" defaultValue={address.governorate} className="text-right" />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="postalCode" className="block">الرمز البريدي</Label>
            <Input id="postalCode" name="postalCode" defaultValue={address.postalCode} className="text-right" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit">
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </Card>
  );
}