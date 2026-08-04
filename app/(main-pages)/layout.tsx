"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MobileBlocker } from "@/components/utility/MobileBlocker";

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MobileBlocker />
      {children}
    </QueryClientProvider>
  );
}
