import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Future Champs Digital Academy — Diploma in Sports Digital Marketing & Multimedia",
  description:
    "Turn your passion for sports into a profession. 3-month diploma in Sports Digital Marketing & Multimedia with stadium access, live broadcast production, and official Kannur Warriors FC accreditation.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
