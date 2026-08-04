import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { AdminNotificationsDto } from "@/types/notifications";

export function useAdminNotifications(params?: {
  page?: number;
  limit?: number;
  date?: string;
}) {
  return useQuery<AdminNotificationsDto>(
    "admin-notifications",
    endpoints.admin.notifications,
    params as unknown as Record<string, string>
  );
}
