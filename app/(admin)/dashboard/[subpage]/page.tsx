"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Command, CommandInput } from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from "@/components/charts/BarChart";
import RevenueTable from "@/components/payout-and-wallets/RevenueTable";
import { data } from "@/components/app-sidebar";
import RidesAndOrders from "@/components/payout-and-wallets/RidesAndOrders";
import TransactionHistory from "@/components/payout-and-wallets/TransactionHistory";
import SubscriptionSetting from "@/components/payout-and-wallets/SubscriptionSetting";
import Revenue from "@/components/payout-and-wallets/Revenue";

export default function Dashboard() {
  const { subpage } = useParams();
  const [currentTab, setCurrentTab] = useState<null | string>("");
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const subpageHeader = decodeURIComponent(subpage?.toString() || "");
  const [subpageTabs] = data.navMain.filter(
    (item) => item.title === subpageHeader
  );
  const router = useRouter();

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);

  // Update query string when tab changes
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push("?" + params.toString());
  };
  return (
    <div className="flex flex-col">
      <Command>
        <header className="text-primary-dark bg-background h-28 flex justify-between items-center px-10">
          <h2 className="text-5xl font-semibold">{subpageHeader}</h2>
          <CommandInput placeholder="Search" className="w-1/4" />
        </header>
      </Command>
      <Tabs
        value={currentTab ?? ""}
        onValueChange={handleTabChange}
        className="bg-white min-h-96"
      >
        {/* Tab List */}
        <div className="flex flex-col no-scrollbar overflow-x-auto">
          <TabsList className="bg-inherit  p-5 pb-0 rounded-none h-full ">
            {subpageTabs?.items.map(({ url }) => (
              <TabsTrigger
                className="!capitalize cursor-pointer shrink-0  !text-lg  text-gray-400 data-[state=active]:bg-inherit data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:rounded-none data-[state=active]:shadow-none "
                key={url}
                value={url}
              >
                {url}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="data-[orientation=horizontal]:!w-[90vw]" />
        </div>

        {/* Tab Content */}
        <Revenue />
        <RidesAndOrders />
        <TransactionHistory />
        <SubscriptionSetting />
      </Tabs>
    </div>
  );
}
