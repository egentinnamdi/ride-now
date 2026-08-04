export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Timeframe = "monthly" | "weekly" | "daily" | "all-time";
