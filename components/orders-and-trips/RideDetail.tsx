"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRideDetail } from "@/hooks/admin/useRideDetail";
import { RideStatus } from "@/types/rides";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const statusStyles: Record<RideStatus, string> = {
  searching_driver: "bg-gray-200 text-gray-700",
  driver_assigned: "bg-blue-100 text-blue-700",
  driver_en_route: "bg-indigo-100 text-indigo-700",
  arrived: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-orange-200 text-orange-700",
  completed: "bg-green-200 text-green-700",
  cancelled: "bg-red-400 text-white",
};

export default function RideDetail({
  id,
  toggleRideDetail,
}: {
  id: string;
  toggleRideDetail: (id: string) => void;
}) {
  const { data: ride, isLoading } = useRideDetail(id);

  const fields = [
    { label: "From", value: ride?.from },
    { label: "Going To", value: ride?.goingTo },
    { label: "Driver", value: ride?.driverName },
    { label: "Rider", value: ride?.riderName },
    { label: "Car Details", value: ride?.carDetails },
    { label: "Plate Number", value: ride?.plateNumber },
    { label: "NIN", value: ride?.nin },
    { label: "Reported", value: `${ride?.reportedTimes ?? 0} times` },
  ];

  return (
    <div className="p-10 flex flex-col gap-7">
      <div
        onClick={() => toggleRideDetail(id)}
        className="flex cursor-pointer gap-1 items-center"
      >
        <ChevronLeft className="text-primary" />
        <span className="text-gray-400 font-semibold text-lg">Back</span>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Ride Details</h2>
        {!isLoading ? (
          <span
            className={cn(
              "capitalize text-sm font-semibold px-5 py-1.5 rounded-sm",
              ride && statusStyles[ride.status]
            )}
          >
            {ride?.status.replace(/_/g, " ")}
          </span>
        ) : (
          <Skeleton className="h-7 w-24" />
        )}
      </div>
      <div className="bg-background/10 rounded-xl p-6 flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-400">
          Transaction Amount
        </span>
        {!isLoading ? (
          <span className="text-2xl font-bold text-primary">
            ₦{ride?.amount.toLocaleString()}
          </span>
        ) : (
          <Skeleton className="h-7 w-30" />
        )}
      </div>
      <div className="grid bg-background/10 rounded-lg grid-cols-2 p-10 gap-5">
        {fields.map((field) => (
          <div
            key={field.label}
            className="border-b flex flex-col gap-2 justify-center"
          >
            <span className="text-sm font-semibold text-gray-400">
              {field.label}
            </span>
            {!isLoading ? (
              <span className="text-base font-semibold text-gray-800">
                {field.value}
              </span>
            ) : (
              <Skeleton className="h-5 w-30" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
