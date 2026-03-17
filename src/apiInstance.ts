import { env } from "./env";

//base api
export const API_BASE_URL = env.BACKEND_URL;

//api endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    logout: "/api/v1/auth/logout",
  },
  users: {
    me: "/api/v1/users/me",
    updateProfile: "/api/v1/users/update-profile",
    getAllUsers: "/api/v1/users",
  },
  menuItem: {
    getAllMenuItem: "/api/v1/menu-item",
    getMenuItemById: (id: string) => `/api/v1/menu-item/${id}`,
    updateMenuItem: (id: string) => `/api/v1/menu-item/${id}`,
    deleteMenuItem: (id: string) => `/api/v1/menu-item/${id}`,
    createMenuItem: "/api/v1/menu-item",
  },
  category: {
    getAll: "/api/v1/categories",
    getCategoryById: (id: string) => `/api/v1/categories/${id}`,
    updateCategory: (id: string) => `/api/v1/categories/${id}`,
    deleteCategory: (id: string) => `/api/v1/categories/${id}`,
    createCategory: "/api/v1/categories",
  },
  order: {
    createOrder: "/api/v1/orders",
    getAllOrders: "/api/v1/orders",
    getAllUserOrders: "/api/v1/orders/my-orders",
    getOrderById: (id: string) => `/api/v1/orders/${id}`,
    updateOrderStatus: (id: string) => `/api/v1/orders/status/${id}`,
    deleteOrder: (id: string) => `/api/v1/orders/${id}`,
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
