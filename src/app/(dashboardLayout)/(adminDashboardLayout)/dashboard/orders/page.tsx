import { getAllOrdersAction } from "@/actions/order.action";
import OrderManagement from "@/components/modules/Admin/OrdersManagement/OrderManagement";

const AdminOrdersPage = async () => {
  const result = await getAllOrdersAction();
  const orders = result?.data ?? [];

  return <OrderManagement orders={orders} />;
};

export default AdminOrdersPage;
