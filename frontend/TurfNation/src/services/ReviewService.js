// src/services/reviewService.js
import axios from 'axios';

// Base URL - Replace with your actual API Gateway URL
const API_BASE_URL = 'http://localhost:8080/review'; // TODO: Replace with actual API Gateway URL

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
 * Create a new review
 * @param {Object} reviewDTO - The review data
 * @param {number} reviewDTO.bookingId - Booking ID
 * @param {number} reviewDTO.rating - Rating (1-5)
 * @param {string} reviewDTO.description - Review description
 * @returns {Promise} - Returns the created review
 */
export const createReview = async (reviewDTO) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      reviewDTO,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Get all reviews for a specific turf
 * @param {number} turfId - The ID of the turf
 * @returns {Promise} - Returns list of reviews for the turf
 */
export const getReviewsByTurf = async (turfId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turf/${turfId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response?.data?.message || error.message);
    throw error;
  }
};
