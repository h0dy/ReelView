import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL,
  withCredentials: true, // include cookies on every request
});

export default api;

// in-memory access token
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// tracks whether a token refresh is already in progress
let isRefreshing = false;

// queue of pending requests that failed with 401 while a refresh was in progress
let queue: ((token: string | null) => void)[] = [];

// resolves all queued requests with the new token
const flushQueue = (token: string | null) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // only handle 401 errors and only retry once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // prevent interceptor from retrying auth endpoints to avoid infinite loops
      if (
        originalRequest.url?.includes("/api/refresh") ||
        originalRequest.url?.includes("/api/me")
      ) {
        return Promise.reject(error);
      }

      // mark this request so it won't be retried again
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) =>
            // push each request to the queue
            token ? resolve(api(originalRequest)) : reject(error)
          );
        });
      }

      isRefreshing = true;

      try {
        // use plain axios to avoid triggering this interceptor again
        const res = await axios.post(
          "/api/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.token;

        // set the new token and retry all queued requests
        setAccessToken(newToken);
        flushQueue(newToken);
        isRefreshing = false;

        // retry the original request that triggered the 401
        return api(originalRequest);
      } catch (err) {
        setAccessToken(null);
        flushQueue(null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    // other errors
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "API Error";
      toast.warning(message);
      return Promise.reject(new Error(message));
    }

    toast.warning("An unexpected error occurred");
    return Promise.reject(error);
  }
);
