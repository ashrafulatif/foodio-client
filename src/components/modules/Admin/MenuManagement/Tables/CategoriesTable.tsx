"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "@/actions/category.action";
import { Category } from "@/types";

interface CategoriesTableProps {
  categories: Category[];
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
}

export const CategoriesTable = ({
  categories,
  addOpen,
  setAddOpen,
}: CategoriesTableProps) => {
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      const result = await createCategoryAction(name.trim());
      if (result?.error) {
        toast.error(result.error || "Failed to create category");
        return;
      }
      toast.success("Category created");
      setAddOpen(false);
      setName("");
    });
  };

  const handleEdit = () => {
    if (!editTarget || !name.trim()) return;
    startTransition(async () => {
      const result = await updateCategoryAction(editTarget.id, name.trim());
      if (result?.error) {
        toast.error(result.error || "Failed to update category");
        return;
      }
      toast.success("Category updated");
      setEditTarget(null);
      setName("");
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteCategoryAction(deleteTarget.id);
      if (result?.error) {
        toast.error(result.error || "Failed to delete category");
        return;
      }
      toast.success("Category deleted");
      setDeleteTarget(null);
    });
  };

  return (
    <>
      {/* Table */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] bg-[#F9F7F3] px-6 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">Name</span>
          <span className="text-sm font-medium text-foreground pr-2">
            Actions
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            No categories found.
          </div>
        ) : (
          categories.map((category, index) => (
            <div
              key={category.id}
              className={`grid grid-cols-[1fr_auto] px-6 py-4 items-center ${
                index < categories.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground font-medium">
                {category.name}
              </span>
              <div className="flex items-center gap-3 pr-2">
                <button
                  onClick={() => {
                    setEditTarget(category);
                    setName(category.name);
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(category)}
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
          if (!open) setName("");
        }}
      >
        <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-sm border-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Add Category
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-white border-border h-10"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleAdd}
              disabled={isPending || !name.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => {
          if (!open) {
            setEditTarget(null);
            setName("");
          }
        }}
      >
        <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-sm border-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-white border-border h-10"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleEdit}
              disabled={isPending || !name.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
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
              Delete Category
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
