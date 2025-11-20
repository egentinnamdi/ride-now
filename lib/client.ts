import axios, { AxiosError } from "axios";
import { RefreshTokenResponseDto, SigninResponseDto } from "@/types/auth";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const userJson = localStorage.getItem("/auth/signin");
      if (userJson) {
        const user: SigninResponseDto = JSON.parse(userJson);
        const token = user?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const userJson = localStorage.getItem("/auth/signin");
        if (!userJson) {
          window.location.href = "/sign-in";
          return Promise.reject(error);
        }
        const user: SigninResponseDto = JSON.parse(userJson);
        const refreshToken = user?.refresh_token;

        const { data } = await axios.post<RefreshTokenResponseDto>(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const newUser: SigninResponseDto = {
          ...user,
          token: data.token,
          refresh_token: data.refresh_token,
        };
        localStorage.setItem("/auth/signin", JSON.stringify(newUser));
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("/auth/signin");
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
