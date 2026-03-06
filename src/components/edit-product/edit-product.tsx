import { getProduct } from "@/server/queries/products";
import { ProductEditForm } from "./product-edit-form";
export type PageParams = {
  idproduct: string;
};

export default async function EditProduct({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { idproduct } = await params;
  const product = await getProduct(parseInt(idproduct, 10));
  return <ProductEditForm product={product} />;
}
