import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";
import {
  SubscriptionPlansDto,
  UpdateSubscriptionPlanDto,
} from "@/types/subscription";

export function useSubscriptionPlans() {
  return useQuery<SubscriptionPlansDto>(
    "subscription-plans",
    endpoints.admin.settings.subscription
  );
}

export function useUpdateSubscriptionPlan(planId: string) {
  return useMutation<{ statusCode: number; message: string }, UpdateSubscriptionPlanDto>(
    endpoints.admin.settings.subscriptionPlan(planId),
    {
      method: "PUT",
      invalidateKeys: ["subscription-plans"],
      successMsg: "Subscription plan updated successfully",
    }
  );
}
