"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import {
  useApprovalDetail,
  useAcceptApproval,
  useRejectApproval,
} from "@/hooks/admin/useApprovalActions";
import { RejectApprovalDialog } from "./RejectApprovalDialog";

export default function PendingApprovalDetail({
  id,
  toggleDetail,
}: {
  id: string;
  toggleDetail: (id: string) => void;
}) {
  const { data: approval, isLoading } = useApprovalDetail(id);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const { mutate: acceptApproval, isPending: isAccepting } =
    useAcceptApproval(id);
  const { mutate: rejectApproval, isPending: isRejecting } =
    useRejectApproval(id);

  function handleReject(reason: string) {
    rejectApproval(
      { reason },
      {
        onSuccess: () => {
          setIsRejectOpen(false);
          toggleDetail(id);
        },
      },
    );
  }

  function handleAccept() {
    acceptApproval(undefined, { onSuccess: () => toggleDetail(id) });
  }

  return (
    <div className="">
      <div
        onClick={() => toggleDetail(id)}
        className="flex cursor-pointer gap-1 items-center"
      >
        <ChevronLeft className="text-primary" />
        <span className="text-gray-400 font-semibold text-lg">Back</span>
      </div>
      <div className="min-h-[15vh] flex flex-col justify-between py-5 gap-5">
        <h3 className="text-2xl font-semibold flex items-center gap-9 text-gray-700">
          {!isLoading ? (
            <span className="text-primary font-semibold">
              {approval?.fullName}
            </span>
          ) : (
            <Skeleton className="h-7 w-30" />
          )}
          {!isLoading ? (
            <span className="text-base capitalize bg-yellow-50 text-yellow-700 px-5 py-0.5 rounded-sm">
              {approval?.status}
            </span>
          ) : (
            <Skeleton className="h-7 w-20" />
          )}
          {!isLoading ? (
            <span className="text-base capitalize bg-blue-50 text-blue-600 px-5 py-0.5 rounded-sm">
              {approval?.kycStatus?.replace(/_/g, " ")}
            </span>
          ) : (
            <Skeleton className="h-7 w-20" />
          )}
        </h3>
        {approval?.carDetails && (
          <p className="text-sm text-gray-500 font-medium">
            {approval.carDetails}
          </p>
        )}
        <p className="text-sm text-gray-500 font-medium">
          Submitted{" "}
          {approval?.dateSubmitted &&
            new Date(approval.dateSubmitted).toDateString()}
        </p>
        <div className="flex gap-5">
          <Button
            disabled={isAccepting || isLoading}
            onClick={handleAccept}
            className="bg-[#359150] w-57.5 text-base h-14"
          >
            {isAccepting ? (
              <>
                <Spinner /> <span>Accepting...</span>
              </>
            ) : (
              "Accept"
            )}
          </Button>
          <Button
            disabled={isRejecting || isLoading}
            onClick={() => setIsRejectOpen(true)}
            className="bg-red-600 text-base w-57.5 h-14"
          >
            Reject
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5 py-10">
        <h2 className="text-xl font-bold text-gray-600">Documents</h2>
        <div className="grid bg-background/10 rounded-lg grid-cols-2 p-10 gap-5">
          {approval?.documents?.map((doc, index) => {
            const typeCount = approval.documents.filter(
              (d) => d.type === doc.type,
            ).length;
            const typeOccurrence =
              approval.documents
                .slice(0, index)
                .filter((d) => d.type === doc.type).length + 1;

            return (
              <div
                key={`${doc.type}-${index}`}
                className="border-b flex flex-col gap-2 justify-center"
              >
                <span className="text-sm font-semibold text-gray-400 capitalize">
                  {doc.type.replace(/_/g, " ")}
                  {typeCount > 1 ? ` ${typeOccurrence}` : ""}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm capitalize font-semibold text-gray-700">
                    {doc.status.replace(/_/g, " ")}
                  </span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-sm font-semibold underline"
                  >
                    View document
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RejectApprovalDialog
        isOpen={isRejectOpen}
        onOpenChange={setIsRejectOpen}
        onSubmit={handleReject}
        isPending={isRejecting}
      />
    </div>
  );
}
