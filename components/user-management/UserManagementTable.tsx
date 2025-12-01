import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import PaginationComponent from "../ui/PaginationComponent";
import { useQuery } from "@/hooks/useQuery";
import {
  PendingApproval,
  PendingApprovalsDto,
  SuspendedAccountsDto,
} from "@/types/userManagement";
import { Skeleton } from "../ui/skeleton";
import { NoTransactions } from "../multi-page/NoTransactions";

export default function UserManagementTable({
  headers,
  className,
  queryKey,
  endpoint,
  type,
}: {
  headers: Array<string>;
  className?: string;
  queryKey: string;
  endpoint: string;
  type: string;
}) {
  const [page, setPage] = useState<number>(1);
  const { data: result, isLoading } = useQuery<
    PendingApprovalsDto | SuspendedAccountsDto
  >(queryKey, endpoint, {
    limit: "10",
    page: page.toString(),
  });

  const tableData =
    (result &&
      (queryKey === "suspended-accounts"
        ? (result as SuspendedAccountsDto).suspendedAccounts.filter(
            (item) => item.userType === type
          )
        : (result as PendingApprovalsDto).pendingApprovals.filter(
            (item) => item.userType === type
          ))) ||
    [];

  const hasData = tableData.length > 0;

  return isLoading || hasData ? (
    <Table className="bg-background/10 rounded-2xl px-10 py-5">
      <TableHeader>
        <TableRow className="border-none">
          {headers?.map((header) => (
            <TableHead
              key={header}
              className="text-primary w-32 py-6 font-bold text-base"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-none">
              {headers.map((item) => (
                <TableCell
                  key={item}
                  className="font-medium text-gray-400 py-5 pl-3 text-base"
                >
                  <Skeleton className="h-4 w-full bg-gray-400/30" />
                </TableCell>
              ))}
            </TableRow>
          ))
        : tableData.map((item) => (
            <TableBody key={(item as { id?: string }).id}>
              <TableRow className="border-none">
                {Object.keys(item).map((cellKey, index) => (
                  <TableCell
                    className={cn(
                      "py-6 text-sm text-gray-500 capitalize font-semibold",
                      className
                    )}
                    key={index}
                  >
                    {cellKey === "userType" && (
                      <span className="text-green-600 border px-6 py-1.5 rounded-sm border-green-600 bg-green-600/5">
                        {String(item[cellKey as keyof typeof item])}
                      </span>
                    )}
                    {(cellKey === "dateSubmitted" ||
                      cellKey === "dateSuspended") &&
                      new Date(
                        String(item[cellKey as keyof typeof item])
                      ).toDateString()}
                    {cellKey !== "userType" &&
                      cellKey !== "dateSubmitted" &&
                      cellKey !== "dateSuspended" &&
                      String(item[cellKey as keyof typeof item])}
                  </TableCell>
                ))}
                {headers.includes("Action") && (
                  <TableCell>
                    <EllipsisVertical
                      className="text-primary ml-3 text-md"
                      size={17}
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          ))}
      <TableFooter>
        {result?.pagination && result?.pagination.totalPages > 1 && (
          <PaginationComponent
            currentPage={result?.pagination.page}
            totalPages={result?.pagination.totalPages}
            onPageChange={(pageNumber) => setPage(pageNumber)}
          />
        )}
      </TableFooter>
    </Table>
  ) : (
    <NoTransactions
      queryKeys={[queryKey]}
      message={`${type} ${
        queryKey === "suspended-accounts" ? "suspended accounts" : "approvals"
      }`}
    />
  );
}
