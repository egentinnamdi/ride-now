import React from "react";
import { Skeleton } from "../ui/skeleton";
import Trend from "../user-management/Trend";

export default function StatCard({
  label,
  value,
  isLoading,
  percentageChange,
}: {
  label: string;
  value: string | number;
  isLoading: boolean;
  percentageChange?: number;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 bg-background/10 rounded-xl">
      <span className="text-gray-500 font-semibold capitalize">{label}</span>
      {isLoading ? (
        <Skeleton className="h-8 w-28" />
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{value}</span>
          {percentageChange !== undefined && (
            <Trend isUp={percentageChange >= 0} value={percentageChange} />
          )}
        </div>
      )}
    </div>
  );
}
