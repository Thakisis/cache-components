"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { type Product, products } from "@/db/schema";

type EditableFields = Omit<Product, "id" | "createdAt" | "images">;
type EditableKey = keyof EditableFields;

const EDITABLE_KEYS: EditableKey[] = [
  "name",
  "description",
  "category",
  "brand",
  "price",
  "discount",
  "rating",
  "stock",
];

const FIELD_CACHE_TAGS: Partial<Record<EditableKey, (id: number) => string>> = {
  name: (id) => `name-${id}`,
  description: (id) => `description-${id}`,
  category: (id) => `badge-${id}`,
  brand: (id) => `brand-${id}`,
  price: (id) => `price-${id}`,
  discount: (id) => `price-${id}`,
  rating: (id) => `rating-${id}`,
};

const IMAGE_TRIGGER_FIELDS: EditableKey[] = ["name", "description"];

export type UpdateProductState = {
  status: "idle" | "success" | "error";
  changedFields?: EditableKey[];
  error?: string;
};

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const original = JSON.parse(formData.get("original") as string) as Product;

  const edited: EditableFields = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    brand: formData.get("brand") as string,
    price: parseFloat(formData.get("price") as string) || 0,
    discount: parseFloat(formData.get("discount") as string) || 0,
    rating: parseFloat(formData.get("rating") as string) || 0,
    stock: parseInt(formData.get("stock") as string, 10) || 0,
  };

  const changedFields = EDITABLE_KEYS.filter(
    (key) => original[key] !== edited[key],
  );

  if (changedFields.length === 0) {
    return { status: "success", changedFields: [] };
  }

  const patch = Object.fromEntries(
    changedFields.map((key) => [key, edited[key]]),
  ) as Partial<EditableFields>;

  try {
    await db.update(products).set(patch).where(eq(products.id, original.id));

    const tagsToRevalidate = new Set<string>();

    for (const field of changedFields) {
      const tagFn = FIELD_CACHE_TAGS[field];
      if (tagFn) tagsToRevalidate.add(tagFn(original.id));
    }

    if (IMAGE_TRIGGER_FIELDS.some((f) => changedFields.includes(f))) {
      tagsToRevalidate.add(`image-${original.id}`);
    }
    tagsToRevalidate.add(`product-${original.id}`);
    for (const tag of tagsToRevalidate) {
      console.log("revalidando", tag);
      updateTag(tag);
    }

    return { status: "success", changedFields };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      changedFields,
    };
  }
}
