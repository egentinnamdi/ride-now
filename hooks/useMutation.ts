import api from "@/lib/client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";

type Method = "POST" | "PUT" | "DELETE";

export function useMutation<T>(
  endpoint: string,
  method: Method = "POST",
  invalidateKeys?: string[] // keys to refetch after success
) {
  const queryClient = useQueryClient();
  return useReactMutation<T>({
    mutationFn: async () => {
      const { data } = await api[
        method.toLowerCase() as "post" | "put" | "delete"
      ]<T>(endpoint, {});
      return data;
    },
    onSuccess: () => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
    },
  });
}
