"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ManagementItem from "./ManagementItem";
import TableTitle from "../payout-and-wallets/TableTitle";
import { Button } from "../ui/button";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import RevenueTable from "../payout-and-wallets/RevenueTable";
import DriverInfo from "./DriverInfo";

const items = ["drivers", "riders", "passengers"];

const tableHeaders = [
  "ID",
  "Name",
  "Type",
  "Rides Completed",
  "Average Rating",
  "Status",
  "Action",
];

const tableData = [
  {
    id: "11156778",
    name: "Kelechi Dure",
    type: "Premium",
    ["rides completed"]: 240,
    ["average rating"]: 4.9,
    status: "Successful",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156771",
    name: "Ella Nwaogu",
    type: "Regular",
    ["rides completed"]: 180,
    ["average rating"]: 4.5,
    status: "Pending",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156772",
    name: "Chioma Okafor",
    type: "Regular",
    ["rides completed"]: 96,
    ["average rating"]: 4.1,
    status: "Declined",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156773",
    name: "Emeka Uche",
    type: "Premium",
    ["rides completed"]: 305,
    ["average rating"]: 4.8,
    status: "Successful",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156774",
    name: "Adaeze Nwosu",
    type: "Regular",
    ["rides completed"]: 120,
    ["average rating"]: 4.3,
    status: "Successful",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156775",
    name: "Tunde Afolabi",
    type: "Premium",
    ["rides completed"]: 275,
    ["average rating"]: 4.7,
    status: "Successful",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
  {
    id: "11156776",
    name: "Ngozi Obi",
    type: "Regular",
    ["rides completed"]: 150,
    ["average rating"]: 4.6,
    status: "Successful",
    action: (
      <EllipsisVertical className="text-primary ml-3 text-md" size={20} />
    ),
  },
];

export default function ViewAndManage() {
  const [{ id, show }, setSeeDriver] = useState<{ id: string; show: boolean }>({
    id: "",
    show: true,
  });

  function toggleDriverInfo(id: string) {
    setSeeDriver({ id, show: !show });
  }
  return (
    <TabsContent className=" min-h-[50vh] px-10 py-5" value="view and manage">
      {show ? (
        <DriverInfo id={id} toggleDriverInfo={toggleDriverInfo} />
      ) : (
        <Tabs defaultValue="drivers" className="space-y-7">
          <TabsList className=" w-full flex gap-2 py-8 px-1.5 bg-background/20 h-14">
            {items.map((item) => (
              <TabsTrigger
                className="!capitalize data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-400 font-semibold !text-lg"
                value={item}
                key={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            <div className="flex gap-7 h-[35vh] ">
              <ManagementItem
                total={210000}
                text="commission drivers"
                className="w-1/3 justify-between"
                hiddenBtn={true}
              />
              <ManagementItem
                total={24567}
                text="subscribed drivers"
                className="w-1/3 justify-between"
                hiddenBtn={true}
              />
              <div className="w-1/3  flex flex-col gap-7">
                <ManagementItem
                  total={23678}
                  text="total rides completed"
                  className="h-2/4"
                  hiddenAvatar={true}
                  hiddenBtn={true}
                />
                <ManagementItem
                  total={3.8}
                  text="avg driver rating"
                  className="h-2/4 bg-orange-300/20 text-orange-500"
                  hiddenAvatar={true}
                  hiddenBtn={true}
                />
              </div>
            </div>
          </div>
          <div className="capitalize space-y-9 mt-7">
            <TableTitle
              title="all drivers"
              action={
                <>
                  <span className="text-gray-500">type</span>
                  <ChevronDown className="text-primary" />
                  <Button
                    className="text-green-600 border border-green-600 bg-green-600/5"
                    variant="outline"
                  >
                    Subscriber
                  </Button>
                </>
              }
            />
            <RevenueTable headers={tableHeaders} data={tableData} />
          </div>
        </Tabs>
      )}
    </TabsContent>
  );
}
