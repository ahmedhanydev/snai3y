// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [activeStep, setActiveStep] = useState<number>(1);

  const popularServices = [
    { name: "Electricity", icon: "fa-bolt" },
    { name: "Plumbing", icon: "fa-faucet" },
    { name: "Carpentry", icon: "fa-hammer" },
    { name: "Painting", icon: "fa-paint-roller" },
    { name: "Gardening", icon: "fa-leaf" },
    { name: "Cleaning", icon: "fa-broom" }
  ];

  const technicians = [
    {
      id: 1,
      name: "John Doe",
      service: "Electricity",
      rating: 4.8,
      location: "Downtown",
      image: "https://public.readdy.ai/ai/img_res/9bba0cfc07912a60aac84a09f983b1ea.jpg"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      service: "Plumbing",
      rating: 4.7,
      location: "Westside",
      image: "https://public.readdy.ai/ai/img_res/94d4349c645fb6bf9fbc9b579cf39fbb.jpg"
    },
    {
      id: 3,
      name: "Fatima Ali",
      service: "Carpentry",
      rating: 4.9,
      location: "Northside",
      image: "https://public.readdy.ai/ai/img_res/5eee522ed28c8dbb39b1fc3b3e8b1f30.jpg"
    },
    {
      id: 4,
      name: "Mark Ibrahim",
      service: "Painting",
      rating: 4.6,
      location: "Eastside",
      image: "https://public.readdy.ai/ai/img_res/a62ea49f5184c94c3b60de10bb918d0b.jpg"
    }
  ];

  const requestSteps = [
    { id: 1, name: "Select Service" },
    { id: 2, name: "Location Details" },
    { id: 3, name: "Describe Problem" },
    { id: 4, name: "Choose Technician" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-blue-600 text-white">
          <div className="container mx-auto px-6 py-16 flex items-center">
            <div className="w-full md:w-1/2 z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Best Craftsmen Near You</h1>
              <p className="text-lg mb-8">Electricians, Plumbers, Carpenters, and more — all in one place.</p>
              <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer">
                Request a Service
              </Button>
            </div>
            <div className="hidden md:block w-1/2 absolute right-0 top-0 h-full overflow-hidden">
              <img 
                src="https://public.readdy.ai/ai/img_res/a04cd3921bbd3f4d7c9f2993c5d22efa.jpg" 
                alt="Craftsmen team" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {popularServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className={`fas ${service.icon} text-blue-600 text-2xl`}></i>
              </div>
              <span className="text-center font-medium">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Section */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {/* Registration Form */}
     
        
        {/* Login Form */}
      
      </div>

      {/* Service Request Flow */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {/* Step-by-Step Request Process */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="text-blue-600 cursor-pointer">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </Button>
            <h2 className="text-2xl font-bold ml-2">Request Service</h2>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {requestSteps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step.id}
                  </div>
                  <span className="text-xs text-center">{step.name}</span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-200 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-600"
                style={{ width: `${(activeStep - 1) / (requestSteps.length - 1) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {activeStep === 1 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Select Service</h3>
              <div className="grid grid-cols-2 gap-4">
                {popularServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer hover:border-blue-500"
                    onClick={() => setActiveStep(2)}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className={`fas ${service.icon} text-blue-600`}></i>
                    </div>
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Location Details</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium mb-2">Address Line 1</label>
                  <Input id="addressLine1" type="text" placeholder="Enter street address" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium mb-2">Address Line 2 (Optional)</label>
                  <Input id="addressLine2" type="text" placeholder="Apartment, suite, etc." className="w-full" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                    <Input id="city" type="text" placeholder="City" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP Code</label>
                    <Input id="zipCode" type="text" placeholder="ZIP Code" className="w-full" />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => setActiveStep(3)}
                  >
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {activeStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Describe Problem</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="problemTitle" className="block text-sm font-medium mb-2">Problem Title</label>
                  <Input id="problemTitle" type="text" placeholder="E.g., Leaking faucet, Electrical outage" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="problemDescription" className="block text-sm font-medium mb-2">Problem Description</label>
                  <textarea 
                    id="problemDescription" 
                    rows={4}
                    placeholder="Please describe your problem in detail..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium mb-2">Urgency Level</label>
                  <select 
                    id="urgency"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low - Within a week</option>
                    <option value="medium">Medium - Within 2-3 days</option>
                    <option value="high">High - Within 24 hours</option>
                    <option value="emergency">Emergency - As soon as possible</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="attachPhotos" className="block text-sm font-medium mb-2">Attach Photos (Optional)</label>
                  <Input id="attachPhotos" type="file" multiple className="w-full" />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => setActiveStep(4)}
                  >
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {activeStep === 4 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Choose Technician</h3>
              <div className="space-y-4">
                {technicians.slice(0, 3).map((tech) => (
                  <div key={tech.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                    <div className="flex items-center">
                      <img 
                        src={tech.image} 
                        alt={tech.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{tech.name}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">{tech.service}</span>
                          <div className="flex items-center text-yellow-400">
                            <i className="fas fa-star mr-1"></i>
                            <span>{tech.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="text-blue-600 border-blue-600 !rounded-button whitespace-nowrap cursor-pointer">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                    Complete Request
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Dashboard View */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Hello, Jon!</h2>
              <p className="text-gray-600">Welcome to your dashboard</p>
            </div>
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <i className="fas fa-user-circle text-xl"></i>
            </Button>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">My Service Requests</h3>
            <div className="space-y-4">
              {technicians.map((tech) => (
                <Card key={tech.id} className="p-4">
                  <div className="flex items-center">
                    <img 
                      src={tech.image} 
                      alt={tech.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{tech.name}</h4>
                      <div className="flex items-center text-sm">
                        <span className="mr-2">{tech.service}</span>
                        <div className="flex items-center text-yellow-400">
                          <i className="fas fa-star mr-1"></i>
                          <i className="fas fa-star mr-1"></i>
                          <i className="fas fa-star mr-1"></i>
                          <i className="fas fa-star mr-1"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                      </div>
                    </div>
                    <Button variant="link" className="text-blue-600 !rounded-button whitespace-nowrap cursor-pointer">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-alt text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Plumbing Service</h4>
                  <p className="text-sm text-gray-600">Tomorrow, 10:00 AM - 12:00 PM</p>
                  <p className="text-sm text-gray-600">Technician: Ahmed Hassan</p>
                </div>
                <Button variant="outline" className="text-blue-600 border-blue-600 !rounded-button whitespace-nowrap cursor-pointer">
                  Reschedule
                </Button>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-check-circle text-green-600"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Electricity Repair</h4>
                  <p className="text-sm text-gray-600">Completed on April 7, 2025</p>
                  <p className="text-sm text-gray-600">Technician: John Doe</p>
                </div>
                <Button variant="outline" className="text-green-600 border-green-600 !rounded-button whitespace-nowrap cursor-pointer">
                  Leave Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

