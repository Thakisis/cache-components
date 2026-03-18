import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { dateTransformedMiliseconds } from "@/lib/dateTransformedMiliseconds";

export async function getProductDescription(id: number) {
  const productData = await db
    .select({
      description: products.description,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(eq(products.id, id));
    
  const product = productData[0];
   if (!product) return null;

   const date = dateTransformedMiliseconds(product.updatedAt ?? "")

  return {
    description: product.description,
    date,
  }
}