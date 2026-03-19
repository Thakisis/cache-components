// src/db/queries.ts
import { Column, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db/index";
import { type Product, products } from "@/db/schema";

export async function getProducts() {
  "use cache";
  cacheLife("max");
  return db.select().from(products);
}

export async function getProduct(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id));
  return result[0];
}

export async function getProductField<
  K extends keyof typeof products & keyof Product,
>(id: number, field: K) {
  "use cache";
  cacheLife("max");
  cacheTag(`${field}-${id}`);

  const col = products[field];
  if (!(col instanceof Column)) return null;

  const productslist = await db
    .select({ value: col, updatedAt: products.updatedAt })
    .from(products)
    .where(eq(products.id, id));

  const product = productslist[0];
  if (!product) return null;

  const rawDate = (product as { updatedAt?: string }).updatedAt ?? "";
  const date = new Date(
    rawDate.endsWith("Z") ? rawDate : `${rawDate} Z`,
  ).getTime();

  return {
    [field]: product.value,
    date,
  } as { [P in K]: Product[P] } & { date: number };
}

// obtener los id de los 10 primeros productos
export async function getProductIds(count = 10) {
  "use cache";
  cacheLife("max");
  return db.select({ id: products.id }).from(products).limit(count);
}
