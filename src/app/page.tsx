import React from "react";
import type { Metadata } from "next";
import Header from "@/components/home/Header";
import MainContent from "@/components/home/MainContent";
import Footer from "@/components/home/Footer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Future Champs Digital Academy | Diploma in Sports Digital Marketing",
  description: "Diploma in Sports Digital Marketing & Multimedia. 3 Months, 8 Modules, Field Work with Kannur Warriors FC. Not An Agency.",
  keywords: ["Sports Digital Marketing", "Football Media", "Kannur Warriors FC", "Sports Management", "Digital Academy"],
  openGraph: {
    title: "Future Champs Digital Academy",
    description: "Turn your passion for sports into a profession! Diploma in Sports Digital Marketing & Multimedia.",
    images: ["/assets/images/kannur-warriors-logo.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}
