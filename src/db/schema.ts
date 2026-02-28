// src/db/schema.ts
import { sql } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: real("price").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  stock: int("stock").notNull().default(0),
  images: text("images", { mode: "json" })
    .notNull()
    .$type<{ url: string; alt: string }[]>()
    .default(sql`'[]'`),
  rating: real("rating").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
