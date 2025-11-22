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
import { PendingApproval, PendingApprovalsDto } from "@/types/userManagement";
import { Skeleton } from "../ui/skeleton";
import NoTransactions from "../multi-page/NoTransactions";

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
  endpoint:string;
  type:string
}) {
  const [page, setPage] = useState<number>(1);
  const { data: result, isLoading } = useQuery<PendingApprovalsDto>(
    queryKey,
    endpoint,
    {
      limit: "10",
      page: page.toString(),
    }
  );
  return (
    <Table className="bg-background/10 rounded-2xl px-10 py-5">
      <TableHeader>
        <TableRow>
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
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
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
          : result?.pendingApprovals && result?.pendingApprovals.filter(item => item.userType.includes(type)).length > 0
          ? result?.pendingApprovals.filter(item => item.userType.includes(type)).map((item) => (
              <TableRow
                key={(item as { id?: string }).id ?? JSON.stringify(item)}
              >
                {Object.keys(item as Record<string, string>).map(
                  (cell, index) => (
                    <TableCell
                      className={cn(
                        "py-6 text-sm text-gray-500 capitalize font-semibold",
                        className
                      )}
                      key={index}
                    >
                      {cell === "userType" && (
                        <span className="text-green-600 border px-6 py-1.5 rounded-sm border-green-600 bg-green-600/5">
                          {String(item[cell as keyof PendingApproval])}
                        </span>
                      )}
                      {cell === "dateSubmitted" &&
                        new Date(
                          String(item[cell as keyof PendingApproval])
                        ).toDateString()}
                      {cell !== "userType" &&
                        cell !== "dateSubmitted" &&
                        String(item[cell as keyof PendingApproval])}
                    </TableCell>
                  )
                )}
                <TableCell>
                  <EllipsisVertical
                    className="text-primary ml-3 text-md"
                    size={17}
                  />
                </TableCell>
              </TableRow>
            ))
          : <NoTransactions colSpan={headers.length} />}
      </TableBody>
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
  );
}
