import React from "react";
import { Download, EllipsisVertical } from "lucide-react";

export default function TableTitle({
  title,
  action,
}: {
  title: string;
  action: React.ReactNode;
}) {
  return (
    <div className=" flex justify-between">
      <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center capitalize font-semibold text-background gap-3 px-4">
        <span>Filter by:</span>
        {action}
        <Download size={17} className="text-primary ml-2" />
        <EllipsisVertical size={17} className="text-primary" />
      </div>
    </div>
  );
}
