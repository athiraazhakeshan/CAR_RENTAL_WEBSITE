import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const axiosInstance = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});
const API_url=import.meta.env.VITE_ADMIN_SIGNIN_URL
export const adminAxiosInstance = axios.create({
    baseURL: `${API_url}/api`,
    withCredentials: true,
  });