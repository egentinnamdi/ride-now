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

export function NoTransactions() {
  return (
    <Empty>
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
          <Button>Refresh Table</Button>

          {/* <Button variant="outline">Add Manual Transaction</Button> */}
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      ></Button>
    </Empty>
  );
}
