import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

const interval = ["monthly", "weekly", "daily", "all-time"];

const headers = ["ID", "Name", "Type", "Date Submitted", "Status", "Action"];

const data = [
  {
    id: "11156778",
    name: "Kelechi Dure",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "11,350",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156771",
    name: "Ella Nwaogu",
    type: "Rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156772",
    name: "Chioma Okafor",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "11,350",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156773",
    name: "Emeka Uche",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156774",
    name: "Adaeze Nwosu",
    type: "vendor",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156775",
    name: "Tunde Afolabi",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156776",
    name: "Ngozi Obi",
    type: "rider",
    ["date submitted"]: "31st May, 2025",
    status: "6570.90",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
];
const className = "py-6 text-base text-gray-500 capitalize font-semibold";
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
                className="capitalize text-background text-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:h-16"
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
            <ChevronDown className="text-primary" />
            <Button className="text-gray-600  bg-green-100">Order</Button>
            <Download size={17} className="text-primary ml-2" />
            <EllipsisVertical size={17} className="text-primary" />
          </div>
        </div>
        {interval.map((item) => (
          <TabsContent className="h-full" key={item} value={item}>
            <Table className="bg-background/10 rounded-2xl px-10 py-5">
              <TableHeader>
                <TableRow>
                  {headers?.map((header) => (
                    <TableHead
                      key={header}
                      className="text-primary w-32 py-6 font-bold text-base"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={(item as { id?: string }).id ?? JSON.stringify(item)}
                  >
                    <TableCell className={cn(className)}>{item.id}</TableCell>
                    <TableCell className={cn(className)}>{item.name}</TableCell>
                    <TableCell className={cn(className)}>
                      <span className="text-green-600 border px-6 py-1.5 rounded-md border-green-600 bg-green-600/5">
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className={cn(className)}>
                      {item["date submitted"]}
                    </TableCell>
                    <TableCell className={cn(className)}>
                      {item.status}
                    </TableCell>
                    <TableCell className={cn(className)}>
                      {item.action}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  );
}
