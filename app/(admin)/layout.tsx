"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="overflow-y-auto">{children}</SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
