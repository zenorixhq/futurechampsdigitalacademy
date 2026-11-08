"use server";

import prisma from "@/lib/prisma";

export type EnquiryState = { error?: string; success?: boolean } | undefined;

export async function submitEnquiry(_prevState: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (name.length > 120 || email.length > 200 || phone.length > 40 || message.length > 5000) {
    return { error: "Your message is too long. Please shorten it and try again." };
  }

  try {
    await prisma.enquiry.create({
      data: { name, email, phone: phone || null, message },
    });
  } catch {
    return { error: "Something went wrong. Please try again or reach us on WhatsApp." };
  }

  return { success: true };
}
