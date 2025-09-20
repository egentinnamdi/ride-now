import React from "react";
import TableTitle from "./TableTitle";

export default function Transactions({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-7 mt-7">
      <TableTitle title={title} />
      {children}
    </div>
  );
}
