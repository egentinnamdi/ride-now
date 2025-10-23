import { Ban, CarFront, ChevronLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

const driverDetails = [
  {
    label: "Full name",
    value: "Kelechi Duru",
  },
  {
    label: "BVN",
    value: "987654321",
    show: false,
  },
  {
    label: "Car details",
    value: "Red-Camry 234",
  },
  {
    label: "NIN",
    value: "123456789",
    show: false,
  },
  {
    label: "KYC",
    value: "Completed",
  },
  {
    label: "Plate Number",
    value: "ABJ-987-HHY",
  },
  {
    label: "Status",
    value: "Verified",
  },
  {
    label: "Reported",
    value: "12 times",
  },
];

export default function DriverInfo({
  id,
  toggleDriverInfo,
}: {
  id: string;
  toggleDriverInfo: (id: string) => void;
}) {
  const [driverInfo, setDriverInfo] =
    useState<typeof driverDetails>(driverDetails);
  return (
    <div className="">
      <div
        onClick={() => toggleDriverInfo(id)}
        className="flex cursor-pointer gap-1 items-center"
      >
        <ChevronLeft className="text-primary" />
        <span className="text-gray-400 font-semibold text-lg">Back</span>
      </div>
      <div className="min-h-[20vh] flex gap-3">
        <div className="flex gap-5 p-3 w-3/5  shadow-xs">
          <div className="size-40 w-1/4 ">
            <Image
              src="/driver-profile.png"
              alt="driver"
              width={500}
              height={500}
              className="size-full object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col justify-between w-3/4 p-1.5">
            <h3 className="text-2xl font-semibold flex items-center gap-9 text-gray-700">
              <span className="text-primary  font-semibold">Kelechi Duru</span>
              <span className="text-base bg-green-50 text-green-700 px-5 py-0.5 rounded-sm  ">
                Subscriber
              </span>
            </h3>
            <p className="text-sm text-gray-500">4</p>
            <div className="flex justify-between">
              <Button className="bg-[#F18359] w-[230px] text-base  h-14">
                Suspend Account
              </Button>
              <Button className="bg-red-600 text-base w-[230px] h-14">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/5 gap-5  flex">
          <div className="bg-background/10 w-2/4 rounded-xl p-5 flex flex-col justify-between">
            <div className="text-primary font-bold space-y-1 text-xl">
              <CarFront size={35} />
              <p className="">Total Earned</p>
            </div>
            <p className="text-2xl font-bold text-gray-600">₦100,000</p>
          </div>
          <div className="bg-green-50 w-1/4 rounded-xl p-3 flex flex-col justify-between">
            <div className="text-green-600 font-bold space-y-1 text-lg">
              <CarFront size={34} />
              <p className="">Completed</p>
            </div>
            <p className="text-lg font-bold text-gray-600">300 rides</p>
          </div>
          <div className="bg-red-50 w-1/4 rounded-xl p-3 flex flex-col justify-between">
            <div className="text-red-600 font-bold space-y-1 text-lg">
              <Ban size={34} />
              <p className="">Cancelled</p>
            </div>
            <p className="text-lg font-bold text-gray-600">36 rides</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 py-10">
        <h2 className="text-xl font-bold text-gray-600">Driver Details</h2>
        <div className="h-[50vh] grid bg-background/10 rounded-lg grid-cols-2 p-5 grid-rows-4 gap-5">
          {driverInfo.map((detail) => (
            <div
              key={detail.label}
              className="border-b flex flex-col justify-center"
            >
              {/* Label */}
              <span className="text-sm font-semibold text-gray-400">
                {detail.label}
              </span>

              {/* Value */}
              {detail.label === "Status" ? (
                <span className="text-base font-semibold text-green-700">
                  {detail.value}
                </span>
              ) : detail.label === "BVN" || detail.label === "NIN" ? (
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-800">
                    {detail.show ? detail.value : "**********"}
                  </span>
                  <div
                    onClick={() =>
                      setDriverInfo(
                        driverInfo.map((item) =>
                          item.label === detail.label
                            ? {
                                ...item,
                                show: !item.show,
                              }
                            : item
                        )
                      )
                    }
                    className="text-primary flex text-sm items-center gap-1 pr-2 cursor-pointer"
                  >
                    {detail.show ? (
                      <>
                        <EyeOff size={18} />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye size={18} />
                        <span>View</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-base font-semibold text-gray-800">
                  {detail.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 py-3">
        <h2 className="text-xl font-bold text-gray-600">All transactions</h2>
      </div>
    </div>
  );
}
