"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storeImage } from "@/lib/storage";

export type FacultyFormState = { error?: string } | undefined;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

async function resolveImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      return { url: await storeImage(file, "faculty") };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  }
  const current = String(formData.get("currentImage") ?? "").trim();
  if (current) return { url: current };
  return {};
}

function parseForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const video = String(formData.get("video") ?? "").trim();
  const experienceYears = String(formData.get("experienceYears") ?? "").trim();
  
  const careerHighlightsRaw = String(formData.get("careerHighlights") ?? "").trim();
  const careerHighlights = careerHighlightsRaw.split("\n").map(s => s.trim()).filter(Boolean);
  
  const teachingExperienceRaw = String(formData.get("teachingExperience") ?? "").trim();
  const teachingExperience = teachingExperienceRaw.split("\n").map(s => s.trim()).filter(Boolean);
  
  const order = parseInt(String(formData.get("order") ?? "0"), 10) || 0;

  return { name, role, category, video, experienceYears, careerHighlights, teachingExperience, order };
}

export async function createFaculty(
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  await requireSession();

  const { name, role, category, video, experienceYears, careerHighlights, teachingExperience, order } = parseForm(formData);
  if (!name || !role || !category) {
    return { error: "Name, role, and category are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.faculty.create({
      data: { 
        name, 
        role, 
        category, 
        video: video || null, 
        experienceYears: experienceYears || null, 
        careerHighlights, 
        teachingExperience, 
        order,
        image: image.url 
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return { error: "Could not save the faculty member. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function updateFaculty(
  _prevState: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return { error: "Missing faculty id." };

  const { name, role, category, video, experienceYears, careerHighlights, teachingExperience, order } = parseForm(formData);
  if (!name || !role || !category) {
    return { error: "Name, role, and category are required." };
  }

  const image = await resolveImage(formData);
  if (image.error) return { error: image.error };
  if (!image.url) return { error: "An image is required." };

  try {
    await prisma.faculty.update({
      where: { id },
      data: { 
        name, 
        role, 
        category, 
        video: video || null, 
        experienceYears: experienceYears || null, 
        careerHighlights, 
        teachingExperience, 
        order,
        image: image.url 
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return { error: "Could not save the faculty member. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
  redirect("/admin/faculty");
}

export async function deleteFaculty(id: string) {
  await requireSession();
  await prisma.faculty.delete({ where: { id } }).catch(() => null);
  revalidatePath("/");
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
}
