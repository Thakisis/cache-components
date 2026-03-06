import { Package, Star } from "lucide-react";
import { cacheTag } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/db/schema";
import { generateCardImage } from "@/lib/generateImages";
import { cn } from "@/lib/utils";
import { getProduct } from "@/server/queries/products";
import EditButton from "./edit-button";
import { UpdateHighlight } from "./update-hightlight";
import { connection } from "next/server";
interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductKey {
  id: number;
}
type ProductPromise = Promise<Product | null>;

export default async function ProductCard({ id }: ProductKey) {
  const productPromise = getProduct(id);

  return (
    <article className="w-95 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30">
      {/* <Suspense fallback={<div>loading</div>}>
        <ProductImage id={id} />
      </Suspense> */}
      <div className="flex flex-col gap-4 p-5">
        <Suspense fallback={<div>name...</div>}>
          <ProductName id={id} />
        </Suspense>
        <Suspense fallback={<div>Description...</div>}>
          <ProductDescription id={id} />
        </Suspense>
        <div className="flex items-center justify-between">
           <Suspense fallback={<div>badge...</div>}>
            <ProductBadge id={id} />
          </Suspense>
          <Suspense fallback={<div>brand...</div>}>
            <ProductBrand id={id} />
          </Suspense>
        </div>
        
        <Suspense fallback={<div>rating...</div>}>
          <ProductRating id={id} />
        </Suspense>
        <Suspense fallback={<div>loading</div>}>
          <Price id={id} />
        </Suspense>
        <Suspense fallback={<div>stock...</div>}>
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
  const productData = await getProduct(id);

  if (!productData) return null;
  const { name } = productData;
  console.log("cacheado con tag", `name-${id}`);
  const date = new Date();

  return (
    <UpdateHighlight updatedAt={date} >
      <h2 className="text-lg font-bold leading-snug text-card-foreground text-balance">
        {name}
      </h2>
    </UpdateHighlight>
  );
}
export async function ProductDescription({ id }: { id: number }) {
  "use cache";
  cacheTag(`description-${id}`);
  const productData = await getProduct(id);
  if (!productData) return null;
  const { description } = productData;
  const date = new Date();
  return (
    <UpdateHighlight updatedAt={date} >
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </UpdateHighlight>
  );
}


async function Price({ id }: { id: number }) {
   "use cache";
  cacheTag(`price-${id}`,`discount-${id}`);
  const productData = await getProduct(id);
  
  if (!productData) return null;
  const { discount, price } = productData;

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  const date = new Date();
  return (
    <UpdateHighlight updatedAt={date}>
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
    </UpdateHighlight>
  );
}
async function Stock({ id }: { id: number }) {
    await connection(); // le dice a Next.js que este componente es dinámico
  const productData = await getProduct(id);
  if (!productData) return null;
  const { stock } = productData;
const date = new Date();
  return (
    <UpdateHighlight updatedAt={date}>
            <div className="flex items-end justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package className="size-3.5" />
          <span>{stock > 0 ? `${stock} in stock` : "Out of stock"}</span>
        </div>
      </div>
    </UpdateHighlight>
  );
}

export async function ProductRating({ id }: { id: number }) {
    "use cache";
  cacheTag(`rating-${id}`);
  const productData = await getProduct(id);
  
  if (!productData) return null;
  const { rating } = productData;
  const date = new Date();
  return (
    <UpdateHighlight updatedAt={date}>
      <StarRating rating={rating} />
    </UpdateHighlight>
    )
  
}
export async function ProductBrand({ id }: { id: number }) {
  "use cache";
  cacheTag(`brand-${id}`);
  const productData = await getProduct(id);
  if (!productData) return null;
  const { brand } = productData;
  const date = new Date();
  return (
    <UpdateHighlight updatedAt={date}>
    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {brand}
    </span>
    </UpdateHighlight>
  );
}

export async function ProductBadge({ id }: { id: number }) {
  "use cache";
  cacheTag(`category-${id}`);
  const productData = await getProduct(id);
  if (!productData) return null;
  const { category } = productData;
  const date = new Date();
  return (
    <UpdateHighlight updatedAt={date}>
    <Badge variant="secondary" className="text-xs font-medium">
      {category}
    </Badge>
    </UpdateHighlight>
  );
}

export async function ProductImage({ id }: { id: number }) {
  "use cache";
  //cacheTag(`image-${id}`);
  const productData = await getProduct(id);
  if (!productData) return null;
  const { name, description } = productData;

  const imageUrl = await generateCardImage({
    id: id.toString(),
    title: name,
    description,
  });

  return <Image src={imageUrl} width={1200} height={630} alt={name} priority />;
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
