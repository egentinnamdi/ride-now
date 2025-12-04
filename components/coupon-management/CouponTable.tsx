"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { Coupon, CouponResponse } from "@/types/coupon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { EllipsisVertical } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

import { Skeleton } from "../ui/skeleton";
import {
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
import { toast } from "sonner";
import { useMutation } from "@/hooks/useMutation";
import { Spinner } from "../ui/spinner";
import { NoTransactions } from "../multi-page/NoTransactions";
import PaginationComponent from "../ui/PaginationComponent";

const headerItems = [
  "identification number",
  "coupon code",
  "created by",
  "valid till",
  "usage limit",
  "used count",
  "is active",
  "action",
];

export default function CouponTable({
  handleCloseDialog,
  validTill,
  createdBy,
}: {
  handleCloseDialog: () => void;
  validTill: string;
  createdBy: string;
}) {
  const [page, setPage] = useState(1);
  const [couponId, setCouponId] = useState("");
  const [validity, setValidity] = useState("");
  const [limit, setLimit] = useState("");

  // Get Coupons
  const { data: coupons, isLoading } = useQuery<CouponResponse>(
    "coupons",
    "/admin/coupons",
    {
      limit: "10",
      page: page.toString(),
      createdBy,
      validTill: validTill,
    }
  );
  // Update Coupons
  const { mutate: updateCoupon, isPending } = useMutation(
    `/admin/coupons/${couponId}`,
    {
      method: "PUT",
      invalidateKeys: ["coupons"],
      successMsg: "Coupon updated successfully",
    }
  );

  // Update Coupon Function
  function handleCouponUpdate() {
    try {
      if (!validity || !limit) {
        throw new Error("Please fill in all fields");
      }
      updateCoupon({ validityPeriod: validity, usageLimit: limit });
    } catch (error) {
      const err = error as InstanceType<typeof Error>;
      toast.error(err.message);
      return;
    }
  }
  useEffect(() => {
    if (isPending === false) {
      handleCloseDialog();
      setCouponId("");
      setValidity("");
      setLimit("");
    }
  }, [isPending]);

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {coupons?.coupons.length || isLoading ? (
        <>
          <Table className="bg-background/10 p-5 rounded-sm ">
            <TableHeader>
              <TableRow className="capitalize ">
                {headerItems.map((item) => (
                  <TableHead
                    className="text-primary  py-7 text-base"
                    key={item}
                  >
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
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
                : coupons?.coupons.map((cell) => (
                    <TableRow key={cell.couponCode}>
                      {Object.keys(cell).map((item) => (
                        <TableCell
                          key={item}
                          className="font-medium capitalize text-gray-400 py-5 pl-3 text-sm"
                        >
                          {item === "validTill"
                            ? new Date(String(cell.validTill)).toDateString()
                            : item === "isActive"
                            ? cell[item as keyof Coupon].toString()
                            : cell[item as keyof Coupon]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Menubar className="bg-inherit border-none shadow-none">
                          <MenubarMenu>
                            <MenubarTrigger className="bg-inherit">
                              <EllipsisVertical
                                className="text-primary"
                                size={20}
                              />
                            </MenubarTrigger>
                            <form>
                              <MenubarContent>
                                <DialogTrigger
                                  onClick={() => setCouponId(cell.id)}
                                  asChild
                                >
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
                                      onChange={(e) =>
                                        setValidity(e.target.value)
                                      }
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
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button className="h-12" variant="outline">
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <Button
                                    disabled={isPending}
                                    onClick={handleCouponUpdate}
                                    className="h-12"
                                    type="submit"
                                  >
                                    {isPending ? (
                                      <>
                                        <Spinner />{" "}
                                        <span className="text-sm">
                                          Updating Coupon...
                                        </span>
                                      </>
                                    ) : (
                                      "Save changes"
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </MenubarMenu>
                        </Menubar>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {coupons?.pagination && coupons.pagination.totalPages > 1 && (
            <PaginationComponent
              currentPage={coupons?.pagination.page}
              totalPages={coupons?.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <NoTransactions message="Coupons" />
      )}
    </>
  );
}
