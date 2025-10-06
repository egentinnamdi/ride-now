import React from "react";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const commissionFields = ["rides", "orders", "drivers"];

export default function CommissionSettings() {
  return (
    <TabsContent value="commission settings" className="p-10 ">
      <div className="flex flex-col min-h-[70vh] gap-8">
        <h2 className="text-2xl text-primary font-bold">Set Commissions</h2>
        <div className="flex-1 bg-background/10 rounded-lg py-6 px-4 flex flex-col gap-7">
          <div className="space-y-2.5 text-gray-400 ">
            <h3 className="text-lg font-medium ">
              Define the platform's revenue share for services
            </h3>
            <Separator />
          </div>
          <form
            action=""
            className="capitalize flex-1  gap-7 flex flex-col justify-evenly"
          >
            {commissionFields.map((field) => (
              <div key={field} className="flex flex-col gap-2  justify-between">
                <Label
                  htmlFor={field}
                  className="text-primary text-lg font-medium"
                >
                  Commission for {field}
                </Label>
                <Input
                  id={field}
                  // value={monthlySubscription}
                  // onChange={(e) => e.target.i setMonthlySubscription(e.target.value)}
                  type="text"
                  placeholder={`Enter Commission for ${field}`}
                  className="h-13 placeholder:capitalize"
                />
              </div>
            ))}
            <Button className="h-14 !text-lg">Save changes</Button>
          </form>
        </div>
      </div>
    </TabsContent>
  );
}
