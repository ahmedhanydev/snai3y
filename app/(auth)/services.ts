import axios from "axios";

import type { UserCustomer, UserTechnician } from "@/validations/userSchema";

export const registerCustomer = async (payload: UserCustomer) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserCustomer/create`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const registerTechnician = async (payload: UserTechnician) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserTech/create`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
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

export interface LoginCredentials {
  username: string;
  password: string;
}

export const loginCustomer = async (credentials: LoginCredentials) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserCustomer/Login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const loginTechnician = async (credentials: LoginCredentials) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseURL}/UserTech/Login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// Add these functions to fetch user profiles

export const getCustomerById = async (id: string) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token");
  const res = await axios.get(`${baseURL}/UserCustomer/GetById/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTechnicianById = async (id: string) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token");
  const res = await axios.get(`${baseURL}/UserTech/GetById/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
