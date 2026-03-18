import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";
import { meta } from "zod/v4/core";

const getAllCategories = async (params?: { page?: string; limit?: string }) => {
  try {
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.category.getAll));

    if (params?.page) {
      url.searchParams.set("page", params.page);
    }
    if (params?.limit) {
      url.searchParams.set("limit", params.limit);
    }

    const result = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    // console.log("service: ", data);
    return {
      message: data.message,
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

const createCategory = async (name: string) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.category.createCategory),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify({ name }),
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
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

const updateCategory = async (id: string, name: string) => {
  try {
    const cookieStorage = await cookies();

    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.category.updateCategory(id)),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStorage.toString(),
        },
        body: JSON.stringify({ name }),
      },
    );

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
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

const deleteCategory = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    const result = await fetch(
      buildApiUrl(API_ENDPOINTS.category.deleteCategory(id)),
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
        message: data.message,
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

export const CategoryServices = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
