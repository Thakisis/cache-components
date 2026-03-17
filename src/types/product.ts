export interface Product {
  id: number
  name: string
  description: string
  category: string
  brand: string
  price: number
  discount: number // 0, 5, 10, 15, or 20
  rating: number // 0-5 with 0.1 intervals
  stock: number
  createdAt: string
}

import { Product as ProductType } from "@/db/schema";

export type EditableFields = Omit<ProductType, "id" | "createdAt" | "images">;
export type EditableKey = keyof EditableFields;

export const EDITABLE_KEYS: EditableKey[] = [
  "name",
  "description",
  "category",
  "brand",
  "price",
  "discount",
  "rating",
  "stock",
  "updatedAt",
] as const