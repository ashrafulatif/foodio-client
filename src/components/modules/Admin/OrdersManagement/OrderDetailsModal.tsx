import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiOrder } from "./OrderManagement";

export const OrderDetailsModal = ({
  order,
  onClose,
}: {
  order: ApiOrder | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-md p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Order Details
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-primary font-medium mt-1">#{order?.id}</p>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm font-semibold mb-1">Address</p>
          <p className="text-sm text-muted-foreground mb-4">
            {order?.address ?? "No address provided"}
          </p>

          <div className="border-t border-border my-3" />

          <p className="text-sm font-semibold mb-3">Items</p>
          <div className="flex flex-col gap-2 mb-4">
            {order?.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-sm">
                  {item.quantity}x {item.menuItem.name}
                </span>
                <span className="text-sm">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Total</p>
            <p className="text-sm font-bold">${order?.total.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
