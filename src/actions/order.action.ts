"use server";

import { CreateOrderPayload, OrderService } from "@/services/order.services";
import { updateTag } from "next/cache";

export const createOrder = async (payload: CreateOrderPayload) => {
  const result = await OrderService.createOrder(payload);
  updateTag("orders");
  return result;
};

export const getAllUserOrdersAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  const result = await OrderService.getUserOrders(params);
  return result;
};

export const getAllOrdersAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  const result = await OrderService.getAllOrders(params);
  return result;
};

export const updateOrderStatusAction = async (
  orderId: string,
  status: string,
) => {
  const result = await OrderService.updateOrderStatus({ orderId, status });
  updateTag("orders");
  return result;
};
