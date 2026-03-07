// src/db/queries.ts
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/db/index";
import { type Product, products } from "@/db/schema";

export async function getProducts() {
  return db.select().from(products);
}

export async function getProduct(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id));
  return result[0];
}
export async function getProductField<K extends keyof Product>(
  id: number,
  field: K,
) {
  "use cache";
  cacheTag(`${field}-${id}`);
  const product = (await getProduct(id)) as Product | null;
  if (!product) return null;

  return {
    [field]: product[field],
    date: Date.now(),
  } as { [P in K]: Product[P] } & { date: number };
}
// obtener los id de los 10 primeros productos
export async function getProductIds(count = 10) {
  "use cache";
  return db.select({ id: products.id }).from(products).limit(count);
}
