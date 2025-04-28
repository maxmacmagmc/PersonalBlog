import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profiles`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
