import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/endpoints";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const commissionFields = ["rides", "orders", "drivers"];

type CommissionsDto = {
  commissionForRides: number;
  commissionForOrders: number;
  commissionForDrivers: number;
};

export default function CommissionSettings() {
  const { data: commissions, isLoading } = useQuery<CommissionsDto>(
    "commission",
    endpoints.admin.settings.commission
  );
  const [fields, setFields] = useState<{
    rides: string;
    orders: string;
    drivers: string;
  }>();

  useEffect(() => {
    if (commissions) {
      setFields({
        rides: commissions.commissionForRides.toString(),
        orders: commissions.commissionForOrders.toString(),
        drivers: commissions.commissionForDrivers.toString(),
      });
    }
  }, [commissions]);

  const { mutate: updateCommissions, isPending } = useMutation<
    {
      statusCode: number;
      message: string;
    },
    CommissionsDto
  >(endpoints.admin.settings.commission, {
    method: "PUT",
    invalidateKeys: ["commission"],
    successMsg: "Commissions updated successfully",
  });

  function handleClick() {
    if (!fields?.orders || !fields?.drivers || !fields?.rides) {
      toast.error("Please fill in all fields");
      return;
    }
    updateCommissions({
      commissionForRides: Number(fields?.rides),
      commissionForOrders: Number(fields?.orders),
      commissionForDrivers: Number(fields?.drivers),
    });
  }
  return (
    <TabsContent value="commission settings" className="p-10 ">
      <div className="flex flex-col min-h-[70vh] gap-8">
        <h2 className="text-2xl text-primary font-bold">Set Commissions</h2>
        <div className="flex-1 bg-background/10 rounded-lg py-6 px-4 flex flex-col gap-7">
          <div className="space-y-2.5 text-gray-400 ">
            <h3 className="text-lg font-medium ">
              Define the platform&apos;s revenue share for services
            </h3>
            <Separator />
          </div>
          <form className="capitalize flex-1  gap-7 flex flex-col justify-evenly">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 justify-between">
                    <Skeleton className="h-6 w-32 bg-gray-400/30" />
                    <Skeleton className="h-12 w-full bg-gray-400/30" />
                  </div>
                ))
              : commissionFields.map((field) => (
                  <div
                    key={field}
                    className="flex flex-col gap-2  justify-between"
                  >
                    <Label
                      htmlFor={field}
                      className="text-primary text-lg font-medium"
                    >
                      Commission for {field}
                    </Label>
                    <Input
                      id={field}
                      type="number"
                      placeholder={`Enter Commission for ${field}`}
                      className="h-13 placeholder:capitalize"
                      value={
                        field === "rides"
                          ? fields?.rides
                          : field === "orders"
                          ? fields?.orders
                          : fields?.drivers
                      }
                      onChange={(e) =>
                        setFields(
                          (prev) =>
                            ({ ...prev, [field]: e.target.value } as {
                              rides: string;
                              orders: string;
                              drivers: string;
                            })
                        )
                      }
                    />
                  </div>
                ))}
            <Button
              disabled={isPending}
              type="button"
              onClick={handleClick}
              className="h-14 !text-lg"
            >
              {isPending ? (
                <>
                  <Spinner />
                  <span>Updating...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </div>
      </div>
    </TabsContent>
  );
}
