import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Stores an uploaded image and returns its public URL.
 * Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is set (production),
 * otherwise writes to public/uploads (local dev).
 */
export async function storeImage(file: File, prefix = "uploads"): Promise<string> {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error("Only JPEG, PNG and WebP images are allowed.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "image";
  const filename = `${Date.now()}-${safeName}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${prefix}/${filename}`, file, { access: "public" });
    return blob.url;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);
  return `/uploads/${filename}`;
}
