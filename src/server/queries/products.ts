// src/db/queries.ts
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { products } from "@/db/schema";

export async function getProducts() {
  return db.select().from(products);
}


export async function getProduct(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id));
  return result[0] ?? null;
}



// obtener los id de los 10 primeros productos
export async function getProductIds(count = 10) {
  "use cache";
  return db.select({ id: products.id }).from(products).limit(count);
}