/* eslint-disable @typescript-eslint/no-explicit-any */


export interface Service {
  id: number;
  name: string;
  description: string;
}

export interface Governorate {
  id: number;
  name: string;
  governorateName: null;
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
  attachmentBase64?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
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

// API functions
export const requestService = {
  getAllServices: async (): Promise<Service[]> => {
    try {
      const response = await proxyRequest('GET', '/Lookups/GetAllServices');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },

  getAllGovernorates: async (): Promise<Governorate[]> => {
    try {
      const response = await proxyRequest('GET', '/Lookups/GetAllGovernorates');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching governorates:", error);
      return [];
    }
  },

  getAllCities: async (): Promise<City[]> => {
    try {
      const response = await proxyRequest('GET', '/Lookups/GetAllCities');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  },

  getTechniciansByCityAndService: async (
    cityId: number,
    serviceId: number,
  ): Promise<UserTech[]> => {
    try {
      const response = await proxyRequest(
        'GET',
        `UserTech/GetUserTechByCItyAndSerivce/${cityId}/${serviceId}`
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching technicians:", error);
      return [];
    }
  },

  createRequest: async (
    payload: CreateRequestPayload,
  ): Promise<ApiResponse<unknown>> => {
    try {
      console.log("Creating request with payload:", payload);
      const response = await proxyRequest('POST', 'RequestService/Create', payload);
      console.log("Create request response:", response);
      return response;
    } catch (error) {
      console.error("API Error details:", error);
      throw new Error( "حدث خطأ أثناء إرسال الطلب");
    }
  },
};