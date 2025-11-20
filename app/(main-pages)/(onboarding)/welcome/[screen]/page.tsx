"use client";
import AnimateSlideIn from "@/components/multi-page/AnimateSlideIn";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function Welcome() {
  const router = useRouter();
  const { screen } = useParams();
  const current = Number(screen);
  console.log(current);

  return (
    <AnimateSlideIn>
      <div className="h-3/5">
        <Image
          src={`/welcome/screen-${current}.png`}
          alt="welcome"
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>
      <div className="px-4 flex-1 flex flex-col justify-between">
        <div className=" space-y-3">
          <h2 className="text-3xl font-medium">
            {current === 1 && "Safer rides with community sharing."}
            {current === 2 && "Negotiate your ride process."}
            {current === 3 && "Earn 100% of your fees. No cuts."}
          </h2>
          <p className="leading-normal">
            {current === 1 &&
              "Let loved ones track your trips in real time for added peace of mind."}
            {current === 2 &&
              "Set your fare and agree on what works best for you and the driver."}
            {current === 3 &&
              "Set your fare and agree on what works best for you and the driver."}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-7 py-4 px-2">
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-1/3 h-2.5 rounded-full  ${
                  index + 1 <= current ? "bg-primary" : "bg-primary/30"
                }`}
              ></div>
            ))}
          </div>
          <Button
            onClick={() => {
              if (current === 3) {
                router.push("/sign-up");
              } else {
                router.push(`/welcome/${current + 1}`);
              }
            }}
            className="!p-6 w-2/5 self-end"
          >
            <ArrowRight />
            <span>{current === 3 ? "Finish" : "Next"}</span>
          </Button>
        </div>
      </div>
    </AnimateSlideIn>
  );
}
