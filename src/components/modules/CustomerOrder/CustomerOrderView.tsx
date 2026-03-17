import { OrderCard, OrderStatus } from "@/components/ui/orderCard";

interface ApiOrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItem: {
    name: string;
    price: number;
  };
}

interface ApiOrder {
  id: string;
  status: OrderStatus;
  total: number;
  address: string | null;
  createdAt: string;
  items: ApiOrderItem[];
}

export interface Order {
  id: string;
  placedAt: string;
  total: number;
  status: OrderStatus;
  address: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

//match the api with ui
const mapApiOrder = (order: ApiOrder): Order => ({
  id: order.id.slice(0, 8),
  placedAt: formatDate(order.createdAt),
  total: order.total,
  status: order.status,
  address: order.address ?? "No address provided",
  items: order.items.map((item) => ({
    name: item.menuItem.name,
    quantity: item.quantity,
    price: item.price,
  })),
});

const CustomerOrderView = ({ orders }: { orders: ApiOrder[] }) => {
  const mappedOrders = orders.map(mapApiOrder);

  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-12">
      {/* Page Title */}
      <h1
        className="text-primary text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        My Orders
      </h1>

      {/* Orders List */}
      {mappedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm mt-1">Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {mappedOrders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrderView;
