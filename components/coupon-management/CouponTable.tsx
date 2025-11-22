"use client";
import React, { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { CouponResponse } from "@/types/coupon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { EllipsisVertical } from "lucide-react";
import { getFormattedDate } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

import { Skeleton } from "../ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { NoTransactions } from "../multi-page/NoTransactions";

const headerItems = [
  "coupon code",
  "created by",
  "valid till",
  "usage limit",
  "action",
];

export default function CouponTable() {
  // Get Coupons
  const { data: coupons, isLoading } = useQuery<CouponResponse>(
    "coupons",
    "/admin/coupons"
  );

  // Update Coupons
  const [validity, setValidity] = useState("");
  const [limit, setLimit] = useState("");

  return (
    <Table className="bg-background/10 p-5 rounded-sm ">
      <TableHeader>
        <TableRow className="capitalize ">
          {headerItems.map((item) => (
            <TableHead className="text-primary  py-7 text-base" key={item}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {headerItems.map((item) => (
                <TableCell
                  key={item}
                  className="font-medium text-gray-400 py-5 pl-3 text-base"
                >
                  <Skeleton className="h-4 w-full bg-gray-400/30" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : coupons?.coupons && coupons?.coupons.length > 0 ? (
          coupons?.coupons.map((cell) => (
            <TableRow key={cell.couponCode}>
              <TableCell className="font-medium text-gray-400 py-5 pl-3 text-base">
                {cell.couponCode}
              </TableCell>
              <TableCell className="font-medium text-gray-400 py-5 pl-3 text-base">
                {cell.createdBy}
              </TableCell>
              <TableCell className="font-medium text-gray-400 py-5 pl-3 text-base">
                {cell.validTIll}
              </TableCell>
              <TableCell className="font-medium text-gray-400 py-5 pl-3 text-base">
                {cell.usageLimit}
              </TableCell>
              <TableCell>
                <Menubar className="bg-inherit border-none shadow-none">
                  <MenubarMenu>
                    <MenubarTrigger className="bg-inherit">
                      <EllipsisVertical className="text-primary" size={20} />
                    </MenubarTrigger>
                    <form>
                      <MenubarContent>
                        <DialogTrigger asChild>
                          <MenubarItem>Edit Coupon</MenubarItem>
                        </DialogTrigger>
                      </MenubarContent>
                      <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Update Coupon</DialogTitle>
                          <DialogDescription>
                            Make changes to coupon here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="space-y-2">
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
                          <div className=" space-y-2">
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
                        ;
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button className="h-12" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button className="h-12" type="submit">
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </MenubarMenu>
                </Menubar>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <NoTransactions
            // colSpan={headerItems.length}
            message="No coupons yet"
          />
        )}
      </TableBody>
    </Table>
  );
}
