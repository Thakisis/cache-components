import { Package, Star } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";


import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

import {  getProductField2 } from "@/server/queries/revalidateProduct";
import EditButton from "./edit-button";
import { UpdateWrapper } from "./update-wrapper";
import { cn } from "@/lib/utils";

export interface ProductKey {
  id: number;
}
export default function ProductCard({ id }: ProductKey) {
  return (
    <article className="w-95 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30">
      <div className="flex flex-col gap-4 p-5">  
        {/* <Suspense> */}
          <ProductName id={id} />
        {/* </Suspense> */}
        {/* <Suspense> */}
          <ProductDescription id={id} /> 
        {/* </Suspense> */}
        {/* <div className="flex items-center justify-between">
          <ProductBadge id={id} />
          <ProductBrand id={id} />
        </div>
        <ProductRating id={id} />
        <Price id={id} /> */}
        {/* <Suspense>
          <Stock id={id} /> 
        </Suspense>  */}
        <EditButton id={id} />
      </div>
    </article>
  );
}
export async function ProductName({ id }: { id: number }) {
  "use cache: remote";
  cacheTag(`name-${id}`);
  cacheLife("nuncaSeRevalida")
  const data = await getProductField2({id, field: "name"});
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

export async function ProductDescription({ id }: { id: number }) {
  "use cache";
  cacheTag(`description-${id}`);
  cacheLife("nuncaSeRevalida")
  const data = await getProductField2({id, field:"description"});
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
  cacheLife("nuncaSeRevalida")
  const dataprice = await getProductField2({id, field:"price"});
  const datadiscount = await getProductField2({id, field:"discount"});
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
  cacheLife("nuncaSeRevalida")
  const data = await getProductField2({id, field:"rating"});
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
  cacheLife("nuncaSeRevalida")
  const data = await getProductField2({id, field:"brand"});
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
  cacheLife("nuncaSeRevalida")
  const data = await getProductField2({id, field:"category"});
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
  "use cache";
  cacheTag(`stock-${id}`);
  cacheLife("seconds")
  const product = await getProductField2({id, field:"stock"});
  if (!product) return null;
  const { stock, date } = product;

  return (
    <Suspense>
        <UpdateWrapper updatedAt={date}>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Package className="size-3.5" />
              <span>{stock > 0 ? `${stock} in stock` : "Out of stock"}</span>
            </div>
          </div>
        </UpdateWrapper>
    </Suspense>
  );
}

// export async function ProductImage({ id }: { id: number }) {

//   cacheTag(`image-${id}`);

//   const name = await getProductField2(id, "name");
//   const description = await getProductField2(id, "description");
//   if (!name || !description) return null;

//   const imageUrl = await generateCardImage({
//     id: id.toString(),
//     title: name.name,
//     description: description.description,
//   });

//   return (
//     <Image src={imageUrl} width={1200} height={630} alt={name.name} priority />
//   );
// }
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
