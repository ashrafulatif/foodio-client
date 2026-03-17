"use client";

import { useState, useEffect, ReactNode } from "react";
import { getMenuItemsAction } from "@/actions/menuItem.action";
import ItemCard from "@/components/ui/ItemCard";
import { CakeSlice, ChefHat, Utensils } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  Starters: <Utensils size={20} color="white" />,
  "Main Courses": <ChefHat size={20} color="white" />,
  Desserts: <CakeSlice size={20} color="white" />,
};

const CategorySectionView = ({ categories }: { categories: Category[] }) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id ?? "",
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeCategory) return;

    let isMounted = true;

    const fetchItems = async () => {
      setLoading(true);
      const result = await getMenuItemsAction({
        categoryId: activeCategory,
        limit: "4",
      });
      if (isMounted) {
        setMenuItems(result?.data ?? []);
        setLoading(false);
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <section className="w-full max-w-360 mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-primary text-[54px] font-semibold"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Curated Categories
        </h2>
        <p className="text-[#2D2D2D] text-[18px]">
          Explore our diverse menu of culinary delights.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex flex-col items-center gap-3 w-53.75 py-6 rounded-tl-[20px] rounded-br-[20px] transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-secondary border-transparent"
                : "bg-[#FBFAF8] border-border hover:bg-secondary/40"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
              <span style={{ fontSize: 22 }}>
                {CATEGORY_ICONS[category.name] ?? "🍴"}
              </span>
            </div>
            <span className="text-sm font-semibold tracking-wide">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Item Cards */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 pt-10 mb-20 min-h-100">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-75 h-100 bg-secondary rounded-tl-[34px] rounded-br-[34px] animate-pulse"
            />
          ))
        ) : menuItems.length > 0 ? (
          menuItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.imageUrl}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full text-muted-foreground text-sm">
            No items found for this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySectionView;
