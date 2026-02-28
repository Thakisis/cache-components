import { ComponentExample } from "@/components/component-example";
import { getProducts } from "@/server/queries/products";
export default async function Page() {
  const products = await getProducts();
  console.log(products);

  return <ComponentExample />;
}
