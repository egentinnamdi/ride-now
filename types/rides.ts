export type RideStatus =
  | "searching_driver"
  | "driver_assigned"
  | "driver_en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export type RideDetailDto = {
  goingTo: string;
  from: string;
  amount: number;
  status: RideStatus;
  driverName: string;
  riderName: string;
  carDetails: string;
  plateNumber: string;
  nin: string;
  reportedTimes: number;
};
