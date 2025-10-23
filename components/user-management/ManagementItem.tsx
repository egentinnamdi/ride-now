import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Text from "../utility/Text";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ManagementItem({
  className,
  hiddenAvatar = false,
  hiddenBtn = false,
  text,
  total,
}: {
  className?: string;
  hiddenAvatar?: boolean;
  hiddenBtn?: boolean;
  text: string;
  total: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col p-5 justify-center text-primary  gap-5 bg-background/20 rounded-xl",
        className
      )}
    >
      <Avatar hidden={hiddenAvatar} className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ">
        <Text text={text} className="text-lg" />
        <span className="text-3xl  font-bold">{total.toLocaleString()}</span>
      </div>
      <Button
        hidden={hiddenBtn}
        className="flex h-12 bg-background/30 rounded-lg !py-3 text-primary/50 justify-between items-center"
        variant="secondary"
      >
        <span className="text-lg">See overview</span>
        <ArrowRight className="text-primary" size={40} />
      </Button>
    </div>
  );
}
