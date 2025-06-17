/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UserCustomer, UserTechnician } from "@/validations/userSchema";

// Helper function to make proxy requests
async function proxyRequest(method: string, url: string, data?: any) {
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method,
      url,
      data
    })
  });
  
  return response.json();
}

export const registerCustomer = async (payload: UserCustomer) => {
  return proxyRequest('POST', '/UserCustomer/create', payload);
};

export const registerTechnician = async (payload: UserTechnician) => {
  return proxyRequest('POST', '/UserTech/create', payload);
};

export const getCities = async () => {
  return proxyRequest('GET', '/Lookups/GetAllCities');
};

export const getServices = async () => {
  return proxyRequest('GET', '/Lookups/GetAllServices');
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const loginCustomer = async (credentials: LoginCredentials) => {
  return proxyRequest('POST', '/UserCustomer/Login', credentials);
};

export const loginTechnician = async (credentials: LoginCredentials) => {
  return proxyRequest('POST', '/UserTech/Login', credentials);
};

// For authenticated requests, we'll need to pass the token
export const getCustomerById = async (id: string) => {
  const token = localStorage.getItem("token");
  
  // Use axios for requests that need authorization headers
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'GET',
      url: `/UserCustomer/GetById/${id}`,
      token // Pass the token to the proxy
    })
  });
  
  return response.json();
};

export const getTechnicianById = async (id: string) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'GET',
      url: `/UserTech/GetById/${id}`,
      token
    })
  });
  
  return response.json();
};
