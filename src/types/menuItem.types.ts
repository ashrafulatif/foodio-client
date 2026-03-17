export interface IMenueItemParamsTypes {
  search?: string;
  available?: boolean;
  categoryId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  categoryId: string;
  category: { id: string; name: string };
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export interface MenuClientProps {
  categories: Category[];
  initialItems: MenuItem[];
  meta?: Meta;
  searchParams: SearchParams;
}
