"use client";
import React, { useState } from "react";
import AnimateSlideIn from "../multi-page/AnimateSlideIn";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const users = ["rider", "driver", "vendor"];

export default function TypeOfUser({
  updateStep,
}: {
  updateStep: (step: number) => void;
}) {
  const [userType, setUserType] = useState("");
  return (
    <AnimateSlideIn>
      <div className="py-10 mt-10 bg-white px-5 flex flex-col gap-10">
        <div className="text-2xl font-medium w-2/4">
          <h2>What type of user are you?</h2>
        </div>
        <div className="h-3/4 flex flex-col gap-3">
          <RadioGroup onValueChange={(val) => setUserType(val)}>
            {users.map((user) => (
              <div
                key={user}
                className="flex bg-primary/12 items-center rounded-2xl px-3 justify-between"
              >
                <div className="flex capitalize gap-2 text-gray-500 items-center   h-14">
                  <RadioGroupItem id={user} value={user}>
                    {user}
                  </RadioGroupItem>
                  <Label htmlFor={user}>{user}</Label>
                </div>
                <Avatar className="size-9">
                  <AvatarImage src={`/${user}.png`} alt={user} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </RadioGroup>
          <Button
            onClick={() => updateStep(2)}
            className="!text-sm !py-4 !mt-3"
          >
            <ArrowRight />
            <span>Continue</span>
          </Button>
        </div>
      </div>
    </AnimateSlideIn>
  );
}
