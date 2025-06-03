interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface PopularServicesProps {
  popularServices: Service[];
}

export const PopularServices = ({ popularServices }: PopularServicesProps) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl text-end font-bold mb-8">الخدمات الشائعة</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {popularServices.map((service, index) => {
          // const Icon = iconComponents[service.icon];
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <service.icon className="text-blue-600 text-2xl" />
              </div>
              <span className="text-center font-medium">{service.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
