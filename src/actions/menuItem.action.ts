"use server";

import {
  ICreateMenuItemData,
  IUpdateMenuItemData,
  MenuItemServices,
} from "@/services/menuItem.services";
import { IMenueItemParamsTypes } from "@/types";
import { updateTag } from "next/cache";

export const getMenuItemsAction = async (params?: IMenueItemParamsTypes) => {
  const result = await MenuItemServices.getMenuItem(params);
  return result;
};

export const createMenuItemAction = async (payload: ICreateMenuItemData) => {
  const result = await MenuItemServices.createMenuItem(payload);
  updateTag("menu-items");
  return result;
};

export const updateMenuItemAction = async (
  id: string,
  payload: IUpdateMenuItemData,
) => {
  const result = await MenuItemServices.updateMenuItem(id, payload);
  updateTag("menu-items");
  return result;
};

export const deleteMenuItemAction = async (id: string) => {
  const result = await MenuItemServices.deleteMenuItem(id);
  updateTag("menu-items");
  return result;
};
