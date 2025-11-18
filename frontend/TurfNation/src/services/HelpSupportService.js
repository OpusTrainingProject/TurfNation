
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084/helpsupport'; 

// Get JWT token from sessionStorage (for future use)
const getAuthToken = () => {
  return sessionStorage.getItem('jwtToken');
};


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
