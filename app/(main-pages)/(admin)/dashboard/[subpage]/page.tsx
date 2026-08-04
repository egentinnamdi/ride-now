"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Command, CommandInput } from "@/components/ui/command";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from "@/components/app-sidebar";
import RidesAndOrders from "@/components/payout-and-wallets/RidesAndOrders";
import TransactionHistory from "@/components/payout-and-wallets/TransactionHistory";
import SubscriptionSetting from "@/components/payout-and-wallets/SubscriptionSetting";
import Revenue from "@/components/payout-and-wallets/Revenue";
import PayoutsOverview from "@/components/payout-and-wallets/PayoutsOverview";
import CommissionSettings from "@/components/payout-and-wallets/CommissionSettings";
import TotalUsers from "@/components/user-management/TotalUsers";
import ViewAndManage from "@/components/user-management/ViewAndManage";
import PendingApprovals from "@/components/user-management/PendingApprovals";
import SuspendedAccounts from "@/components/user-management/SuspendedAccounts";
import AddCoupon from "@/components/coupon-management/AddCoupon";
import { SigninResponseDto } from "@/types/auth";
import Rides from "@/components/orders-and-trips/Rides";
import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/lib/endpoints";
import { UserSummaryDto } from "@/types/userManagement";
import PendingPayouts from "@/components/payout-and-wallets/PendingPayouts";
import { NotificationBell } from "@/components/multi-page/NotificationBell";

const rides = [
  { title: "ongoing orders/rides", status: "in_progress" },
  { title: "completed orders/rides", status: "completed" },
  { title: "cancellations", status: "cancelled" },
];

export default function Dashboard() {
  const { subpage } = useParams();
  const [currentTab, setCurrentTab] = useState<null | string>("");
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const subpageHeader = decodeURIComponent(subpage?.toString() || "");
  const [subpageTabs] = data.navMain.filter(
    (item) => item.title === subpageHeader,
  );
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const router = useRouter();
  const [[timeframe], setTimeframe] = useState<Array<string>>(["monthly"]);
  const { data: summary, isLoading } = useQuery<UserSummaryDto>(
    "users-summary",
    endpoints.admin.users.summary,
    { timeframe },
  );

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
        <header className="text-primary-dark bg-background h-28 gap-5 flex justify-between items-center px-10">
          <h2 className="text-5xl flex-1 font-semibold">{subpageHeader}</h2>
          <CommandInput placeholder="Search" className="w-1/4" />
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </header>
        <Tabs
          value={currentTab ?? ""}
          onValueChange={handleTabChange}
          className="bg-whit "
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
                  <div className="flex gap-2 items-center">
                    {url === "ongoing orders/rides" && (
                      <>
                        <span>{url}</span>
                        <span className="bg-green-500 rounded-2xl min-w-7 text-white text-xs p-1.5">
                          {totalOngoing}
                        </span>
                      </>
                    )}
                    {url === "cancellations" && (
                      <>
                        <span>{url}</span>
                        <span className="bg-red-600 rounded-2xl min-w-7 text-white text-xs p-1.5">
                          {totalCancelled}
                        </span>
                      </>
                    )}
                  </div>
                  {url !== "ongoing orders/rides" &&
                    url !== "cancellations" &&
                    url}
                </TabsTrigger>
              ))}
            </TabsList>
            <Separator className="data-[orientation=horizontal]:!w-[90vw]" />
          </div>
          {/* Payouts & Wallets*/}
          <Revenue />
          <PayoutsOverview />
          <RidesAndOrders />
          <TransactionHistory />
          <PendingPayouts />
          <SubscriptionSetting />
          <CommissionSettings />
          {/* User Management */}
          <TotalUsers
            handleTimeframeChange={(val) => setTimeframe(val)}
            isLoading={isLoading}
            summary={summary}
          />
          <ViewAndManage summary={summary} isLoading={isLoading} />
          <PendingApprovals />
          <SuspendedAccounts />

          {/* Orders and Trips */}
          {rides.map(({ title, status }) => (
            <Rides
              title={title}
              status={status}
              key={title}
              updateTotal={(total) =>
                status === "in_progress"
                  ? setTotalOngoing(total)
                  : setTotalCancelled(total)
              }
            />
          ))}

          {/* Coupon Management */}
          <AddCoupon />
        </Tabs>
      </Command>
    </div>
  );
}
