import axios from "axios";

const BASE_URL = 'https://vps72.heliohost.us/labeddit-backend/'

// para requisições públicas
export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
  
  // para requisições que precisam ser enviadas com Authorization no header
  export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });