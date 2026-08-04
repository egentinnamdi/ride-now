import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";
import { ApprovalDetailDto, RejectApprovalDto } from "@/types/userManagement";

type ActionResponse = { statusCode: number; message: string };

export function useApprovalDetail(userId: string) {
  return useQuery<ApprovalDetailDto>(
    "approval-detail",
    endpoints.admin.approvals.detail(userId),
    undefined,
    { enabled: Boolean(userId) }
  );
}

export function useAcceptApproval(userId: string) {
  return useMutation<ActionResponse, void>(
    endpoints.admin.approvals.accept(userId),
    {
      method: "POST",
      invalidateKeys: ["pending-approval"],
      successMsg: "User approval accepted",
    }
  );
}

export function useRejectApproval(userId: string) {
  return useMutation<ActionResponse, RejectApprovalDto>(
    endpoints.admin.approvals.reject(userId),
    {
      method: "POST",
      invalidateKeys: ["pending-approval"],
      successMsg: "User approval rejected",
    }
  );
}
