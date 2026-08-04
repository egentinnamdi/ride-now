"use client";
import React, { useState } from "react";
import { Ban, CarFront, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useSuspendedAccountDetail } from "@/hooks/admin/useSuspendedAccountDetail";
import { useRestoreUser, useDeleteUser } from "@/hooks/admin/useUserAccountActions";
import { SuspensionDialog } from "./SuspensionDialog";
import { capitalize } from "@/lib/utils";

export default function SuspendedAccountDetail({
  id,
  userType,
  toggleDetail,
}: {
  id: string;
  userType: string;
  toggleDetail: (id: string) => void;
}) {
  const { data: account, isLoading } = useSuspendedAccountDetail(id);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    variant?: "delete" | "restore";
  }>({ isOpen: false });

  const { mutate: restoreUser, isPending: isRestoring } = useRestoreUser(id);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser(id);

  function handleAction() {
    switch (dialogState.variant) {
      case "restore":
        restoreUser(undefined, { onSuccess: () => toggleDetail(id) });
        break;
      case "delete":
        deleteUser(undefined, { onSuccess: () => toggleDetail(id) });
        break;
      default:
        break;
    }
    setDialogState({ isOpen: false });
  }

  const details = [
    { label: "Plate Number", value: account?.plateNumber },
    { label: "Suspension Reason", value: account?.suspensionReason },
    {
      label: "Date Suspended",
      value: account?.dateSuspended
        ? new Date(account.dateSuspended).toDateString()
        : undefined,
    },
    { label: "Reported", value: `${account?.reportedTimes ?? 0} times` },
  ].filter((item) => item.value !== undefined);

  return (
    <div className="">
      <div
        onClick={() => toggleDetail(id)}
        className="flex cursor-pointer gap-1 items-center"
      >
        <ChevronLeft className="text-primary" />
        <span className="text-gray-400 font-semibold text-lg">Back</span>
      </div>
      <div className="min-h-[15vh] flex gap-3 py-5">
        <div className="flex flex-col justify-between w-3/5 p-1.5 gap-3">
          <h3 className="text-2xl font-semibold flex items-center gap-9 text-gray-700">
            {!isLoading ? (
              <span className="text-primary font-semibold">
                {account?.fullName}
              </span>
            ) : (
              <Skeleton className="h-7 w-30" />
            )}
            {!isLoading ? (
              <span className="text-base capitalize bg-red-50 text-red-600 px-5 py-0.5 rounded-sm">
                {account?.status}
              </span>
            ) : (
              <Skeleton className="h-7 w-20" />
            )}
            {!isLoading ? (
              <span className="text-base capitalize bg-blue-50 text-blue-600 px-5 py-0.5 rounded-sm">
                {account?.kycStatus?.replace(/_/g, " ")}
              </span>
            ) : (
              <Skeleton className="h-7 w-20" />
            )}
          </h3>
          {account?.carDetails && (
            <p className="text-sm text-gray-500 font-medium">
              {account.carDetails}
            </p>
          )}
          <div className="flex gap-5">
            <Button
              disabled={isRestoring || isLoading}
              onClick={() =>
                setDialogState({ isOpen: true, variant: "restore" })
              }
              className="bg-[#359150] w-[230px] text-base h-14"
            >
              Restore Account
            </Button>
            <Button
              disabled={isDeleting || isLoading}
              onClick={() =>
                setDialogState({ isOpen: true, variant: "delete" })
              }
              className="bg-red-600 text-base w-[230px] h-14"
            >
              Delete Account
            </Button>
          </div>
        </div>
        {(account?.totalEarned !== undefined ||
          account?.completedRides !== undefined ||
          account?.canceledRides !== undefined) && (
          <div className="w-2/5 gap-5 flex">
            {account?.totalEarned !== undefined && (
              <div className="bg-background/10 w-1/3 rounded-xl p-5 flex flex-col justify-between">
                <div className="text-primary font-bold space-y-1 text-xl">
                  <CarFront size={35} />
                  <p className="">Total Earned</p>
                </div>
                <p className="text-2xl font-bold text-gray-600">
                  ₦{account.totalEarned.toLocaleString()}
                </p>
              </div>
            )}
            {account?.completedRides !== undefined && (
              <div className="bg-green-50 w-1/3 rounded-xl p-3 flex flex-col justify-between">
                <div className="text-green-600 font-bold space-y-1 text-lg">
                  <CarFront size={34} />
                  <p className="">Completed</p>
                </div>
                <p className="text-lg font-bold text-gray-600">
                  {account.completedRides} rides
                </p>
              </div>
            )}
            {account?.canceledRides !== undefined && (
              <div className="bg-red-50 w-1/3 rounded-xl p-3 flex flex-col justify-between">
                <div className="text-red-600 font-bold space-y-1 text-lg">
                  <Ban size={34} />
                  <p className="">Cancelled</p>
                </div>
                <p className="text-lg font-bold text-gray-600">
                  {account.canceledRides} rides
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 py-10">
        <h2 className="text-xl font-bold text-gray-600">Account Details</h2>
        <div className="grid bg-background/10 rounded-lg grid-cols-2 p-10 gap-5">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="border-b flex flex-col gap-2 justify-center"
            >
              <span className="text-sm font-semibold text-gray-400">
                {detail.label}
              </span>
              <span className="text-base font-semibold text-gray-800">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {dialogState.variant && (
        <SuspensionDialog
          isOpen={dialogState.isOpen}
          onOpenChange={(isOpen) => setDialogState({ isOpen })}
          onSubmit={handleAction}
          variant={dialogState.variant}
          driverName={account?.fullName ?? ""}
          entityLabel={capitalize(userType)}
        />
      )}
    </div>
  );
}
