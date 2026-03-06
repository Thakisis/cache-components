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
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

await client.execute("DELETE FROM products");

const seed: NewProduct[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Pro',
    description:
      "Portátil profesional con chip Apple M3 Pro, 18GB RAM, 512GB SSD. Pantalla Liquid Retina XDR.",
    price: 2999.99,
    category: "Portátiles",
    brand: "Apple",
    stock: 25,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-2023.jpg",
        alt: "MacBook Pro 16 M3 Pro vista frontal",
      },
      {
        url: "https://placehold.co/800x600?text=MacBook+Pro+16+Side",
        alt: "MacBook Pro 16 M3 Pro vista lateral",
      },
    ],
    rating: 4.9,
    discount: 10,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Smartphone flagship con S Pen integrado, cámara 200MP, procesador Snapdragon 8 Gen 3.",
    price: 1299.99,
    category: "Smartphones",
    brand: "Samsung",
    stock: 50,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-0.jpg",
        alt: "Samsung Galaxy S24 Ultra frontal",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg",
        alt: "Samsung Galaxy S24 Ultra trasera",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-2.jpg",
        alt: "Samsung Galaxy S24 Ultra con S Pen",
      },
    ],
    rating: 4.8,
    discount: 0,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description:
      "Auriculares inalámbricos con cancelación de ruido líder del sector. Hasta 30h de batería.",
    price: 349.99,
    category: "Audio",
    brand: "Sony",
    stock: 80,
    images: [
      {
        url: "https://www.sony.com/image/5d02da5df552836db894cead731a871b?fmt=png-alpha&wid=800",
        alt: "Sony WH-1000XM5 vista frontal",
      },
      {
        url: "https://www.sony.com/image/0b8f871e4fa290a6c4b898a59da40a9f?fmt=png-alpha&wid=800",
        alt: "Sony WH-1000XM5 plegados",
      },
    ],
    rating: 4.8,
    discount: 15,
  },
  {
    id: 4,
    name: "NVIDIA RTX 4080 Super",
    description:
      "Tarjeta gráfica para gaming y creatividad. 16GB GDDR6X, ray tracing avanzado, DLSS 3.",
    price: 999.99,
    category: "Componentes",
    brand: "NVIDIA",
    stock: 15,
    images: [
      {
        url: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080-super/geforce-rtx-4080-super-shop-630-d.jpg",
        alt: "NVIDIA RTX 4080 Super vista superior",
      },
      {
        url: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080-super/geforce-rtx-4080-super-oc-edition-gallery-d.jpg",
        alt: "NVIDIA RTX 4080 Super conectores",
      },
    ],
    rating: 4.7,
    discount: 5,
  },
  {
    id: 5,
    name: 'iPad Pro 13" M4',
    description:
      "Tablet profesional con chip M4, pantalla OLED Ultra Retina XDR, Apple Pencil Pro compatible.",
    price: 1299.99,
    category: "Tablets",
    brand: "Apple",
    stock: 35,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-1.jpg",
        alt: "iPad Pro 13 M4 frontal",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-2.jpg",
        alt: "iPad Pro 13 M4 trasera",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-13-2024-3.jpg",
        alt: "iPad Pro 13 M4 con Apple Pencil",
      },
    ],
    rating: 4.9,
    discount: 0,
  },
  {
    id: 6,
    name: 'LG OLED C4 55"',
    description:
      "Smart TV OLED 4K con procesador α9 Gen7, Dolby Vision, compatibilidad con gaming 120Hz VRR.",
    price: 1499.99,
    category: "Televisores",
    brand: "LG",
    stock: 20,
    images: [
      {
        url: "https://gscs-b2c.lge.com/downloadFile?fileId=nHZ1EVkm5G6HQKA1EvHBdA",
        alt: "LG OLED C4 55 pulgadas frontal",
      },
      {
        url: "https://placehold.co/800x600?text=LG+OLED+C4+Side",
        alt: "LG OLED C4 55 pulgadas lateral",
      },
    ],
    rating: 4.8,
    discount: 20,
  },
  {
    id: 7,
    name: "Logitech MX Master 3S",
    description:
      "Ratón inalámbrico avanzado para productividad. Scroll electromagnético silencioso, 8000 DPI.",
    price: 99.99,
    category: "Periféricos",
    brand: "Logitech",
    stock: 120,
    images: [
      {
        url: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
        alt: "Logitech MX Master 3S vista superior",
      },
      {
        url: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-side-view-graphite.png",
        alt: "Logitech MX Master 3S vista lateral",
      },
    ],
    rating: 4.7,
    discount: 0,
  },
  {
    id: 8,
    name: "Samsung 990 Pro 2TB NVMe",
    description:
      "SSD NVMe PCIe 4.0 con velocidades de lectura hasta 7.450 MB/s. Ideal para gaming y edición.",
    price: 179.99,
    category: "Almacenamiento",
    brand: "Samsung",
    stock: 200,
    images: [
      {
        url: "https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/internal-ssd/06202023/MZ-V9P2T0B_001_Front_Black.jpg",
        alt: "Samsung 990 Pro 2TB NVMe frontal",
      },
      {
        url: "https://image-us.samsung.com/SamsungUS/home/computing/memory-storage/internal-ssd/06202023/MZ-V9P2T0B_002_Back_Black.jpg",
        alt: "Samsung 990 Pro 2TB NVMe trasera",
      },
    ],
    rating: 4.8,
    discount: 10,
  },
  {
    id: 9,
    name: "Apple Watch Series 10",
    description:
      "Smartwatch con pantalla Always-On más grande, detección de apnea del sueño, GPS.",
    price: 399.99,
    category: "Wearables",
    brand: "Apple",
    stock: 60,
    images: [
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-1.jpg",
        alt: "Apple Watch Series 10 esfera frontal",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-2.jpg",
        alt: "Apple Watch Series 10 lateral",
      },
      {
        url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-3.jpg",
        alt: "Apple Watch Series 10 con correa",
      },
    ],
    rating: 4.7,
    discount: 5,
  },
  {
    id: 10,
    name: "Asus ROG Ally X",
    description:
      "Consola portátil gaming con AMD Ryzen Z1 Extreme, pantalla 1080p 120Hz, 24GB RAM.",
    price: 799.99,
    category: "Gaming",
    brand: "Asus",
    stock: 30,
    images: [
      {
        url: "https://dlcdnwebimgs.asus.com/gain/B8E5E8B0-5D3B-4C7C-B6B7-4B4B5B0E5B5E/w800/h600",
        alt: "Asus ROG Ally X frontal",
      },
      {
        url: "https://placehold.co/800x600?text=ROG+Ally+X+Back",
        alt: "Asus ROG Ally X trasera",
      },
    ],
    rating: 4.6,
    discount: 0,
  },
];

await db.insert(products).values(seed);

client.close();
