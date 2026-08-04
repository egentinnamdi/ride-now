export interface ITransaction {
  id: string;
  day: string;
  type: string;
  revenueEarned: number;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ITransactionData {
  transactions: ITransaction[];
  pagination: IPagination;
}

export type DriverTransactionType =
  | "credit"
  | "debit"
  | "deposit"
  | "withdrawal"
  | "ride_payment"
  | "ride_earning"
  | "subscription_payment"
  | "refund";

export type DriverTransaction = {
  id: string;
  date: string;
  type: DriverTransactionType;
  amount: number;
  description: string;
};

export type DriverTransactionsDto = {
  transactions: DriverTransaction[];
  pagination: IPagination;
};
