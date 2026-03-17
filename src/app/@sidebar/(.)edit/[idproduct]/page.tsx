import EditProduct from "@/components/edit-product";
import { getProductIds } from "@/server/queries/getProductIds";
import { getProduct } from "@/server/queries/products";


export async function generateStaticParams() {
  const products = await getProductIds(10);
  return products.map((product) => ({
    idproduct: product.id.toString(),
  }));
}

export default async function Page({
  params,
}:PageProps<"/edit/[idproduct]">) {
  const { idproduct } = await params;
  const product = await getProduct(parseInt(idproduct, 10));
  console.log("pepita")
  return <EditProduct idproduct={product} />;
}
