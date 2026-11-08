"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storeImage } from "@/lib/storage";

export type PlacementFormState = { error?: string } | undefined;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

async function resolveImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      return { url: await storeImage(file, "placements") };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  }
  const current = String(formData.get("currentImage") ?? "").trim();
  if (current) return { url: current };
  return {};
}

function parseForm(formData: FormData) {
  const studentName = String(formData.get("studentName") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  return { studentName, companyName, role };
}

export async function createPlacement(
  _prevState: PlacementFormState,
  formData: FormData
): Promise<PlacementFormState> {
  await requireSession();

  const { studentName, companyName, role } = parseForm(formData);
  if (!studentName || !companyName || !role) {
    return { error: "Student name, company and role are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.placement.create({
      data: { studentName, companyName, role, image: image.url },
    });
  } catch {
    return { error: "Could not save the placement. Please try again." };
  }

  revalidatePath("/placements");
  redirect("/admin/placements");
}

export async function updatePlacement(
  _prevState: PlacementFormState,
  formData: FormData
): Promise<PlacementFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing placement id." };

  const { studentName, companyName, role } = parseForm(formData);
  if (!studentName || !companyName || !role) {
    return { error: "Student name, company and role are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.placement.update({
      where: { id },
      data: { studentName, companyName, role, image: image.url },
    });
  } catch {
    return { error: "Could not save the placement. Please try again." };
  }

  revalidatePath("/placements");
  redirect("/admin/placements");
}

export async function deletePlacement(id: string) {
  await requireSession();
  await prisma.placement.delete({ where: { id } }).catch(() => null);
  revalidatePath("/placements");
  revalidatePath("/admin/placements");
}
