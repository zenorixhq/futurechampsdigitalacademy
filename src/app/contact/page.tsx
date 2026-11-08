import React from "react";
import type { Metadata } from "next";
import ContactHeroSection from "@/components/inner-pages/ContactHeroSection";
import ContactSection from "@/components/inner-pages/ContactSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FAQSection from "@/components/inner-pages/FAQSection";
import EditorialCTASection from "@/components/inner-pages/EditorialCTASection";

export const metadata: Metadata = {
  title: "Contact — Future Champs Digital Academy",
  description:
    "Questions about the diploma, admissions, or our Kannur Warriors FC partnership? Get in touch with the Future Champs team.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHeroSection />
        <ContactSection />
        <FAQSection />
        <EditorialCTASection />
      </main>
      <Footer />
    </>
  );
}
