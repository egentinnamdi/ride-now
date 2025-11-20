import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown } from "lucide-react";

export default function DateInput({
  handleDateChange,
  date,
  label,
}: {
  handleDateChange: (date: Date) => void;
  date: Date | undefined;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex cursor-pointer items-center gap-1">
        <h2
          className={`${
            date
              ? "bg-indigo-400 text-white px-6 py-2 rounded-sm  font-semibold"
              : "text-gray-400 text-sm"
          }`}
        >
          {date
            ? date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : label}
        </h2>
        <ChevronDown size={20} className="text-primary " />
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            handleDateChange(date ?? new Date());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
