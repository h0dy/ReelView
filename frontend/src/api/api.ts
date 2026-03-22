import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err)) {
      return Promise.reject(
        new Error(err.response?.data?.message || "API Error")
      );
    }
    return Promise.reject(err);
  }
);

export default api;
