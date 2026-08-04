import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { NoTransactions } from "../multi-page/NoTransactions";
import { Skeleton } from "../ui/skeleton";

export default function RidesTable<T>({
  headerItems,
  title,
  tableData,
  children,
  className,
  isLoading,
  status,
}: {
  headerItems: Array<string>;
  title: string;
  tableData: Array<T>;
  children: React.ReactNode;
  status: string;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex  capitalize items-center px-3">
        <h3 className="flex-1 font-medium text-xl">{title}</h3>
        {children}
      </div>
      {isLoading ? (
        <Table className=" p-5 rounded-sm bg-background/10">
          <TableHeader>
            <TableRow className="capitalize ">
              {headerItems.map((item) => (
                <TableHead
                  className="text-primary text-center  py-7 text-base"
                  key={item}
                >
                  <Skeleton className="h-5 w-20 mx-auto bg-gray-300" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {headerItems.map((item) => (
                  <TableCell
                    key={item}
                    className="font-medium text-center capitalize text-gray-400 py-5 pl-3 text-xs"
                  >
                    <Skeleton className="h-5 w-20 mx-auto bg-gray-300" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : !tableData.length ? (
        <NoTransactions />
      ) : (
        <Table className="bg-background/10 p-5 rounded-sm ">
          <TableHeader>
            <TableRow className="capitalize ">
              {headerItems.map((item) => (
                <TableHead
                  className="text-primary text-center  py-7 text-xs font-semibold"
                  key={item}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((cell, index) => (
              <TableRow key={index}>
                {Object.keys(cell as Record<string, string | number>).map(
                  (item) => (
                    <TableCell
                      key={item}
                      className="font-medium text-center capitalize  text-gray-400 py-5 pl-3 text-xs"
                    >
                      <span
                        className={cn(
                          "text-gray-600 px-6 py-2 rounded-sm font-semibold w-24  text-ellipsis",
                          item === "location" && "bg-pink-300",
                          item === "status" &&
                            status === "cancelled" &&
                            "bg-red-400 text-white",
                          item === "status" &&
                            status === "in_progress" &&
                            "bg-orange-200",
                          item === "status" &&
                            status === "completed" &&
                            "bg-green-200",
                          item !== "location" && item !== "status" && "px-0",
                          className,
                        )}
                      >
                        {String(cell[item as keyof T])}
                      </span>
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
