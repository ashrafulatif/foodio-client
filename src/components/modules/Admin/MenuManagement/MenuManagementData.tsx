import { getAllCategoriesAction } from "@/actions/category.action";
import { getMenuItemsAction } from "@/actions/menuItem.action";
import MenuManagement from "./MenuManagement";

export const MenuManagementData = async ({
  page,
  categoryPage,
  limit,
}: {
  page: string;
  categoryPage: string;
  limit: string;
}) => {
  const [categoriesResult, menuItemsResult] = await Promise.all([
    getAllCategoriesAction({ page: categoryPage, limit }),
    getMenuItemsAction({ page, limit }),
  ]);

  const categories = categoriesResult?.data ?? [];
  const menuItems = menuItemsResult?.data ?? [];
  const menuItemsMeta = menuItemsResult?.meta;
  const categoriesMeta = categoriesResult?.meta;

  return (
    <MenuManagement
      categories={categories}
      menuItems={menuItems}
      menuItemsMeta={menuItemsMeta}
      categoriesMeta={categoriesMeta}
    />
  );
};
