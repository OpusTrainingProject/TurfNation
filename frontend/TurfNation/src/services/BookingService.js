import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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

// Helper function to get userId from token
const getUserIdFromToken = () => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const decoded = jwtDecode(token);
    return decoded.userId || decoded.sub || decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
};

// Booking Service Functions
export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const userId = getUserIdFromToken();
      
      const payload = {
        bookingDate: bookingData.bookingDate,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        turfId: bookingData.turfId,
        userId: userId,
        amount: bookingData.amount
      };

      const response = await axiosInstance.post('/booking/create', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user bookings (if needed later)
  getUserBookings: async () => {
    try {
      const response = await axiosInstance.get('/booking/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default axiosInstance;
