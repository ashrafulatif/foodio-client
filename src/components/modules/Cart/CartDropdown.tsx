"use client";

import Image from "next/image";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { createOrder } from "@/actions/order.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaymentMethod } from "@/types/enum";

const CartDropdown = () => {
  const {
    items,
    totalItems,
    totalAmount,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleConfirmOrder = () => {
    startTransition(async () => {
      const payload = {
        paymentMethod: PaymentMethod.CASH,
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await createOrder(payload);

      if (result.error || !result.data) {
        toast.error(result.message || "Failed to place order. Try again.");
        return;
      }

      clearCart();
      toast.success("Your Order has been confirmed!", {
        icon: (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 border border-primary rounded-full px-3 py-1.5 cursor-pointer hover:border-gray-500 transition-colors">
          <ShoppingCart className="w-4 h-4 text-primary font-semibold" />
          <span className="text-sm font-semibold text-primary">
            {totalItems}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-90 rounded-2xl p-0 bg-[#FBFAF8] border border-[#E6E2D8] shadow-lg mt-2"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-base font-bold text-foreground">Cart</p>
          <p className="text-sm text-muted-foreground">{totalItems} Items</p>
        </div>

        {/* Items */}
        <div className="px-5 py-3 flex flex-col divide-y divide-border max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary underline leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Quantity : {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pl-13">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-8 h-7 rounded-lg border border-border flex items-center justify-center text-xs font-semibold">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-foreground">
                Total Amount :
              </p>
              <p className="text-sm font-bold text-foreground">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="rounded-full px-6 border-border text-foreground"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmOrder}
                disabled={isPending}
                className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isPending ? "Placing..." : "Confirm Order"}
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
