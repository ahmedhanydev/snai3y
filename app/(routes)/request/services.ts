
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Service {
  id: number;
  name: string;
  description: string;
}

export interface Governorate {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  governorateName: string;
}

export interface Address {
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  governorate: string;
}

export interface UserTech {
  id: number;
  userName: string;
  email: string;
  bsd: string;
  address: Address;
  fullName: string;
  imageBase64: string;
  phoneNumber: string;
  serviceId: number;
  createdDateTime: string;
  serviceName: string;
  serviceDescription: string;
  averageRate: number;
}

export interface CreateRequestPayload {
  userCustomerId: number;
  userTechId: number;
  description: string;
  location: string;
  dateTime: string;
  status: number;
  serviceId: number;
  attachmentBase64: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors: string[];
  data: T | null;
}

// Helper function to make proxy requests
async function proxyRequest(method: string, url: string, data?: any) {
  const token = localStorage.getItem("token");
  
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method,
      url,
      data,
      token // Pass the token to the proxy
    })
  });
  
  return response.json();
}

export const requestService = {
  // Get all services
  getAllServices: async (): Promise<ApiResponse<Service[]>> => {
    try {
      console.log("Fetching services...");
      const response = await proxyRequest('GET', '/Lookups/GetAllServices');
      
      console.log("Services API response:", {
        data: response,
        success: response.success,
        message: response.message,
        errors: response.errors,
        servicesData: response.data
      });

      return response;
    } catch (error) {
      console.error("Error fetching services:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "حدث خطأ أثناء تحميل الخدمات",
        errors: [],
        data: []
      };
    }
  },

  // Get all governorates
  getAllGovernorates: async (): Promise<Governorate[]> => {
    try {
      const response = await proxyRequest('GET', '/Lookups/GetAllGovernorates');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching governorates:", error);
      return [];
    }
  },

  // Get all cities
  getAllCities: async (): Promise<City[]> => {
    try {
      const response = await proxyRequest('GET', '/Lookups/GetAllCities');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  },

  // Get technicians by city and service
  getTechniciansByCityAndService: async (
    cityId: number,
    serviceId: number,
  ): Promise<UserTech[]> => {
    try {
      console.log("Fetching technicians for city:", cityId, "and service:", serviceId);
      const response = await proxyRequest(
        'GET',
        `/UserTech/GetUserTechByCItyAndSerivce/${cityId}/${serviceId}`
      );
      console.log("Technicians response:", response);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching technicians:", error);
      return [];
    }
  },

  // Create new request
  createRequest: async (
    payload: CreateRequestPayload,      
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await proxyRequest('POST', '/RequestService/Create', payload);
      return response;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  async getUserData(userId: number) {
    try {
      const response = await proxyRequest('GET', `/UserCustomer/GetById/${userId}`);

      if (!response.success) {
        throw new Error(`Failed to fetch user data: ${response.message}`);
      }

      return response.data; // Return the full user data
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
};