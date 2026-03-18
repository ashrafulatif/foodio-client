export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

const AUTH_ROUTES = ["/login", "/register"];
const CUSTOMER_PROTECTED_ROUTES = ["/orders"];
const ADMIN_ROUTES = ["/dashboard", "dashboard/orders"];

export const getDefaultRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "CUSTOMER":
      return "/";
    default:
      return "/";
  }
};

export const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname.startsWith(route));

export const isAdminRoute = (pathname: string) =>
  ADMIN_ROUTES.some((route) => pathname.startsWith(route));

export const isCustomerProtectedRoute = (pathname: string) =>
  CUSTOMER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

export const isTokenExpired = (exp: number): boolean => {
  return exp * 1000 < Date.now();
};
