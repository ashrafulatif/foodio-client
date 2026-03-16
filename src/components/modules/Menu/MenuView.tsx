"use client";

import { useState, useMemo } from "react";
import { Search, ListFilter } from "lucide-react";
import ItemCard from "@/components/ui/ItemCard";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const categories = ["All", "Starters", "Main Courses", "Desserts"];

const menuItems: MenuItem[] = [
  {
    id: 1,
    category: "Starters",
    name: "Golden Crunch Bites",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    image: "/image1.svg",
  },
  {
    id: 2,
    category: "Starters",
    name: "Mediterranean Olive Medley",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    image: "/image2.svg",
  },
  {
    id: 3,
    category: "Starters",
    name: "Citrus Swirl Delights",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    image: "/image3.svg",
  },
  {
    id: 4,
    category: "Starters",
    name: "Creamy Garlic Shrimp Pasta",
    description: "Jumbo scallops with cauliflower purée and truffle oil.",
    price: 15.0,
    image: "/image1.svg",
  },
  {
    id: 5,
    category: "Main Courses",
    name: "Grilled Salmon Fillet",
    description: "Fresh Atlantic salmon with lemon butter and seasonal greens.",
    price: 28.0,
    image: "/image2.svg",
  },
  {
    id: 6,
    category: "Main Courses",
    name: "Beef Tenderloin",
    description: "Premium cut with roasted vegetables and red wine jus.",
    price: 42.0,
    image: "/image3.svg",
  },
  {
    id: 7,
    category: "Main Courses",
    name: "Chicken Marsala",
    description: "Pan-seared chicken with mushroom marsala sauce and pasta.",
    price: 22.0,
    image: "/image1.svg",
  },
  {
    id: 8,
    category: "Main Courses",
    name: "Lobster Risotto",
    description: "Creamy arborio rice with fresh lobster and parmesan.",
    price: 38.0,
    image: "/image2.svg",
  },
  {
    id: 9,
    category: "Desserts",
    name: "Crème Brûlée",
    description: "Classic French vanilla custard with caramelized sugar crust.",
    price: 12.0,
    image: "/image3.svg",
  },
  {
    id: 10,
    category: "Desserts",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center and vanilla ice cream.",
    price: 14.0,
    image: "/image1.svg",
  },
  {
    id: 11,
    category: "Desserts",
    name: "Tiramisu",
    description:
      "Italian classic with mascarpone, espresso, and cocoa dusting.",
    price: 11.0,
    image: "/image2.svg",
  },
  {
    id: 12,
    category: "Desserts",
    name: "Mango Panna Cotta",
    description: "Silky Italian dessert with fresh mango coulis and mint.",
    price: 10.0,
    image: "/image3.svg",
  },
];

const MenuView = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="w-full max-w-7xl  mx-auto px-6 py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-primary text-[54px] font-semibold"
          style={{
            fontFamily: "var(--font-cormorant)",
          }}
        >
          Our Menu
        </h1>
        <p className="text-[#2D2D2D] text-[18px] font-medium">
          Discover our selection of premium dishes, crafted with passion.
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between ">
        {/* Category Pills */}
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
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
          <div className="flex items-center gap-2 border border-border rounded-full px-4 py-2 w-[310px] bg-[#FBFAF8]">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none w-full"
            />
          </div>

          {/* Sort Button */}
          <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-full hover:bg-primary/90 transition-colors">
            Sort
            <ListFilter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-20 pt-10">
          {filtered.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
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
  );
};

export default MenuView;
