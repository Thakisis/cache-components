"use client";

import {
  BarChart3,
  DollarSign,
  Layers,
  Package,
  RotateCcw,
  Save,
  Star,
  Tag,
} from "lucide-react";
import { useActionState,  useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  type UpdateProductState,
  updateProductAction,
} from "@/server/actions/update-product";
import type { Product } from "@/types/product";

const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20] as const;
const initialState: UpdateProductState = { status: "idle" };

type EditableFields = Omit<Product, "id" | "createdAt">;
type EditableKey = keyof EditableFields;

interface ProductEditFormProps {
  product: Product;
}

export function ProductEditForm({ product }: ProductEditFormProps) {
  const [edited, setEdited] = useState<Product>({ ...product });
  const [state, formAction, isPending] = useActionState(
    updateProductAction,
    initialState,
  );
  console.log(edited.rating)
  const editableKeys: EditableKey[] = [
    "name",
    "description",
    "category",
    "brand",
    "price",
    "discount",
    "rating",
    "stock",
  ];

  const hasChanges = editableKeys.some((key) => product[key] !== edited[key]);

  const changedFields = editableKeys.reduce((changed, key) => {
    if (product[key] !== edited[key]) {
      changed.add(key);
    }
    return changed;
  }, new Set<EditableKey>());
  function handleReset() {
    setEdited({ ...product });
  }

  function updateField<K extends keyof Product>(key: K, value: Product[K]) {
    setEdited((prev) => ({ ...prev, [key]: value }));
  }

  const discountedPrice =
(  edited.discount > 0
      ? edited.price * (1 - edited.discount / 100)
      : edited.price).toFixed(2)

  return (
    <div className="@container w-full product-edit-form">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
            Edit Product
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            ID #{product.id} &middot; Changed fields are marked with a dot.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!hasChanges || isPending}
          className="gap-2"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>

      <form action={formAction} className="space-y-8">
        {/* Solo original va serializado, edited se lee del FormData */}
        <input type="hidden" name="original" value={JSON.stringify(product)} />

        {/* Campos no nativos necesitan hidden */}
        <input type="hidden" name="discount" value={String(edited.discount)} />
        <input type="hidden" name="rating" value={String(edited.rating)} />

        {/* Feedback */}
        {state.status === "success" && state.changedFields?.length ? (
          <p className="text-sm text-green-600 dark:text-green-400">
            Saved: {state.changedFields.join(", ")}
          </p>
        ) : null}
        {state.status === "error" && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        {/* Name */}
        <FieldWrapper
          label="Product Name"
          icon={<Package className="size-4" />}
          changed={changedFields.has("name")}
        >
          <Input
            name="name"
            value={edited.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Product name"
            disabled={isPending}
          />
        </FieldWrapper>

        {/* Description */}
        <FieldWrapper
          label="Description"
          icon={<Layers className="size-4" />}
          changed={changedFields.has("description")}
        >
          <Textarea
            name="description"
            value={edited.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Product description"
            rows={3}
            disabled={isPending}
          />
        </FieldWrapper>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-6">
          <FieldWrapper
            label="Category"
            icon={<Tag className="size-4" />}
            changed={changedFields.has("category")}
          >
            <Input
              name="category"
              value={edited.category}
              onChange={(e) => updateField("category", e.target.value)}
              placeholder="Category"
              disabled={isPending}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Brand"
            icon={<Tag className="size-4" />}
            changed={changedFields.has("brand")}
          >
            <Input
              name="brand"
              value={edited.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="Brand"
              disabled={isPending}
            />
          </FieldWrapper>
        </div>

        {/* Price, Discount & Stock */}
        <div className="grid grid-cols-1 @xs:grid-cols-2 @md:grid-cols-3 gap-6">
          <FieldWrapper
            label="Price ($)"
            icon={<DollarSign className="size-4" />}
            changed={changedFields.has("price")}
          >
            <Input
              name="price"
              type="number"
              min={0}
              step={0.01}
              value={edited.price}
              onChange={(e) =>
                updateField("price", parseFloat(e.target.value) || 0)
              }
              placeholder="0.00"
              disabled={isPending}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Discount"
            icon={<BarChart3 className="size-4" />}
            changed={changedFields.has("discount")}
          >
            <Select
              value={String(edited.discount)}
              onValueChange={(val) => updateField("discount", Number(val))}
              disabled={isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISCOUNT_OPTIONS.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d === 0 ? "No discount" : `${d}%`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>

          <FieldWrapper
            label="Stock"
            icon={<Package className="size-4" />}
            changed={changedFields.has("stock")}
          >
            <Input
              name="stock"
              type="number"
              min={0}
              step={1}
              value={edited.stock}
              onChange={(e) =>
                updateField("stock", parseInt(e.target.value, 10) || 0)
              }
              placeholder="0"
              disabled={isPending}
            />
          </FieldWrapper>
        </div>

        {/* Price Preview */}
        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Price Preview
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-foreground">
              {discountedPrice}
            </span>
            {edited.discount > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ${edited.price.toFixed(2)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  -{edited.discount}%
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Rating */}
        <FieldWrapper
          label="Rating"
          icon={<Star className="size-4" />}
          changed={changedFields.has("rating")}
        >
          <div className="flex items-center gap-4">
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[edited.rating ?? 0]}
              onValueChange={(values) => {
                const val = Array.isArray(values) ? values[0] : values;
                updateField("rating", val);
              }}
              className="flex-1"
              disabled={isPending}
            />
            <div className="flex items-center gap-1.5 min-w-18 justify-end">
              <StarDisplay rating={edited.rating} />
              <span className="text-sm font-medium text-foreground tabular-nums w-8 text-right">
                {edited.rating}
              </span>
            </div>
          </div>
        </FieldWrapper>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 gap-2"
            disabled={!hasChanges || isPending}
          >
            <Save className="size-4" />
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isPending}
            className="gap-2"
          >
            <RotateCcw className="size-3.5" />
            Reset to Original
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ------ Helper Components ------ */

function FieldWrapper({
  label,
  icon,
  changed,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  changed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <span className="text-muted-foreground">{icon}</span>
        {label}
        {changed && (
          <span className="size-1.5 rounded-full bg-chart-1 inline-block" />
        )}
      </Label>
      {children}
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div
      role="img"
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i <= filled
              ? "fill-chart-4 text-chart-4"
              : "fill-transparent text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}
