import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://task-management-sxit.onrender.com/api"
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("taskManagerUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error) => {
  if (error.code === "ERR_NETWORK") {
    return "Unable to connect to the server. Please check if the backend is running.";
  }
  return error.response?.data?.message || error.message || "Something went wrong";
};

export default api;
