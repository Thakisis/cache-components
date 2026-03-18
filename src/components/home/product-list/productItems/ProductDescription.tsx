
import { cacheLife, cacheTag } from "next/cache";
import { UpdateWrapper } from "../product-card/update-wrapper";
import { getProductDescription } from "@/server/queries/products/getProductDescription";

export async function ProductDescription({ id }: { id: number }) {
  "use cache";
  cacheTag(`description-${id}`);
  cacheLife("nuncaSeRevalida")
  const data = await getProductDescription(id);
  if (!data) return null;
  const { description, date } = data;

  return (
    <UpdateWrapper updatedAt={date}>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </UpdateWrapper>
  );
}