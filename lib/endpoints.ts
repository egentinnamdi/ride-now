// Centralized backend path registry for the Admin API surface.
// Static paths are plain strings; templated paths are builder functions.
export const endpoints = {
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
  },
  admin: {
    payouts: {
      summary: "/admin/payouts/summary",
      peakLocations: "/admin/payouts/peak-locations",
      peakDays: "/admin/payouts/peak-days",
      pending: "/admin/payouts/pending",
    },
    revenue: {
      total: "/admin/revenue/total",
      transactions: "/admin/revenue/transactions",
    },
    rides: {
      all: "/admin/rides",
      summary: "/admin/rides/summary",
      transactions: "/admin/rides/transactions",
      detail: (rideId: string) => `/admin/rides/${rideId}`,
    },
    transactions: "/admin/transactions",
    settings: {
      commission: "/admin/settings/commission",
      subscription: "/admin/settings/subscription",
      subscriptionPlan: (planId: string) =>
        `/admin/settings/subscription/${planId}`,
    },
    users: {
      summary: "/admin/users/summary",
      suspended: "/admin/users/suspended",
      suspendedDetail: (userId: string) => `/admin/users/suspended/${userId}`,
      restore: (userId: string) => `/admin/users/${userId}/restore`,
      delete: (userId: string) => `/admin/users/${userId}`,
    },
    drivers: {
      all: "/admin/drivers",
      detail: (driverId: string) => `/admin/drivers/${driverId}`,
      transactions: (driverId: string) =>
        `/admin/drivers/${driverId}/transactions`,
      suspend: (driverId: string) => `/admin/drivers/${driverId}/suspend`,
      unsuspend: (driverId: string) => `/admin/drivers/${driverId}/unsuspend`,
    },
    approvals: {
      pending: "/admin/approvals/pending",
      detail: (userId: string) => `/admin/approvals/${userId}`,
      accept: (userId: string) => `/admin/approvals/${userId}/accept`,
      reject: (userId: string) => `/admin/approvals/${userId}/reject`,
    },
    coupons: {
      all: "/admin/coupons",
      detail: (couponId: string) => `/admin/coupons/${couponId}`,
    },
    notifications: "/admin/notifications",
  },
} as const;
