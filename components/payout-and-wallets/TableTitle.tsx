import React from "react";
import {
  // CarFront,
  ChevronDown,
  Download,
  EllipsisVertical,
} from "lucide-react";

export default function TableTitle({ title }: { title: string }) {
  return (
    <div className=" flex justify-between">
      <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center capitalize font-semibold text-background gap-3 px-4">
        <span>Filter by:</span>
        <span className="text-gray-500">location</span>
        <ChevronDown />
        <span className="text-gray-500">month</span>
        <ChevronDown />
        <Download size={17} className="text-primary ml-2" />
        <EllipsisVertical size={17} className="text-primary" />
      </div>
    </div>
  );
}
