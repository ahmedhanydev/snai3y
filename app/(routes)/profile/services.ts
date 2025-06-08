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

// Get orders for a technician with specific status
export const getTechnicianOrdersByStatus = async (techId: string, status: number, pageNumber = 1, pageSize = 10) => {
  const response = await axiosInstance.get(`/RequestService/GetByUserTechIdAndStatus/${techId}/${status}/${pageNumber}/${pageSize}`);
  return response.data;
};

// Get orders for a customer with specific status
export const getCustomerOrdersByStatus = async (customerId: string, status: number, pageNumber = 1, pageSize = 10) => {
  const response = await axiosInstance.get(`/RequestService/GetByUserCustomerIdAndStatus/${customerId}/${status}/${pageNumber}/${pageSize}`);
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId: number) => {
  const response = await axiosInstance.delete(`RequestService/${orderId}`);
  return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId: number) => {
  const response = await axiosInstance.put(`RequestService/UpdateStatusActive/${orderId}`);
  return response.data;
};



// Add this service function to your services.ts file
export const completeOrder = async (completeData: {
  id: number;
  totalPayment: number;
  rate: number;
  description: string;
}) => {
  const response = await axiosInstance.put(`/RequestService/UpdateStatusCompleted`, completeData);
  return response.data;
};

// Add this service function to your services.ts file
export const getReviewsForTechnician = async (userTechId: string) => {
  const response = await axiosInstance.get(`/ReviewTech/GetReviewsTechByUserTechId/${userTechId}`);
  return response.data;
};