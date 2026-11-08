"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function toggleEnquiryRead(id: string) {
  await requireSession();
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) return;
  await prisma.enquiry.update({
    where: { id },
    data: { read: !enquiry.read },
  });
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(id: string) {
  await requireSession();
  await prisma.enquiry.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin/enquiries");
}
