import MenuSection from "@/components/modules/Menu/MenuSection";

interface MenuPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sortBy?: string;
    page?: string;
    limit?: string;
  }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const params = await searchParams;
  return <MenuSection searchParams={params} />;
};

export default MenuPage;

export const metadata = {
  title: "Menu - Foodio",
  description: "Explore our delicious menu and find your next favorite dish.",
};
