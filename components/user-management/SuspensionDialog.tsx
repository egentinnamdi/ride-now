import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const suspensionSchema = z
  .object({
    reason: z.enum([
      "Reported by passenger",
      "Violation of terms",
      "Safety concerns",
      "Other",
    ]),
    otherReason: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.reason === "Other") {
        return data.otherReason && data.otherReason.length > 0;
      }
      return true;
    },
    {
      message: "Please specify the reason",
      path: ["otherReason"],
    }
  );

export type SuspensionFormValues = z.infer<typeof suspensionSchema>;

interface ActionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SuspensionFormValues | Record<string, never>) => void;
  variant: "suspend" | "delete" | "restore";
  driverName: string;
  entityLabel?: string;
}

function getDialogConfig(entityLabel: string) {
  return {
    suspend: {
      title: `Suspend ${entityLabel} Account`,
      description: `Please provide a reason for suspending this ${entityLabel.toLowerCase()}. This action can be reversed later.`,
      submitText: "Confirm Suspension",
    },
    delete: {
      title: `Delete ${entityLabel} Account`,
      description: `Please provide a reason for deleting this ${entityLabel.toLowerCase()}. This action is permanent and cannot be undone.`,
      submitText: "Confirm Deletion",
    },
    restore: {
      title: `Restore ${entityLabel} Account`,
      description: `This will restore the ${entityLabel.toLowerCase()}'s account and allow them to receive ride requests again.`,
      submitText: "Confirm Restoration",
    },
  };
}

export function SuspensionDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  variant,
  driverName,
  entityLabel = "Driver",
}: ActionDialogProps) {
  const form = useForm<SuspensionFormValues>({
    resolver: zodResolver(suspensionSchema),
    defaultValues: {
      reason: "Reported by passenger",
      otherReason: "",
    },
  });

  const watchedReason = form.watch("reason");

  const config = getDialogConfig(entityLabel)[variant];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        {variant !== "restore" && variant !== "delete" ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Reported by passenger">
                          Reported by passenger
                        </SelectItem>
                        <SelectItem value="Violation of terms">
                          Violation of terms
                        </SelectItem>
                        <SelectItem value="Safety concerns">
                          Safety concerns
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchedReason === "Other" && (
                <FormField
                  control={form.control}
                  name="otherReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter other reason" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">{config.submitText}</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => onSubmit({})}>{config.submitText}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
