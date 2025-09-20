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

type TableType = {
  headers: Array<string>;
  data: Array<{
    id: string;
    day: string;
    customer?: string;
    type?: string;
    location?: string;
    revenue?: number;
    amount?: number;
    status?: string;
  }>;
};

const className = "py-6 text-base text-gray-500 capitalize font-semibold";
export default function RevenueTable({ headers, data }: TableType) {
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
        {data.map((header) => (
          <TableRow key={header.id}>
            <TableCell className={cn(className)}>{header.id}</TableCell>
            <TableCell className={cn(className)}>{header.day}</TableCell>
            {header.customer && (
              <TableCell className={cn(className)}>{header.customer}</TableCell>
            )}
            {header.location && (
              <TableCell className={cn(className)}>
                <span className="bg-green-100 px-6 py-1.5 rounded-md capitalize text-gray-600">
                  {header.location}
                </span>
              </TableCell>
            )}
            {header.type && (
              <TableCell className={cn(className)}>{header.type}</TableCell>
            )}
            {header.revenue && (
              <TableCell className={cn("pl-10", className)}>
                {header.revenue.toLocaleString()}
              </TableCell>
            )}
            {header.amount && (
              <TableCell className={cn("pl-10", className)}>
                {header.amount.toLocaleString()}
              </TableCell>
            )}
            {header.status && (
              <TableCell className={cn(className)}>
                <span className="bg-green-100 px-6 py-1.5 rounded-md capitalize text-gray-600">
                  {header.status}
                </span>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
