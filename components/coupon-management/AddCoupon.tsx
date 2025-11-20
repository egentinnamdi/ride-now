"use client";
import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import CouponTable from "./CouponTable";
import { useMutation } from "@/hooks/useMutation";
import { CouponResponse } from "@/types/coupon";
import { Dialog } from "../ui/dialog";

export default function AddCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const [validity, setValidity] = useState("");
  const [limit, setLimit] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation<
    CouponResponse,
    {
      couponCode: string;
      validityPeriod: string;
      usageLimit: number;
    }
  >("/admin/coupons", {
    method: "POST",
    invalidateKeys: ["coupons"],
    successMsg: "Coupon created successfully",
  });

  const handleAddCoupon = () => {
    try {
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
              <span className="text-gray-500">type</span>
              <ChevronDown size={20} className="text-primary" />
              <span className="text-gray-500">Created By</span>
              <span className="text-gray-600 px-6 py-2 rounded-sm font-semibold bg-pink-300">
                Ella Nwaogu
              </span>
              <span className="text-gray-500">Valid Till</span>
              <span className="text-gray-600 px-6 py-2 rounded-sm font-semibold bg-background">
                21/08/25
              </span>
              <Download size={17} className="text-primary ml-2" />
              <EllipsisVertical size={17} className="text-primary" />
            </div>
          </div>
          <CouponTable />
        </div>
      </Dialog>
    </TabsContent>
  );
}
