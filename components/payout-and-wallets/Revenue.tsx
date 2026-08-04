"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from "../charts/BarChart";
import RevenueTable from "./RevenueTable";
import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { getFormattedDate } from "@/lib/utils";
import { ITransactionData } from "@/types/transactions";
import PaginationComponent from "../ui/PaginationComponent";
import { monthsOfTheYear } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";

const timeInterval = ["monthly", "weekly", "daily", "all-time"];
const tableHeaders = [
  "Identification Number",
  "Day",
  "Type",
  "Revenue Earned (N)",
];

type TotalRevenue = {
  totalRevenue: number;
  percentageChange: number;
  chartData: {
    period: string;
    revenue: number;
  }[];
};

export default function Revenue() {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [stringifiedDate, setStringifiedDate] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const [parameters, setParameters] = useState({
    timeframe: "monthly",
    startDate: stringifiedDate || getFormattedDate(lastMonth),
    endDate: getFormattedDate(today),
  });

  function handleDateChange(date: Date) {
    const formattedDate = getFormattedDate(date);
    setStringifiedDate(formattedDate);
    setDate(date);
  }

  // Get Total Revenue
  const { data: revenueData, isLoading: isFetching } = useQuery<TotalRevenue>(
    "revenue",
    endpoints.admin.revenue.total,
    parameters
  );

  // Get Revenue Transactions
  const month =
    stringifiedDate?.split("-")[1] ?? (today.getMonth() + 1).toString();
  const year = stringifiedDate?.split("-")[0] ?? today.getFullYear().toString();

  const { data: revenueTransactions, isLoading: isTransactionsLoading } =
    useQuery<ITransactionData>(
      "revenueTransactions",
      endpoints.admin.revenue.transactions,
      { limit: "10", page: page.toString(), month, year }
    );

  return (
    <TabsContent value="revenue">
      <div className="bg-white  p-10 pt-7  gap-4 ">
        <Tabs
          onValueChange={(val) =>
            setParameters((prev) => ({ ...prev, timeframe: val }))
          }
          defaultValue="monthly"
          className="flex flex-col gap-10"
        >
          <div className="flex text-gray-600 text-xl font-semibold flex-col gap-2">
            <span>Total Revenue</span>
            {!isFetching ? (
              <span className="text-primary text-3xl">
                &#8358;{revenueData?.totalRevenue?.toLocaleString() || "0"}.00
              </span>
            ) : (
              <Skeleton className="h-7 w-35" />
            )}
          </div>
          <TabsList className="bg-white">
            {timeInterval.map((item) => (
              <TabsTrigger
                className="!capitalize  text-background data-[state=active]:bg-primary"
                key={item}
                value={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          {timeInterval.map((item) => (
            <TabsContent key={item} value={item}>
              <ChartBar
                transactions={revenueData?.chartData ?? []}
                date={date}
                handleDateChange={handleDateChange}
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex flex-col gap-5 -200 mt-7">
          <div className="flex justify-between">
            <h3 className="text-2xl  font-semibold text-gray-700">
              Revenue in {monthsOfTheYear[+month - 1]}
            </h3>
          </div>
          <RevenueTable
            headerItems={tableHeaders}
            tableData={revenueTransactions?.transactions ?? []}
            isLoading={isTransactionsLoading}
          />
          {revenueTransactions?.pagination &&
          revenueTransactions.pagination.totalPages > 1 ? (
            <PaginationComponent
              currentPage={revenueTransactions.pagination.page}
              totalPages={revenueTransactions.pagination.totalPages}
              onPageChange={(pageNumber) => setPage(pageNumber)}
            />
          ) : null}
        </div>
      </div>
    </TabsContent>
  );
}
