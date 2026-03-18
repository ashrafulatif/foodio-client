"use client";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createMenuItemAction,
  updateMenuItemAction,
  deleteMenuItemAction,
} from "@/actions/menuItem.action";
import { MenuItem } from "../MenuManagement";
import { Category } from "@/types";
import { MenuItemForm } from "../MenuItemForm";

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  categories: Category[];
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
}

export const MenuItemsTable = ({
  menuItems,
  categories,
  addOpen,
  setAddOpen,
}: MenuItemsTableProps) => {
  const [editTarget, setEditTarget] = useState<MenuItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAdd = (values: {
    name: string;
    price: number;
    categoryId: string;
    description: string;
    available: boolean;
  }) => {
    startTransition(async () => {
      const result = await createMenuItemAction({
        ...values,
        file: file ?? undefined,
      });
      if (result?.error) {
        toast.error(result.error || "Failed to create item");
        return;
      }
      toast.success("Menu item created");
      setAddOpen(false);
      setFile(null);
    });
  };

  const handleEdit = (values: {
    name: string;
    price: number;
    categoryId: string;
    description: string;
    available: boolean;
  }) => {
    if (!editTarget) return;
    startTransition(async () => {
      const result = await updateMenuItemAction(editTarget.id, values);
      if (result?.error) {
        toast.error(result.error || "Failed to update item");
        return;
      }
      toast.success("Menu item updated");
      setEditTarget(null);
      setFile(null);
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteMenuItemAction(deleteTarget.id);
      if (result?.error) {
        toast.error(result.error || "Failed to delete item");
        return;
      }
      toast.success("Menu item deleted");
      setDeleteTarget(null);
    });
  };

  return (
    <>
      {/* Table */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] bg-[#F9F7F3] px-6 py-3 border-b border-border">
          {["Name", "Category", "Price", "Status", "Actions"].map((col) => (
            <span key={col} className="text-sm font-medium text-foreground">
              {col}
            </span>
          ))}
        </div>

        {menuItems.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            No menu items found.
          </div>
        ) : (
          menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] px-6 py-4 items-center ${
                index < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground font-medium">
                {item.name}
              </span>
              <span className="text-sm text-foreground">
                {item.category?.name ?? "—"}
              </span>
              <span className="text-sm text-foreground">
                ${item.price.toFixed(2)}
              </span>
              <span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    item.available
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-500 border border-red-200"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </span>
              <div className="flex items-center gap-3 pr-2">
                <button
                  onClick={() => setEditTarget(item)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      <Dialog
        open={addOpen}
        onOpenChange={(open) => {
          setAddOpen(open);
          if (!open) setFile(null);
        }}
      >
        <DialogContent className="bg-[#FBFAF8] rounded-[12px] max-w-lg border-none shadow-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Add New Item
            </DialogTitle>
          </DialogHeader>
          <MenuItemForm
            categories={categories}
            defaultValues={{
              name: "",
              price: 0,
              categoryId: "",
              description: "",
              available: true,
            }}
            file={file}
            setFile={setFile}
            onSubmit={handleAdd}
            isPending={isPending}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => {
          if (!open) {
            setEditTarget(null);
            setFile(null);
          }
        }}
      >
        <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-lg border-none shadow-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Item</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <MenuItemForm
              categories={categories}
              defaultValues={{
                name: editTarget.name,
                price: editTarget.price,
                categoryId: editTarget.category?.name
                  ? (categories.find((c) => c.name === editTarget.category.name)
                      ?.id ?? "")
                  : "",
                description: "",
                available: editTarget.available,
              }}
              file={file}
              setFile={setFile}
              onSubmit={handleEdit}
              isPending={isPending}
              submitLabel="Save Changes"
              showImageUpload={false}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-sm border-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Delete Item
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deleteTarget?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
