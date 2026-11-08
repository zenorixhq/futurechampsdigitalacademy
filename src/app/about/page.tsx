import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Future Champs Digital Academy",
  description: "Future Champs is a premium sports education institution preparing the next generation of professionals who build, market, broadcast, and produce modern sport.",
};
import AboutHeroSection from "@/components/inner-pages/AboutHeroSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import OurStorySection from "@/components/inner-pages/OurStorySection";
import LeadershipSection from "@/components/inner-pages/LeadershipSection";
import MissionVisionSection from "@/components/inner-pages/MissionVisionSection";
import FacultySection from "@/components/home/sections/FacultySection";
import StatsSection from "@/components/inner-pages/StatsSection";
import EditorialCTASection from "@/components/inner-pages/EditorialCTASection";
import { getSiteImages, sitePhoto } from "@/lib/site-images";
import prisma from "@/lib/prisma";

export default async function AboutPage() {
  const [photos, facultyData] = await Promise.all([
    getSiteImages([
      "leader-praveen", 
      "leader-regin", 
      "leader-sayandh",
      "about-mission",
      "about-vision",
      "course-editorial"
    ]),
    prisma.faculty.findMany({
      where: { category: { in: ["core", "guest"] } },
      orderBy: { order: "asc" },
    }),
  ]);

  const leaders = [
    { name: "Praveen Raman", role: "Founder", photo: sitePhoto(photos, "leader-praveen") },
    { name: "Regin C", role: "Co-Founder", photo: sitePhoto(photos, "leader-regin") },
    { name: "Sayandh T M", role: "CEO, Academic Director", photo: sitePhoto(photos, "leader-sayandh") },
  ];

  return (
    <>
      <Header />
      <main>
        <AboutHeroSection />
        
        <MissionVisionSection 
          missionImage={sitePhoto(photos, "about-mission")}
          visionImage={sitePhoto(photos, "about-vision")}
        />
        
        <OurStorySection />

        <LeadershipSection members={leaders} />

        <FacultySection facultyData={facultyData} />
        
        <StatsSection />
        
        <EditorialCTASection imageSrc={sitePhoto(photos, "course-editorial")} />
      </main>
      <Footer />
    </>
  );
}
