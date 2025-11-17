
import axios from 'axios';


const TURF_API_URL = 'http://localhost:8080/api/turfs'; 
const BOOKING_API_URL = 'http://localhost:8080/api/bookings';
const PAYMENT_API_URL = 'http://localhost:8080/api/payments'; 

const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add Bearer token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return { headers };
};

/**
 * Get turf statistics (total turfs, active turfs)
 * Endpoint: GET /turfs/stats
 */
export const getTurfStats = async () => {
  try {
    const response = await axios.get(
      `${TURF_API_URL}/stats`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching turf stats:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get booking statistics (total bookings)
 * Endpoint: GET /bookings/stats
 */
export const getBookingStats = async () => {
  try {
    const response = await axios.get(
      `${BOOKING_API_URL}/stats`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking stats:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get total revenue statistics
 * Endpoint: GET /payments/revenue/total
 */
export const getTotalRevenue = async () => {
  try {
    const response = await axios.get(
      `${PAYMENT_API_URL}/revenue/total`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching total revenue:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get weekly booking statistics for chart (last 8 weeks)
 * Endpoint: GET /bookings/stats/weekly
 * Returns: [{ week: "15/11", bookings: 25 }, ...]
 */
export const getWeeklyBookingStats = async () => {
  try {
    const response = await axios.get(
      `${BOOKING_API_URL}/stats/weekly`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly booking stats:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get weekly payment statistics for chart (last 8 weeks)
 * Endpoint: GET /payments/stats/weekly
 * Returns: [{ week: "15/11", amount: 45000 }, ...]
 */
export const getWeeklyPaymentStats = async () => {
  try {
    const response = await axios.get(
      `${PAYMENT_API_URL}/stats/weekly`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly payment stats:', error.response?.data?.message || error.message);
    throw error;
  }
};
