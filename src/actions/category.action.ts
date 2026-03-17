"use server";

import { CategoryServices } from "@/services/category.services";
import { updateTag } from "next/cache";

export const getAllCategoriesAction = async (params?: {
  page?: string;
  limit?: string;
}) => {
  const result = await CategoryServices.getAllCategories(params);
  return result;
};

export const createCategoryAction = async (name: string) => {
  const result = await CategoryServices.createCategory(name);

  //revalidate
  updateTag("categories");

  return result;
};

export const updateCategoryAction = async (id: string, name: string) => {
  const result = await CategoryServices.updateCategory(id, name);

  //revalidate
  updateTag("categories");

  return result;
};

export const deleteCategoryAction = async (id: string) => {
  const result = await CategoryServices.deleteCategory(id);

  //revalidate
  updateTag("categories");

  return result;
};


