"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storeImage } from "@/lib/storage";

export async function updateSiteImage(key: string, formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/images?error=No+file+chosen");
  }

  const alt = String(formData.get("alt") ?? "").trim();

  try {
    const url = await storeImage(file, "site");
    await prisma.siteImage.upsert({
      where: { key },
      update: { url, alt: alt || null },
      create: { key, url, alt: alt || null },
    });
  } catch (e) {
    redirect(
      "/admin/images?error=" +
        encodeURIComponent(e instanceof Error ? e.message : "Upload failed")
    );
  }

  revalidatePath("/", "layout");
  redirect("/admin/images?updated=1");
}

export async function deleteSiteImage(key: string) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  try {
    await prisma.siteImage.delete({
      where: { key },
    });
  } catch (e) {
    redirect(
      "/admin/images?error=" +
        encodeURIComponent(e instanceof Error ? e.message : "Delete failed")
    );
  }

  revalidatePath("/", "layout");
  redirect("/admin/images?updated=Deleted");
}
