import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

import UserManagementTable from "./UserManagementTable";

const interval = ["monthly", "weekly", "daily", "all-time"];

const headers = ["ID", "Name", "Type", "Date Submitted", "Status", "Action"];

const data = [
  {
    id: "11156778",
    name: "Kelechi Dure",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "11,350",
  },
  {
    id: "11156771",
    name: "Ella Nwaogu",
    type: "Rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
  },
  {
    id: "11156772",
    name: "Chioma Okafor",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "11,350",
  },
  {
    id: "11156773",
    name: "Emeka Uche",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
  },
  {
    id: "11156774",
    name: "Adaeze Nwosu",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
  },
  {
    id: "11156775",
    name: "Tunde Afolabi",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
  },
  {
    id: "11156776",
    name: "Ngozi Obi",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
  },
];

export default function PendingApprovals() {
  return (
    <TabsContent value="pending approval" className="p-10 space-y-9">
      <h2 className="text-2xl font-semibold text-gray-600">
        Pending approvals
      </h2>
      <Tabs defaultValue="monthly" className="w-full space-y-10">
        <div className="flex justify-between items-center">
          <TabsList className="bg-white">
            {interval.map((item) => (
              <TabsTrigger
                className="capitalize! text-background text-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:h-16"
                key={item}
                value={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center capitalize font-semibold text-background gap-3 px-4">
            <span>Filter by:</span>
            <span className="text-gray-500">type</span>
            <ChevronDown size={20} className="text-primary" />
            <Button className="text-gray-600  bg-green-100">Order</Button>
            <Download size={17} className="text-primary ml-2" />
            <EllipsisVertical size={17} className="text-primary" />
          </div>
        </div>
        {interval.map((item) => (
          <TabsContent className="h-full" key={item} value={item}>
            <UserManagementTable headers={headers} data={data} className="" />
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  );
}
