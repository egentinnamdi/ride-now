import React from "react";
import { TabsContent } from "../ui/tabs";
import RidesTable from "./RidesTable";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";

const headers = [
  "iD",
  "started",
  "ended",
  "driver",
  "passenger",
  "location",
  "transaction amount",
  "status",
];

const data = [
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
  {
    id: "#11156778",
    started: "11:56 AM",
    ended: "12:30 PM",
    driver: "ella nwaogu",
    passenger: "cynthia agbo",
    location: "abuja",
    transactionAmount: 11350,
    status: "cancelled",
  },
];

export default function Cancellations() {
  return (
    <TabsContent value="cancellations" className="p-10 flex flex-col ">
      <RidesTable<(typeof data)[0]>
        tableData={data}
        headerItems={headers}
        title="cancelled rides/orders"
        className="bg-red-400 text-white"
      >
        <div className="flex justify-end items-center gap-6 min-w-2/4 font-medium">
          <span className="text-background">Filter by:</span>
          <ChevronDown size={20} className="text-primary" />
          <span className="text-gray-500">location</span>
          <span className="text-gray-600 px-6 py-2 rounded-sm font-semibold bg-pink-300">
            Abuja
          </span>
          <span className="text-gray-500">type</span>
          <span className="px-6 py-2 rounded-sm text-white font-semibold bg-indigo-400">
            ride
          </span>
          <Download size={17} className="text-primary ml-2" />
          <EllipsisVertical size={17} className="text-primary" />
        </div>
      </RidesTable>
    </TabsContent>
  );
}
