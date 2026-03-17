import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import type { EditableKey } from "@/types/product";
import { Column, eq } from "drizzle-orm";

type ProductFieldResult<K extends EditableKey> = {
  [P in K]: Product[P];
} & {
  date: number;
};

export async function getProductField2<K extends EditableKey>({
  id,
  field,
}: {
  id: number;
  field: K;
}): Promise<ProductFieldResult<K> | null> {
  const col = products[field];
  if (!(col instanceof Column)) return null;

  const productslist = await db
    .select({ value: col, updatedAt: products.updatedAt })
    .from(products)
    .where(eq(products.id, id));

  const product = productslist[0];
  if (!product) return null;

  const rawDate = product.updatedAt ?? "";
  const date = new Date(
    rawDate.endsWith("Z") ? rawDate : `${rawDate}Z`,
  ).getTime();

  return {
    [field]: product.value,
    date,
  } as ProductFieldResult<K>;
}
