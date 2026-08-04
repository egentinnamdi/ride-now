"use client";
import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import CouponTable from "./CouponTable";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";
import { CouponResponse } from "@/types/coupon";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";

export default function AddCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const [validity, setValidity] = useState("");
  const [limit, setLimit] = useState("");
  const [open, setOpen] = useState(false);
  const [createdBy, setCreatedBy] = useState("");
  const [validTill, setValidTill] = useState(new Date().toISOString());

  const { mutate, isPending } = useMutation<
    CouponResponse,
    {
      couponCode: string;
      validityPeriod: string;
      usageLimit: number;
    }
  >(endpoints.admin.coupons.all, {
    method: "POST",
    invalidateKeys: ["coupons"],
    successMsg: "Coupon created successfully",
  });

  const handleAddCoupon = () => {
    try {
      if (!couponCode || !validity || !limit) {
        toast.error("Please fill in all fields");
        return;
      }
      mutate({
        couponCode,
        validityPeriod: validity,
        usageLimit: Number(limit),
      });
    } finally {
      setCouponCode("");
      setValidity("");
      setLimit("");
    }
  };
  function handleCloseDialog() {
    setOpen(false);
  }

  return (
    <TabsContent
      className="px-10 pt-5 pb-10 flex flex-col gap-20"
      value="add coupon"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-semibold px-2 text-primary">
            Add a coupon
          </h2>
          <div className="flex flex-col gap-7 capitalize bg-background/10 p-5 rounded-xl ">
            <div className="flex  gap-7">
              <div className="w-1/3 space-y-2">
                <Label className="text-primary text-base font-normal">
                  Coupon Code
                </Label>
                <Input
                  className="placeholder:capitalize h-12 border border-primary/50"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <div className="w-1/3 space-y-2">
                <Label className="text-primary text-base font-normal">
                  Coupon Validity Period
                </Label>
                <Input
                  type="date"
                  className="placeholder:capitalize h-12 border border-primary/50"
                  placeholder="Coupon Validity Period"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                />
              </div>
              <div className="w-1/3 space-y-2">
                <Label className="text-primary text-base font-normal">
                  Coupon Usage Limit
                </Label>
                <Input
                  type="number"
                  className="placeholder:capitalize h-12 border border-primary/50"
                  placeholder="Coupon Usage Limit"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
            </div>
            <Button
              disabled={isPending}
              className="w-1/6 h-14 space-x-1"
              onClick={handleAddCoupon}
            >
              {isPending ? (
                <>
                  <Spinner /> <span className="text-sm">Adding Coupon...</span>
                </>
              ) : (
                "Add Coupon"
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex  capitalize items-center px-3">
            <h3 className="flex-1 font-medium text-xl">all coupons</h3>
            <div className="flex justify-end items-center gap-6 min-w-2/4 font-medium">
              <span className="text-background">Filter by:</span>
              <Input
                className="placeholder:capitalize placeholder:text-gray-600 text-gray-600 h-9 border-primary  rounded-sm w-1/5 "
                placeholder="Created By"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
              />
              <span className="text-gray-500">Valid Till</span>
              <Input
                type="date"
                className="placeholder:capitalize border-none w-1/4  text-gray-600  bg-background h-10 rounded-sm"
                placeholder="Coupon Validity Period"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
              />
            </div>
          </div>
          <CouponTable
            handleCloseDialog={handleCloseDialog}
            createdBy={createdBy}
            validTill={validTill}
          />
        </div>
      </Dialog>
    </TabsContent>
  );
}
