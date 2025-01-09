import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = "https://car-rental-website-server-six.vercel.app";
export const axiosInstance = axios.create({
  //baseURL: `${API_URL}/api`,
   baseURL:`${url}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json' 
     }
});
