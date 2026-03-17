import { getAllCategoriesAction } from "@/actions/category.action";
import { getMenuItemsAction } from "@/actions/menuItem.action";
import MenuView from "./MenuView";

interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

const MenuSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const [categoriesResult, menuItemsResult] = await Promise.all([
    getAllCategoriesAction(),
    getMenuItemsAction({
      search: searchParams.search,
      categoryId: searchParams.category,
      sortBy: searchParams.sortBy,
      page: searchParams.page ?? "1",
      limit: searchParams.limit ?? "8",
    }),
  ]);

  const categories = categoriesResult?.data ?? [];
  const menuItems = menuItemsResult?.data ?? [];
  const meta = menuItemsResult?.meta;

  return (
    <MenuView
      categories={categories}
      initialItems={menuItems}
      meta={meta}
      searchParams={searchParams}
    />
  );
};

export default MenuSection;
