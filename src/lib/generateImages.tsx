// lib/generate-card.ts

import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

const font = readFileSync(path.join(process.cwd(), "public/fonts/Inter.ttf"));

export async function generateCardImage(data: {
  id: string;
  title: string;
  description?: string;
}) {
  const dir = path.join(process.cwd(), "public", "cards");
  const imagePath = path.join(dir, `${data.id}.avif`);
  const publicUrl = `/cards/${data.id}.avif`;

  // Si ya existe no regenerar
  try {
    await fs.access(imagePath);
    return publicUrl;
  } catch {}

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: 60,
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: 56, margin: 0 }}>{data.title}</h1>
      {data.description && (
        <p style={{ fontSize: 28, opacity: 0.7 }}>{data.description}</p>
      )}
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: font, weight: 400 }],
    },
  );

  await fs.mkdir(dir, { recursive: true });
  await sharp(Buffer.from(svg))
    .avif()
    .toBuffer()
    .then((buf) => fs.writeFile(imagePath, buf));

  return publicUrl;
}
