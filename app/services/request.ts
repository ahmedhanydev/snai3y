
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

// API functions
export const requestService = {
  getAllServices: async (): Promise<Service[]> => {
    const response = await axiosInstance.get<ApiResponse<Service[]>>(   
      `Lookups/GetAllServices`,
    );  
    return response.data.data || [];
  },

  getAllGovernorates: async (): Promise<Governorate[]> => {
    const response = await axiosInstance.get<ApiResponse<Governorate[]>>(
      `Lookups/GetAllGovernorates`,
    );
    return response.data.data || [];
  },

  getAllCities: async (): Promise<City[]> => {
    const response = await axiosInstance.get<ApiResponse<City[]>>(
      `Lookups/GetAllCities`,
    );
    return response.data.data || [];
  },

  getTechniciansByCityAndService: async (
    cityId: number,
    serviceId: number,
  ): Promise<UserTech[]> => {
    const response = await axiosInstance.get<ApiResponse<UserTech[]>>(
      `UserTech/GetUserTechByCItyAndSerivce/${cityId}/${serviceId}`,
    );
    return response.data.data || [];
  },

  createRequest: async (
    payload: CreateRequestPayload,
  ): Promise<ApiResponse<unknown>> => {
    try {
      console.log("Creating request with payload:", payload);
        const response = await axiosInstance.post<ApiResponse<unknown>>(
        `RequestService/Create`,
        payload,
      );
      console.log("Create request response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw new Error(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      }
      throw error;
    }
  },
}; 