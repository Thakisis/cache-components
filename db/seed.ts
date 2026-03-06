// db/seed.ts
/** biome-ignore-all lint/style/noNonNullAssertion: usage of .env*/
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { type NewProduct, products } from "../src/db/schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(client);

await client.execute(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY,
    name        TEXT    NOT NULL,
    description TEXT    NOT NULL DEFAULT '',
    price       REAL    NOT NULL,
    category    TEXT    NOT NULL,
    brand       TEXT    NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    images      TEXT    NOT NULL DEFAULT '[]',
    rating      REAL    NOT NULL DEFAULT 0,
    discount    REAL    NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

await client.execute("DELETE FROM products");

const seed: NewProduct[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Pro',
    description:
      "Professional laptop with Apple M3 Pro chip, 18GB RAM, 512GB SSD. Liquid Retina XDR display.",
    price: 2999.99,
    category: "Laptops",
    brand: "Apple",
    stock: 25,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-2023.jpg",
        alt: "MacBook Pro 16 M3 Pro front view",
      },
      {
        url: "https://placehold.co/800x600?text=MacBook+Pro+16+Side",
        alt: "MacBook Pro 16 M3 Pro side view",
      },
    ],
    rating: 4.9,
    discount: 10,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Flagship smartphone with integrated S Pen, 200MP camera, Snapdragon 8 Gen 3 processor.",
    price: 1299.99,
    category: "Smartphones",
    brand: "Samsung",
    stock: 50,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-0.jpg",
        alt: "Samsung Galaxy S24 Ultra front",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg",
        alt: "Samsung Galaxy S24 Ultra back",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
        alt: "Samsung Galaxy S24 Ultra with S Pen",
      },
    ],
    rating: 4.8,
    discount: 0,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description:
      "Wireless headphones with industry-leading noise cancellation. Up to 30 hours of battery life.",
    price: 349.99,
    category: "Audio",
    brand: "Sony",
    stock: 80,
    images: [
      {
        url: "https://www.sony.com/image/5d02da5df552836db894cead731a871b?fmt=png-alpha&wid=800",
        alt: "Sony WH-1000XM5 front view",
      },
      {
        url: "https://www.sony.com/image/0b8f871e4fa290a6c4b898a59da40a9f?fmt=png-alpha&wid=800",
        alt: "Sony WH-1000XM5 folded",
      },
    ],
    rating: 4.8,
    discount: 15,
  },
  {
    id: 4,
    name: "NVIDIA RTX 4080 Super",
    description:
      "Graphics card for gaming and creativity. 16GB GDDR6X, advanced ray tracing, DLSS 3.",
    price: 999.99,
    category: "Components",
    brand: "NVIDIA",
    stock: 15,
    images: [
      {
        url: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080-super/geforce-rtx-4080-super-shop-630-d.jpg",
        alt: "NVIDIA RTX 4080 Super top view",
      },
      {
        url: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080-super/geforce-rtx-4080-super-oc-edition-gallery-d.jpg",
        alt: "NVIDIA RTX 4080 Super connectors",
      },
    ],
    rating: 4.7,
    discount: 5,
  },
  {
    id: 5,
    name: 'iPad Pro 13" M4',
    description:
      "Professional tablet with M4 chip, Ultra Retina XDR OLED display, Apple Pencil Pro compatible.",
    price: 1299.99,
    category: "Tablets",
    brand: "Apple",
    stock: 35,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-1.jpg",
        alt: "iPad Pro 13 M4 front",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-2.jpg",
        alt: "iPad Pro 13 M4 back",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-3.jpg",
        alt: "iPad Pro 13 M4 with Apple Pencil",
      },
    ],
    rating: 4.9,
    discount: 0,
  },
  {
    id: 6,
    name: 'LG OLED C4 55"',
    description:
      "4K OLED Smart TV with α9 Gen7 processor, Dolby Vision, 120Hz VRR gaming support.",
    price: 1499.99,
    category: "Televisions",
    brand: "LG",
    stock: 20,
    images: [
      {
        url: "https://gscs-b2c.lge.com/downloadFile?fileId=nHZ1EVkm5G6HQKA1EvHBdA",
        alt: "LG OLED C4 55 inch front",
      },
      {
        url: "https://placehold.co/800x600?text=LG+OLED+C4+Side",
        alt: "LG OLED C4 55 inch side",
      },
    ],
    rating: 4.8,
    discount: 20,
  },
  {
    id: 7,
    name: "Logitech MX Master 3S",
    description:
      "Advanced wireless mouse for productivity. Silent electromagnetic scroll wheel, 8000 DPI.",
    price: 99.99,
    category: "Peripherals",
    brand: "Logitech",
    stock: 120,
    images: [
      {
        url: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
        alt: "Logitech MX Master 3S top view",
      },
      {
        url: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-side-view-graphite.png",
        alt: "Logitech MX Master 3S side view",
      },
    ],
    rating: 4.7,
    discount: 0,
  },
  {
    id: 8,
    name: "Samsung 990 Pro 2TB NVMe",
    description:
      "PCIe 4.0 NVMe SSD with read speeds up to 7,450 MB/s. Ideal for gaming and video editing.",
    price: 179.99,
    category: "Storage",
    brand: "Samsung",
    stock: 200,
    images: [
      {
        url: "https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/internal-ssd/06202023/MZ-V9P2T0B_001_Front_Black.jpg",
        alt: "Samsung 990 Pro 2TB NVMe front",
      },
      {
        url: "https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/internal-ssd/06202023/MZ-V9P2T0B_002_Back_Black.jpg",
        alt: "Samsung 990 Pro 2TB NVMe back",
      },
    ],
    rating: 4.8,
    discount: 10,
  },
  {
    id: 9,
    name: "Apple Watch Series 10",
    description:
      "Smartwatch with larger Always-On display, sleep apnea detection, GPS.",
    price: 399.99,
    category: "Wearables",
    brand: "Apple",
    stock: 60,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-1.jpg",
        alt: "Apple Watch Series 10 front face",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-2.jpg",
        alt: "Apple Watch Series 10 side",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-3.jpg",
        alt: "Apple Watch Series 10 with band",
      },
    ],
    rating: 4.7,
    discount: 5,
  },
  {
    id: 10,
    name: "Asus ROG Ally X",
    description:
      "Portable gaming console with AMD Ryzen Z1 Extreme, 1080p 120Hz display, 24GB RAM.",
    price: 799.99,
    category: "Gaming",
    brand: "Asus",
    stock: 30,
    images: [
      {
        url: "https://dlcdnwebimgs.asus.com/gain/B8E5E8B0-5D3B-4C7C-B6B7-4B4B5B0E5B5E/w800/h600",
        alt: "Asus ROG Ally X front",
      },
      {
        url: "https://placehold.co/800x600?text=ROG+Ally+X+Back",
        alt: "Asus ROG Ally X back",
      },
    ],
    rating: 4.6,
    discount: 0,
  },
];

await db.insert(products).values(seed);

client.close();
