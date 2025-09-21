import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">{children}</SidebarInset>
    </SidebarProvider>
  );
}
