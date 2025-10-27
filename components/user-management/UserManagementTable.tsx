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
import { EllipsisVertical } from "lucide-react";

export default function UserManagementTable<T>({
  headers,
  data,
  className,
}: {
  headers: Array<string>;
  data: Array<T>;
  className?: string;
}) {
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
            {Object.keys(item as Record<string, string>).map((cell, index) => (
              <TableCell
                className={cn(
                  "py-6 text-base text-gray-500 capitalize font-semibold",
                  className
                )}
                key={index}
              >
                {cell === "type" && (
                  <span className="text-green-600 border px-6 py-1.5 rounded-sm border-green-600 bg-green-600/5">
                    {String(item[cell as keyof T])}
                  </span>
                )}
                {cell !== "type" && String(item[cell as keyof T])}
              </TableCell>
            ))}
            <TableCell>
              <EllipsisVertical
                className="text-primary ml-3 text-md"
                size={20}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
