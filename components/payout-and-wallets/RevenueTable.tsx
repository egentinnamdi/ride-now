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

type TableType<T> = {
  headers: Array<string>;
  data: Array<T>;
};

const className = "py-6 text-base text-gray-500 capitalize font-semibold";
export default function RevenueTable<T>({ headers, data }: TableType<T>) {
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
        {data.map((item) => (
          <TableRow key={(item as { id?: string }).id ?? JSON.stringify(item)}>
            {Array.from({ length: headers.length }).map((_, index) => {
              const header = headers[index].toLowerCase() as keyof T;
              return (
                <TableCell className={cn(className)} key={headers[index]}>
                  {header === "action"
                    ? (item[header] as React.ReactNode)
                    : String(item[header] ?? "")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
