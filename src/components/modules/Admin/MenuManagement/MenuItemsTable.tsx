"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  createMenuItemAction,
  updateMenuItemAction,
  deleteMenuItemAction,
} from "@/actions/menuItem.action";
import { MenuItem } from "./MenuManagement";
import { Category } from "@/types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  available: z.boolean(),
});

// ─── Shared Form ──────────────────────────────────────────────────────────────

const MenuItemForm = ({
  categories,
  defaultValues,
  file,
  setFile,
  onSubmit,
  isPending,
  submitLabel,
}: {
  categories: Category[];
  defaultValues: {
    name: string;
    price: number;
    categoryId: string;
    description: string;
    available: boolean;
  };
  file: File | null;
  setFile: (file: File | null) => void;
  onSubmit: (values: typeof defaultValues) => void;
  isPending: boolean;
  submitLabel: string;
}) => {
  const form = useForm({
    defaultValues,
    // validators: { onSubmit: menuItemSchema },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        {/* Name + Price */}
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="rounded-xl bg-white border-border h-10"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="price">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    step="0.01"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="rounded-xl bg-white border-border h-10"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Category */}
        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Category</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="rounded-xl bg-white border-border h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-white border border-border px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-primary"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Image Upload */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Image</p>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border border-border rounded-xl bg-white py-6 cursor-pointer hover:bg-secondary/40 transition-colors"
          >
            <Upload className="w-6 h-6 text-muted-foreground mb-2" />
            <p className="text-sm text-foreground">
              Drag or click <span className="font-semibold">here</span> to
              upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Size must be maximum 2mb. Supported formats : PNG & JPEG
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {file && (
            <div className="flex items-center justify-between border border-border rounded-xl px-4 py-2.5 mt-2 bg-white">
              <span className="text-sm text-foreground">1. {file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Available Toggle */}
        <form.Field name="available">
          {(field) => (
            <div className="flex items-center gap-3">
              <Switch
                checked={field.state.value}
                onCheckedChange={field.handleChange}
              />
              <span className="text-sm font-medium text-foreground">
                Available for Order
              </span>
            </div>
          )}
        </form.Field>
      </FieldGroup>

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
        >
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  categories: Category[];
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
}

export const MenuItemsTable = ({
  menuItems: initialItems,
  categories,
  addOpen,
  setAddOpen,
}: MenuItemsTableProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems);
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
      setMenuItems((prev) => [...prev, result.data]);
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
      setMenuItems((prev) =>
        prev.map((i) =>
          i.id === editTarget.id
            ? {
                ...i,
                ...values,
                category:
                  categories.find((c) => c.id === values.categoryId) ??
                  i.category,
              }
            : i,
        ),
      );
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
      setMenuItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
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
        <DialogContent className="bg-[#FBFAF8] rounded-3xl max-w-lg border-none shadow-lg max-h-[90vh] overflow-y-auto">
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
