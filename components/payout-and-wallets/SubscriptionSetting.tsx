"use client";
import React, { useEffect, useState } from "react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ScanEye } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import {
  useSubscriptionPlans,
  useUpdateSubscriptionPlan,
} from "@/hooks/admin/useSubscriptionPlans";

export default function SubscriptionSetting() {
  const { data, isLoading } = useSubscriptionPlans();
  const [selectedPlanType, setSelectedPlanType] = useState<string>("");
  const [price, setPrice] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [benefitsJson, setBenefitsJson] = useState("");

  const selectedPlan = data?.plans.find(
    (plan) => plan.planType === selectedPlanType,
  );

  useEffect(() => {
    if (data?.plans.length && !selectedPlanType) {
      setSelectedPlanType(data.plans[0].planType);
    }
  }, [data, selectedPlanType]);

  useEffect(() => {
    if (selectedPlan) {
      setPrice(selectedPlan.price.toString());
      setDurationDays(selectedPlan.durationDays.toString());
      setBenefitsJson(JSON.stringify(selectedPlan.benefits, null, 2));
    }
  }, [selectedPlan]);

  const { mutate: updatePlan, isPending } = useUpdateSubscriptionPlan(
    selectedPlan?.id ?? "",
  );

  function handleSave() {
    if (!price || !durationDays) {
      toast.error("Please fill in all fields");
      return;
    }
    let benefits: Record<string, unknown>;
    try {
      benefits = JSON.parse(benefitsJson || "{}");
    } catch {
      toast.error("Benefits must be valid JSON");
      return;
    }
    updatePlan({
      price: Number(price),
      durationDays: Number(durationDays),
      benefits,
    });
  }

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
                Set the RideNow platform subscription plans
              </h4>
              <Separator />
            </div>
            {isLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Tabs
                value={selectedPlanType}
                onValueChange={setSelectedPlanType}
              >
                <TabsList className="bg-white">
                  {data?.plans.map((plan) => (
                    <TabsTrigger
                      key={plan.id}
                      value={plan.planType}
                      className="capitalize! data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {plan.planType}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            {selectedPlan && !isLoading && (
              <span
                className={`w-fit text-sm font-semibold px-4 py-1 rounded-sm capitalize ${
                  selectedPlan.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {selectedPlan.isActive ? "Active" : "Inactive"}
              </span>
            )}
            <div className="capitalize flex-1  gap-7 flex flex-col justify-evenly">
              <div className="flex flex-col gap-2  justify-between">
                <Label className="text-primary text-lg font-medium">
                  Price
                </Label>
                {isLoading ? (
                  <Skeleton className="h-13 w-full" />
                ) : (
                  <Input
                    type="number"
                    placeholder="Enter price"
                    className="h-13 placeholder:capitalize"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2  justify-between">
                <Label className="text-primary text-lg font-medium">
                  Duration (days)
                </Label>
                {isLoading ? (
                  <Skeleton className="h-13 w-full" />
                ) : (
                  <Input
                    type="number"
                    placeholder="Enter duration in days"
                    className="h-13 placeholder:capitalize"
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                  />
                )}
              </div>
              {/* <div className="flex flex-col gap-2  justify-between">
                <Label className="text-primary text-lg font-medium">
                  Benefits (JSON)
                </Label>
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <Textarea
                    placeholder="Enter benefits as JSON"
                    className="h-32 font-mono text-xs placeholder:capitalize"
                    value={benefitsJson}
                    onChange={(e) => setBenefitsJson(e.target.value)}
                  />
                )}
              </div> */}
              <Button
                disabled={isPending || isLoading || !selectedPlan}
                className="h-14"
                onClick={handleSave}
              >
                {isPending ? (
                  <>
                    <Spinner /> <span>Saving...</span>
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
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
                <span className="text-lg">{selectedPlanType} subscription</span>
                {selectedPlan?.isActive && (
                  <span className="bg-pink-600 rounded-2xl text-white px-2 py-1  font-semibold">
                    active
                  </span>
                )}
              </div>
              <span className="text-primary text-3xl font-semibold">
                &#8358;{Number(price || 0).toLocaleString()}.00
              </span>
            </div>
            <div className="w-3/4 text-gray-400">
              <span className="text-xl">{durationDays} days</span>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
