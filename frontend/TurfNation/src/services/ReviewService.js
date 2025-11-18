
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8082/review'; 


const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};

// Helper to get auth headers with user-id
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'user-id': '1', 
  };
  
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return { headers };
};

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
