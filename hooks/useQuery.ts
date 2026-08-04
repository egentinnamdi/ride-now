import api from "@/lib/client";
import {
  useQuery as useReactQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export function useQuery<T>(
  key: string,
  endpoint: string,
  params?: Record<string, string>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useReactQuery<T>({
    queryKey: [key, endpoint, params],
    queryFn: async () => {
      const { data } = await api.get<T>(endpoint, { params });
      return data;
    },
    ...options,
  });
}
