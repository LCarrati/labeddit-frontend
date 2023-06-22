import axios from "axios";
import { BASE_URL } from "../env"

// para requisições públicas
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true
});

// para requisições que precisam ser enviadas com Authorization no header
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});