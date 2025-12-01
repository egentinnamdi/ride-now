"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ManagementItem from "./ManagementItem";
import TableTitle from "../payout-and-wallets/TableTitle";
import { Button } from "../ui/button";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import RevenueTable from "../payout-and-wallets/RevenueTable";
import DriverInfo from "./DriverInfo";
import {
  DriverStatsDTO,
  Pagination,
  UserSummaryDto,
} from "@/types/userManagement";
import { useQuery } from "@/hooks/useQuery";

const items = ["drivers", "riders", "passengers"];

const tableHeaders = [
  "ID",
  "Name",
  "Type",
  "Rides Completed",
  "Average Rating",
  "Status",
  "Action",
];

export interface DriverDTO {
  drivers: Driver[];
  pagination: Pagination;
}

export interface Driver {
  id: string;
  name: string;
  type: "weekly" | "monthly" | "daily"; // extend if needed
  ridesCompleted: number;
  avgRating: number;
  status: "online" | "offline" | "busy"; // extend if needed
}

export default function ViewAndManage({
  summary,
  isLoading,
}: {
  summary: UserSummaryDto | undefined;
  isLoading: boolean;
}) {
  const [{ id, show }, setSeeDriver] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });

  function toggleDriverInfo(id: string) {
    setSeeDriver({ id, show: !show });
  }

  // Get all Drivers
  const [page, setPage] = useState(1);
  const { data, isLoading: isFetching } = useQuery<DriverDTO>(
    "drivers",
    "/admin/drivers",
    {
      limit: "10",
      page: page.toString(),
    }
  );

  // Get Single Driver
  const { data: driver, isLoading: isFetchingDriver } =
    useQuery<DriverStatsDTO>("driver", `/admin/drivers/${id}`);

  // Added Ellipsis Icon to table Data
  const tableData = data?.drivers.map((item) => ({
    ...item,
    action: "",
  }));

  return (
    <TabsContent
      className=" min-h-[50vh] px-10 py-5 pb-10"
      value="view and manage"
    >
      {show ? (
        <DriverInfo
          isFetchingDriver={isFetchingDriver}
          id={id}
          driverDetails={driver ?? ({} as DriverStatsDTO)}
          toggleDriverInfo={toggleDriverInfo}
        />
      ) : (
        <Tabs defaultValue="drivers" className="space-y-7">
          <TabsList className=" w-full flex gap-2 py-8 px-1.5 bg-background/20 h-14">
            {items.map((item) => (
              <TabsTrigger
                className="!capitalize data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-400 font-semibold !text-lg"
                value={item}
                key={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            <div className="flex gap-7 h-[35vh] ">
              <ManagementItem
                isLoading={isLoading}
                total={summary?.commissionDrivers ?? 0}
                text="commission drivers"
                percentageChange={
                  summary?.percentageChanges.commissionDrivers ?? 0
                }
                className="w-1/3 justify-between"
                hiddenBtn={true}
              />
              <ManagementItem
                isLoading={isLoading}
                total={summary?.subscribedDrivers ?? 0}
                text="subscribed drivers"
                percentageChange={
                  summary?.percentageChanges.subscribedDrivers ?? 0
                }
                className="w-1/3 justify-between"
                hiddenBtn={true}
              />

              <div className="w-1/3  flex flex-col gap-7">
                <ManagementItem
                  total={summary?.totalRidesCompleted ?? 0}
                  text="total rides completed"
                  className="h-2/4"
                  hiddenAvatar={true}
                  hiddenBtn={true}
                  isLoading={isLoading}
                  percentageChange={
                    summary?.percentageChanges.totalRidesCompleted ?? 0
                  }
                />
                <ManagementItem
                  total={summary?.avgDriverRating ?? 0}
                  text="avg driver rating"
                  className="h-2/4 bg-orange-300/20 text-orange-500"
                  hiddenAvatar={true}
                  hiddenBtn={true}
                  percentageChange={
                    summary?.percentageChanges.avgDriverRating ?? 0
                  }
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
          <div className="capitalize space-y-3 mt-7">
            <TableTitle
              title="all drivers"
              action={
                <>
                  <span className="text-gray-500">type</span>
                  <ChevronDown className="text-primary" />
                  <Button
                    className="text-green-600 border border-green-600 bg-green-600/5"
                    variant="outline"
                  >
                    Subscriber
                  </Button>
                </>
              }
            />
            <RevenueTable
              headerItems={tableHeaders}
              tableData={tableData ?? []}
              isLoading={isFetching}
              showDriver={toggleDriverInfo}
            />
          </div>
        </Tabs>
      )}
    </TabsContent>
  );
}
