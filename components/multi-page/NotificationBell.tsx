"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { NoTransactions } from "./NoTransactions";
import PaginationComponent from "../ui/PaginationComponent";
import { useAdminNotifications } from "@/hooks/admin/useAdminNotifications";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminNotifications({ page, limit: 10 });

  const unreadCount = data?.notifications.filter((n) => !n.read).length ?? 0;
  const hasNotifications = (data?.notifications.length ?? 0) > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative size-11 rounded-full p-0">
          <Bell className="text-primary" size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 size-2.5 rounded-full bg-red-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="px-4 py-3 border-b font-semibold text-gray-700">
          Notifications
        </div>
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !hasNotifications ? (
            <NoTransactions
              message="Notifications"
              btnText="Refresh"
              queryKeys={["admin-notifications"]}
            />
          ) : (
            data?.notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "px-4 py-3 border-b flex flex-col gap-1",
                  !notification.read && "bg-primary/5",
                )}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={cn(
                      "text-sm text-gray-700",
                      !notification.read && "font-bold",
                    )}
                  >
                    {notification.userName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.date).toDateString()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {notification.message}
                </span>
              </div>
            ))
          )}
        </div>
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="p-2">
            <PaginationComponent
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
