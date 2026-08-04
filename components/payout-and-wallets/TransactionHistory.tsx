import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import Transactions from "./Transactions";
import RevenueTable from "./RevenueTable";
import { NoTransactions } from "../multi-page/NoTransactions";
import { PaginationResponseDto } from "./RidesAndOrders";
import { endpoints } from "@/lib/endpoints";

const tableHeaders = [
  "ID",
  "Day",
  "Customer",
  "Location",
  "Transaction Amount",
  "Status",
];

type TransactionsDto = {
  id: string;
  day: string;
  customer: string;
  location: string;
  transactionAmount: number;
  status: string;
}[];

type TransactionsAndPaginationDto = {
  transactions: TransactionsDto;
  pagination: PaginationResponseDto;
};

export default function TransactionHistory() {
  const [data, setData] = useState<TransactionsDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function syncData(values: TransactionsAndPaginationDto, isLoading: boolean) {
    setData(values.transactions);
    setIsLoading(isLoading);
  }

  return (
    <TabsContent value="transaction history" className="p-10  flex-1  pt-0">
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions
        syncData={syncData}
        endpoint={endpoints.admin.transactions}
        queryKey="transaction-history"
      >
        <RevenueTable
          headerItems={tableHeaders}
          tableData={data ?? []}
          isLoading={isLoading}
        />
      </Transactions>
    </TabsContent>
  );
}
