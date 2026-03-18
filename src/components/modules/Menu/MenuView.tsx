"use client";

import { useTransition } from "react";
import { Search, ListFilter, Check } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ItemCard from "@/components/ui/ItemCard";
import { MenuClientProps, SearchParams } from "@/types";
import PaginationControls from "@/components/ui/Pagination-Control";

const SORT_OPTIONS = [
  { label: "Availability", value: "true" },
  { label: "Price", value: "price" },
];

const MenuView = ({
  categories,
  initialItems,
  meta,
  searchParams,
}: MenuClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.category ?? "All";
  const activeSearch = searchParams.search ?? "";
  const activeSortBy = searchParams.sortBy ?? "";

  const updateParams = (updates: Partial<SearchParams>) => {
    const current = new URLSearchParams();

    if (searchParams.search) current.set("search", searchParams.search);
    if (searchParams.category) current.set("category", searchParams.category);
    if (searchParams.sortBy) current.set("sortBy", searchParams.sortBy);
    if (searchParams.page) current.set("page", searchParams.page);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "All") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    if (!("page" in updates)) {
      current.set("page", "1");
    }

    startTransition(() => {
      router.push(`${pathname}?${current.toString()}`);
    });
  };

  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      updateParams({ category: undefined });
    } else {
      const found = categories.find((c) => c.name === cat);
      updateParams({ category: found?.id ?? cat });
    }
  };

  const handleSearch = (value: string) => {
    updateParams({ search: value || undefined });
  };

  const handleSortChange = (value: string) => {
    updateParams({ sortBy: activeSortBy === value ? undefined : value });
  };

  const allCategoryOptions = ["All", ...categories.map((c) => c.name)];

  const activeCategoryName =
    activeCategory === "All"
      ? "All"
      : (categories.find((c) => c.id === activeCategory)?.name ?? "All");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-6 flex flex-col min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-primary text-[40px] md:text-[54px] font-semibold"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Our Menu
        </h1>
        <p className="text-[#2D2D2D] text-[16px] md:text-[18px] font-medium">
          Discover our selection of premium dishes, crafted with passion.
        </p>
      </div>

      {/* Filters — stacks vertically on mobile, row on desktop */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        {/* Category Pills — wraps on mobile */}
        <div className="flex flex-wrap items-center gap-2">
          {allCategoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategoryName === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-[#FBFAF8] text-[#1A1A1A] border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 border border-border rounded-full px-4 py-2 flex-1 md:w-[310px] md:flex-none bg-[#FBFAF8]">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search"
              defaultValue={activeSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none w-full"
            />
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-colors shrink-0 ${
                  activeSortBy
                    ? "bg-primary/10 text-primary border border-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Sort
                <ListFilter className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px] rounded-2xl">
              <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-semibold text-foreground">
                  Sort by
                </span>
                <button
                  onClick={() => updateParams({ sortBy: undefined })}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear
                </button>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                >
                  <span className="text-sm text-foreground">
                    {option.label}
                  </span>
                  {activeSortBy === option.value ? (
                    <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-border" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Items Grid  */}
      <div className="flex-1">
        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20 pt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-75 bg-secondary rounded-tl-[34px] rounded-br-[34px] animate-pulse"
              />
            ))}
          </div>
        ) : initialItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 pt-10">
            {initialItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-1">
              Try a different category or search term
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="mt-30">
          <PaginationControls meta={meta} pageParamKey="page" />
        </div>
      )}
    </div>
  );
};

export default MenuView;
