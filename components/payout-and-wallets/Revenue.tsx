import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from "../charts/BarChart";
import RevenueTable from "./RevenueTable";

const timeInterval = ["monthly", "weekly", "daily", "all-time"];
const tableHeaders = ["ID", "Day", "Type", "Revenue Earned (N)"];

const tableData = [
  {
    id: "11156778",
    day: "31st Jan 2025",
    type: "order",
    revenue: 11350,
  },
  {
    id: "11156798",
    day: "31st Jan 2025",
    type: "order",
    revenue: 11350,
  },
  {
    id: "11156768",
    day: "31st Jan 2025",
    type: "order",
    revenue: 11350,
  },
  {
    id: "11156758",
    day: "31st Jan 2025",
    type: "order",
    revenue: 11350,
  },
];

export default function Revenue() {
  return (
    <TabsContent value="revenue">
      <div className="bg-white  p-10 pt-7  gap-4 ">
        <Tabs defaultValue="monthly" className="flex flex-col gap-10">
          <div className="flex text-gray-600 text-xl font-semibold flex-col gap-2">
            <span>Total Revenue</span>
            <span className="text-4xl text-primary font-bold">
              &#8358;{(567900789.67).toLocaleString()}
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
              <ChartBar />
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex flex-col gap-7 mt-7">
          <h3 className="text-2xl font-semibold text-gray-700">
            Revenue in January
          </h3>
          <RevenueTable headers={tableHeaders} data={tableData} />
        </div>
      </div>
    </TabsContent>
  );
}
