import EditProduct from "@/components/edit-product";
import { getProductIds } from "@/server/queries/products";
export type PageParams = {
  idproduct: string;
};

export async function generateStaticParams() {
  const products = await getProductIds(10);
  return products.map((product) => ({
    idproduct: product.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { idproduct } = await params;
  return <EditProduct idproduct={idproduct} />;
}
