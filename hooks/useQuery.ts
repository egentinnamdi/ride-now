import api from "@/lib/client";
import {
  useQuery as useReactQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export function useQuey<T>(
  key: string,
  endpoint: string,
  params?: Record<string, string>,
  options?: UseQueryOptions<T>
) {
  return useReactQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await api.get<T>(endpoint, { params });
      return data;
    },
    ...options,
  });
}
