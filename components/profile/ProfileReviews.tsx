/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getReviewsForTechnician } from "@/app/(routes)/profile/services";

interface Review {
  id: number;
  rate: number;
  description: string;
  userTechId: number;
  userCustomerId: number;
  requestServiceId: number;
  requestDateTIme: string;
  serviceId: number;
  serviceName: string;
  userCustomer: {
    id: number;
    userName: string;
    email: string;
    fullName: string;
    imageBase64: string;
    phoneNumber: string;
    createdDateTime: string;
    countRequestComplate: number;
  };
  userTech: {
    id: number;
    userName: string;
    email: string;
    fullName: string;
    imageBase64: string;
    phoneNumber: string;
    serviceId: number;
    createdDateTime: string;
    serviceName: string;
    serviceDescription: string;
    averageRate: number;
    countRequestComplate: number;
  };
}

interface ProfileReviewsProps {
  userId: string | null;
  userProfile: any;
}

export default function ProfileReviews({ userId, userProfile }: ProfileReviewsProps) {
  const router = useRouter();

  // Fetch reviews for technician
  const { 
    data: reviewsData, 
    isLoading: isReviewsLoading 
  } = useQuery({
    queryKey: ['reviews', userId],
    queryFn: async () => {
      if (!userId) return null;
      return await getReviewsForTechnician(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });


  console.log("Reviews Data:", reviewsData);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-right">
        تقييمات العملاء
      </h3>
      
      {isReviewsLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewsData?.length > 0 ? (
            reviewsData.map((review: Review) => (
              <Card key={review.id} className="p-5 border-2 border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`w-4 h-4 ${index < review.rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      ({review.rate}/5)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.requestDateTIme).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    {review.userCustomer?.imageBase64 ? (
                      <AvatarImage src={review.userCustomer.imageBase64} alt={review.userCustomer.fullName} />
                    ) : (
                      <AvatarFallback>
                        {review.userCustomer?.fullName ? review.userCustomer.fullName[0].toUpperCase() : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.userCustomer?.fullName || "عميل"}</h4>
                    {review.serviceName && (
                      <p className="text-sm text-gray-600">
                        خدمة: {review.serviceName}
                      </p>
                    )}
                  </div>
                </div>
                
                {review.description && (
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700">{review.description}</p>
                  </div>
                )}
                
                <div className="mt-3 text-left">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/orders/${review.requestServiceId}`)}
                  >
                    عرض الطلب
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">لا توجد تقييمات حتى الآن</p>
              <p className="text-sm text-gray-400 mt-2">
                ستظهر تقييمات العملاء هنا بعد اكتمال الطلبات
              </p>
            </div>
          )}
        </div>
      )}
      
      {reviewsData?.data?.length > 0 && (
        <div className="flex justify-between items-center mt-6 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-base px-3 py-1">
              متوسط التقييم: {userProfile.averageRate || 0}/5
            </Badge>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  className={`w-5 h-5 ${index < (userProfile.averageRate || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            إجمالي التقييمات: {reviewsData.data.length}
          </div>
        </div>
      )}
    </Card>
  );
}