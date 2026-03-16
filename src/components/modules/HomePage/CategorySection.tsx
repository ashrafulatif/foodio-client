"use client";

import { useState } from "react";
import ItemCard from "@/components/ui/ItemCard";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const categories: Category[] = [
  { id: 1, name: "Starters", icon: "🍽️" },
  { id: 2, name: "Main Courses", icon: "👨‍🍳" },
  { id: 3, name: "Desserts", icon: "🍰" },
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Golden Crunch Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    image: "/image1.svg",
  },
  {
    id: 2,
    categoryId: 1,
    name: "Mediterranean Olive Medley",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 25.0,
    image: "/image2.svg",
  },
  {
    id: 3,
    categoryId: 1,
    name: "Citrus Swirl Delights",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 35.0,
    image: "/image3.svg",
  },
  {
    id: 4,
    categoryId: 1,
    name: "Creamy Garlic Shrimp Pasta",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 10.0,
    image: "/image1.svg",
  },
  {
    id: 5,
    categoryId: 2,
    name: "Grilled Salmon Fillet",
    description: "Fresh Atlantic salmon with lemon butter and seasonal greens.",
    price: 28.0,
    image: "/image2.svg",
  },
  {
    id: 6,
    categoryId: 2,
    name: "Beef Tenderloin",
    description: "Premium cut with roasted vegetables and red wine jus.",
    price: 42.0,
    image: "/image3.svg",
  },
  {
    id: 7,
    categoryId: 2,
    name: "Chicken Marsala",
    description: "Pan-seared chicken with mushroom marsala sauce and pasta.",
    price: 22.0,
    image: "/image1.svg",
  },
  {
    id: 8,
    categoryId: 2,
    name: "Lobster Risotto",
    description: "Creamy arborio rice with fresh lobster and parmesan.",
    price: 38.0,
    image: "/image2.svg",
  },
  {
    id: 9,
    categoryId: 3,
    name: "Crème Brûlée",
    description: "Classic French vanilla custard with caramelized sugar crust.",
    price: 12.0,
    image: "/image3.svg",
  },
  {
    id: 10,
    categoryId: 3,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center and vanilla ice cream.",
    price: 14.0,
    image: "/image1.svg",
  },
  {
    id: 11,
    categoryId: 3,
    name: "Tiramisu",
    description:
      "Italian classic with mascarpone, espresso, and cocoa dusting.",
    price: 11.0,
    image: "/image2.svg",
  },
  {
    id: 12,
    categoryId: 3,
    name: "Mango Panna Cotta",
    description: "Silky Italian dessert with fresh mango coulis and mint.",
    price: 10.0,
    image: "/image3.svg",
  },
];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);

  const filteredItems = menuItems.filter(
    (item) => item.categoryId === activeCategory,
  );

  return (
    <section className="w-full max-w-360 mx-auto px-6 py-16 ">
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-primary text-[54px] font-semibold"
          style={{
            fontFamily: "var(--font-cormorant)",
          }}
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
            className={`flex flex-col items-center gap-3 w-[215px] py-6 rounded-tl-[20px] rounded-br-[20px] transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-secondary border-transparent"
                : "bg-[#FBFAF8] border-border hover:bg-secondary/40"
            }`}
          >
            {/* Icon circle */}
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
              <span style={{ fontSize: 22 }}>{category.icon}</span>
            </div>
            {/* Label */}
            <span className={"text-sm font-semibold tracking-wide "}>
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Item Cards */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 pt-10 mb-20">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
