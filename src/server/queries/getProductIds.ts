import { db } from "@/db";
import { products } from "@/db/schema";
import { cacheLife } from "next/cache";

// obtener los id de los 10 primeros productos
export async function getProductIds(count = 10) {
   "use cache: remote";
    cacheLife("max")
  return db.select({ id: products.id }).from(products).limit(count);
}
