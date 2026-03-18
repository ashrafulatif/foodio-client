import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { IMenueItemParamsTypes } from "@/types";
import { cookies } from "next/headers";

export interface ICreateMenuItemData {
  name: string;
  description: string;
  price: number;
  available?: boolean;
  categoryId: string;
  file?: File | null;
}

export interface IUpdateMenuItemData {
  name: string;
  description: string;
  price: number;
  available?: boolean;
  categoryId: string;
}

const getMenuItem = async (params?: IMenueItemParamsTypes) => {
  try {
    //url
    const url = new URL(
      `${buildApiUrl(API_ENDPOINTS.menuItem.getAllMenuItem)}`,
    );

    //handle params for filtering
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    //fetch posts
    const result = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: "Error fetching data",
        data: null,
        meta: null,
      };
    }
    return {
      data: data.data,
      meta: data.meta,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const createMenuItem = async (payload: ICreateMenuItemData) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.menuItem.createMenuItem));

    //create FormData
    const formData = new FormData();

    // append text fields
    formData.append("name", payload.name.trim());
    formData.append("description", payload.description.trim());
    formData.append("price", payload.price.toString());
    formData.append("available", payload.available?.toString() || "true");
    formData.append("categoryId", payload.categoryId.trim());

    // append image file if provided
    if (payload.file) {
      formData.append("file", payload.file);
    }

    const result = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      body: formData,
    });

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const updateMenuItem = async (id: string, payload: IUpdateMenuItemData) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.menuItem.updateMenuItem(id)),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const deleteMenuItem = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.menuItem.deleteMenuItem(id)),
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStorage.toString(),
        },
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const MenuItemServices = {
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
