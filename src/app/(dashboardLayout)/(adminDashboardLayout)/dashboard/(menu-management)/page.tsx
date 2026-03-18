import { MenuManagementData } from "@/components/modules/Admin/MenuManagement/MenuManagementData";
import { Metadata } from "next";

interface MenuItemPageProps {
  searchParams: Promise<{
    page?: string;
    categoryPage?: string;
    limit?: string;
  }>;
}

const MenuItemPage = async ({ searchParams }: MenuItemPageProps) => {
  const { page = "1", categoryPage = "1", limit = "5" } = await searchParams;

  return (
    <div className="w-full px-2">
      <h1
        className="text-[26px] font-semibold text-primary mb-4"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Menu Items
      </h1>
      <div className="border-b border-border mb-6" />

      <MenuManagementData
        page={page}
        categoryPage={categoryPage}
        limit={limit}
      />
    </div>
  );
};

export default MenuItemPage;

export const metadata: Metadata = {
  title: "Menu Management",
  description: "Manage your restaurant's menu items and categories.",
};
