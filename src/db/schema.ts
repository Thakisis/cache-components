// src/db/schema.ts
import { sql } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: real("price").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  stock: int("stock").notNull().default(0),
  discount: real("discount").notNull().default(0), // porcentaje: 0-100
  images: text("images", { mode: "json" })
    .notNull()
    .$type<{ url: string; alt: string }[]>()
    .default(sql`'[]'`),
  rating: real("rating").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// Tipos inferidos por Drizzle — no hace falta definirlos a mano
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
