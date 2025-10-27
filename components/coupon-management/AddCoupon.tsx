import React from "react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const couponInputs = [
  "coupon code",
  "coupon validity period",
  "coupon usage limit",
];

const headerItems = [
  "coupon code",
  "created by",
  "valid till",
  "usage limit",
  "action",
];

const tableData = [
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
  {
    couponCode: "5OOC0RRY",
    createdBy: "Ella Nwaogu",
    validTill: "21st August 2025",
    usageLimit: 4,
  },
];

export default function AddCoupon() {
  return (
    <TabsContent
      className="px-10 pt-5 pb-10 flex flex-col gap-20"
      value="add coupon"
    >
      <div className="flex flex-col gap-7">
        <h2 className="text-2xl font-semibold px-2 text-primary">
          Add a coupon
        </h2>
        <div className="flex flex-col gap-7 capitalize bg-background/10 p-5 rounded-xl ">
          <div className="flex  gap-7">
            {couponInputs.map((item) => (
              <div className="w-1/3 space-y-2" key={item}>
                <Label className="text-primary text-base font-normal">
                  {item}
                </Label>
                <Input
                  className="placeholder:capitalize h-12 border border-primary/50"
                  placeholder={item}
                />
              </div>
            ))}
          </div>
          <Button className="w-1/6 h-14">Add Coupon</Button>
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
            {tableData.map((cell) => (
              <TableRow key={cell.couponCode}>
                {Object.keys(cell).map((item) => (
                  <TableCell
                    key={item}
                    className="font-medium text-gray-400 py-5 pl-3 text-base"
                  >
                    {cell[item as keyof typeof cell]}
                  </TableCell>
                ))}
                <TableCell className="pl-5">
                  <EllipsisVertical className="text-primary" size={20} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
}
