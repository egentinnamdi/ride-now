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
import { TableCell, TableRow } from "../ui/table";

export function NoTransactions({
  queryKeys,
  colSpan = 1,
  message,
}: {
  queryKeys?: Array<string>;
  colSpan?: number;
  message?: string;
}) {
  const queryClient = useQueryClient();
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Empty className="bg-background/10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconTransactionDollar />
            </EmptyMedia>
            <EmptyTitle>No {message || "Transactions"} Found</EmptyTitle>
            <EmptyDescription>
              It looks like there haven&apos;t been any {message || "transactions"} on the platform
              yet. Once activity begins, all {message || "transactions"} will appear here.
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
      </TableCell>
    </TableRow>
  );
}
