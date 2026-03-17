"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { OrderStatusDropdown } from "./OrderStatusDropdown";

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItem: { name: string };
}

export interface ApiOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  address: string | null;
  user: { name: string };
  items: OrderItem[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const OrderManagement = ({ orders: initialOrders }: { orders: ApiOrder[] }) => {
  const [orders, setOrders] = useState<ApiOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="w-full px-6 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        Order Management
      </h1>
      <div className="border-b border-border mb-6" />

      <div className="border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9F7F3]">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-10"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.user?.name ?? "—"}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusDropdown
                      orderId={order.id}
                      currentStatus={order.status}
                      onStatusChange={handleStatusChange}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="border border-border rounded-lg px-4 py-1.5 text-sm hover:bg-secondary transition-colors"
                    >
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderManagement;
