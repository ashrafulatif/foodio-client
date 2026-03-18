import { getAllOrdersAction } from "@/actions/order.action";
import OrderManagement from "@/components/modules/Admin/OrdersManagement/OrderManagement";
import { Metadata } from "next";

interface AdminOrdersPageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

const AdminOrdersPage = async ({ searchParams }: AdminOrdersPageProps) => {
  const { page = "1", limit = "10" } = await searchParams;

  const result = await getAllOrdersAction({ page, limit });
  const orders = result?.data ?? [];
  const meta = result?.meta;

  return <OrderManagement orders={orders} meta={meta} />;
};

export default AdminOrdersPage;

export const metadata: Metadata = {
  title: "Order Management - Foodio",
  description: "Manage and track all customer orders in the admin dashboard.",
};
