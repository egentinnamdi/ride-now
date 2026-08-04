import api from "@/lib/client";
import { endpoints } from "@/lib/endpoints";
import { SigninResponseDto } from "@/types/auth";
import { useEffect, useState } from "react";

export function useInjectAccessToken() {
  const [user, setUser] = useState<SigninResponseDto | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem(endpoints.auth.signin);
    const userData: SigninResponseDto | null = userJson
      ? JSON.parse(userJson)
      : null;
    setUser(userData);
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [user]);
}
