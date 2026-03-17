"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItemsTable } from "./MenuItemsTable";
import { CategoriesTable } from "./CategoriesTable";
import { Category } from "@/types";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: { name: string };
}

export interface MenuManagementClientProps {
  categories: Category[];
  menuItems: MenuItem[];
}

type Tab = "menuItems" | "categories";

const MenuManagement = ({
  categories,
  menuItems,
}: MenuManagementClientProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("menuItems");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addMenuItemOpen, setAddMenuItemOpen] = useState(false);

  return (
    <div className="w-full px-2">
      <h1 className="text-2xl font-bold text-foreground mb-4">Menu Items</h1>
      <div className="border-b border-border mb-6" />

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
        <MenuItemsTable
          menuItems={menuItems}
          categories={categories}
          addOpen={addMenuItemOpen}
          setAddOpen={setAddMenuItemOpen}
        />
      ) : (
        <CategoriesTable
          categories={categories}
          addOpen={addCategoryOpen}
          setAddOpen={setAddCategoryOpen}
        />
      )}
    </div>
  );
};

export default MenuManagement;
