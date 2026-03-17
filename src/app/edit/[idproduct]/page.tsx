import { getProductIds } from "@/server/queries/products";

export async function generateStaticParams() {
  const products = await getProductIds(10);
  return products.map((product) => ({
    idproduct: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: PageProps<"/edit/[idproduct]">) {
  const { idproduct } = await params;
  return <div>Edit Product {idproduct}</div>;
}
