import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Text from "../utility/Text";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import Trend from "./Trend";
import { useRouter } from "next/navigation";

export default function ManagementItem({
  className,
  hiddenAvatar = false,
  hiddenBtn = false,
  isLoading = false,
  text,
  total,
  percentageChange,
}: {
  isLoading: boolean;
  className?: string;
  hiddenAvatar?: boolean;
  hiddenBtn?: boolean;
  text: string;
  total: number;
  percentageChange: number;
}) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col p-5 justify-center text-primary  gap-5 bg-background/20 rounded-xl",
        className
      )}
    >
      <Avatar hidden={hiddenAvatar} className="size-14">
        <AvatarImage src={`/${text.split(" ")[0]}.png`} alt={text} />
        <AvatarFallback>{text.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <Text text={text} className="text-lg" />
          {isLoading ? (
            <Skeleton className="h-7 w-35 bg-background" />
          ) : (
            <span className="text-3xl  font-bold">
              {total.toLocaleString()}
            </span>
          )}
        </div>
        <Trend
          isUp={!percentageChange.toString().includes("-") ? true : false}
          value={percentageChange}
        />
      </div>
      <Button
        hidden={hiddenBtn}
        className="flex h-12 bg-background/30 rounded-lg !py-3 text-primary/50 justify-between items-center"
        variant="secondary"
        onClick={() => router.push("User%20Management?tab=view+and+manage")}
      >
        <span className="text-lg">See overview</span>
        <ArrowRight className="text-primary" size={40} />
      </Button>
    </div>
  );
}
