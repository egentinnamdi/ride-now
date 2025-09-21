import React from "react";
import { TabsContent } from "../ui/tabs";
import Transactions from "./Transactions";
import RevenueTable from "./RevenueTable";

const tableHeaders = [
  "ID",
  "Day",
  "Customer",
  "Location",
  "Transaction Amount",
  "Status",
];

const tableData = [
  {
    id: "11156778",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "abuja",
    amount: 11350,
    status: "successful",
  },
  {
    id: "11156771",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "lagos",
    amount: 11350,
    status: "pending",
  },
  {
    id: "11156772",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "Asaba",
    amount: 11350,
    status: "declined",
  },
  {
    id: "11156773",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "abuja",
    amount: 11350,
    status: "successful",
  },
  {
    id: "11156774",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "asaba",
    amount: 11350,
    status: "successful",
  },
  {
    id: "11156775",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "lagos",
    amount: 11350,
    status: "successful",
  },
  {
    id: "11156776",
    day: "31st Jan 2025",
    customer: "ella nwaogu",
    location: "abuja",
    amount: 11350,
    status: "successful",
  },
];

export default function TransactionHistory() {
  return (
    <TabsContent value="transaction history" className="p-10 pt-0">
      {/* Transactions Component Contains the Table Title Component and the main Table passed in as a child  */}
      <Transactions title="January">
        <RevenueTable headers={tableHeaders} data={tableData} />
      </Transactions>
    </TabsContent>
  );
}
