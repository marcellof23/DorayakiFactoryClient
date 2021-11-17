import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("access_token") || null;
};

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
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