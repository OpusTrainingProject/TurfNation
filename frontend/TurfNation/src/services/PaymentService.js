
import axios from 'axios';

// Base URL - Replace with your actual API Gateway URL
const API_BASE_URL = 'http://localhost:8080/api/payments'; 


const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
 
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return { headers };
};

/**

 */
export const getAllPayments = async () => {
  try {
    const response = await axios.get(
      API_BASE_URL,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all payments:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get payments by Turf ID (Admin only)
 
 */
export const getPaymentsByTurfId = async (turfId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turf/${turfId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching payments for turf ${turfId}:`, error.response?.data?.message || error.message);
    throw error;
  }
};

/**

 * Returns: { totalRevenue: BigDecimal, totalPayments: Long, message: String }
 */
export const getTotalRevenue = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/revenue/total`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching total revenue:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**

 * Returns: { totalRevenue: BigDecimal, totalPayments: Long, message: String }
 */
export const getRevenueByTurfId = async (turfId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/revenue/turf/${turfId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching revenue for turf ${turfId}:`, error.response?.data?.message || error.message);
    throw error;
  }
};
