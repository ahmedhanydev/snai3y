import axios from "axios";
import type { UserCustomer, UserTechnician } from "@/validations/userSchema";

export const registerCustomer = async (payload: UserCustomer) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserCustomer/create`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.data;
};

export const registerTechnician = async (payload: UserTechnician) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserTech/create`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.data;
};

export const getCities = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${baseURL}/Lookups/GetAllCities`);
  return res.data;
};


// Add this function to fetch services
export const getServices = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${baseURL}/Lookups/GetAllServices`);
  return res.data;
};