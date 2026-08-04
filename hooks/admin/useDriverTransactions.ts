import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { DriverTransactionsDto } from "@/types/transactions";
import { Timeframe } from "@/types/common";

export function useDriverTransactions(
  driverId: string,
  params?: { page?: number; limit?: number; timeframe?: Timeframe }
) {
  return useQuery<DriverTransactionsDto>(
    "driver-transactions",
    endpoints.admin.drivers.transactions(driverId),
    params as unknown as Record<string, string>,
    { enabled: Boolean(driverId) }
  );
}
