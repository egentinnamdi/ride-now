import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { PayoutsSummaryDto, PeakLocationsDto, PeakDaysDto } from "@/types/payouts";
import { Timeframe } from "@/types/common";

export function usePayoutsSummary(params?: {
  startDate?: string;
  endDate?: string;
  timeframe?: Timeframe;
}) {
  return useQuery<PayoutsSummaryDto>(
    "payouts-summary",
    endpoints.admin.payouts.summary,
    params as Record<string, string>
  );
}

export function usePeakLocations(params?: {
  startDate?: string;
  endDate?: string;
  limit?: number;
}) {
  return useQuery<PeakLocationsDto>(
    "payouts-peak-locations",
    endpoints.admin.payouts.peakLocations,
    params as unknown as Record<string, string>
  );
}

export function usePeakDays(params?: { startDate?: string; endDate?: string }) {
  return useQuery<PeakDaysDto>(
    "payouts-peak-days",
    endpoints.admin.payouts.peakDays,
    params as Record<string, string>
  );
}
