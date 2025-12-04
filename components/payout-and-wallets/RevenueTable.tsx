import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { NoTransactions } from "../multi-page/NoTransactions";
import { Skeleton } from "../ui/skeleton";
import { EllipsisVertical } from "lucide-react";

type TableType<T> = {
  headerItems: Array<string>;
  tableData: Array<T>;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  showDriver?: (id: string) => void;
};

export default function RevenueTable<T>({
  headerItems,
  title,
  tableData,
  children,
  className,
  isLoading,
  showDriver,
}: TableType<T>) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex bg-amber-500 flex-c capitalize items-center px-3">
        <h3 className="flex-1 font-medium text-xl">{title}</h3>
        {children}
      </div>
      {isLoading ? (
        <Table className="bg-background/10 p-5 rounded-sm">
          <TableHeader>
            <TableRow className="capitalize">
              {headerItems.map((item) => (
                <TableHead
                  className="text-primary text-center py-7 text-base"
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
      ) : !tableData?.length ? (
        <NoTransactions />
      ) : (
        <Table className="bg-background/10 p-5 rounded-sm">
          <TableHeader>
            <TableRow className="capitalize">
              {headerItems.map((item) => (
                <TableHead
                  className="text-primary px-8  py-7 text-xs font-semibold"
                  key={item}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((cell, index) => (
              <TableRow
                className="cursor-pointer"
                onClick={() => showDriver?.((cell as { id: string }).id)}
                key={index}
              >
                {Object.keys(cell as Record<string, string | number>).map(
                  (item) => (
                    <TableCell
                      key={item}
                      className="font-medium  capitalize text-gray-400 py-5  text-xs"
                    >
                      {item === "requestDate" && (
                        <span className="text-gray-600 px-6   font-semibold">
                          {new Date(
                            String(cell[item as keyof T])
                          ).toDateString()}
                        </span>
                      )}
                      {item !== "requestDate" && (
                        <span
                          className={cn(
                            "text-gray-600 px-7 py-2 rounded-sm font-semibold",
                            className
                          )}
                        >
                          {String(cell[item as keyof T])}
                        </span>
                      )}
                      {item === "action" && (
                        <div className=" flex justify-center">
                          <EllipsisVertical
                            className="text-primary  text-md"
                            size={17}
                          />
                        </div>
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
