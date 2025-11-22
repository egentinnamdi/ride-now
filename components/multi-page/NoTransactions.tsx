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

export function NoTransactions({ queryKeys }: { queryKeys?: Array<string> }) {
  const queryClient = useQueryClient();
  return (
    <Empty className="bg-background/10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconTransactionDollar />
        </EmptyMedia>
        <EmptyTitle>No Transactions Found</EmptyTitle>
        <EmptyDescription>
          It looks like there haven&apos;t been any transactions on the platform
          yet. Once activity begins, all transactions will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: queryKeys })
            }
          >
            Refresh Table
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
