import { PaginationResponseDto } from "@/components/payout-and-wallets/RidesAndOrders";

export type CouponResponse = {
  coupons: {
    couponCode: string;
    validTIll: string;
    usageLimit: number;
    createdBy: string;
  }[];
  pagination: PaginationResponseDto;
};
