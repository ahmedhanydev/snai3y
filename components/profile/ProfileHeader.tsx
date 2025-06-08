import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  userProfile: any;
  isTechnician: boolean;
  setActiveTab: (tab: string) => void;
}

export default function ProfileHeader({ userProfile, isTechnician, setActiveTab }: ProfileHeaderProps) {
  // Determine background style based on user type
  const bgStyle = isTechnician 
    ? "from-amber-500/80 via-primary/75 to-primary" 
    : "from-amber-500/80 via-primary/75 to-primary";

  return (
    <div className="relative mb-12 overflow-hidden rounded-t-lg">
      {/* Enhanced Background with Pattern */}
      <div className={cn(
        "absolute inset-0 h-40 bg-gradient-to-r", 
        bgStyle
      )}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "30px 30px"
          }}
        ></div>
        
        {/* Decorative shapes for added visual interest */}
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-2 right-12 w-16 h-16 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-10 left-1/4 w-8 h-8 rounded-full bg-white opacity-10"></div>
      </div>
      
      <div className="relative px-6 pt-16 pb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Avatar with enhanced border and shadow */}
          <div className="relative border-4 border-white rounded-full shadow-lg -mt-12 z-10">
            <div className="relative">
              <Avatar className="w-28 h-28 ring-2 ring-white/50 ring-offset-2 ring-offset-primary/10">
                {userProfile.imageBase64 ? (
                  <AvatarImage src={userProfile.imageBase64} alt={userProfile.fullName} />
                ) : (
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/10 to-primary/20">
                    {userProfile.fullName ? userProfile.fullName[0].toUpperCase() : 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              
              {/* Online status indicator with pulse effect */}
              <span className="absolute bottom-2 left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></span>
              </span>
            </div>
          </div>
          
          {/* User info with improved spacing */}
          <div className="flex flex-col md:flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Name and badges */}
              <div>
                <h1 className="text-2xl font-bold text-white">{userProfile.fullName}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {isTechnician ? (
                    <>
                      <Badge variant="secondary" className="font-medium">
                        صنايعي
                      </Badge>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-amber-700">
                          {userProfile.averageRate?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-primary/5 border-white text-white">
                        {userProfile.serviceName}
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="secondary" className="font-medium">
                      عميل
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Member since with styled badge */}
              <div className="mt-3 md:mt-0 px-2 py-1 rounded-md bg-black/5 text-base text-white">
                عضو منذ: {new Date(userProfile.createdDateTime).toLocaleDateString('ar-EG')}
              </div>
            </div>
            
            {/* Stats Row with enhanced design */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              {/* Completed Orders with hover effect */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <span className="text-xl font-bold text-primary block">
                    {userProfile.countRequestComplate || 0}
                  </span>
                  <span className="text-sm text-gray-500">طلبات مكتملة</span>
                </div>
              </div>
              
              {/* Experience Level - Only for technicians */}
              {isTechnician && (
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <span className={cn(
                      "text-sm font-medium block px-2 py-1 rounded-full mx-auto w-fit",
                      userProfile.countRequestComplate > 20 
                        ? "bg-green-100 text-green-800" 
                        : userProfile.countRequestComplate > 10 
                          ? "bg-blue-100 text-blue-800" 
                          : userProfile.countRequestComplate > 5 
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                    )}>
                      {userProfile.countRequestComplate > 20 
                        ? "خبير" 
                        : userProfile.countRequestComplate > 10 
                          ? "متقدم" 
                          : userProfile.countRequestComplate > 5 
                            ? "متوسط"
                            : "مبتدئ"}
                    </span>
                    <span className="text-sm text-gray-500 mt-1 block">مستوى الخبرة</span>
                  </div>
                </div>
              )}
              
              {/* Avg. Rating - Only for technicians */}
              {isTechnician && (
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                          key={index} 
                          className={`w-4 h-4 ${index < Math.round(userProfile.averageRate || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">متوسط التقييم</span>
                  </div>
                </div>
              )}
              
              {/* Phone number - For customers instead of rating */}
              {!isTechnician && (
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <span className="text-sm font-medium text-primary block">
                      {userProfile.phoneNumber}
                    </span>
                    <span className="text-sm text-gray-500">رقم الهاتف</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Quick Action Buttons with improved styling */}
        <div className="flex justify-end gap-2 mt-4">
          {isTechnician && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-white/90 hover:bg-white"
              onClick={() => setActiveTab("reviews")}
            >
              <Star className="w-4 h-4" /> عرض التقييمات
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-white/90 hover:bg-white"
            onClick={() => setActiveTab("settings")}
          >
            <span>تعديل الملف الشخصي</span>
          </Button>
        </div>
      </div>
    </div>
  );
}