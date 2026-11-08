"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storeImage } from "@/lib/storage";

export type PostFormState = { error?: string } | undefined;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function isUniqueSlugError(e: unknown): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    (e as { code?: string }).code === "P2002"
  );
}

async function resolveImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      return { url: await storeImage(file, "blog") };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  }
  const current = String(formData.get("currentImage") ?? "").trim();
  if (current) return { url: current };
  return {};
}

function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

export async function createPost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  
  const showOnHome = formData.get("showOnHome") === "on";
  const homeOrderRaw = formData.get("homeOrder");
  const homeOrder = homeOrderRaw ? parseInt(String(homeOrderRaw), 10) : 0;

  if (!title || !slug || !content) {
    return { error: "Title, slug and content are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image.url,
        publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
        showOnHome,
        homeOrder: isNaN(homeOrder) ? 0 : homeOrder,
      },
    });
  } catch (e) {
    if (isUniqueSlugError(e)) return { error: "That slug is already taken." };
    return { error: "Could not save the post. Please try again." };
  }

  revalidateBlog();
  redirect("/admin/posts");
}

export async function updatePost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();

  const showOnHome = formData.get("showOnHome") === "on";
  const homeOrderRaw = formData.get("homeOrder");
  const homeOrder = homeOrderRaw ? parseInt(String(homeOrderRaw), 10) : 0;

  if (!id) return { error: "Missing post id." };
  if (!title || !slug || !content) {
    return { error: "Title, slug and content are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image.url,
        showOnHome,
        homeOrder: isNaN(homeOrder) ? 0 : homeOrder,
        ...(publishedAtRaw ? { publishedAt: new Date(publishedAtRaw) } : {}),
      },
    });
  } catch (e) {
    if (isUniqueSlugError(e)) return { error: "That slug is already taken." };
    return { error: "Could not save the post. Please try again." };
  }

  revalidateBlog();
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireSession();
  await prisma.post.delete({ where: { id } }).catch(() => null);
  revalidateBlog();
  revalidatePath("/admin/posts");
}
