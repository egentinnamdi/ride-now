import { Spinner } from "@/components/ui/spinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="size-9" />
    </div>
  );
}
