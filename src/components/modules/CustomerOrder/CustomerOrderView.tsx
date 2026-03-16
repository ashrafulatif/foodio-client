import { OrderCard, OrderStatus } from "@/components/ui/orderCard";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  placedAt: string;
  total: number;
  status: OrderStatus;
  address: string;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    id: "5b331ea1",
    placedAt: "December 12th, 2025 at 4:33 PM",
    total: 20.0,
    status: "PENDING",
    address: "House:23,  Road:23, Jamaica, USA",
    items: [
      { name: "Golden Crunch Bites", quantity: 1, price: 10.0 },
      { name: "Citrus Swirl Delights", quantity: 1, price: 10.0 },
    ],
  },
  {
    id: "5b331ea1",
    placedAt: "December 12th, 2025 at 4:33 PM",
    total: 24.0,
    status: "COMPLETED",
    address: "House:23,  Road:23, Jamaica, USA",
    items: [
      { name: "Golden Crunch Bites", quantity: 1, price: 14.0 },
      { name: "Citrus Swirl Delights", quantity: 1, price: 10.0 },
    ],
  },
];

const CustomerOrderView = () => {
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
      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default CustomerOrderView;
