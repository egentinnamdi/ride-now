import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { SuspendedAccountDetailDto } from "@/types/userManagement";

export function useSuspendedAccountDetail(userId: string) {
  return useQuery<SuspendedAccountDetailDto>(
    "suspended-account-detail",
    endpoints.admin.users.suspendedDetail(userId),
    undefined,
    { enabled: Boolean(userId) }
  );
}
