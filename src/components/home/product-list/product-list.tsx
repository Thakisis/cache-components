
import { getProductIds } from "@/server/queries/getProductIds";
import ProductCard from "./product-card";
export default async function ProductList() {
  const productosIds = await getProductIds(10);
  
  return (
  productosIds.map((product) => (
    <ProductCard key={product.id} id={product.id} />
  ))
  );
}
