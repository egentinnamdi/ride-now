import React, { useEffect, useState } from "react";
import TableTitle from "./TableTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthsOfTheYear, nigeriaStates } from "@/lib/constants";
import { useQuery } from "@/hooks/useQuery";

export default function Transactions<T>({
  children,
  queryKey,
  endpoint,
  syncData,
}: {
  children: React.ReactNode;
  queryKey: string;
  endpoint: string;
  syncData: (data: T, isLoading: boolean) => void;
}) {
  const today = new Date();
  const [location, setLocation] = useState("lagos");
  const [month, setMonth] = useState(today.getMonth().toString());

  const { data: result, isLoading } = useQuery<T>(queryKey, endpoint, {
    limit: "10",
    page: "1",
    month,
    location,
    year: today.getFullYear().toString(),
  });

  // Function to update Location and Month
  function updateParameters(type: string, value: string) {
    if (type === "location") {
      setLocation(value);
    } else {
      setMonth(value);
    }
  }

  useEffect(() => {
    if (result) {
      syncData(result, isLoading);
    }
  }, [result, syncData, isLoading]);

  return (
    <div className="flex flex-col  gap-7 mt-7">
      <TableTitle
        title={monthsOfTheYear[+month]}
        action={
          <>
            <Select onValueChange={(val) => updateParameters("location", val)}>
              <SelectTrigger className="shadow-none border-none">
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
            <Select onValueChange={(val) => updateParameters("month", val)}>
              <SelectTrigger className="shadow-none border-none">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Month</SelectLabel>
                  {monthsOfTheYear.map((item, index) => (
                    <SelectItem key={item} value={index.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        }
      />
      {children}
    </div>
  );
}
