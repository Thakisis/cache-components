import { cacheTag } from "next/cache";

import { ProductEditForm } from "./product-edit-form";
import { Product } from "@/types/product";
import { Suspense } from "react";
export type PageParams = {
  idproduct: Product;
};

export default async function EditProduct({ idproduct }: PageParams) {
  "use cache";
  cacheTag(`product-${idproduct.id}`);
 
  return (
  <Suspense>
    <ProductEditForm product={idproduct} />;
  </Suspense>)
}
