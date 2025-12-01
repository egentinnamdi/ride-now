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

type PendingPayoutsDto = {
  id: "string";
  customer: "string";
  transactionAmount: 0;
  requestDate: "string";
}[];

type PayoutsAndPaginationDto = {
  payouts: PendingPayoutsDto;
  pagination: PaginationResponseDto;
};

export default function PendingPayouts() {
  const [data, setData] = useState<PendingPayoutsDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function syncData(values: PayoutsAndPaginationDto, isLoading: boolean) {
    setData(values.payouts);
    setIsLoading(isLoading);
  }

  return (
    <TabsContent value="pending payouts" className="p-10  flex-1  pt-0">
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions
        syncData={syncData}
        endpoint="/admin/payouts/pending"
        queryKey="pending-payouts"
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
