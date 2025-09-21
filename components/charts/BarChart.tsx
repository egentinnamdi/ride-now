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

const chartData = [
  { month: "January", revenue: 500 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
  { month: "July", revenue: 200 },
  { month: "August", revenue: 500 },
  { month: "September", revenue: 100 },
  { month: "October", revenue: 460 },
  { month: "November", revenue: 350 },
  { month: "December", revenue: 59 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBar() {
  return (
    <Card className=" p-5 pb-10 bg-background/10 border-none shadow-none">
      <CardHeader className="flex justify-between pt-2 items-center">
        <CardTitle className="flex bg-background/15 rounded-lg p-4 text-2xl font-semibold gap-3 text-gray-800 items-center">
          <h2>January 2025</h2>
          <ChevronDown className="text-primary mt-1.5" />
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
