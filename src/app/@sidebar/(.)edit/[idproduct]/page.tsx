import EditProduct from "@/components/edit-product";

export type PageParams = {
  idproduct: string;
};

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { idproduct } = await params;
  return <EditProduct idproduct={idproduct} />;
}
