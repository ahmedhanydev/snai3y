// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from 'react';
import { Button } from "@/components/ui/button";
const HomePage: React.FC = () => {
return (
<div className="min-h-screen bg-gray-50">
{/* Navigation Bar */}
<nav className="bg-white shadow-sm fixed w-full z-10">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex items-center">
<div className="flex-shrink-0 flex items-center">
<span className="text-blue-800 text-xl font-bold">CraftsmenConnect</span>
</div>
</div>
<div className="hidden md:flex items-center justify-center flex-1">
<div className="flex space-x-8">
<a href="#" className="text-blue-800 font-medium hover:text-blue-600 px-3 py-2 cursor-pointer">Home</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">Services</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">How it Works</a>
<a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 cursor-pointer">About Us</a>
</div>
</div>
<div className="hidden md:flex items-center">
<Button variant="outline" className="mr-3 cursor-pointer !rounded-button whitespace-nowrap">
Login
</Button>
<Button className="bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
Register
</Button>
</div>
<div className="flex items-center md:hidden">
<button className="text-gray-700 hover:text-blue-600 cursor-pointer">
<i className="fas fa-bars text-xl"></i>
</button>
</div>
</div>
</div>
</nav>
{/* Main Content with padding for fixed navbar */}
<div className="pt-16">
{/* Hero Section */}
<div className="relative">
<div className="bg-blue-800 text-white py-20 px-8">
<div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row">
<div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
<h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Best Craftsmen Near You</h1>
<p className="text-xl mb-8">Electricians, Plumbers, Carpenters, and more — all in one place. Get quality service from verified professionals.</p>
<Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg cursor-pointer !rounded-button whitespace-nowrap">
Request a Service
</Button>
</div>
<div className="w-full md:w-1/2 relative">
<img
src="https://public.readdy.ai/ai/img_res/a9590de1901237fbdb44de29d4e0ed73.jpg"
alt="Professional craftsmen"
className="w-full h-full object-cover object-top rounded-lg shadow-lg"
/>
</div>
</div>
</div>
</div>
{/* Popular Services */}
<div className="max-w-7xl mx-auto py-16 px-8">
<h2 className="text-3xl font-bold mb-10 text-center">Popular Services</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
{[
{ name: "Electricity", icon: "fa-bolt" },
{ name: "Plumbing", icon: "fa-faucet" },
{ name: "Carpentry", icon: "fa-hammer" },
{ name: "Painting", icon: "fa-paint-roller" },
{ name: "Cleaning", icon: "fa-broom" }
].map((service, index) => (
<div key={index} className="bg-white p-6 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow border border-gray-100">
<div className="text-blue-600 text-4xl mb-4">
<i className={`fas ${service.icon}`}></i>
</div>
<p className="font-medium">{service.name}</p>
</div>
))}
</div>
</div>
{/* How It Works Section */}
<div className="bg-gray-100 py-16">
<div className="max-w-7xl mx-auto px-8">
<h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white p-8 rounded-lg text-center shadow-sm">
<div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
<h3 className="text-xl font-bold mb-3">Request a Service</h3>
<p className="text-gray-600">Tell us what you need help with and provide your location details.</p>
</div>
<div className="bg-white p-8 rounded-lg text-center shadow-sm">
<div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
<h3 className="text-xl font-bold mb-3">Choose a Professional</h3>
<p className="text-gray-600">Browse profiles, reviews, and select the right craftsman for your job.</p>
</div>
<div className="bg-white p-8 rounded-lg text-center shadow-sm">
<div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
<h3 className="text-xl font-bold mb-3">Get the Job Done</h3>
<p className="text-gray-600">Your selected professional will arrive and complete the service.</p>
</div>
</div>
</div>
</div>
{/* Testimonials Section */}
<div className="max-w-7xl mx-auto py-16 px-8">
<h2 className="text-3xl font-bold mb-10 text-center">What Our Customers Say</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{[
{
name: "Sarah Johnson",
service: "Electrical Repair",
quote: "The electrician arrived on time and fixed my issue quickly. Very professional service!",
image: "https://public.readdy.ai/ai/img_res/9df76f56807818f46e57a5c1f7e5df23.jpg"
},
{
name: "Michael Chen",
service: "Plumbing",
quote: "Excellent service! The plumber was knowledgeable and fixed our leaking pipe in no time.",
image: "https://public.readdy.ai/ai/img_res/6c5bf8ecdab2c2258becf1985eedfabf.jpg"
},
{
name: "Aisha Patel",
service: "Carpentry",
quote: "The carpenter did an amazing job with our custom shelving. Highly recommend!",
image: "https://public.readdy.ai/ai/img_res/119b9e38ab1bbfd3cf5e35e317e1d6eb.jpg"
}
].map((testimonial, index) => (
<div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
<div className="flex items-center mb-4">
<img
src={testimonial.image}
alt={testimonial.name}
className="w-12 h-12 rounded-full mr-4 object-cover"
/>
<div>
<h3 className="font-bold">{testimonial.name}</h3>
<p className="text-sm text-gray-600">{testimonial.service}</p>
</div>
</div>
<p className="text-gray-700 italic">"{testimonial.quote}"</p>
<div className="text-yellow-500 mt-4">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
</div>
))}
</div>
</div>
{/* Featured Professionals */}
<div className="bg-gray-100 py-16">
<div className="max-w-7xl mx-auto px-8">
<h2 className="text-3xl font-bold mb-10 text-center">Featured Professionals</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{[
{
name: "John Doe",
service: "Electrician",
rating: 4.9,
jobs: 124,
image: "https://public.readdy.ai/ai/img_res/2cf9c55175a155d4fdb7f63ebc2c7ffe.jpg"
},
{
name: "Ahmed Hassan",
service: "Plumber",
rating: 4.8,
jobs: 98,
image: "https://public.readdy.ai/ai/img_res/a7ede43e0a7176ff6d2269fccbfe704a.jpg"
},
{
name: "Fatima Ali",
service: "Carpenter",
rating: 4.9,
jobs: 112,
image: "https://public.readdy.ai/ai/img_res/b3e7b88c521bc0c4aafc31302788fc30.jpg"
},
{
name: "Mark Ibrahim",
service: "Painter",
rating: 4.7,
jobs: 87,
image: "https://public.readdy.ai/ai/img_res/d10e53e3b927d3238509457eb717c988.jpg"
}
].map((professional, index) => (
<div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
<div className="h-48 overflow-hidden">
<img
src={professional.image}
alt={professional.name}
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<h3 className="font-bold text-lg">{professional.name}</h3>
<p className="text-blue-600">{professional.service}</p>
<div className="flex items-center mt-2">
<div className="text-yellow-500 flex">
<i className="fas fa-star"></i>
<span className="text-gray-700 ml-1 mr-2">{professional.rating}</span>
</div>
<div className="text-gray-600 text-sm">
<i className="fas fa-briefcase mr-1"></i>
{professional.jobs} jobs
</div>
</div>
<Button className="w-full mt-4 bg-blue-800 hover:bg-blue-700 text-white cursor-pointer !rounded-button whitespace-nowrap">
View Profile
</Button>
</div>
</div>
))}
</div>
</div>
</div>
{/* CTA Section */}
<div className="bg-blue-800 text-white py-16">
<div className="max-w-7xl mx-auto px-8 text-center">
<h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
<p className="text-xl mb-8 max-w-2xl mx-auto">Connect with skilled professionals in your area and get your home projects done right.</p>
<div className="flex flex-col sm:flex-row justify-center gap-4">
<Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg cursor-pointer !rounded-button whitespace-nowrap">
Find a Professional
</Button>
<Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800 px-6 py-3 text-lg cursor-pointer !rounded-button whitespace-nowrap">
Become a Professional
</Button>
</div>
</div>
</div>
</div>

</div>
);
};
export default HomePage
