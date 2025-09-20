import React from "react";
import { TabsContent } from "../ui/tabs";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";
import Transactions from "./Transactions";
import RevenueTable from "./RevenueTable";

const className = "flex flex-col  rounded-2xl p-4  justify-between w-2/4 h-40";

const tableHeaders = ["ID", "Day", "Location", "Revenue Earned (N)"];

const tableData = [
  {
    id: "11156778",
    day: "31st Jan 2025",
    location: "abuja",
    revenue: 11350,
  },
  {
    id: "11156798",
    day: "31st Jan 2025",
    location: "lagos",
    revenue: 11350,
  },
  {
    id: "11156768",
    day: "31st Jan 2025",
    location: "asaba",
    revenue: 11350,
  },
  {
    id: "11156758",
    day: "31st Jan 2025",
    location: "asaba",
    revenue: 11350,
  },
  {
    id: "11156758",
    day: "31st Jan 2025",
    location: "abuja",
    revenue: 11350,
  },
  {
    id: "11156758",
    day: "31st Jan 2025",
    location: "lagos",
    revenue: 11350,
  },
  {
    id: "11156758",
    day: "31st Jan 2025",
    location: "asaba",
    revenue: 11350,
  },
];

export default function RidesAndOrders() {
  return (
    <TabsContent value="rides and orders" className="p-10">
      <div className="flex gap-5">
        <div className={cn("bg-pink-50 border-pink-500 border-4", className)}>
          <div className="flex items-center text-pink-500 gap-2">
            <CarFront />
            <span className=" font-semibold">Rides completed</span>
          </div>
          <span className="text-2xl font-semibold text-gray-700">
            13,456 rides
          </span>
        </div>
        <div className={cn("bg-background/10", className)}>
          <div className="flex items-center gap-2 text-primary">
            <CarFront />
            <span className=" font-semibold">Orders completed</span>
          </div>
          <span className="text-2xl font-semibold text-gray-400">
            13,456 rides
          </span>
        </div>
      </div>
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions title="January">
        <RevenueTable headers={tableHeaders} data={tableData} />
      </Transactions>
    </TabsContent>
  );
}
