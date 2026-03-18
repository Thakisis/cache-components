
// import { getProductIds } from "@/server/queries/getProductIds";
import ProductCard from "./product-card";
const arrayProductsIds = Array.from({ length: 10 }, (_, i) => i + 1);
export default async function ProductList() {
  // const productosIds = await getProductIds(10);

  return (
  arrayProductsIds.map((product) => (
    <ProductCard key={product} id={product} />
  ))
  );
}
