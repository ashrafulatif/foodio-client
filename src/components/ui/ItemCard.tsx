"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import AddToCartModal from "../modules/Cart/addToCartModal";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ItemCardProps {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
}

const ItemCard = ({
  id,
  name = "",
  description,
  price = 0,
  image = "/image1.svg",
}: ItemCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoggedIn, role } = useAuth();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    if (role !== "CUSTOMER") {
      toast.error("Only customers can add items to cart");
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <div className="relative w-[290px] h-[380px] mx-auto">
        {/* Card Body */}
        <div className="absolute bottom-0 top-30 left-0 w-full h-[340px] bg-secondary rounded-tr-[34px] rounded-bl-[34px]">
          {/* Text Content */}
          <div className="pt-[170px] px-6">
            <h3
              className="text-[#1A1A1A] font-bold text-lg leading-tight mb-1"
              style={{ fontFamily: "Manrope" }}
            >
              {name}
            </h3>
            <p className="text-[#7A7A7A] text-sm leading-snug mb-3">
              {description}
            </p>
            <p
              className="text-[#1A1A1A] font-bold text-2xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              ${price?.toFixed(2)}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute -bottom-6 right-0 w-[140px] h-[45px] p-3 bg-primary hover:bg-[#234f3c] text-white text-base font-semibold flex items-center justify-center gap-[6px] rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] transition-colors"
          >
            Add to Cart
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Food Image */}
        <div
          className="absolute"
          style={{
            width: 210,
            height: 200,
            top: 70,
            left: "25%",
            transform: "translateX(-50%)",
          }}
        >
          <Image
            src={image || "/image1.svg"}
            alt={name || "Food image"}
            fill
            className="object-contain"
            style={{ borderRadius: 100 }}
          />
        </div>
      </div>

      {/* Modal */}
      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={{ id, name, price, image }}
      />
    </>
  );
};

export default ItemCard;
