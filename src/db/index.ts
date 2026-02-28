// src/db/index.ts
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

const client = new Database("db/products.sqlite", { create: true });

client.run("PRAGMA journal_mode = WAL");
client.run("PRAGMA synchronous = NORMAL");

export const db = drizzle(client, { schema });
