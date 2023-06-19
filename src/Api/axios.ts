import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

// para requisições públicas
export default axios.create({
    baseURL: process.env.BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
  
  // para requisições que precisam ser enviadas com Authorization no header
  export const axiosPrivate = axios.create({
    baseURL: process.env.BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });