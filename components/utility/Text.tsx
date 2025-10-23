import { cn } from "@/lib/utils";
import React from "react";

export default function Text({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={cn("capitalize text-gray-500  font-semibold", className)}>
      {text}
    </span>
  );
}
