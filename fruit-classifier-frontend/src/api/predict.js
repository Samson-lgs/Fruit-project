// src/api/predict.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const classifyFruit = async (file, modelName) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_name', modelName);
    
    // Add headers explicitly
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Test the API connection first
    try {
      await axios.get(`${API_URL}/models`);
    } catch (error) {
      console.error('Cannot connect to backend server:', error);
      throw new Error('Backend server is not accessible. Please ensure it is running on port 8000.');
    }

    const response = await axios.post(`${API_URL}/predict`, formData, config);
    return response.data;
  } catch (error) {
    console.error('Error in classifyFruit:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};