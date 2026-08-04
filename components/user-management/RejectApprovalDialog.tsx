"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function RejectApprovalDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string) => void;
  isPending?: boolean;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Reject Approval</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this approval request.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label className="text-primary text-base font-normal">Reason</Label>
          <Textarea
            placeholder="Enter reason for rejection"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!reason.trim() || isPending}
            onClick={() => onSubmit(reason)}
          >
            {isPending ? (
              <>
                <Spinner /> <span className="text-sm">Rejecting...</span>
              </>
            ) : (
              "Confirm Rejection"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
