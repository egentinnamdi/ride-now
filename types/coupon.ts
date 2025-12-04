import { PaginationResponseDto } from "@/components/payout-and-wallets/RidesAndOrders";

export type Coupon = {
  id: string;
  couponCode: string;
  validTill: string;
  usageLimit: number;
  createdBy: string;
  usedCount: number;
};

export type CouponResponse = {
  coupons: Coupon[];
  pagination: PaginationResponseDto;
};
