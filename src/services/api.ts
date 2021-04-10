import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b1e5889acdb9.ngrok.io'
});

export default api;
