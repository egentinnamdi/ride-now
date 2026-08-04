import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { endpoints } from "@/lib/endpoints";

import UserManagementTable from "./UserManagementTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const interval = ["monthly", "weekly", "daily", "all-time"];

const headers = ["ID", "Name", "Type", "Date Suspended", "Reason", "Action"];

const className = "py-6 text-base text-gray-500 capitalize font-semibold";
export default function SuspendedAccounts() {
  const [type, setType] = useState("driver");

  return (
    <TabsContent value="suspended accounts" className="p-10 space-y-9">
      <h2 className="text-2xl font-semibold text-gray-600">
        Suspended Accounts
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
            <Select value={type} onValueChange={(val) => setType(val)}>
              <SelectTrigger className="shadow-none capitalize border-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Type</SelectLabel>
                  {["driver", "rider", "vendor", "admin"].map((item) => (
                    <SelectItem key={item} className="capitalize" value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {interval.map((item) => (
          <TabsContent className="h-full" key={item} value={item}>
            <UserManagementTable
              queryKey="suspended-accounts"
              endpoint={endpoints.admin.users.suspended}
              headers={headers}
              type={type}
              className=""
            />
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  );
}
