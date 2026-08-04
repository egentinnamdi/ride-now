"use client";
import { Ban, CarFront, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DriverDetails, DriverStatsDTO } from "@/types/userManagement";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";
import { SuspensionDialog, SuspensionFormValues } from "./SuspensionDialog";
import { Skeleton } from "../ui/skeleton";
import { useDriverTransactions } from "@/hooks/admin/useDriverTransactions";
import { DriverTransaction } from "@/types/transactions";
import RevenueTable from "../payout-and-wallets/RevenueTable";
import PaginationComponent from "../ui/PaginationComponent";

const initialInfo = [
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
  driverDetails,
  toggleDriverInfo,
  id,
  isFetchingDriver,
}: {
  isFetchingDriver: boolean;
  id: string;
  driverDetails: DriverStatsDTO;
  toggleDriverInfo: (id: string) => void;
}) {
  const [driverInfo, setDriverInfo] = useState<typeof initialInfo>(initialInfo);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    variant?: "suspend" | "delete" | "restore";
  }>({ isOpen: false });
  const [txPage, setTxPage] = useState(1);
  const { data: transactions, isLoading: isFetchingTx } = useDriverTransactions(
    id,
    { page: txPage, limit: 10 }
  );

  useEffect(() => {
    setDriverInfo((prev) =>
      prev.map((item) => ({
        ...item,
        value: driverDetails.name,
      }))
    );
  }, [driverDetails]);

  // Handle Suspension and Deletion of Driver
  const { mutate: suspendDriver, isPending: isSuspending } = useMutation(
    endpoints.admin.drivers.suspend(id),
    {
      method: "POST",
      invalidateKeys: ["driver"],
      successMsg: "Account suspended",
    }
  );

  const { mutate: deleteDriver, isPending: isDeleting } = useMutation(
    endpoints.admin.drivers.detail(id),
    {
      method: "DELETE",
      invalidateKeys: ["driver"],
      successMsg: "Account deleted successfully",
    }
  );

  const { mutate: restoreDriver, isPending: isRestoring } = useMutation(
    endpoints.admin.drivers.unsuspend(id),
    {
      method: "POST",
      invalidateKeys: ["driver"],
      successMsg: "Account restored",
    }
  );

  function handleAction(data: SuspensionFormValues | object) {
    switch (dialogState.variant) {
      case "suspend":
        suspendDriver({ ...data });
        break;
      case "delete":
        deleteDriver({});
        break;
      case "restore":
        restoreDriver({});
        break;
      default:
        break;
    }
    setDialogState({ isOpen: false });
  }

  const openDialog = (variant: "suspend" | "delete" | "restore") => {
    setDialogState({ isOpen: true, variant });
  };

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
            <Avatar
              className="
            size-full object-cover rounded-sm"
            >
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-between w-3/4 p-1.5">
            <h3 className="text-2xl font-semibold flex items-center gap-9 text-gray-700">
              {!isFetchingDriver ? (
                <span className="text-primary  font-semibold">
                  {driverDetails?.name}
                </span>
              ) : (
                <Skeleton className="h-7 w-30" />
              )}
              {!isFetchingDriver ? (
                <span className="text-base capitalize bg-green-50 text-green-700 px-5 py-0.5 rounded-sm  ">
                  {driverDetails.planType}
                </span>
              ) : (
                <Skeleton className="h-7 w-20" />
              )}
            </h3>
            {!isFetchingDriver ? (
              <p className="text-sm text-gray-500 font-medium ">
                {driverDetails.rating}
              </p>
            ) : (
              <Skeleton className="h-5 w-20" />
            )}

            <div className="flex justify-between gap-5">
              {driverDetails?.driverDetails?.status === "active" ? (
                <Button
                  disabled={isSuspending || isFetchingDriver}
                  onClick={() =>
                    setDialogState((prev) => ({
                      ...prev,
                      variant: "suspend",
                      isOpen: true,
                    }))
                  }
                  className="bg-[#F18359] w-[230px] text-base  h-14"
                >
                  Suspend Account
                </Button>
              ) : (
                <Button
                  disabled={isRestoring || isFetchingDriver}
                  onClick={() =>
                    setDialogState((prev) => ({
                      ...prev,
                      variant: "restore",
                      isOpen: true,
                    }))
                  }
                  className="bg-[#359150] w-[230px] text-base  h-14"
                >
                  Restore Account
                </Button>
              )}
              <Button
                disabled={isDeleting}
                onClick={() =>
                  setDialogState((prev) => ({
                    ...prev,
                    variant: "delete",
                    isOpen: true,
                  }))
                }
                className="bg-red-600 text-base w-[230px] h-14"
              >
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
            {!isFetchingDriver ? (
              <p className="text-2xl font-bold text-gray-600">
                ₦{driverDetails.totalEarned?.toLocaleString()}
              </p>
            ) : (
              <Skeleton className="h-7 w-30" />
            )}
          </div>
          <div className="bg-green-50 w-1/4 rounded-xl p-3 flex flex-col justify-between">
            <div className="text-green-600 font-bold space-y-1 text-lg">
              <CarFront size={34} />
              <p className="">Completed</p>
            </div>
            {!isFetchingDriver ? (
              <p className="text-lg font-bold text-gray-600">
                {driverDetails.totalRidesCompleted} rides
              </p>
            ) : (
              <Skeleton className="h-7 w-20 bg-green-100" />
            )}
          </div>
          <div className="bg-red-50 w-1/4 rounded-xl p-3 flex flex-col justify-between">
            <div className="text-red-600 font-bold space-y-1 text-lg">
              <Ban size={34} />
              <p className="">Cancelled</p>
            </div>
            {!isFetchingDriver ? (
              <p className="text-lg font-bold text-gray-600">
                {driverDetails.totalCanceledRides} rides
              </p>
            ) : (
              <Skeleton className="h-7 w-20 bg-red-100" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 py-10">
        <h2 className="text-xl font-bold text-gray-600">Driver Details</h2>
        <div className="min-1/4 grid bg-background/10 rounded-lg grid-cols-2 p-10 gap-5">
          {Object.keys(driverDetails.driverDetails ?? {}).map((detail) => (
            <div
              key={detail}
              className="border-b flex flex-col gap-2 capitalize justify-center"
            >
              {/* Label */}
              <span className="text-sm  font-semibold text-gray-400">
                {detail}
              </span>
              {/* Value */}
              <span className="text-base font-semibold text-gray-800">
                {driverDetails.driverDetails[detail as keyof DriverDetails]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 py-3">
        <h2 className="text-xl font-bold text-gray-600">All transactions</h2>
        <RevenueTable<DriverTransaction>
          headerItems={["ID", "Date", "Type", "Amount", "Description"]}
          tableData={transactions?.transactions ?? []}
          isLoading={isFetchingTx}
        />
        {transactions?.pagination && transactions.pagination.totalPages > 1 && (
          <PaginationComponent
            currentPage={transactions.pagination.page}
            totalPages={transactions.pagination.totalPages}
            onPageChange={setTxPage}
          />
        )}
      </div>
      {dialogState.variant && (
        <SuspensionDialog
          isOpen={dialogState.isOpen}
          onOpenChange={(isOpen) => setDialogState({ isOpen })}
          onSubmit={handleAction}
          variant={dialogState.variant}
          driverName={driverDetails?.name}
        />
      )}
    </div>
  );
}
