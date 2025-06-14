import axiosInstance from "@/config/axios";
import axios from "axios";

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

export const requestService = {
  // Get all services
  getAllServices: async (): Promise<ApiResponse<Service[]>> => {
    try {
      console.log("Fetching services...");
      const response = await axiosInstance.get<ApiResponse<Service[]>>(
        `/Lookups/GetAllServices`,
      );
      console.log("Services API response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        servicesData: response.data.data
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
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
      const response = await axiosInstance.get<ApiResponse<Governorate[]>>(
        `/Lookups/GetAllGovernorates`,
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching governorates:", error);
      return [];
    }
  },

  // Get all cities
  getAllCities: async (): Promise<City[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse<City[]>>(
        `/Lookups/GetAllCities`,
      );
      return response.data.data || [];
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
      const response = await axiosInstance.get<ApiResponse<UserTech[]>>(
        `/UserTech/GetUserTechByCItyAndSerivce/${cityId}/${serviceId}`,
      );
      console.log("Technicians response:", response.data);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching technicians:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
      return [];
    }
  },

  // Create new request
  createRequest: async (
    payload: CreateRequestPayload,      
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<unknown>>(
        `/RequestService/Create`,
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  async getUserData(userId: number) {
    try {
      const response = await axiosInstance.get<ApiResponse<UserTech>>(
        `/UserCustomer/GetById/${userId}`
      );

      if (!response.data.success) {
        throw new Error(`Failed to fetch user data: ${response.data.message}`);
      }

      return response.data.data; // Return the full user data
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
};