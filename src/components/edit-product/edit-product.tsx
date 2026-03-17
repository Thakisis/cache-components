
import { ProductEditForm } from "./product-edit-form";
import { Suspense } from "react";
import { getProduct } from "@/server/queries/products";
export type PageParams = {
  idproduct: number;
};

export default async function EditProduct({ idproduct }: PageParams) {

  const product = await getProduct(idproduct);

  return (
  <Suspense>
    <ProductEditForm product={product} />;
  </Suspense>)
}
