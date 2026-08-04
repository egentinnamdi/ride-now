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

export type DriverDocumentType =
  | "drivers_license"
  | "vehicle_registration"
  | "insurance"
  | "roadworthiness"
  | "car_image";

export type DriverDocumentStatus =
  | "uploaded"
  | "pending_review"
  | "under_review"
  | "verified"
  | "rejected"
  | "expired";

export type DriverDocument = {
  type: DriverDocumentType;
  url: string;
  status: DriverDocumentStatus;
};

export type KycStatus =
  | "pending"
  | "partially_verified"
  | "verified"
  | "rejected";

export type SuspendedAccountDetailDto = {
  fullName: string;
  carDetails?: string;
  status: "active" | "suspended" | "inactive";
  kycStatus: KycStatus;
  reportedTimes: number;
  plateNumber?: string;
  totalEarned?: number;
  completedRides?: number;
  canceledRides?: number;
  suspensionReason: string;
  dateSuspended: string;
};

export type ApprovalDetailDto = {
  fullName: string;
  carDetails?: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  kycStatus: KycStatus;
  documents: DriverDocument[];
};

export type RejectApprovalDto = {
  reason: string;
};
