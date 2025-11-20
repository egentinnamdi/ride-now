"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from "../charts/BarChart";
import RevenueTable from "./RevenueTable";
import { useQuery } from "@/hooks/useQuery";
import { getFormattedDate } from "@/lib/utils";
import { ITransactionData } from "@/types/transactions";
import { NoTransactions } from "../multi-page/NoTransactions";

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
  };
};

export default function Revenue() {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [stringifiedDate, setStringifiedDate] = useState<string | undefined>();

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
  const { data: revenueData } = useQuery<TotalRevenue>(
    "revenue",
    "/admin/revenue/total",
    { ...parameters, startDate: stringifiedDate ?? "" }
  );

  // Get Revenue Transactions
  const month =
    stringifiedDate?.split("-")[1] ?? (today.getMonth() + 1).toString();
  const year = stringifiedDate?.split("-")[0] ?? today.getFullYear().toString();

  const { data: revenueTransactions } = useQuery<ITransactionData>(
    "revenueTransactions",
    "/admin/revenue/transactions",
    { limit: "10", page: "1", month, year }
  );

  console.log(revenueTransactions?.transactions);

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
            <span className="text-primary text-3xl">
              &#8358;{revenueData?.totalRevenue?.toLocaleString() || "0"}.00
            </span>
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
                chartData={revenueTransactions?.transactions ?? []}
                date={date}
                handleDateChange={handleDateChange}
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex flex-col gap-7 mt-7">
          <h3 className="text-2xl font-semibold text-gray-700">
            Revenue in January
          </h3>
          {revenueTransactions?.transactions?.length ? (
            <RevenueTable
              headerItems={tableHeaders}
              tableData={revenueTransactions?.transactions ?? []}
            />
          ) : (
            <NoTransactions />
          )}
        </div>
      </div>
    </TabsContent>
  );
}
