"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddToCartModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const AddToCartModal = ({ open, onClose, item }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#FBFAF8] border border-[#E6E2D8] rounded-3xl max-w-sm border-none shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            Select the quantity
          </DialogTitle>
        </DialogHeader>

        {/* Item Row */}
        <div className="mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Items
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {item.name}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Minus className="w-3 h-3 text-foreground" />
              </button>
              <div className="w-10 h-8 rounded-lg border border-border flex items-center justify-center text-sm font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Plus className="w-3 h-3 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full px-8 border-border text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Add to cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
