import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Text from "../utility/Text";
import { PieChartRing } from "../charts/PieChartRing";
import ManagementItem from "./ManagementItem";

const timeInterval = ["all-time", "yearly", "monthly", "weekly"];
export default function TotalUsers() {
  return (
    <TabsContent className=" min-h-[50vh]" value="total number of users">
      <Tabs className="p-10 space-y-7" defaultValue="all-time">
        <div>
          <TabsList className="!capitalize">
            {timeInterval.map((interval) => (
              <TabsTrigger
                className="!capitalize"
                value={interval}
                key={interval}
              >
                {interval}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="  gap-7 flex ">
          <div className="border border-background p-7 bg-background/30 rounded-2xl w-2/5">
            {/* Total Users Title */}
            <div className="flex flex-col gap-1">
              <Text text="total users" />
              <span className="text-5xl text-primary font-bold">
                {(989567).toLocaleString()}
              </span>
            </div>
            {/* Pie Chart */}
            <div>
              <PieChartRing />
            </div>
          </div>
          {/* Daily Active Users */}
          <div className="bg-background/30 border flex flex-col  justify-between border-background p-6 rounded-2xl w-3/5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <Text text="daily active users" />
              <span className="text-3xl text-primary font-bold">
                {(53000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="grid min-h-[50vh] grid-cols-2 grid-rows-2 gap-10">
          <ManagementItem total={567900} text="riders" />
          <ManagementItem total={210000} text="commission drivers" />
          <ManagementItem total={24567} text="subscribed drivers" />
          <ManagementItem total={187100} text="vendors" />
        </div>
      </Tabs>
    </TabsContent>
  );
}
