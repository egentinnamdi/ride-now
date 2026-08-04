"use client";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const data = [
  { browser: "riders", visitors: 0, fill: "#D9186A" },
  { browser: "drivers", visitors: 0, fill: "#556AE1" },
  { browser: "vendors", visitors: 0, fill: "#AAB5F0" },
];

const chartConfig = {
  visitors: {
    // label: "Visitors",
  },
  riders: {
    label: "Riders",
    // color: "var(--chart-1)",
    color: "green",
  },
  drivers: {
    label: "Drivers",
    color: "var(--chart-2)",
  },
  vendors: {
    label: "Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PieChartRing({
  riders,
  drivers,
  users,
  isLoading,
}: {
  riders: number;
  drivers: number;
  users: number;
  isLoading: boolean;
}) {
  const [chartData, setChartData] = useState<typeof data>(data);

  useEffect(() => {
    setChartData((prev) =>
      prev.map((item) => ({
        ...item,
        visitors:
          item.browser === "riders"
            ? riders
            : item.browser === "drivers"
            ? drivers
            : users,
      }))
    );
  }, [riders, drivers, users]);
  return (
    <Card className="flex bg-inherit border-none shadow-none flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square  w-full  max-h-[250px]"
        >
          {isLoading ? (
            <div className="flex justify-end items-center gap-5">
              <div className="space-y-5">
                <Skeleton className="w-30 h-7 bg-background " />
                <Skeleton className="w-30 h-7 bg-background " />
                <Skeleton className="w-30 h-7 bg-background " />
              </div>
              <Skeleton className="size-50 bg-background rounded-full" />
            </div>
          ) : (
            <PieChart className="flex !flex-row">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={45}
                width={60}
                height={60}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                layout="vertical"
                verticalAlign="middle"
                align="left"
                className="-translate-y-2 flex-wrap flex flex-col  items-start text-gray-600  text-xl font-semibold gap-2 *:basis-1/4 *:justify-start"
              />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
