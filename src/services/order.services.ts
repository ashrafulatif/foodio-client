import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

export interface CreateOrderPayload {
  items: {
    menuItemId: string;
    quantity: number;
  }[];
}

export interface IOrderUpdateStatusPayload {
  orderId: string;
  status: string;
}

const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const cookieStorage = await cookies();
    const result = await fetch(buildApiUrl(API_ENDPOINTS.order.createOrder), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getAllOrders = async (params?: { page?: string; limit?: string }) => {
  try {
    const url = new URL(buildApiUrl(API_ENDPOINTS.order.getAllOrders));

    if (params?.page) url.searchParams.set("page", params.page);

    if (params?.limit) url.searchParams.set("limit", params.limit);

    const cookieStorage = await cookies();

    const result = await fetch(url.toString(), {
      cache: "no-store",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
        meta: null,
      };
    }
    return { error: null, data: data.data, meta: data.meta };
  } catch {
    return { error: "Something went wrong", data: null, meta: null };
  }
};

const getUserOrders = async (params?: { page?: string; limit?: string }) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.order.getAllUserOrders));

    if (params?.page) {
      url.searchParams.set("page", params.page);
    }
    if (params?.limit) {
      url.searchParams.set("limit", params.limit);
    }

    const result = await fetch(url.toString(), {
      cache: "no-store",
      next: { tags: ["orders"] },
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const cookieStoreage = await cookies();
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.order.updateOrderStatus(orderId)),
    );

    const result = await fetch(url.toString(), {
      headers: {
        Cookie: cookieStoreage.toString(),
      },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};
const updateOrderStatus = async (payload: IOrderUpdateStatusPayload) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.order.updateOrderStatus(payload.orderId)),
    );

    const result = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ status: payload.status }),
    });

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const deleteOrder = async (orderId: string) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.order.deleteOrder(orderId)));

    const result = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
};
