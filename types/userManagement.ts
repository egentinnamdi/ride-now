export type UserSummaryDto = {
  avgDriverRating: number;
  commissionDrivers: number;
  dailyActiveUsers: number;
  subscribedDrivers: number;
  totalDrivers: number;
  totalRiders: number;
  totalRidesCompleted: number;
  totalUsers: number;
  percentageChanges: {
    avgDriverRating: number;
    commissionDrivers: number;
    dailyActiveUsers: number;
    subscribedDrivers: number;
    totalDrivers: number;
    totalRiders: number;
    totalRidesCompleted: number;
    totalUsers: number;
  };
};

// Driver Details
export interface DriverStatsDTO {
  name: string;
  rating: number;
  planType: "weekly" | "monthly" | "daily"; // extend if needed
  totalEarned: number;
  totalRidesCompleted: number;
  totalCanceledRides: number;
  driverDetails: DriverDetails;
}

export interface DriverDetails {
  fullName: string;
  carDetails: string;
  kycStatus: "pending" | "approved" | "rejected";
  status: "active" | "inactive" | "banned";
  licenseNumber: string;
}

export type PendingApprovalsDto = {
  pendingApprovals: PendingApproval[];
  pagination: Pagination;
};

export type PendingApproval = {
  id: string;
  name: string;
  userType: "rider" | "driver"; // extend if needed
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected"; // extend if needed
};

export type SuspendedAccountsDto = {
  suspendedAccounts: SuspendedAccount[];
  pagination: Pagination;
};

export type SuspendedAccount = {
  id: string;
  name: string;
  userType: "rider";
  dateSuspended: string;
  reason: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
