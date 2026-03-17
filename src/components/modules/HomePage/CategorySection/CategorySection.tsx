import { getAllCategoriesAction } from "@/actions/category.action";
import CategorySectionView from "./CategorySectionView";

const CategorySection = async () => {
  const result = await getAllCategoriesAction();
  const categories = result?.data ?? [];

  return <CategorySectionView categories={categories} />;
};

export default CategorySection;
