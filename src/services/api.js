import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://nola-challenge.onrender.com/api",
  validateStatus: (status) => status >= 200 && status < 400,
  timeout: 120000,
});

export default api;
