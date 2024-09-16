import axios from 'axios';
const URL = 'http://localhost:3030';
const apiService = {
  async get(endpoint) {
    try {
      const data = await axios(URL + endpoint);
      return data.data;
    } catch (error) {
      return error;
    }
  },
  async post(endpoint, params = {}) {
    try {
      const data = await axios.post(URL + endpoint, params);
      return data.data;
    } catch (error) {
      return error;
    }
  },
};
export default apiService;
