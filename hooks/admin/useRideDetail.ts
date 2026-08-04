import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { RideDetailDto } from "@/types/rides";

export function useRideDetail(rideId: string) {
  return useQuery<RideDetailDto>(
    "ride-detail",
    endpoints.admin.rides.detail(rideId),
    undefined,
    { enabled: Boolean(rideId) }
  );
}
