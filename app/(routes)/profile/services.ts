/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  requestService, 
  Service, 
  City, 
  Governorate 
} from "@/app/(routes)/request/services";

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

// Customer profile
export const getCustomerProfile = async (userId: string) => {
  return proxyRequest('GET', `/UserCustomer/GetById/${userId}`);
};

// Technician profile
export const getTechnicianProfile = async (userId: string) => {
  return proxyRequest('GET', `/UserTech/GetById/${userId}`);
};

// Update customer profile
export const updateCustomerProfile = async (userId: string, data: any) => {
  return proxyRequest('PUT', `/UserCustomer/Update`, data);
};

// Update technician profile
export const updateTechnicianProfile = async (userId: string, data: any) => {
  return proxyRequest('PUT', `/UserTech/Update`, data);
};

// Get customer orders
export const getCustomerOrders = async (userId: string) => {
  return proxyRequest('GET', `/Orders/GetByCustomerId/${userId}`);
};

// Get technician orders
export const getTechnicianOrders = async (userId: string) => {
  return proxyRequest('GET', `/Orders/GetByTechnicianId/${userId}`);
};

// Accept order
export const acceptOrder = async (orderId: number) => {
  return proxyRequest('PUT', `/Orders/Accept/${orderId}`);
};

// Reject order
export const rejectOrder = async (orderId: number) => {
  return proxyRequest('PUT', `/Orders/Reject/${orderId}`);
};

// Get orders for a technician with specific status
export const getTechnicianOrdersByStatus = async (
  techId: string, 
  status: number, 
  pageNumber: number, 
  pageSize: number
) => {
  // Log the request URL to verify parameters are being sent correctly
  const url = `/RequestService/GetByUserTechIdAndStatus/${techId}/${status}/${pageNumber}/${pageSize}`;
  console.log("Requesting:", url);
  
  const response = await proxyRequest('GET', url);
  console.log("API pageSize in response:", response.data.pageSize);
  return response;
};

// Get orders for a customer with specific status
export const getCustomerOrdersByStatus = async (
  customerId: string, 
  status: number, 
  pageNumber: number, 
  pageSize: number
) => {
  return proxyRequest(
    'GET',
    `/RequestService/GetByUserCustomerIdAndStatus/${customerId}/${status}/${pageNumber}/${pageSize}`
  );
};

// Delete an order
export const deleteOrder = async (orderId: number) => {
  return proxyRequest('DELETE', `/RequestService/Delete/${orderId}`);
};

// approve order status
export const updateOrderStatus = async (orderId: number) => {
  return proxyRequest('PUT', `/RequestService/UpdateStatusActive/${orderId}`);
};

// reject order status
export const rejectOrderStatus = async (orderId: number) => {
  return proxyRequest('PUT', `/RequestService/UpdateStatusReject/${orderId}`);
};

// Add this service function to your services.ts file
export const completeOrder = async (completeData: {
  id: number;
  totalPayment: number;
  rate: number;
  description: string;
}) => {
  return proxyRequest('PUT', `/RequestService/UpdateStatusCompleted`, completeData);
};

// Add this service function to your services.ts file
export const getReviewsForTechnician = async (userTechId: string) => {
  const response = await proxyRequest('GET', `/ReviewTech/GetReviewsTechByUserTechId/${userTechId}`);
  return response.data;
};

// Get count of new orders for a technician
export const getTechnicianNewOrdersCount = async (techId: string) => {
  try {
    // Use the existing endpoint for getting orders by status
    // Status 1 = new/pending orders
    const response = await proxyRequest('GET', `/RequestService/GetByUserTechIdAndStatus/${techId}/1/1/100`);
    console.log("New orders count response:", response?.data?.totalCount);
    // The count is the length of the items array or the totalCount property
    if (response?.data ) {
      // If API returns totalCount directly
      if (response?.data?.totalCount !== undefined) {
        return {
          data: response?.data?.totalCount,
          success: true
        };
      }
      
      // Otherwise count the items
      if (response.data.data.items && Array.isArray(response.data.data.items)) {
        return {
          data: response.data.data.items.length,
          success: true
        };
      }
    }
    
    // Return 0 if no data is found
    return {
      data: 0,
      success: true
    };
  } catch (error) {
    console.error("Error fetching new orders count:", error);
    return {
      data: 0,
      success: false,
      error: error
    };
  }
};

// Re-export these functions for convenience
export const getAllServices = requestService.getAllServices;
export const getAllCities = requestService.getAllCities;
export const getAllGovernorates = requestService.getAllGovernorates;

// Export the types as well
export type { Service, City, Governorate };

// Get request by ID
export const getRequestById = async (requestId: number) => {
  try {
    const response = await proxyRequest('GET', `/RequestService/GetById/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching request:", error);
    throw error;
  }
};

// Update request
export const updateRequest = async (requestData: any) => {
  try {
    // Create a more complete payload with required userCustomer and userTech objects
    const payload = {
      id: requestData.id,
      userCustomerId: requestData.userCustomerId,
      userTechId: requestData.userTechId,
      description: requestData.description,
      location: requestData.location,
      requestDateTime: requestData.requestDateTime,
      status: requestData.status,
      serviceId: requestData.serviceId,
      attachmentBase64: requestData.attachmentBase64 || "",
      serviceName: requestData.serviceName || "",
      totalPayment: requestData.totalPayment || 0,
      statusName: requestData.statusName || "",
      reviewRate: requestData.reviewRate || 0,
      reviewDescription: requestData.reviewDescription || "",
      
      // Include non-null userCustomer object with required fields
      userCustomer: {
        id: requestData.userCustomerId,
        userName: requestData.userCustomer?.userName || "",
        email: requestData.userCustomer?.email || "",
        bsd: requestData.userCustomer?.bsd || new Date().toISOString(),
        fullName: requestData.userCustomer?.fullName || "",
        imageBase64: requestData.userCustomer?.imageBase64 || "",
        phoneNumber: requestData.userCustomer?.phoneNumber || "",
        createdDateTime: requestData.userCustomer?.createdDateTime || new Date().toISOString(),
        countRequestComplate: requestData.userCustomer?.countRequestComplate || 0,
        address: {
          street: requestData.userCustomer?.address?.street || "",
          buildingNumber: requestData.userCustomer?.address?.buildingNumber || "",
          apartmentNumber: requestData.userCustomer?.address?.apartmentNumber || "",
          postalCode: requestData.userCustomer?.address?.postalCode || "",
          city: requestData.userCustomer?.address?.city || "",
          governorate: requestData.userCustomer?.address?.governorate || ""
        }
      },
      
      // Include non-null userTech object with required fields
      userTech: {
        id: requestData.userTechId,
        userName: requestData.userTech?.userName || "",
        email: requestData.userTech?.email || "",
        bsd: requestData.userTech?.bsd || new Date().toISOString(),
        fullName: requestData.userTech?.fullName || "",
        imageBase64: requestData.userTech?.imageBase64 || "",
        phoneNumber: requestData.userTech?.phoneNumber || "",
        serviceId: requestData.serviceId || 0,
        createdDateTime: requestData.userTech?.createdDateTime || new Date().toISOString(),
        serviceName: requestData.serviceName || "",
        serviceDescription: requestData.userTech?.serviceDescription || "",
        averageRate: requestData.userTech?.averageRate || 0,
        countRequestComplate: requestData.userTech?.countRequestComplate || 0,
        address: {
          street: requestData.userTech?.address?.street || "",
          buildingNumber: requestData.userTech?.address?.buildingNumber || "",
          apartmentNumber: requestData.userTech?.address?.apartmentNumber || "",
          postalCode: requestData.userTech?.address?.postalCode || "",
          city: requestData.userTech?.address?.city || "",
          governorate: requestData.userTech?.address?.governorate || ""
        }
      }
    };
    
    console.log("Sending update payload:", payload);
    
    const response = await proxyRequest('PUT', '/RequestService/Update', payload);
    return response.data;
  } catch (error: any) {
    console.error("Error updating request:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    throw error;
  }
};