
import { ProductEditForm } from "./product-edit-form";
import { Suspense } from "react";
import { getProduct } from "@/server/queries/getProduct";
import { cacheLife, cacheTag } from "next/cache";
export type PageParams = {
  idproduct: number;
};

export default async function EditProduct({ idproduct }: PageParams) {
  "use cache";
  cacheTag(`product-${idproduct}`);
  cacheLife("nuncaSeRevalida")
  const product = await getProduct(idproduct);

  return (
  <Suspense>
    <ProductEditForm product={product} />;
  </Suspense>)
}
