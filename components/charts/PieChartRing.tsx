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

const chartData = [
  { browser: "riders", visitors: 475, fill: "#D9186A" },
  { browser: "drivers", visitors: 100, fill: "#556AE1" },
  { browser: "vendors", visitors: 50, fill: "#AAB5F0" },
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
    label: "Vendors",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PieChartRing() {
  return (
    <Card className="flex bg-inherit border-none shadow-none flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square  w-full  max-h-[250px]"
        >
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
