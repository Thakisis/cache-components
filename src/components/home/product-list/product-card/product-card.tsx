import { Package, Star } from "lucide-react";
import { cacheTag } from "next/cache";
import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

import { generateCardImage } from "@/lib/generateImages";
import { cn } from "@/lib/utils";
import { getProductField } from "@/server/queries/products";
import EditButton from "./edit-button";
import { UpdateWrapper } from "./update-wrapper";

export interface ProductKey {
  id: number;
}
export default function ProductCard({ id }: ProductKey) {
  return (
    <article className="w-95 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30">
      <div className="flex flex-col gap-4 p-5">
        <ProductName id={id} />

        <ProductDescription id={id} />

        <div className="flex items-center justify-between">
          <ProductBadge id={id} />

          <ProductBrand id={id} />
        </div>

        <ProductRating id={id} />

        <Price id={id} />
        <Suspense fallback={<div>loading</div>}>
          <Stock id={id} />
        </Suspense>
        <EditButton id={id} />
      </div>
    </article>
  );
}
export async function ProductName({ id }: { id: number }) {
  "use cache";
  cacheTag(`name-${id}`);
  const data = await getProductField(id, "name");
  if (!data) return null;
  const { name, date } = data;
  return (
    <UpdateWrapper updatedAt={date}>
      <h2 className="text-lg font-bold leading-snug text-card-foreground text-balance">
        {name}
      </h2>
    </UpdateWrapper>
  );
}

export async function ProductDescription({ id }: { id: number }) {
  "use cache";
  cacheTag(`description-${id}`);
  const data = await getProductField(id, "description");
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

async function Price({ id }: { id: number }) {
  "use cache";
  cacheTag(`price-${id}`, `discount-${id}`);
  const dataprice = await getProductField(id, "price");
  const datadiscount = await getProductField(id, "discount");
  if (!dataprice || !datadiscount) return null;
  const { price, date } = dataprice;
  const { discount } = datadiscount;

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <UpdateWrapper updatedAt={date}>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-card-foreground">
          ${discountedPrice.toFixed(2)}
        </span>
        {discount > 0 && (
          <span className="text-sm text-muted-foreground line-through">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </UpdateWrapper>
  );
}

export async function ProductRating({ id }: { id: number }) {
  "use cache";
  cacheTag(`rating-${id}`);
  const data = await getProductField(id, "rating");
  if (!data) return null;
  const { rating, date } = data;
  return (
    <UpdateWrapper updatedAt={date}>
      <StarRating rating={rating} />
    </UpdateWrapper>
  );
}

export async function ProductBrand({ id }: { id: number }) {
  "use cache";
  cacheTag(`brand-${id}`);
  const data = await getProductField(id, "brand");
  if (!data) return null;
  const { brand, date } = data;
  return (
    <UpdateWrapper updatedAt={date}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {brand}
      </span>
    </UpdateWrapper>
  );
}

export async function ProductBadge({ id }: { id: number }) {
  "use cache";
  cacheTag(`category-${id}`);
  const data = await getProductField(id, "category");
  if (!data) return null;
  const { category, date } = data;

  return (
    <UpdateWrapper updatedAt={date}>
      <Badge variant="secondary" className="text-xs font-medium">
        {category}
      </Badge>
    </UpdateWrapper>
  );
}
async function Stock({ id }: { id: number }) {
  await connection(); // le dice a Next.js que este componente es dinámico

  const product = await getProductField(id, "stock");
  if (!product) return null;
  const { stock, date } = product;

  return (
    <UpdateWrapper updatedAt={date}>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package className="size-3.5" />
          <span>{stock > 0 ? `${stock} in stock` : "Out of stock"}</span>
        </div>
      </div>
    </UpdateWrapper>
  );
}

export async function ProductImage({ id }: { id: number }) {
  "use cache";
  cacheTag(`image-${id}`);
  const name = await getProductField(id, "name");
  const description = await getProductField(id, "description");
  if (!name || !description) return null;

  const imageUrl = await generateCardImage({
    id: id.toString(),
    title: name.name,
    description: description.description,
  });

  return (
    <Image src={imageUrl} width={1200} height={630} alt={name.name} priority />
  );
}
export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        return (
          <Star
            key={star}
            className={cn(
              "size-4",
              filled
                ? "fill-primary text-primary"
                : partial
                  ? "fill-primary/50 text-primary"
                  : "fill-muted text-muted",
            )}
          />
        );
      })}
      <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
    </div>
  );
}
