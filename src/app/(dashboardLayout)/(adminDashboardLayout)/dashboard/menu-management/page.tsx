import { getAllCategoriesAction } from "@/actions/category.action";
import { getMenuItemsAction } from "@/actions/menuItem.action";
import MenuManagement from "@/components/modules/Admin/MenuManagement/MenuManagement";

const MenuItemPage = async () => {
  const [categoriesResult, menuItemsResult] = await Promise.all([
    getAllCategoriesAction(),
    getMenuItemsAction({ limit: "10" }),
  ]);

  const categories = categoriesResult?.data ?? [];
  const menuItems = menuItemsResult?.data ?? [];

  return <MenuManagement categories={categories} menuItems={menuItems} />;
};

export default MenuItemPage;
