import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Altere se necessário
});

export default api;