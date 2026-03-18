"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItemsTable } from "./Tables/MenuItemsTable";
import { CategoriesTable } from "./Tables/CategoriesTable";
import { Category } from "@/types";
import PaginationControls from "@/components/ui/Pagination-Control";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: { name: string };
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MenuManagementClientProps {
  categories: Category[];
  menuItems: MenuItem[];
  menuItemsMeta?: Meta;
  categoriesMeta?: Meta;
}

type Tab = "menuItems" | "categories";

const MenuManagement = ({
  categories,
  menuItems,
  menuItemsMeta,
  categoriesMeta,
}: MenuManagementClientProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("menuItems");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addMenuItemOpen, setAddMenuItemOpen] = useState(false);

  // console.log("from  menu man client: ", menuItemsMeta);

  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-[#F5F3EE] rounded-full p-1">
          <button
            onClick={() => setActiveTab("menuItems")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "menuItems"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Menu Items
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "categories"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Categories
          </button>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => {
            if (activeTab === "menuItems") setAddMenuItemOpen(true);
            if (activeTab === "categories") setAddCategoryOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {activeTab === "menuItems" ? "Add Item" : "Add Category"}
        </Button>
      </div>

      {activeTab === "menuItems" ? (
        <>
          <MenuItemsTable
            menuItems={menuItems}
            categories={categories}
            addOpen={addMenuItemOpen}
            setAddOpen={setAddMenuItemOpen}
          />
          {menuItemsMeta && (
            <PaginationControls meta={menuItemsMeta} pageParamKey="page" />
          )}
        </>
      ) : (
        <>
          <CategoriesTable
            categories={categories}
            addOpen={addCategoryOpen}
            setAddOpen={setAddCategoryOpen}
          />
          {categoriesMeta && (
            <PaginationControls
              meta={categoriesMeta}
              pageParamKey="categoryPage"
            />
          )}
        </>
      )}
    </div>
  );
};

export default MenuManagement;
