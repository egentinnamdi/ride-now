"use client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  // TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "../ui/separator";

import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { ITransaction, ITransactionData } from "@/types/transactions";

// const chartData = [
//   { month: "January", revenue: 500 },
//   { month: "February", revenue: 305 },
//   { month: "March", revenue: 237 },
//   { month: "April", revenue: 73 },
//   { month: "May", revenue: 209 },
//   { month: "June", revenue: 214 },
//   { month: "July", revenue: 200 },
//   { month: "August", revenue: 500 },
//   { month: "September", revenue: 100 },
//   { month: "October", revenue: 460 },
//   { month: "November", revenue: 350 },
//   { month: "December", revenue: 59 },
// ];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBar({
  transactions,
  date,
  handleDateChange,
}: {
  transactions: ITransaction[];
  date: Date | undefined;
  handleDateChange: (date: Date) => void;
}) {
  const chartData = transactions?.map((transaction) => {
    const date = new Date(transaction.day);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const revenue = transaction.revenueEarned;
    return { month, revenue };
  });

  const [open, setOpen] = useState(false);
  return (
    <Card className=" p-5 pb-10 bg-background/10 border-none shadow-none">
      <CardHeader className="flex justify-between pt-2 items-center">
        <CardTitle className="flex bg-background/15 rounded-lg p-4 text-2xl font-semibold  text-gray-800 ">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="flex cursor-pointer items-center gap-3">
              <h2>
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Select a date"}
              </h2>
              <ChevronDown className="text-primary mt-1.5" />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  handleDateChange(date ?? new Date());
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </CardTitle>
        <div className="flex text-primary ">
          <ChevronLeft />
          <ChevronRight />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ChartContainer className="h-[30vh] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              fontSize={18}
              fontWeight={600}
              color="#fff"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-background)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
