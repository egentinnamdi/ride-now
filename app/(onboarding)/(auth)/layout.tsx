import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen relative">
      {/* Background layer */}
      <div className="absolute justify-end gap-30  inset-0 -z-10 flex flex-col ">
        <div className=" w-full">
          <Image
            src="/wave-text.png"
            alt="wave-text"
            width={800}
            height={800}
            className="size-full object-cover"
          />
        </div>
        <div className="w-full">
          <Image
            src="/wave-design.png"
            alt="wave-design"
            width={700}
            height={700}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Foreground layer */}
      {children}
    </div>
  );
}
