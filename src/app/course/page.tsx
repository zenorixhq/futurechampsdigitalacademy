import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Course — Diploma in Sports Digital Marketing & Multimedia",
  description: "A 3-month, 8-module diploma covering sports marketing strategy, media relations, broadcast production, and athlete branding with real stadium field work.",
};
import CourseHeroSection from "@/components/inner-pages/CourseHeroSection";
import CourseOverviewSection from "@/components/inner-pages/CourseOverviewSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import CurriculumAccordion from "@/components/inner-pages/CurriculumAccordion";
import CareerOutcomesSection from "@/components/inner-pages/CareerOutcomesSection";
import HowItWorkSection from "@/components/home/sections/HowItWorkSection";
import EditorialCTASection from "@/components/inner-pages/EditorialCTASection";
import { getSiteImages, sitePhoto } from "@/lib/site-images";

export default async function CoursePage() {
  const photos = await getSiteImages(["course-careers", "course-editorial"]);

  return (
    <>
      <Header />
      <main>
        <CourseHeroSection />
        
        <CourseOverviewSection />

        <CurriculumAccordion />
        
        <CareerOutcomesSection imageSrc={sitePhoto(photos, "course-careers")} />

        <HowItWorkSection />

        <EditorialCTASection imageSrc={sitePhoto(photos, "course-editorial")} />
        
      </main>
      <Footer />
    </>
  );
}
