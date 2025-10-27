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

export default function RidesTable<T>({
  headerItems,
  title,
  tableData,
  children,
  className,
}: {
  headerItems: Array<string>;
  title: string;
  tableData: Array<T>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex  capitalize items-center px-3">
        <h3 className="flex-1 font-medium text-xl">{title}</h3>
        {children}
      </div>

      <Table className="bg-background/10 p-5 rounded-sm ">
        <TableHeader>
          <TableRow className="capitalize ">
            {headerItems.map((item) => (
              <TableHead
                className="text-primary text-center  py-7 text-base"
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
                    className="font-medium text-center capitalize text-gray-400 py-5 pl-3 text-base"
                  >
                    {item === "location" && (
                      <span className="text-gray-600 px-6 py-2 rounded-sm font-semibold bg-pink-300">
                        {String(cell[item as keyof T])}
                      </span>
                    )}
                    {item === "status" && (
                      <span
                        className={cn(
                          "text-gray-600 px-6 py-2 rounded-sm font-semibold bg-green-200",
                          className
                        )}
                      >
                        {String(cell[item as keyof T])}
                      </span>
                    )}
                    {item !== "location" &&
                      item !== "status" &&
                      String(cell[item as keyof T])}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
