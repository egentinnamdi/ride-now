import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import Transactions from "./Transactions";
import RevenueTable from "./RevenueTable";
import { NoTransactions } from "../multi-page/NoTransactions";
import { PaginationResponseDto } from "./RidesAndOrders";

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

  function syncData(values: TransactionsAndPaginationDto) {
    setData(values.transactions);
  }
  console.log(data);

  return (
    <TabsContent value="transaction history" className="p-10  flex-1  pt-0">
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions
        syncData={syncData}
        key="transaction-history"
        endpoint="/admin/transactions"
      >
        {data?.length ? (
          <RevenueTable headerItems={tableHeaders} tableData={data} />
        ) : (
          <NoTransactions />
        )}
      </Transactions>
    </TabsContent>
  );
}
