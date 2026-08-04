import { IconTransactionDollar } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useQueryClient } from "@tanstack/react-query";

export function NoTransactions({
  queryKeys,
  message,
  btnText = "Refresh Table",
}: {
  queryKeys?: Array<string>;
  message?: string;
  btnText?: string;
}) {
  const queryClient = useQueryClient();
  return (
    <Empty className="bg-background/10 w-full ">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconTransactionDollar />
        </EmptyMedia>
        <EmptyTitle>No {message || "Data"} Found</EmptyTitle>
        <EmptyDescription>
          It looks like there haven&apos;t been any {message || "transactions"}{" "}
          on the platform yet. Once activity begins, all{" "}
          {message || "transactions"} will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: queryKeys })
            }
          >
            {btnText}
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
