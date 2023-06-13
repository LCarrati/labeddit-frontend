import axios from "axios";

const BASE_URL = "http://localhost:3003"; //colocar no .env

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