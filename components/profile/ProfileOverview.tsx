import { Calendar, Mail, MapPin, Phone, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Helper function to format address
const formatAddress = (address: any): string => {
  if (!address) return "عنوان غير محدد";

  const parts = [
    address.street,
    address.buildingNumber && `مبنى ${address.buildingNumber}`,
    address.apartmentNumber && `شقة ${address.apartmentNumber}`,
    address.city,
    address.governorate,
  ].filter(Boolean);

  return parts.join("، ");
};

interface ProfileOverviewProps {
  userProfile: any;
  isTechnician: boolean;
}

export default function ProfileOverview({ userProfile, isTechnician }: ProfileOverviewProps) {
  const birthDate = userProfile.bsd ? new Date(userProfile.bsd).toLocaleDateString('ar-EG') : 'غير محدد';
  const fullAddress = formatAddress(userProfile.address);

  return (
    <div className="grid  gap-6 w-[100%]" >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-right">
          المعلومات الشخصية
        </h3>
        <div className="space-y-4">
          <div className="flex items-center flex-row-reverse gap-3 justify-end">
            <span className="text-right">{userProfile.email}</span>
            <Mail className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center flex-row-reverse gap-3 justify-end">
            <span className="text-right">{userProfile.phoneNumber}</span>
            <Phone className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center flex-row-reverse gap-3 justify-end">
            <span className="text-right">{fullAddress}</span>
            <MapPin className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center flex-row-reverse gap-3 justify-end">
            <div className="text-right">
              <span>{birthDate}</span>
              <span className="text-gray-600 mr-1">:تاريخ الميلاد</span>
            </div>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </Card>

      {isTechnician && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-right">
            معلومات العمل
          </h3>
          <div className="space-y-4 ">
            <div className="text-right">
              <Label className="block mb-1">التخصص</Label>
              <p className="text-gray-600">
                {userProfile.serviceName}
              </p>
            </div>
            <div className="text-right">
              <Label className="block mb-1">الوصف</Label>
              <p className="text-gray-600">
                {userProfile.serviceDescription || 'لا يوجد وصف'}
              </p>
            </div>
            <div className="text-right">
              <Label className="block mb-1">التقييم</Label>
              <div className="flex items-center gap-1 justify-start">
                <span className="text-lg">{userProfile.averageRate || 0}</span>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}