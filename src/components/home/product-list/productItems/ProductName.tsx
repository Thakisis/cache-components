import { cacheLife, cacheTag } from "next/cache";
import { UpdateWrapper } from "../product-card/update-wrapper";
import { getProductName } from "@/server/queries/products/getProductName";

export async function ProductName({ id }: { id: number }) {
  "use cache: remote";
  cacheTag(`name-${id}`);
  cacheLife("nuncaSeRevalida")
  const data = await getProductName(id)
  if (!data) return null;
  const { name, date } = data;
  return (  
    <UpdateWrapper updatedAt={date}>
      <h2 className="text-lg font-bold leading-snug text-card-foreground text-balance">
        {name}
      </h2>
    </UpdateWrapper>
  )
}