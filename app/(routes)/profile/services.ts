import axiosInstance from "@/config/axios";

// Customer profile
export const getCustomerProfile = async (userId: string) => {
  const response = await axiosInstance.get(`/UserCustomer/GetById/${userId}`);
  return response.data;
};

// Technician profile
export const getTechnicianProfile = async (userId: string) => {
  const response = await axiosInstance.get(`/UserTech/GetById/${userId}`);
  return response.data;
};

// Update customer profile
export const updateCustomerProfile = async (userId: string, data: any) => {
  const response = await axiosInstance.put(`/UserCustomer/Update/${userId}`, data);
  return response.data;
};

// Update technician profile
export const updateTechnicianProfile = async (userId: string, data: any) => {
  const response = await axiosInstance.put(`/UserTech/Update/${userId}`, data);
  return response.data;
};

// Get customer orders
export const getCustomerOrders = async (userId: string) => {
  const response = await axiosInstance.get(`/Orders/GetByCustomerId/${userId}`);
  return response.data;
};

// Get technician orders
export const getTechnicianOrders = async (userId: string) => {
  const response = await axiosInstance.get(`/Orders/GetByTechnicianId/${userId}`);
  return response.data;
};

// Accept order
export const acceptOrder = async (orderId: number) => {
  const response = await axiosInstance.put(`/Orders/Accept/${orderId}`);
  return response.data;
};

// Reject order
export const rejectOrder = async (orderId: number) => {
  const response = await axiosInstance.put(`/Orders/Reject/${orderId}`);
  return response.data;
};



