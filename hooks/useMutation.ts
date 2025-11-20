import api from "@/lib/client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Method = "POST" | "PUT" | "DELETE";

export function useMutation<TData, TVariables>(
  endpoint: string,
  {
    method = "POST",
    invalidateKeys,
    redirectTo,
    successMsg,
    storeInCache = false,
  }: {
    method?: Method;
    invalidateKeys?: Array<string>;
    redirectTo?: string;
    successMsg?: string;
    storeInCache?: boolean;
  }
) {
  // keys to refetch after success
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useReactMutation<TData, Error, TVariables>({
    mutationFn: async function (reqData) {
      const { data } = await api[
        method.toLowerCase() as "post" | "put" | "delete"
      ]<TData>(endpoint, reqData);
      return data;
    },
    onSuccess: (data) => {
      // On success, set User
      if (storeInCache) {
        // queryClient.setQueryData([endpoint], data as TData);
        localStorage.setItem(endpoint, JSON.stringify(data));
      }

      toast.success(successMsg);
      redirectTo && router.push(redirectTo);

      if (invalidateKeys?.length) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
