import { NavSection } from "@/types/dashboard.type";

export const getCommonNavItems = (): NavSection[] => {
  return [
    {
      items: [
        {
          title: "Menu Items",
          href: "/dashboard",
          icon: "Menu",
        },
        {
          title: "Orders",
          href: "/dashboard/orders",
          icon: "ShoppingBag",
        },
      ],
    },
  ];
};
