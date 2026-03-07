// src/db/queries.ts
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/db/index";
import { type Product, products } from "@/db/schema";

export async function getProducts() {
  return db.select().from(products);
}

export async function getProduct(id: number) {
  "use cache";
  cacheTag(`product-${id}`);
  const result = await db.select().from(products).where(eq(products.id, id));
  return result[0];
}

import { Column } from "drizzle-orm";

export async function getProductField<
  K extends keyof typeof products & keyof Product,
>(id: number, field: K) {
  "use cache";
  //cacheTag(`product-${id}`);

  const col = products[field];
  if (!(col instanceof Column)) return null;

  const productslist = await db
    .select({ value: col, updatedAt: products.updatedAt })
    .from(products)
    .where(eq(products.id, id));

  const product = productslist[0];
  if (!product) return null;

  const date = new Date(
    (product as { updatedAt?: string }).updatedAt ?? "",
  ).getTime();

  return {
    [field]: product.value,
    date,
  } as { [P in K]: Product[P] } & { date: number };
}

// obtener los id de los 10 primeros productos
export async function getProductIds(count = 10) {
  "use cache";
  return db.select({ id: products.id }).from(products).limit(count);
}
