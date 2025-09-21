"use client";
import * as React from "react";
import { ChevronRight, CircleDollarSign, Grid2X2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./multi-page/Logo";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// This is sample data.
export const data = {
  navMain: [
    {
      icon: CircleDollarSign,
      title: "Payouts & Wallets",
      url: "#",
      items: [
        {
          title: "Total Revenue",
          url: "revenue",
        },
        {
          title: "Total Rides & Orders",
          url: "rides and orders",
        },
        {
          title: "Transaction History",
          url: "transaction history",
        },
        {
          title: "Earnings Breakdown",
          url: "earning breakdown",
        },
        {
          title: "Pending Payouts",
          url: "pending payouts",
        },
        {
          title: "Subscription Settings",
          url: "subscription settings",
        },
        {
          title: "Commission Settings",
          url: "commission settings",
        },
        {
          title: "Delivery Price",
          url: "delivery price",
        },
      ],
    },
    {
      icon: Grid2X2,
      title: "User Management",
      url: "#",
      items: [
        {
          title: "Total Number of Users",
          url: "total number of users",
        },
        {
          title: "View & Manage",
          url: "view and manage",
        },
        {
          title: "Pending Approval",
          url: "pending approval",
        },
        {
          title: "Suspended Accounts",
          url: "suspended accounts",
        },
        {
          title: "Appeals",
          url: "appeals",
        },
      ],
    },
    {
      icon: Grid2X2,
      title: "Orders & Tips",
      url: "#",
      items: [
        {
          title: "Ongoing Orders / Rides",
          url: "ongoing rides",
        },
        {
          title: "completed Orders / Rides",
          url: "completed rides",
        },
        {
          title: "Cancellations & Reasons",
          url: "cancellations",
        },
      ],
    },
    {
      icon: Grid2X2,
      title: "Coupon Management",
      url: "#",
      items: [
        {
          title: "Add a Coupon",
          url: "#",
        },
        {
          title: "All Coupons",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <Sidebar
      {...props}
      className="!bg-primary px-4 min-w-[20vw] min-h-screen overflow-y-auto no-scrollbar group-data-[collapsible=icon]:overflow-y-hidden"
    >
      <SidebarHeader className="font-semibold">
        <Logo />
        <div className="flex mt-5 mb-3 items-center text-lg gap-2">
          <Grid2X2 />
          <span>Overview</span>
        </div>
        <Separator />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((navItem) => (
          <Collapsible
            key={navItem.title}
            title={navItem.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground"
              >
                <CollapsibleTrigger className="!text-lg gap-2 !py-4 flex items-center">
                  <navItem.icon size={35} />
                  {navItem.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="mt-5">
                  <SidebarMenu className="space-y-3">
                    {navItem.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className="hover:!bg-gray-300 data-[active=true]:!bg-gray-300 data-[active=true]:!font-bold  !h-11 text-base text-gray-300"
                          asChild
                          isActive={tab === item.url ? true : false}
                        >
                          <Link
                            href={`/dashboard/${navItem.title}?tab=${item.url}`}
                          >
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
