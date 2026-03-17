"use client";

import { useTransition } from "react";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateOrderStatusAction } from "@/actions/order.action";
import { OrderStatus } from "./OrderManagement";

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
];

const statusLabel: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PREPARING: "Preparing",
  READY: "Ready",
  COMPLETED: "Completed",
};

export const OrderStatusDropdown = ({
  orderId,
  currentStatus,
  onStatusChange,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  onStatusChange: (id: string, status: OrderStatus) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: OrderStatus) => {
    startTransition(async () => {
      const result = await updateOrderStatusAction(orderId, status);
      if (result?.error) {
        toast.error("Failed to update status");
        return;
      }
      onStatusChange(orderId, status);
      toast.success("Order status updated");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isPending}
          className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 text-sm hover:bg-secondary transition-colors min-w-[120px] justify-between"
        >
          {statusLabel[currentStatus]}
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[150px] rounded-xl">
        {STATUS_OPTIONS.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleChange(status)}
            className="flex items-center justify-between px-3 py-2 cursor-pointer text-sm"
          >
            {statusLabel[status]}
            {currentStatus === status && (
              <Check className="w-3 h-3 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
