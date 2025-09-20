import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="min-h-20 flex items-center justify-between text-2xl font-semibold">
      <div className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="logo"
          width={700}
          height={700}
          className="size-7"
        />
        <div>
          <span>ridenow</span>
        </div>
      </div>
      <div className="rounded-full size-6 bg-gray-200"></div>
    </div>
  );
}
