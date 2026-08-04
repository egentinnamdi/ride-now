export type SubscriptionPlan = {
  id: string;
  planType: "weekly" | "commission";
  price: number;
  durationDays: number;
  benefits: Record<string, unknown>;
  isActive: boolean;
};

export type SubscriptionPlansDto = {
  plans: SubscriptionPlan[];
};

export type UpdateSubscriptionPlanDto = {
  price: number;
  benefits: Record<string, unknown>;
  durationDays: number;
};
