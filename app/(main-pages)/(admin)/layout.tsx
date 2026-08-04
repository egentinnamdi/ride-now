"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useInjectAccessToken } from "@/hooks/useInjectAccessToken";
import { MobileBlocker } from "@/components/utility/MobileBlocker";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Injects the access token to every request that would be made
  useInjectAccessToken();
  return (
    <>
      <MobileBlocker />
      <SidebarProvider className="hidden md:flex h-screen">
        <AppSidebar />
        <SidebarInset className="overflow-y-auto bg-white">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
