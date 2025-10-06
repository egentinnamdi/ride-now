import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { ScanEye } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const subscriptionFields = [
  "monthly subscription",
  "description",
  "daily drive limits",
];

export default function SubscriptionSetting() {
  const [monthlySubscription, setMonthlySubscription] = useState("");
  return (
    <TabsContent value="subscription settings" className="p-10 ">
      <div className=" flex justify-center gap-16 min-h-[70vh]">
        <div className="  flex flex-col  w-2/5">
          <h3 className="h-[8.5vh] text-2xl text-primary font-semibold ">
            Set subscription pricing
          </h3>
          <div className="flex-1 rounded-md flex flex-col gap-9 p-6 bg-background/10">
            <div className="space-y-3 text-gray-400">
              <h4 className="text-xl font-medium ">
                Set the RideNow platform monthly subscription plan
              </h4>
              <Separator />
            </div>
            <form
              action=""
              className="capitalize flex-1  gap-7 flex flex-col justify-evenly"
            >
              {subscriptionFields.map((field) => (
                <div
                  key={field}
                  className="flex flex-col gap-2  justify-between"
                >
                  <Label
                    htmlFor={field}
                    className="text-primary text-lg font-medium"
                  >
                    {field}
                  </Label>
                  <Input
                    id={field}
                    // value={monthlySubscription}
                    // onChange={(e) => e.target.i setMonthlySubscription(e.target.value)}
                    type="text"
                    placeholder={`Enter ${field}`}
                    className="h-13 placeholder:capitalize"
                  />
                </div>
              ))}
              <Button className="h-14">Save changes</Button>
            </form>
          </div>
        </div>
        <div className=" w-3/5 bg-background/10   px-16 gap-10 rounded-md border border-background justify-center items- flex flex-col ">
          <div className="flex text-primary items-center font-semibold gap-3 capitalize text-3xl">
            <ScanEye size={30} />
            <span className="text-gray-600">preview</span>
          </div>
          <div className=" h-2/4 rounded-2xl  p-6 flex flex-col  justify-between   shadow-[0_0_25px_rgba(0,0,0,0.15)] shadow-gray-200">
            <div className="space-y-2">
              <div className="flex capitalize text-gray-500 font-semibold  justify-between items-center">
                <span className="text-lg">monthly subscription</span>
                <span className="bg-pink-600 rounded-2xl text-white px-2 py-1  font-semibold">
                  recommended
                </span>
              </div>
              <span className="text-primary text-3xl font-semibold">
                &#8358;{monthlySubscription.toLocaleString() || 0}.00
              </span>
            </div>
            <div className="w-2/4 text-gray-400">
              <span className="text-xl  ">
                Pay a weekly fee and drive without charges.
              </span>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
