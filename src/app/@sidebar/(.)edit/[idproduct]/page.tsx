import { Suspense } from "react";
import EditProduct from "@/components/edit-product";
export type PageParams = {
  idproduct: string;
};

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProduct params={params} />
    </Suspense>
  );
}
