import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Create a configured Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 15000, // 15 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Add token from localStorage if available (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      // Handle authentication errors
      if (status === 401) {
        console.error("Authentication error - Unauthorized");
        
        // Clear user data and redirect to login page if on client
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('expiryDate');
          localStorage.removeItem('imageBase64');
          
          // Only redirect if we're in a browser context and not in an API route
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      } else if (status === 403) {
        console.error("Authorization error - Forbidden");
      } else if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
      
      console.error("Response error:", status, error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error("Network error - No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
