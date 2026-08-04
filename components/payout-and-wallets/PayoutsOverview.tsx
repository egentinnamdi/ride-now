"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import DateInput from "../multi-page/DateInput";
import StatCard from "./StatCard";
import RevenueTable from "./RevenueTable";
import {
  usePayoutsSummary,
  usePeakLocations,
  usePeakDays,
} from "@/hooks/admin/usePayouts";
import { getFormattedDate } from "@/lib/utils";
import { Timeframe } from "@/types/common";

const timeInterval: Timeframe[] = ["monthly", "weekly", "daily", "all-time"];

export default function PayoutsOverview() {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDateString, setStartDateString] = useState<string | undefined>();
  const [endDateString, setEndDateString] = useState<string | undefined>();

  function handleStartDateChange(date: Date) {
    setStartDate(date);
    setStartDateString(getFormattedDate(date));
  }
  function handleEndDateChange(date: Date) {
    setEndDate(date);
    setEndDateString(getFormattedDate(date));
  }

  const { data: summary, isLoading: isSummaryLoading } = usePayoutsSummary({
    startDate: startDateString,
    endDate: endDateString,
    timeframe,
  });

  const { data: peakLocations, isLoading: isLocationsLoading } =
    usePeakLocations({ startDate: startDateString, endDate: endDateString, limit: 10 });

  const { data: peakDays, isLoading: isDaysLoading } = usePeakDays({
    startDate: startDateString,
    endDate: endDateString,
  });

  return (
    <TabsContent value="payouts overview" className="p-10 flex flex-col gap-10">
      <Tabs
        value={timeframe}
        onValueChange={(val) => setTimeframe(val as Timeframe)}
        className="flex flex-col gap-7"
      >
        <div className="flex justify-between items-center">
          <TabsList className="bg-white">
            {timeInterval.map((item) => (
              <TabsTrigger
                className="!capitalize text-background data-[state=active]:bg-primary data-[state=active]:text-white"
                key={item}
                value={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">Time Interval:</span>
            <DateInput
              label="Select a start date"
              date={startDate}
              handleDateChange={handleStartDateChange}
            />
            <Separator>to</Separator>
            <DateInput
              label="Select an end date"
              date={endDate}
              handleDateChange={handleEndDateChange}
            />
          </div>
        </div>
      </Tabs>

      <div className="grid grid-cols-3 gap-5">
        <StatCard
          label="Total Revenue"
          value={`₦${(summary?.totalRevenue ?? 0).toLocaleString()}`}
          isLoading={isSummaryLoading}
          percentageChange={summary?.percentageChange}
        />
        <StatCard
          label="Total Rides"
          value={(summary?.totalRides ?? 0).toLocaleString()}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Rides Completed"
          value={(summary?.totalRidesCompleted ?? 0).toLocaleString()}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Average Rating"
          value={(summary?.averageRating ?? 0).toFixed(1)}
          isLoading={isSummaryLoading}
        />
        <StatCard
          label="Total Distance (km)"
          value={(summary?.totalDistanceKm ?? 0).toLocaleString()}
          isLoading={isSummaryLoading}
        />
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-semibold text-gray-700">Peak Locations</h3>
        <RevenueTable
          headerItems={["Location", "Revenue", "Ride Count"]}
          tableData={peakLocations?.locations ?? []}
          isLoading={isLocationsLoading}
        />
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-semibold text-gray-700">Peak Days</h3>
        <RevenueTable
          headerItems={["Day of Week", "Revenue", "Ride Count"]}
          tableData={peakDays?.days ?? []}
          isLoading={isDaysLoading}
        />
      </div>
    </TabsContent>
  );
}
