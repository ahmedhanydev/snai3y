// // The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// "use client";
// import React, { useState } from "react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const App: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     new Date(),
//   );
//   const [selectedService, setSelectedService] =
//     useState<string>("Electrical Repair");
//   const [messageText, setMessageText] = useState<string>("");

//   // Sample services for dropdown
//   const services = [
//     "Electrical Repair",
//     "Electrical Installation",
//     "Emergency Electrical Service",
//     "Lighting Installation",
//     "Electrical Inspection",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm fixed w-full z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <span className="text-blue-800 text-xl font-bold">
//                   CraftsmenConnect
//                 </span>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center justify-center flex-1">
//               <div className="flex space-x-8">
//                 <a
//                   href="#"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer"
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer"
//                 >
//                   Services
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer"
//                 >
//                   How it Works
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer"
//                 >
//                   About Us
//                 </a>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center">
//               <Button
//                 variant="outline"
//                 className="mr-3 cursor-pointer !rounded-button whitespace-nowrap"
//               >
//                 Login
//               </Button>
//               <Button className="bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
//                 Register
//               </Button>
//             </div>
//             <div className="flex items-center md:hidden">
//               <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
//                 <i className="fas fa-bars text-xl"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content with padding for fixed navbar */}
//       <div className="pt-16">
//         {/* Professional Profile Header */}
//         <div className="bg-blue-800 text-white py-10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col md:flex-row items-center">
//               <div className="md:mr-8 mb-6 md:mb-0">
//                 <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
//                   <img
//                     src="https://public.readdy.ai/ai/img_res/2cf9c55175a155d4fdb7f63ebc2c7ffe.jpg"
//                     alt="John Doe"
//                     className="w-full h-full object-cover object-top"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1 text-center md:text-left">
//                 <div className="flex flex-col md:flex-row md:items-center">
//                   <h1 className="text-3xl font-bold">John Doe</h1>
//                   <Badge className="bg-green-500 ml-0 md:ml-3 mt-2 md:mt-0 self-center md:self-auto">
//                     Verified
//                   </Badge>
//                 </div>
//                 <p className="text-xl mt-1">Professional Electrician</p>
//                 <div className="flex items-center mt-2 justify-center md:justify-start">
//                   <div className="text-yellow-400 flex">
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star-half-alt"></i>
//                   </div>
//                   <span className="ml-2">4.9 (124 jobs completed)</span>
//                 </div>
//                 <div className="mt-4 flex flex-col sm:flex-row gap-3">
//                   <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer !rounded-button whitespace-nowrap">
//                     <i className="fas fa-calendar-alt mr-2"></i> Book Now
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
//                   >
//                     <i className="fas fa-comment mr-2"></i> Contact
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Profile Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Info & Services */}
//             <div className="lg:col-span-2">
//               <Tabs defaultValue="about" className="w-full">
//                 <TabsList className="grid w-full grid-cols-4">
//                   <TabsTrigger value="about">About</TabsTrigger>
//                   <TabsTrigger value="services">Services</TabsTrigger>
//                   <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
//                   <TabsTrigger value="reviews">Reviews</TabsTrigger>
//                 </TabsList>

//                 {/* About Tab */}
//                 <TabsContent value="about" className="mt-6">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <h2 className="text-2xl font-bold mb-4">About Me</h2>
//                       <p className="text-gray-700 mb-6">
//                         I&apos;m a certified electrician with over 15 years of
//                         experience in residential and commercial electrical
//                         services. I specialize in electrical repairs,
//                         installations, and maintenance. My goal is to provide
//                         safe, reliable, and efficient electrical solutions for
//                         all my clients.
//                       </p>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div>
//                           <h3 className="text-lg font-semibold mb-3">
//                             Professional Information
//                           </h3>
//                           <ul className="space-y-2">
//                             <li className="flex items-start">
//                               <i className="fas fa-briefcase text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">Experience:</strong>{" "}
//                                 15+ years
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-map-marker-alt text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">Service Area:</strong>{" "}
//                                 Within 25 miles of Downtown
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-language text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">Languages:</strong>{" "}
//                                 English, Spanish
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-certificate text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">License:</strong> State
//                                 Certified Electrician #EL12345
//                               </span>
//                             </li>
//                           </ul>
//                         </div>

//                         <div>
//                           <h3 className="text-lg font-semibold mb-3">
//                             Availability
//                           </h3>
//                           <ul className="space-y-2">
//                             <li className="flex items-start">
//                               <i className="fas fa-clock text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">
//                                   Business Hours:
//                                 </strong>{" "}
//                                 Mon-Fri: 8am-6pm, Sat: 9am-3pm
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-bolt text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">
//                                   Emergency Service:
//                                 </strong>{" "}
//                                 Available 24/7
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-reply text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">Response Time:</strong>{" "}
//                                 Within 2 hours
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <i className="fas fa-calendar-check text-blue-800 mt-1 w-6"></i>
//                               <span>
//                                 <strong className="mr-2">
//                                   Advance Booking:
//                                 </strong>{" "}
//                                 Up to 30 days
//                               </span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>

//                       <h3 className="text-lg font-semibold mb-3">
//                         Skills & Expertise
//                       </h3>
//                       <div className="space-y-4 mb-6">
//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="font-medium">
//                               Electrical Repairs
//                             </span>
//                             <span>95%</span>
//                           </div>
//                           <Progress value={95} className="h-2" />
//                         </div>
//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="font-medium">
//                               Electrical Installations
//                             </span>
//                             <span>90%</span>
//                           </div>
//                           <Progress value={90} className="h-2" />
//                         </div>
//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="font-medium">
//                               Lighting Systems
//                             </span>
//                             <span>85%</span>
//                           </div>
//                           <Progress value={85} className="h-2" />
//                         </div>
//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="font-medium">
//                               Smart Home Integration
//                             </span>
//                             <span>80%</span>
//                           </div>
//                           <Progress value={80} className="h-2" />
//                         </div>
//                       </div>

//                       <h3 className="text-lg font-semibold mb-3">
//                         Certifications
//                       </h3>
//                       <div className="flex flex-wrap gap-2 mb-6">
//                         <Badge
//                           variant="outline"
//                           className="bg-blue-50 text-blue-800 border-blue-200"
//                         >
//                           Master Electrician
//                         </Badge>
//                         <Badge
//                           variant="outline"
//                           className="bg-blue-50 text-blue-800 border-blue-200"
//                         >
//                           OSHA Certified
//                         </Badge>
//                         <Badge
//                           variant="outline"
//                           className="bg-blue-50 text-blue-800 border-blue-200"
//                         >
//                           Smart Home Specialist
//                         </Badge>
//                         <Badge
//                           variant="outline"
//                           className="bg-blue-50 text-blue-800 border-blue-200"
//                         >
//                           Energy Efficiency Expert
//                         </Badge>
//                         <Badge
//                           variant="outline"
//                           className="bg-blue-50 text-blue-800 border-blue-200"
//                         >
//                           First Aid Certified
//                         </Badge>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Services Tab */}
//                 <TabsContent value="services" className="mt-6">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <h2 className="text-2xl font-bold mb-6">
//                         Services & Pricing
//                       </h2>

//                       <div className="space-y-6">
//                         {/* Service Category 1 */}
//                         <div>
//                           <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                             Electrical Repairs
//                           </h3>
//                           <div className="space-y-4">
//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Outlet/Switch Replacement
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Replace faulty outlets or switches
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$65 - $85</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per unit
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Circuit Breaker Replacement
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Replace faulty circuit breakers
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$120 - $180</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per breaker
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Electrical Troubleshooting
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Diagnose and fix electrical issues
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$85</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per hour
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Service Category 2 */}
//                         <div>
//                           <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                             Electrical Installations
//                           </h3>
//                           <div className="space-y-4">
//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Ceiling Fan Installation
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Install new ceiling fan with existing wiring
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$150 - $250</p>
//                                 <p className="text-sm text-gray-600">Per fan</p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Light Fixture Installation
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Install new light fixtures
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$100 - $200</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per fixture
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Electrical Panel Upgrade
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Upgrade electrical service panel
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$1,500 - $3,000</p>
//                                 <p className="text-sm text-gray-600">
//                                   Full service
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Service Category 3 */}
//                         <div>
//                           <h3 className="text-xl font-semibold text-blue-800 mb-4">
//                             Specialty Services
//                           </h3>
//                           <div className="space-y-4">
//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Smart Home Installation
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Install and configure smart home devices
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$95</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per hour + materials
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Emergency Service
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   24/7 emergency electrical service
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$150</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per hour (min. 1 hour)
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                               <div>
//                                 <h4 className="font-medium">
//                                   Electrical Safety Inspection
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                   Comprehensive electrical safety check
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="font-semibold">$250</p>
//                                 <p className="text-sm text-gray-600">
//                                   Per inspection
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-8 bg-blue-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                           Service Packages
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="bg-white p-4 rounded-lg border border-blue-200">
//                             <h4 className="font-semibold text-blue-800">
//                               Home Safety Package
//                             </h4>
//                             <ul className="mt-2 space-y-1 text-sm">
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>Full electrical safety inspection</span>
//                               </li>
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>
//                                   Smoke detector installation (2 units)
//                                 </span>
//                               </li>
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>GFCI outlet upgrades (2 units)</span>
//                               </li>
//                             </ul>
//                             <p className="mt-3 font-semibold">
//                               $350{" "}
//                               <span className="text-sm text-gray-600 font-normal">
//                                 (Save $100)
//                               </span>
//                             </p>
//                           </div>

//                           <div className="bg-white p-4 rounded-lg border border-blue-200">
//                             <h4 className="font-semibold text-blue-800">
//                               Smart Home Starter
//                             </h4>
//                             <ul className="mt-2 space-y-1 text-sm">
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>Smart thermostat installation</span>
//                               </li>
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>3 smart light switches</span>
//                               </li>
//                               <li className="flex items-start">
//                                 <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
//                                 <span>Smart hub setup & configuration</span>
//                               </li>
//                             </ul>
//                             <p className="mt-3 font-semibold">
//                               $450{" "}
//                               <span className="text-sm text-gray-600 font-normal">
//                                 (Save $150)
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-3">
//                           Additional Information
//                         </h3>
//                         <ul className="space-y-2">
//                           <li className="flex items-start">
//                             <i className="fas fa-info-circle text-blue-800 mt-1 w-6"></i>
//                             <span>
//                               <strong className="mr-2">
//                                 Minimum Service Call:
//                               </strong>{" "}
//                               $85 (includes first 30 minutes)
//                             </span>
//                           </li>
//                           <li className="flex items-start">
//                             <i className="fas fa-truck text-blue-800 mt-1 w-6"></i>
//                             <span>
//                               <strong className="mr-2">Travel Fee:</strong> Free
//                               within 15 miles, $2/mile thereafter
//                             </span>
//                           </li>
//                           <li className="flex items-start">
//                             <i className="fas fa-file-invoice-dollar text-blue-800 mt-1 w-6"></i>
//                             <span>
//                               <strong className="mr-2">Estimates:</strong> Free
//                               for most services
//                             </span>
//                           </li>
//                           <li className="flex items-start">
//                             <i className="fas fa-shield-alt text-blue-800 mt-1 w-6"></i>
//                             <span>
//                               <strong className="mr-2">Warranty:</strong> 1-year
//                               warranty on parts and labor
//                             </span>
//                           </li>
//                         </ul>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Portfolio Tab */}
//                 <TabsContent value="portfolio" className="mt-6">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <h2 className="text-2xl font-bold mb-6">Portfolio</h2>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Project 1 */}
//                         <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//                           <div className="relative h-60">
//                             <img
//                               src="https://public.readdy.ai/ai/img_res/f7d7b4b5c8a9e3d2a1b0c9f8e7d6c5b4.jpg"
//                               alt="Electrical Panel Upgrade"
//                               className="w-full h-full object-cover object-top"
//                             />
//                             <div className="absolute top-3 left-3">
//                               <Badge className="bg-blue-800">
//                                 Before & After
//                               </Badge>
//                             </div>
//                           </div>
//                           <div className="p-4">
//                             <h3 className="font-semibold text-lg">
//                               Electrical Panel Upgrade
//                             </h3>
//                             <p className="text-gray-600 text-sm mt-1">
//                               Complete 200A service panel upgrade for a
//                               residential home, replacing outdated fuse box with
//                               modern circuit breakers.
//                             </p>
//                             <div className="mt-3 flex justify-between items-center">
//                               <span className="text-sm text-gray-500">
//                                 Completed: March 2025
//                               </span>
//                               <Badge
//                                 variant="outline"
//                                 className="bg-green-50 text-green-700 border-green-200"
//                               >
//                                 Residential
//                               </Badge>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Project 2 */}
//                         <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//                           <div className="relative h-60">
//                             <img
//                               src="https://public.readdy.ai/ai/img_res/e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1.jpg"
//                               alt="Kitchen Lighting Installation"
//                               className="w-full h-full object-cover object-top"
//                             />
//                           </div>
//                           <div className="p-4">
//                             <h3 className="font-semibold text-lg">
//                               Kitchen Lighting Installation
//                             </h3>
//                             <p className="text-gray-600 text-sm mt-1">
//                               Installation of energy-efficient LED recessed
//                               lighting system in kitchen with custom dimming
//                               controls.
//                             </p>
//                             <div className="mt-3 flex justify-between items-center">
//                               <span className="text-sm text-gray-500">
//                                 Completed: February 2025
//                               </span>
//                               <Badge
//                                 variant="outline"
//                                 className="bg-green-50 text-green-700 border-green-200"
//                               >
//                                 Residential
//                               </Badge>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Project 3 */}
//                         <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//                           <div className="relative h-60">
//                             <img
//                               src="https://public.readdy.ai/ai/img_res/d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8.jpg"
//                               alt="Smart Home Installation"
//                               className="w-full h-full object-cover object-top"
//                             />
//                           </div>
//                           <div className="p-4">
//                             <h3 className="font-semibold text-lg">
//                               Smart Home Installation
//                             </h3>
//                             <p className="text-gray-600 text-sm mt-1">
//                               Complete smart home system installation including
//                               lighting, thermostats, security, and voice control
//                               integration.
//                             </p>
//                             <div className="mt-3 flex justify-between items-center">
//                               <span className="text-sm text-gray-500">
//                                 Completed: January 2025
//                               </span>
//                               <Badge
//                                 variant="outline"
//                                 className="bg-green-50 text-green-700 border-green-200"
//                               >
//                                 Residential
//                               </Badge>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Project 4 */}
//                         <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//                           <div className="relative h-60">
//                             <img
//                               src="https://public.readdy.ai/ai/img_res/c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6.jpg"
//                               alt="Commercial Wiring"
//                               className="w-full h-full object-cover object-top"
//                             />
//                           </div>
//                           <div className="p-4">
//                             <h3 className="font-semibold text-lg">
//                               Commercial Office Wiring
//                             </h3>
//                             <p className="text-gray-600 text-sm mt-1">
//                               Complete electrical wiring for a new 5,000 sq ft
//                               office space, including power, lighting, and data
//                               infrastructure.
//                             </p>
//                             <div className="mt-3 flex justify-between items-center">
//                               <span className="text-sm text-gray-500">
//                                 Completed: December 2024
//                               </span>
//                               <Badge
//                                 variant="outline"
//                                 className="bg-blue-50 text-blue-700 border-blue-200"
//                               >
//                                 Commercial
//                               </Badge>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-8">
//                         <h3 className="text-xl font-semibold mb-4">
//                           Additional Projects
//                         </h3>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                           {[1, 2, 3, 4].map((item) => (
//                             <div
//                               key={item}
//                               className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
//                             >
//                               <img
//                                 src={`https://readdy.ai/api/search-image?query=Professional electrical work detail, showing quality electrical installation or repair, close-up of neat wiring or electrical components, high quality photograph with good lighting showing craftsmanship&width=300&height=300&flag=79dfa3299e74b4d71175814e26d55114&seq=${13 + item}&orientation=squarish&flag=b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4`}
//                                 alt={`Electrical Project ${item}`}
//                                 className="w-full h-full object-cover object-top"
//                               />
//                               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                 <i className="fas fa-search-plus text-white text-2xl"></i>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Reviews Tab */}
//                 <TabsContent value="reviews" className="mt-6">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                         <h2 className="text-2xl font-bold">Customer Reviews</h2>
//                         <div className="flex items-center mt-3 md:mt-0">
//                           <div className="mr-2">
//                             <Button
//                               variant="outline"
//                               className="text-sm h-9 cursor-pointer !rounded-button whitespace-nowrap"
//                             >
//                               <i className="fas fa-filter mr-2"></i> Filter
//                             </Button>
//                           </div>
//                           <div>
//                             <Button
//                               variant="outline"
//                               className="text-sm h-9 cursor-pointer !rounded-button whitespace-nowrap"
//                             >
//                               <i className="fas fa-sort mr-2"></i> Sort
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col md:flex-row gap-8 mb-8">
//                         <div className="md:w-1/3 bg-blue-50 p-6 rounded-lg">
//                           <div className="text-center mb-4">
//                             <div className="text-5xl font-bold text-blue-800">
//                               4.9
//                             </div>
//                             <div className="text-yellow-400 flex justify-center my-2">
//                               <i className="fas fa-star"></i>
//                               <i className="fas fa-star"></i>
//                               <i className="fas fa-star"></i>
//                               <i className="fas fa-star"></i>
//                               <i className="fas fa-star-half-alt"></i>
//                             </div>
//                             <div className="text-gray-600">
//                               Based on 124 reviews
//                             </div>
//                           </div>

//                           <div className="space-y-2">
//                             <div>
//                               <div className="flex items-center">
//                                 <span className="w-16 text-sm">5 stars</span>
//                                 <div className="flex-1 mx-2">
//                                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div className="h-full bg-yellow-400 w-[85%]"></div>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm">85%</span>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex items-center">
//                                 <span className="w-16 text-sm">4 stars</span>
//                                 <div className="flex-1 mx-2">
//                                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div className="h-full bg-yellow-400 w-[12%]"></div>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm">12%</span>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex items-center">
//                                 <span className="w-16 text-sm">3 stars</span>
//                                 <div className="flex-1 mx-2">
//                                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div className="h-full bg-yellow-400 w-[2%]"></div>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm">2%</span>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex items-center">
//                                 <span className="w-16 text-sm">2 stars</span>
//                                 <div className="flex-1 mx-2">
//                                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div className="h-full bg-yellow-400 w-[1%]"></div>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm">1%</span>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex items-center">
//                                 <span className="w-16 text-sm">1 star</span>
//                                 <div className="flex-1 mx-2">
//                                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div className="h-full bg-yellow-400 w-0"></div>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm">0%</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="mt-6 pt-6 border-t border-blue-200">
//                             <h3 className="font-semibold mb-3">
//                               Rating Breakdown
//                             </h3>
//                             <div className="space-y-3">
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm">Punctuality</span>
//                                 <div className="flex items-center">
//                                   <div className="text-yellow-400 flex mr-1">
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                   </div>
//                                   <span className="text-sm">5.0</span>
//                                 </div>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm">Quality</span>
//                                 <div className="flex items-center">
//                                   <div className="text-yellow-400 flex mr-1">
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star-half-alt text-sm"></i>
//                                   </div>
//                                   <span className="text-sm">4.9</span>
//                                 </div>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm">Value</span>
//                                 <div className="flex items-center">
//                                   <div className="text-yellow-400 flex mr-1">
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star-half-alt text-sm"></i>
//                                   </div>
//                                   <span className="text-sm">4.8</span>
//                                 </div>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm">Professionalism</span>
//                                 <div className="flex items-center">
//                                   <div className="text-yellow-400 flex mr-1">
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                     <i className="fas fa-star text-sm"></i>
//                                   </div>
//                                   <span className="text-sm">5.0</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="md:w-2/3">
//                           <ScrollArea className="h-[600px] pr-4">
//                             <div className="space-y-6">
//                               {/* Review 1 */}
//                               <div className="bg-white p-5 rounded-lg border border-gray-200">
//                                 <div className="flex justify-between mb-3">
//                                   <div className="flex items-center">
//                                     <img
//                                       src="https://public.readdy.ai/ai/img_res/9df76f56807818f46e57a5c1f7e5df23.jpg"
//                                       alt="Sarah Johnson"
//                                       className="w-10 h-10 rounded-full mr-3 object-cover object-top"
//                                     />
//                                     <div>
//                                       <h4 className="font-semibold">
//                                         Sarah Johnson
//                                       </h4>
//                                       <p className="text-sm text-gray-600">
//                                         April 5, 2025
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="text-yellow-400 flex">
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                   </div>
//                                 </div>
//                                 <div className="mb-3">
//                                   <Badge className="bg-blue-100 text-blue-800 mb-3">
//                                     Electrical Repair
//                                   </Badge>
//                                   <h4 className="font-semibold">
//                                     Excellent service, fixed my issue quickly!
//                                   </h4>
//                                   <p className="text-gray-700 mt-2">
//                                     John arrived on time and quickly diagnosed
//                                     the issue with my outlets. He explained
//                                     everything clearly and fixed the problem in
//                                     less than an hour. Very professional and
//                                     knowledgeable. I&apos;ll definitely use his
//                                     services again!
//                                   </p>
//                                 </div>
//                                 <div className="flex gap-2 mt-4">
//                                   <img
//                                     src="https://public.readdy.ai/ai/img_res/a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3.jpg"
//                                     alt="Review photo"
//                                     className="w-16 h-16 rounded-md object-cover cursor-pointer"
//                                   />
//                                 </div>
//                                 <div className="mt-4 text-sm text-blue-800 cursor-pointer">
//                                   <i className="fas fa-check-circle mr-1"></i>{" "}
//                                   Verified Job
//                                 </div>
//                               </div>

//                               {/* Review 2 */}
//                               <div className="bg-white p-5 rounded-lg border border-gray-200">
//                                 <div className="flex justify-between mb-3">
//                                   <div className="flex items-center">
//                                     <img
//                                       src="https://public.readdy.ai/ai/img_res/6c5bf8ecdab2c2258becf1985eedfabf.jpg"
//                                       alt="Michael Chen"
//                                       className="w-10 h-10 rounded-full mr-3 object-cover object-top"
//                                     />
//                                     <div>
//                                       <h4 className="font-semibold">
//                                         Michael Chen
//                                       </h4>
//                                       <p className="text-sm text-gray-600">
//                                         March 28, 2025
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="text-yellow-400 flex">
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                   </div>
//                                 </div>
//                                 <div className="mb-3">
//                                   <Badge className="bg-blue-100 text-blue-800 mb-3">
//                                     Ceiling Fan Installation
//                                   </Badge>
//                                   <h4 className="font-semibold">
//                                     Professional and efficient installation
//                                   </h4>
//                                   <p className="text-gray-700 mt-2">
//                                     John installed two ceiling fans in our home
//                                     and did an excellent job. He was very
//                                     careful with our furniture and cleaned up
//                                     everything when finished. The fans work
//                                     perfectly and look great. Highly recommend
//                                     his services!
//                                   </p>
//                                 </div>
//                                 <div className="flex gap-2 mt-4">
//                                   <img
//                                     src="https://public.readdy.ai/ai/img_res/f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2.jpg"
//                                     alt="Review photo"
//                                     className="w-16 h-16 rounded-md object-cover cursor-pointer"
//                                   />
//                                   <img
//                                     src="https://public.readdy.ai/ai/img_res/e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1.jpg"
//                                     alt="Review photo"
//                                     className="w-16 h-16 rounded-md object-cover cursor-pointer"
//                                   />
//                                 </div>
//                                 <div className="mt-4 text-sm text-blue-800 cursor-pointer">
//                                   <i className="fas fa-check-circle mr-1"></i>{" "}
//                                   Verified Job
//                                 </div>
//                               </div>

//                               {/* Review 3 */}
//                               <div className="bg-white p-5 rounded-lg border border-gray-200">
//                                 <div className="flex justify-between mb-3">
//                                   <div className="flex items-center">
//                                     <img
//                                       src="https://public.readdy.ai/ai/img_res/119b9e38ab1bbfd3cf5e35e317e1d6eb.jpg"
//                                       alt="Aisha Patel"
//                                       className="w-10 h-10 rounded-full mr-3 object-cover object-top"
//                                     />
//                                     <div>
//                                       <h4 className="font-semibold">
//                                         Aisha Patel
//                                       </h4>
//                                       <p className="text-sm text-gray-600">
//                                         March 15, 2025
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="text-yellow-400 flex">
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star-half-alt"></i>
//                                   </div>
//                                 </div>
//                                 <div className="mb-3">
//                                   <Badge className="bg-blue-100 text-blue-800 mb-3">
//                                     Electrical Troubleshooting
//                                   </Badge>
//                                   <h4 className="font-semibold">
//                                     Solved a complex electrical issue
//                                   </h4>
//                                   <p className="text-gray-700 mt-2">
//                                     We had intermittent power issues in our
//                                     kitchen that two other electricians couldn&apos;t
//                                     figure out. John took the time to thoroughly
//                                     investigate and found the hidden problem. He
//                                     explained everything clearly and fixed it
//                                     permanently. Great value for the quality of
//                                     work.
//                                   </p>
//                                 </div>
//                                 <div className="mt-4 text-sm text-blue-800 cursor-pointer">
//                                   <i className="fas fa-check-circle mr-1"></i>{" "}
//                                   Verified Job
//                                 </div>
//                               </div>

//                               {/* Review 4 */}
//                               <div className="bg-white p-5 rounded-lg border border-gray-200">
//                                 <div className="flex justify-between mb-3">
//                                   <div className="flex items-center">
//                                     <div className="w-10 h-10 rounded-full mr-3 bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
//                                       RD
//                                     </div>
//                                     <div>
//                                       <h4 className="font-semibold">
//                                         Robert Davis
//                                       </h4>
//                                       <p className="text-sm text-gray-600">
//                                         March 2, 2025
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="text-yellow-400 flex">
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                     <i className="fas fa-star"></i>
//                                   </div>
//                                 </div>
//                                 <div className="mb-3">
//                                   <Badge className="bg-blue-100 text-blue-800 mb-3">
//                                     Smart Home Installation
//                                   </Badge>
//                                   <h4 className="font-semibold">
//                                     Excellent smart home setup
//                                   </h4>
//                                   <p className="text-gray-700 mt-2">
//                                     John set up our entire smart home system
//                                     including lighting, thermostat, and
//                                     security. He was knowledgeable about all the
//                                     different brands and helped us choose the
//                                     best options for our needs. Everything works
//                                     perfectly together. Highly recommend for any
//                                     smart home projects!
//                                   </p>
//                                 </div>
//                                 <div className="flex gap-2 mt-4">
//                                   <img
//                                     src="https://public.readdy.ai/ai/img_res/d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0.jpg"
//                                     alt="Review photo"
//                                     className="w-16 h-16 rounded-md object-cover cursor-pointer"
//                                   />
//                                 </div>
//                                 <div className="mt-4 text-sm text-blue-800 cursor-pointer">
//                                   <i className="fas fa-check-circle mr-1"></i>{" "}
//                                   Verified Job
//                                 </div>
//                               </div>
//                             </div>
//                           </ScrollArea>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>

//             {/* Right Column - Booking & Contact */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24">
//                 <Card className="mb-6">
//                   <CardContent className="pt-6">
//                     <h2 className="text-xl font-bold mb-4">
//                       Book an Appointment
//                     </h2>

//                     <div className="mb-4">
//                       <label className="block text-sm font-medium mb-1">
//                         Select a Service
//                       </label>
//                       <div className="relative">
//                         <select
//                           value={selectedService}
//                           onChange={(e) => setSelectedService(e.target.value)}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
//                         >
//                           {services.map((service, index) => (
//                             <option key={index} value={service}>
//                               {service}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                           <i className="fas fa-chevron-down text-gray-400"></i>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-medium mb-1">
//                         Select a Date
//                       </label>
//                       <div className="border border-gray-200 rounded-md p-3">
//                         <Calendar
//                           mode="single"
//                           selected={selectedDate}
//                           onSelect={setSelectedDate}
//                           className="rounded-md"
//                           disabled={(date) =>
//                             date < new Date() || date.getDay() === 0
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <label className="block text-sm font-medium mb-1">
//                         Available Time Slots
//                       </label>
//                       <div className="grid grid-cols-3 gap-2">
//                         {[
//                           "9:00 AM",
//                           "10:30 AM",
//                           "1:00 PM",
//                           "2:30 PM",
//                           "4:00 PM",
//                           "5:30 PM",
//                         ].map((time, index) => (
//                           <div
//                             key={index}
//                             className="text-center p-2 border border-gray-200 rounded-md hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
//                           >
//                             {time}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
//                       Book Now
//                     </Button>

//                     <div className="mt-4 text-center">
//                       <span className="text-sm text-gray-500">or</span>
//                       <button className="block w-full mt-2 text-blue-800 hover:text-blue-600 font-medium cursor-pointer">
//                         Request a Quote
//                       </button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="mb-6">
//                   <CardContent className="pt-6">
//                     <h2 className="text-xl font-bold mb-4">Contact John</h2>

//                     <div className="space-y-4 mb-4">
//                       <div className="flex items-start">
//                         <i className="fas fa-phone text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Phone</p>
//                           <p className="text-gray-600">(555) 123-4567</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <i className="fas fa-envelope text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Email</p>
//                           <p className="text-gray-600">john.doe@example.com</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <i className="fas fa-map-marker-alt text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Service Area</p>
//                           <p className="text-gray-600">
//                             Metropolitan Area & Suburbs
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator className="my-4" />

//                     <div className="mb-4">
//                       <label className="block text-sm font-medium mb-1">
//                         Send a Message
//                       </label>
//                       <textarea
//                         value={messageText}
//                         onChange={(e) => setMessageText(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
//                         placeholder="Type your message here..."
//                       ></textarea>
//                     </div>

//                     <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
//                       Send Message
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardContent className="pt-6">
//                     <h2 className="text-xl font-bold mb-4">
//                       Business Information
//                     </h2>

//                     <div className="space-y-3">
//                       <div className="flex items-start">
//                         <i className="fas fa-building text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Business Name</p>
//                           <p className="text-gray-600">
//                             Doe Electrical Services
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <i className="fas fa-id-card text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">License Number</p>
//                           <p className="text-gray-600">EL12345</p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <i className="fas fa-shield-alt text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Insurance</p>
//                           <p className="text-gray-600">
//                             Fully insured & bonded
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-start">
//                         <i className="fas fa-credit-card text-blue-800 mt-1 w-6"></i>
//                         <div>
//                           <p className="font-medium">Payment Methods</p>
//                           <div className="flex space-x-2 mt-1">
//                             <i className="fab fa-cc-visa text-gray-600"></i>
//                             <i className="fab fa-cc-mastercard text-gray-600"></i>
//                             <i className="fab fa-cc-amex text-gray-600"></i>
//                             <i className="fab fa-cc-discover text-gray-600"></i>
//                             <i className="fab fa-cc-paypal text-gray-600"></i>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator className="my-4" />

//                     <div>
//                       <h3 className="font-medium mb-2">Service Guarantee</h3>
//                       <p className="text-sm text-gray-600 mb-4">
//                         All work comes with a 1-year warranty on parts and
//                         labor. Your satisfaction is guaranteed.
//                       </p>

//                       <h3 className="font-medium mb-2">Cancellation Policy</h3>
//                       <p className="text-sm text-gray-600">
//                         Free cancellation up to 24 hours before appointment.
//                         Late cancellations may incur a fee.
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">CraftsmenConnect</h3>
//               <p className="text-gray-400 mb-4">
//                 Find the best craftsmen for all your home service needs.
//               </p>
//               <div className="flex space-x-4">
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                 >
//                   <i className="fab fa-linkedin-in"></i>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Services</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Electricity
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Plumbing
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Carpentry
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Painting
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Cleaning
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Company</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     How it Works
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Press
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors cursor-pointer"
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Contact</h4>
//               <ul className="space-y-2">
//                 <li className="flex items-center text-gray-400">
//                   <i className="fas fa-map-marker-alt mr-2"></i>
//                   <span>123 Main Street, City, Country</span>
//                 </li>
//                 <li className="flex items-center text-gray-400">
//                   <i className="fas fa-phone mr-2"></i>
//                   <span>+1 234 567 890</span>
//                 </li>
//                 <li className="flex items-center text-gray-400">
//                   <i className="fas fa-envelope mr-2"></i>
//                   <span>info@craftsmenconnect.com</span>
//                 </li>
//               </ul>
//               <div className="mt-4">
//                 <h4 className="font-bold mb-2">Payment Methods</h4>
//                 <div className="flex space-x-3">
//                   <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
//                   <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
//                   <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
//                   <i className="fab fa-cc-amex text-2xl text-gray-400"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 CraftsmenConnect. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;
