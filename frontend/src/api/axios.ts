import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 segundos — evita que la UI se quede colgada sin respuesta
});

export default api;


