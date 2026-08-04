import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";
import Transactions from "./Transactions";
import RevenueTable from "./RevenueTable";
import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { Skeleton } from "../ui/skeleton";

const className = "flex flex-col  rounded-2xl p-4  justify-between w-2/4 h-40";

const tableHeaders = [
  "ID",
  "Day",
  "Customer",
  "Location",
  "Revenue Earned (N)",
];

type RideTransactionDto = {
  id: string;
  day: string;
  customer: string;
  location: string;
  revenueEarned: number;
};

export type PaginationResponseDto = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type AdminTransactionsResponseDto = {
  transactions: RideTransactionDto[];
  pagination: PaginationResponseDto;
};

export default function RidesAndOrders() {
  const [data, setData] = useState<RideTransactionDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Get All rides completed
  const { data: completedRides, isLoading: isSummaryLoading } = useQuery<{
    ridesCompleted: number;
  }>("completed-rides", endpoints.admin.rides.summary);

  function syncData(values: AdminTransactionsResponseDto, isLoading: boolean) {
    setData(values.transactions);
    setIsLoading(isLoading);
  }

  return (
    <TabsContent value="rides and orders" className="p-10">
      <div className="flex gap-5">
        <div className={cn("bg-pink-50 border-pink-500 border-4", className)}>
          <div className="flex items-center text-pink-500 gap-2">
            <CarFront />
            <span className=" font-semibold">Rides completed</span>
          </div>
          {isSummaryLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <span className="text-2xl font-semibold text-gray-700">
              {completedRides?.ridesCompleted.toLocaleString() || "0"} rides
            </span>
          )}
        </div>
        <div className={cn("bg-background/10", className)}>
          <div className="flex items-center gap-2 text-primary">
            <CarFront />
            <span className=" font-semibold">Orders completed</span>
          </div>
          {isSummaryLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <span className="text-2xl font-semibold text-gray-400">
              13,456 rides
            </span>
          )}
        </div>
      </div>
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions
        key="rides-transactions"
        endpoint={endpoints.admin.rides.transactions}
        syncData={syncData}
        queryKey="rides-transactions"
      >
        <RevenueTable
          headerItems={tableHeaders}
          tableData={data ?? []}
          isLoading={isLoading}
        />
      </Transactions>
    </TabsContent>
  );
}
