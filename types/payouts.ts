export type PayoutsSummaryDto = {
  totalRevenue: number;
  totalRides: number;
  totalRidesCompleted: number;
  averageRating: number;
  totalDistanceKm: number;
  percentageChange: number;
};

export type PeakLocation = {
  location: string;
  revenue: number;
  rideCount: number;
};

export type PeakLocationsDto = {
  locations: PeakLocation[];
};

export type PeakDay = {
  dayOfWeek: string;
  revenue: number;
  rideCount: number;
};

export type PeakDaysDto = {
  days: PeakDay[];
};
