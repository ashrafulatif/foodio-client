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

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react";

import { Category } from "@/types";
import { menuItemSchema } from "@/zod/menuItemFormSchema";
import { Button } from "@/components/ui/button";

export const MenuItemForm = ({
  categories,
  defaultValues,
  file,
  setFile,
  onSubmit,
  isPending,
  submitLabel,
  showImageUpload = true,
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
  showImageUpload?: boolean;
}) => {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: menuItemSchema },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-1">
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
                    className="rounded-[6px] bg-white border-border h-9"
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
                    className="rounded-[6px] bg-white border-border h-9"
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
                  <SelectTrigger className="rounded-[6px] bg-white border-border h-9">
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
                  className="w-full rounded-[6px] bg-white border border-border px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-primary"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Image Upload */}
        {showImageUpload && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Image</p>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center border border-border rounded-[6px] bg-white py-6 cursor-pointer hover:bg-secondary/40 transition-colors"
            >
              <Upload className="w-6 h-6  text-muted-foreground mb-2" />
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
        )}

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
