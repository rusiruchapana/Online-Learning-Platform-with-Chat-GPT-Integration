import axios from 'axios';

const API_URL = '/api/chat';

// Get course recommendations
const getRecommendations = async (prompt, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/recommend`, { prompt }, config);
  return response.data;
};

// Named export (updated from default export)
export { getRecommendations };