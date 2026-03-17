import { getAllUserOrdersAction } from "@/actions/order.action";
import CustomerOrderView from "@/components/modules/CustomerOrder/CustomerOrderView";
import { Metadata } from "next";

const CustomerOrderPage = async () => {
  const result = await getAllUserOrdersAction();
  const orders = result?.data ?? [];

  return (
    <div>
      <CustomerOrderView orders={orders} />
    </div>
  );
};

export default CustomerOrderPage;

export const metadata: Metadata = {
  title: "My Orders - Foodio",
  description: "View your past and current orders on Foodio.",
};
