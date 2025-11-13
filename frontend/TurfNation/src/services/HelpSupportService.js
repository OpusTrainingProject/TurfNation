// src/services/helpSupportService.js
import axios from 'axios';

// Base URL - Replace with your actual API Gateway URL
const API_BASE_URL = 'http://localhost:8084/helpsupport'; // TODO: Replace with actual API Gateway URL

// Get JWT token from sessionStorage (for future use)
const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};

// Helper to get auth headers with user-id
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'user-id': '1', // TODO: Remove this hardcoded user-id when JWT is fully implemented
  };
  
  // Add Bearer token if available (for future use)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return { headers };
};

/**
 * Create a new help support concern (User Side)
 * @param {Object} helpSupportDTO - The concern data
 * @param {string} helpSupportDTO.name - User's name
 * @param {string} helpSupportDTO.email - User's email
 * @param {string} helpSupportDTO.concernType - Type of concern (BOOKING_RELATED, TURF_RELATED, PAYMENT_RELATED, OTHER)
 * @param {string} helpSupportDTO.message - Concern message
 * @returns {Promise} - Returns the created concern
 */
export const createConcern = async (helpSupportDTO) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      helpSupportDTO,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error creating concern:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get all active concerns (Admin Side)
 * @returns {Promise} - Returns list of active concerns
 */
export const getActiveConcerns = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/active`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching active concerns:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Mark a concern as resolved (Admin Side)
 * @param {number} concernId - The ID of the concern to resolve
 * @returns {Promise} - Returns the updated concern
 */
export const markAsResolved = async (concernId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${concernId}/resolve`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error resolving concern:', error.response?.data?.message || error.message);
    throw error;
  }
};
