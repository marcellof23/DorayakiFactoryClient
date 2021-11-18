import axios from "axios";

export const getAccessToken = () => {
  return localStorage.getItem("access_token") || null;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
    || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (config.headers && token)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export default axiosInstance;