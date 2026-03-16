import { Order } from "../modules/CustomerOrder/CustomerOrderView";
import { OrderProgressTracker } from "../modules/CustomerOrder/ProgressTracker";

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED";

const statusBadgeStyle: Record<OrderStatus, string> = {
  PENDING: "bg-amber-50 text-amber-500 border border-amber-200",
  PREPARING: "bg-blue-50 text-blue-500 border border-blue-200",
  READY: "bg-purple-50 text-purple-500 border border-purple-200",
  COMPLETED: "bg-green-50 text-green-600 border border-green-200",
};

const statusLabel: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PREPARING: "Preparing",
  READY: "Ready",
  COMPLETED: "Completed",
};

export const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="w-full bg-[#FBFAF8] border border-border rounded-2xl px-8 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-primary font-bold text-base">
            Order #{order.id}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">
            Placed on {order.placedAt}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-foreground font-bold text-xl">
            ${order.total.toFixed(2)}
          </span>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-md ${statusBadgeStyle[order.status]}`}
          >
            {statusLabel[order.status]}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-3">
          Items
        </p>
        <div className="flex flex-col gap-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {item.quantity}x {item.name}
              </span>
              <span className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border pt-3 mb-4 flex justify-end">
        <p className="text-sm font-bold text-foreground">
          Total Amount :{" "}
          <span className="text-base">${order.total.toFixed(2)}</span>
        </p>
      </div>

      {/* Delivery Address */}
      <p className="text-sm text-foreground mb-1">
        <span className="font-semibold">Delivering to:</span>{" "}
        <span className="text-muted-foreground">{order.address}</span>
      </p>

      {/* Progress Tracker */}
      <OrderProgressTracker status={order.status} />
    </div>
  );
};
