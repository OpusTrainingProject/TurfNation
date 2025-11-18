import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Payment Service Functions
export const paymentService = {
  // Get order details for payment
  getOrderDetails: async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/payment/getorder`, {
        params: { bookingId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify payment after Razorpay callback
  verifyPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payment/verify', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all payments (Admin)
  getAllPayments: async () => {
    try {
      const response = await axiosInstance.get('/payment/getAllPayments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get payments by Turf ID (Admin)
  getPaymentsByTurfId: async (turfId) => {
    try {
      const response = await axiosInstance.get(`/payment/getPaymentsByTurfId/${turfId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get total revenue (Admin)
  getTotalRevenue: async () => {
    try {
      const response = await axiosInstance.get('/payment/getTotalRevenue');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get revenue by Turf ID (Admin)
  getRevenueByTurfId: async (turfId) => {
    try {
      const response = await axiosInstance.get(`/payment/getRevenueByTurfId/${turfId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default axiosInstance;

// Export individual functions for direct import
export const getAllPayments = paymentService.getAllPayments;
export const getPaymentsByTurfId = paymentService.getPaymentsByTurfId;
export const getTotalRevenue = paymentService.getTotalRevenue;
export const getRevenueByTurfId = paymentService.getRevenueByTurfId;
