import axios from "axios";

const memoryForgeApi = axios.create({
  baseURL: "https://localhost:3000/api",
});

// Add a request interceptor
memoryForgeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default memoryForgeApi;
