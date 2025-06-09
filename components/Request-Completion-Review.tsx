// // The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// "use client";
// import React, { useState } from "react";

// import { Avatar } from "@/components/ui/avatar";
// import { AvatarImage } from "@/components/ui/avatar";
// import { AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";

// const Test: React.FC = () => {
//   const [rating, setRating] = useState<number>(0);
//   const [professionalismRating, setProfessionalismRating] = useState<number>(0);
//   const [punctualityRating, setPunctualityRating] = useState<number>(0);
//   const [valueRating, setValueRating] = useState<number>(0);
//   const [qualityRating, setQualityRating] = useState<number>(0);
//   const [reviewText, setReviewText] = useState<string>("");
//   const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newPhotos = Array.from(e.target.files).map((file) =>
//         URL.createObjectURL(file),
//       );
//       setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
//     }
//   };

//   const removePhoto = (index: number) => {
//     const newPhotos = [...uploadedPhotos];
//     newPhotos.splice(index, 1);
//     setUploadedPhotos(newPhotos);
//   };

//   const handleSubmit = () => {
//     // Handle review submission
//     console.log({
//       rating,
//       professionalismRating,
//       punctualityRating,
//       valueRating,
//       qualityRating,
//       reviewText,
//       uploadedPhotos,
//     });
//     // Redirect or show success message
//   };

//   const renderStars = (
//     currentRating: number,
//     setRatingFunction: (rating: number) => void,
//   ) => {
//     return (
//       <div className="flex space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => setRatingFunction(star)}
//             className="cursor-pointer focus:outline-none"
//             aria-label={`Rate ${star} stars`}
//           >
//             <i
//               className={`${
//                 star <= currentRating
//                   ? "fas fa-star text-yellow-400"
//                   : "far fa-star text-gray-300"
//               } text-xl`}
//             ></i>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const isFormComplete = () => {
//     return rating > 0 && reviewText.trim().length > 0;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center">
//       <div className="w-full max-w-6xl p-4 md:p-6 flex flex-col md:flex-row gap-6">
//         {/* Left Panel - Review Form */}
//         <div className="w-full md:w-3/5 bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center mb-6">
//             <Button
//               variant="ghost"
//               className="p-0 mr-2 cursor-pointer !rounded-button whitespace-nowrap"
//               aria-label="Go back"
//             >
//               <i className="fas fa-arrow-left text-blue-600 mr-2"></i>
//               <span className="text-blue-600">Back</span>
//             </Button>
//             <h1 className="text-2xl font-bold ml-2">Service Review</h1>
//           </div>

//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
//                 4
//               </div>
//               <div className="text-sm text-gray-600">Review Service</div>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 rounded-full bg-blue-600 mx-1"></div>
//               <div className="w-3 h-3 rounded-full bg-blue-600 mx-1"></div>
//               <div className="w-3 h-3 rounded-full bg-blue-600 mx-1"></div>
//               <div className="w-3 h-3 rounded-full bg-blue-600 mx-1"></div>
//             </div>
//           </div>

//           <Card className="p-4 mb-6">
//             <div className="flex items-center space-x-4 mb-4">
//               <Avatar className="h-16 w-16">
//                 <AvatarImage
//                   src="https://public.readdy.ai/ai/img_res/69dbfe91f7a344d1bd94500c1cb5ded1.jpg"
//                   alt="Ahmed Hassan"
//                 />
//                 <AvatarFallback>AH</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h2 className="text-xl font-semibold">Ahmed Hassan</h2>
//                 <p className="text-gray-600">Plumbing</p>
//                 <p className="text-gray-600 text-sm">
//                   Service completed on April 10, 2025
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Overall Rating</h3>
//             <div className="flex items-center space-x-2 mb-2">
//               {renderStars(rating, setRating)}
//               <span className="text-sm text-gray-500 ml-2">
//                 {rating > 0 ? `${rating}/5` : "Select rating"}
//               </span>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Write Your Review</h3>
//             <Textarea
//               placeholder="Share your experience with this service..."
//               className="min-h-32 mb-2"
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//             />
//             <p className="text-right text-sm text-gray-500">
//               {reviewText.length}/500 characters
//             </p>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">
//               Rate Specific Aspects
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium">Professionalism</span>
//                   <span className="text-sm text-gray-500">
//                     {professionalismRating > 0
//                       ? `${professionalismRating}/5`
//                       : "Not rated"}
//                   </span>
//                 </div>
//                 {renderStars(professionalismRating, setProfessionalismRating)}
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium">Punctuality</span>
//                   <span className="text-sm text-gray-500">
//                     {punctualityRating > 0
//                       ? `${punctualityRating}/5`
//                       : "Not rated"}
//                   </span>
//                 </div>
//                 {renderStars(punctualityRating, setPunctualityRating)}
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium">Value for Money</span>
//                   <span className="text-sm text-gray-500">
//                     {valueRating > 0 ? `${valueRating}/5` : "Not rated"}
//                   </span>
//                 </div>
//                 {renderStars(valueRating, setValueRating)}
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium">Work Quality</span>
//                   <span className="text-sm text-gray-500">
//                     {qualityRating > 0 ? `${qualityRating}/5` : "Not rated"}
//                   </span>
//                 </div>
//                 {renderStars(qualityRating, setQualityRating)}
//               </div>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-3">
//               Add Photos (Optional)
//             </h3>
//             <p className="text-sm text-gray-600 mb-3">
//               Share photos of the completed work to help others
//             </p>
//             <div className="flex flex-wrap gap-3 mb-4">
//               {uploadedPhotos.map((photo, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 rounded-lg overflow-hidden"
//                 >
//                   <img
//                     src={photo}
//                     alt={`Uploaded photo ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap"
//                     aria-label="Remove photo"
//                   >
//                     <i className="fas fa-times text-xs"></i>
//                   </button>
//                 </div>
//               ))}
//               <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
//                 <i className="fas fa-camera text-gray-400 text-xl mb-1"></i>
//                 <span className="text-xs text-gray-500">Add Photo</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                   onChange={handlePhotoUpload}
//                 />
//               </label>
//             </div>
//             <p className="text-xs text-gray-500">
//               You can upload up to 5 photos (max 5MB each)
//             </p>
//           </div>

//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={!isFormComplete()}
//               className={`px-6 py-2 ${
//                 isFormComplete()
//                   ? "bg-blue-600 hover:bg-blue-700"
//                   : "bg-gray-300 cursor-not-allowed"
//               } text-white font-medium rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
//             >
//               Submit Review
//             </Button>
//           </div>
//         </div>

//         {/* Right Panel - Service Summary */}
//         <div className="w-full md:w-2/5">
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Service Summary</h2>
//               <Avatar className="h-8 w-8">
//                 <AvatarImage
//                   src="https://public.readdy.ai/ai/img_res/57a2a74f86a05731d8a2f32b78d60b4d.jpg"
//                   alt="User"
//                 />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="border-b pb-4 mb-4">
//               <h3 className="font-medium mb-1">Plumbing Service</h3>
//               <p className="text-sm text-gray-600">
//                 Completed on April 10, 2025, 12:00 PM
//               </p>
//             </div>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Service Type</span>
//                 <span className="font-medium">Plumbing</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Technician</span>
//                 <span className="font-medium">Ahmed Hassan</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Duration</span>
//                 <span className="font-medium">2 hours</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Location</span>
//                 <span className="font-medium">123 Main St, Apt 4B</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Total Cost</span>
//                 <span className="font-medium">$120.00</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Why Your Review Matters</h2>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                   <i className="fas fa-star text-blue-600 text-sm"></i>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Help Others Choose</h3>
//                   <p className="text-sm text-gray-600">
//                     Your honest feedback helps other customers make informed
//                     decisions.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                   <i className="fas fa-thumbs-up text-blue-600 text-sm"></i>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Recognize Good Service</h3>
//                   <p className="text-sm text-gray-600">
//                     Acknowledge technicians who provided exceptional service.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                   <i className="fas fa-comment text-blue-600 text-sm"></i>
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Improve Our Services</h3>
//                   <p className="text-sm text-gray-600">
//                     Your feedback helps us continuously improve our service
//                     quality.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;
