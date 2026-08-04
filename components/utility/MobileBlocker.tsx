import { MonitorSmartphone } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function MobileBlocker() {
  return (
    <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-white p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MonitorSmartphone />
          </EmptyMedia>
          <EmptyTitle>Desktop Only</EmptyTitle>
          <EmptyDescription>
            The admin dashboard isn&apos;t optimized for mobile screens yet.
            Please switch to a tablet or desktop device to continue.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
