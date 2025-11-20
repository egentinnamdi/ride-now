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
