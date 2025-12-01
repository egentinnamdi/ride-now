import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Text from "../utility/Text";
import { PieChartRing } from "../charts/PieChartRing";
import ManagementItem from "./ManagementItem";
import { Skeleton } from "../ui/skeleton";
import { UserSummaryDto } from "@/types/userManagement";



export const timeInterval = ["all-time", "yearly", "monthly", "weekly"];
export default function TotalUsers({
  summary,
  isLoading,
  handleTimeframeChange,
}: {
  summary: UserSummaryDto | undefined;
  isLoading: boolean;
  handleTimeframeChange: (val: string[]) => void;
}) {
  // let loadingId: string;
  // useEffect(() => {
  //   if (isLoading && !summary) {
  //     const loadingId = toast.loading("Lading...").toString();
  //   }

  //   return () => toast.dismiss(loadingId);
  // }, [isLoading, summary]);
  console.log(summary);
  return (
    <TabsContent className=" min-h-[50vh]" value="total number of users">
      <Tabs
        onValueChange={(val) => handleTimeframeChange([val])}
        className="p-10 space-y-7"
        defaultValue="all-time"
      >
        <div>
          <TabsList className="bg-white">
            {timeInterval.map((interval) => (
              <TabsTrigger
                className="!capitalize  text-background py-5 text-base font-medium data-[state=active]:bg-primary"
                value={interval}
                key={interval}
              >
                {interval}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="  gap-7 flex ">
          <div className="border border-background p-7  bg-background/30 rounded-2xl w-2/5">
            {/* Total Users Title */}
            <div className="flex flex-col gap-1">
              <Text text="total users" />
              {isLoading ? (
                <Skeleton className="h-7 w-35 bg-background" />
              ) : (
                <span className="text-5xl text-primary font-bold">
                  {(summary?.totalUsers ?? 0).toLocaleString()}
                </span>
              )}
            </div>
            {/* Pie Chart */}
            <div>
              <PieChartRing
                isLoading={isLoading}
                users={summary?.totalUsers ?? 0}
                riders={summary?.totalRiders ?? 0}
                drivers={summary?.totalDrivers ?? 0}
              />
            </div>
          </div>
          {/* Daily Active Users */}
          <div className="bg-background/30 border flex flex-col  justify-between border-background p-6 rounded-2xl w-3/5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <Text text="daily active users" />
              {isLoading ? (
                <Skeleton className="h-7 w-35 bg-background" />
              ) : (
                <span className="text-3xl text-primary font-bold">
                  {summary?.dailyActiveUsers.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid min-h-[50vh] grid-cols-2 grid-rows-2 gap-10">
          <ManagementItem
            isLoading={isLoading}
            total={summary?.totalRiders ?? 0}
            text="riders"
            percentageChange={summary?.percentageChanges.totalRiders ?? 0}
          />
          <ManagementItem
            isLoading={isLoading}
            total={summary?.commissionDrivers ?? 0}
            text="commission drivers"
            percentageChange={summary?.percentageChanges.commissionDrivers ?? 0}
          />
          <ManagementItem
            isLoading={isLoading}
            total={summary?.subscribedDrivers ?? 0}
            text="subscribed drivers"
            percentageChange={summary?.percentageChanges.subscribedDrivers ?? 0}
          />
          <ManagementItem
            isLoading={isLoading}
            total={summary?.totalUsers ?? 0}
            text="users"
            percentageChange={summary?.percentageChanges.totalUsers ?? 0}
          />
        </div>
      </Tabs>
    </TabsContent>
  );
}
