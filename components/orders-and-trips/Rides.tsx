import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import RidesTable from "./RidesTable";
import { ChevronDown, Download, EllipsisVertical } from "lucide-react";
import { useQuery } from "@/hooks/useQuery";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nigeriaStates } from "@/lib/constants";
import { useParams } from "@/hooks/useParams";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getFormattedDate } from "@/lib/utils";
import DateInput from "../multi-page/DateInput";
import { Separator } from "@radix-ui/react-separator";
import { NoTransactions } from "../multi-page/NoTransactions";
import PaginationComponent from "../ui/PaginationComponent";

const headers = [
  "Identification Number",
  "time started",
  "driver",
  "passenger",
  "location",
  "transaction amount",
  "status",
];

export type Ride = {
  id: string;
  timeStarted: string; // ISO date string
  driver: string;
  passenger: string;
  location: string;
  status: string; // e.g. "completed"
  transactionAmount: number;
};

export type Pagination = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type RidesResponse = {
  pagination: Pagination;
  rides: Ride[];
};

export default function Rides({
  title,
  status,
  updateTotal,
}: {
  title: string;
  status: string;
  updateTotal?: (total: number) => void;
}) {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);
  const { updateParameters, location, month } = useParams();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [startDateString, setStartDateString] = useState<string>(
    getFormattedDate(lastMonth)
  );
  const [endDateString, setEndDateString] = useState<string>(
    getFormattedDate(today)
  );

  function handleStartDateChange(date: Date) {
    const formattedDate = getFormattedDate(date);
    setStartDateString(formattedDate);
    setStartDate(date);
  }
  function handleEndDateChange(date: Date) {
    const formattedDate = getFormattedDate(date);
    setEndDateString(formattedDate);
    setEndDate(date);
  }

  const { data: rides, isLoading } = useQuery<RidesResponse>(
    "rides",
    "/admin/rides",
    {
      status,
      limit: "10",
      page: page.toString(),
      location,
      startDate: startDateString,
      endDate: endDateString,
    }
  );

  useEffect(() => {
    if (rides) {
      updateTotal?.(rides.pagination.total);
    }
  }, [rides, updateTotal]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <TabsContent value={title} className="p-10 flex flex-col ">
      <RidesTable<Ride>
        tableData={rides?.rides ?? []}
        headerItems={headers}
        title={status === "cancelled" ? "cancelled orders/rides" : title}
        isLoading={isLoading}
        status={status}
      >
        <div className="flex justify-end items-center gap-3 min-w-2/4 font-medium">
          <span className="text-background">Filter by:</span>

          <Select onValueChange={(val) => updateParameters("location", val)}>
            <SelectTrigger
              className={`${
                !location ? "bg-inherit" : "bg-pink-300 text-gray-600"
              } shadow-none border-none`}
            >
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Location</SelectLabel>
                {nigeriaStates.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-gray-500">Time Interval:</span>
          {/* <span className="px-6 py-2 rounded-sm text-white font-semibold bg-indigo-400">
            ride
          </span> */}
          <DateInput
            label="Select a start date"
            date={startDate}
            handleDateChange={handleStartDateChange}
          />
          <Separator>to</Separator>
          <DateInput
            label="Select an end date"
            date={endDate}
            handleDateChange={handleEndDateChange}
          />
          {/* <Download size={17} className="text-primary ml-2" />
          <EllipsisVertical size={17} className="text-primary" /> */}
        </div>
      </RidesTable>
      {rides?.pagination && rides.pagination.totalPages > 1 && (
        <PaginationComponent
          currentPage={rides.pagination.page}
          totalPages={rides.pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </TabsContent>
  );
}
