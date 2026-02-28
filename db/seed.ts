// db/seed.ts
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { type NewProduct, products } from "../src/db/schema";

const client = new Database("db/products.sqlite", { create: true });
const db = drizzle(client);

client.run(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    description TEXT    NOT NULL DEFAULT '',
    price       REAL    NOT NULL,
    category    TEXT    NOT NULL,
    brand       TEXT    NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    images      TEXT    NOT NULL DEFAULT '[]',
    rating      REAL    NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

client.run("DELETE FROM products");

const seed: NewProduct[] = [
  {
    name: 'MacBook Pro 16" M3 Pro',
    description:
      "Portátil profesional con chip Apple M3 Pro, 18GB RAM, 512GB SSD. Pantalla Liquid Retina XDR.",
    price: 2999.99,
    category: "Portátiles",
    brand: "Apple",
    stock: 25,
    images: [
      {
        url: "/images/macbook-pro-front.jpg",
        alt: "MacBook Pro 16 M3 Pro vista frontal",
      },
      {
        url: "/images/macbook-pro-side.jpg",
        alt: "MacBook Pro 16 M3 Pro vista lateral",
      },
      {
        url: "/images/macbook-pro-keyboard.jpg",
        alt: "Teclado MacBook Pro 16 M3 Pro",
      },
    ],
    rating: 4.9,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Smartphone flagship con S Pen integrado, cámara 200MP, procesador Snapdragon 8 Gen 3.",
    price: 1299.99,
    category: "Smartphones",
    brand: "Samsung",
    stock: 50,
    images: [
      {
        url: "/images/s24-ultra-front.jpg",
        alt: "Samsung Galaxy S24 Ultra pantalla frontal",
      },
      {
        url: "/images/s24-ultra-back.jpg",
        alt: "Samsung Galaxy S24 Ultra cámara trasera",
      },
      {
        url: "/images/s24-ultra-spen.jpg",
        alt: "Samsung Galaxy S24 Ultra con S Pen",
      },
    ],
    rating: 4.8,
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Auriculares inalámbricos con cancelación de ruido líder del sector. Hasta 30h de batería.",
    price: 349.99,
    category: "Audio",
    brand: "Sony",
    stock: 80,
    images: [
      { url: "/images/xm5-front.jpg", alt: "Sony WH-1000XM5 vista frontal" },
      { url: "/images/xm5-fold.jpg", alt: "Sony WH-1000XM5 plegados" },
      {
        url: "/images/xm5-detail.jpg",
        alt: "Sony WH-1000XM5 detalle de almohadilla",
      },
    ],
    rating: 4.8,
  },
  {
    name: "NVIDIA RTX 4080 Super",
    description:
      "Tarjeta gráfica para gaming y creatividad. 16GB GDDR6X, ray tracing avanzado, DLSS 3.",
    price: 999.99,
    category: "Componentes",
    brand: "NVIDIA",
    stock: 15,
    images: [
      {
        url: "/images/rtx4080s-top.jpg",
        alt: "NVIDIA RTX 4080 Super vista superior",
      },
      {
        url: "/images/rtx4080s-connectors.jpg",
        alt: "NVIDIA RTX 4080 Super conectores",
      },
      {
        url: "/images/rtx4080s-installed.jpg",
        alt: "NVIDIA RTX 4080 Super instalada en PC",
      },
    ],
    rating: 4.7,
  },
  {
    name: 'iPad Pro 13" M4',
    description:
      "Tablet profesional con chip M4, pantalla OLED Ultra Retina XDR, Apple Pencil Pro compatible.",
    price: 1299.99,
    category: "Tablets",
    brand: "Apple",
    stock: 35,
    images: [
      {
        url: "/images/ipad-pro-m4-front.jpg",
        alt: "iPad Pro 13 M4 pantalla frontal",
      },
      {
        url: "/images/ipad-pro-m4-back.jpg",
        alt: "iPad Pro 13 M4 parte trasera",
      },
      {
        url: "/images/ipad-pro-m4-pencil.jpg",
        alt: "iPad Pro 13 M4 con Apple Pencil Pro",
      },
    ],
    rating: 4.9,
  },
  {
    name: 'LG OLED C4 55"',
    description:
      "Smart TV OLED 4K con procesador α9 Gen7, Dolby Vision, compatibilidad con gaming 120Hz VRR.",
    price: 1499.99,
    category: "Televisores",
    brand: "LG",
    stock: 20,
    images: [
      {
        url: "/images/lg-c4-front.jpg",
        alt: "LG OLED C4 55 pulgadas vista frontal",
      },
      {
        url: "/images/lg-c4-side.jpg",
        alt: "LG OLED C4 55 pulgadas perfil delgado",
      },
      {
        url: "/images/lg-c4-remote.jpg",
        alt: "LG OLED C4 con mando Magic Remote",
      },
    ],
    rating: 4.8,
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "Ratón inalámbrico avanzado para productividad. Scroll electromagnético silencioso, 8000 DPI.",
    price: 99.99,
    category: "Periféricos",
    brand: "Logitech",
    stock: 120,
    images: [
      {
        url: "/images/mx-master-3s-top.jpg",
        alt: "Logitech MX Master 3S vista superior",
      },
      {
        url: "/images/mx-master-3s-side.jpg",
        alt: "Logitech MX Master 3S vista lateral",
      },
    ],
    rating: 4.7,
  },
  {
    name: "Samsung 990 Pro 2TB NVMe",
    description:
      "SSD NVMe PCIe 4.0 con velocidades de lectura hasta 7.450 MB/s. Ideal para gaming y edición.",
    price: 179.99,
    category: "Almacenamiento",
    brand: "Samsung",
    stock: 200,
    images: [
      {
        url: "/images/990pro-front.jpg",
        alt: "Samsung 990 Pro 2TB cara frontal",
      },
      {
        url: "/images/990pro-installed.jpg",
        alt: "Samsung 990 Pro 2TB instalado en placa",
      },
    ],
    rating: 4.8,
  },
  {
    name: "Apple Watch Series 10",
    description:
      "Smartwatch con pantalla Always-On más grande, detección de apnea del sueño, GPS.",
    price: 399.99,
    category: "Wearables",
    brand: "Apple",
    stock: 60,
    images: [
      {
        url: "/images/watch-s10-front.jpg",
        alt: "Apple Watch Series 10 esfera frontal",
      },
      {
        url: "/images/watch-s10-side.jpg",
        alt: "Apple Watch Series 10 corona lateral",
      },
      {
        url: "/images/watch-s10-strap.jpg",
        alt: "Apple Watch Series 10 con correa deportiva",
      },
    ],
    rating: 4.7,
  },
  {
    name: "Asus ROG Ally X",
    description:
      "Consola portátil gaming con AMD Ryzen Z1 Extreme, pantalla 1080p 120Hz, 24GB RAM.",
    price: 799.99,
    category: "Gaming",
    brand: "Asus",
    stock: 30,
    images: [
      {
        url: "/images/rog-ally-x-front.jpg",
        alt: "Asus ROG Ally X vista frontal con pantalla",
      },
      {
        url: "/images/rog-ally-x-back.jpg",
        alt: "Asus ROG Ally X parte trasera",
      },
      {
        url: "/images/rog-ally-x-controls.jpg",
        alt: "Asus ROG Ally X detalle de mandos",
      },
    ],
    rating: 4.6,
  },
];

db.insert(products).values(seed).run();

console.log(`✅ ${seed.length} productos insertados`);
client.close();
