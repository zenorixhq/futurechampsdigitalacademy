"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storeImage } from "@/lib/storage";

export type ProjectFormState = { error?: string } | undefined;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

async function resolveImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      return { url: await storeImage(file, "projects") };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  }
  const current = String(formData.get("currentImage") ?? "").trim();
  if (current) return { url: current };
  return {};
}

function parseForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const categories = String(formData.get("categories") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const orderRaw = Number.parseInt(String(formData.get("order") ?? ""), 10);
  const order = Number.isNaN(orderRaw) ? 0 : orderRaw;
  return { title, categories, imageAlt, order };
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireSession();

  const { title, categories, imageAlt, order } = parseForm(formData);
  if (!title) return { error: "Title is required." };

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.project.create({
      data: { title, categories, imageAlt: imageAlt || null, order, image: image.url },
    });
  } catch {
    return { error: "Could not save the project. Please try again." };
  }

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing project id." };

  const { title, categories, imageAlt, order } = parseForm(formData);
  if (!title) return { error: "Title is required." };

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.project.update({
      where: { id },
      data: { title, categories, imageAlt: imageAlt || null, order, image: image.url },
    });
  } catch {
    return { error: "Could not save the project. Please try again." };
  }

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireSession();
  await prisma.project.delete({ where: { id } }).catch(() => null);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
