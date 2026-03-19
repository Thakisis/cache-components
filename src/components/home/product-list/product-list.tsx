import { cacheLife } from "next/cache";
import { getProductIds } from "@/server/queries/products";
import ProductCard from "./product-card";
export default async function ProductList() {
  "use cache";
  cacheLife("max");
  const productosIds = await getProductIds(10);
  const listaprod = productosIds.map((product) => (
    <ProductCard key={product.id} id={product.id} />
  ));
  return (
    <div className="flex flex-wrap justify-between max-w-300 gap-y-8 py-10 mx-auto container-products">
      {listaprod}
    </div>
  );
}
