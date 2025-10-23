import React from "react";
import TableTitle from "./TableTitle";
import { ChevronDown } from "lucide-react";

export default function Transactions({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-7 mt-7">
      <TableTitle
        title={title}
        action={
          <>
            <span className="text-gray-500">location</span>
            <ChevronDown />
            <span className="text-gray-500">month</span>
            <ChevronDown />
          </>
        }
      />
      {children}
    </div>
  );
}
