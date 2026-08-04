import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";

type ActionResponse = { statusCode: number; message: string };

export function useRestoreUser(userId: string) {
  return useMutation<ActionResponse, void>(endpoints.admin.users.restore(userId), {
    method: "POST",
    invalidateKeys: ["suspended-accounts"],
    successMsg: "User account restored",
  });
}

export function useDeleteUser(userId: string) {
  return useMutation<ActionResponse, void>(endpoints.admin.users.delete(userId), {
    method: "DELETE",
    invalidateKeys: ["suspended-accounts"],
    successMsg: "User account deleted",
  });
}
