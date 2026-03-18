import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProduct(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id));
  
  return result[0];
}