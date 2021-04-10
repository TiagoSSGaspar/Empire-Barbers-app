import axios from 'axios';

const api = axios.create({
  baseURL: ' http://a506f044a7a4.ngrok.io'
});

export default api;
