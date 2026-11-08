import React from "react";
import HeroSection from "./sections/HeroSection";
import TickerSection from "./sections/TickerSection";
import AboutAgencySection from "./sections/AboutAgencySection";
import ServicesSection from "./sections/ServicesSection";
import FacultySection from "./sections/FacultySection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import JoinAgencySection from "./sections/JoinAgencySection";
import HowItWorkSection from "./sections/HowItWorkSection";
import FeaturesSection from "./sections/FeaturesSection";
import AgencyBenefitsSection from "./sections/AgencyBenefitsSection";
import LatestNewsSection from "./sections/LatestNewsSection";
import prisma from "@/lib/prisma";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function MainContent() {
  const [projects, partnerImg, facultyData] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    getSiteImage("partner-photo"),
    prisma.faculty.findMany({
      where: { category: { in: ["core", "guest"] } },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <main>
      <HeroSection />
      <TickerSection />
      <AboutAgencySection />
      <ServicesSection />
      <FacultySection facultyData={facultyData} />
      <WhyChooseUsSection partnerPhoto={isRealImage(partnerImg?.url) ? partnerImg.url : undefined} />
      <JoinAgencySection />
      <HowItWorkSection />
      <FeaturesSection
        projects={projects.map((p) => ({
          id: p.id,
          title: p.title,
          categories: p.categories,
          image: isRealImage(p.image) ? p.image : null,
          imageAlt: p.imageAlt,
        }))}
      />
      <AgencyBenefitsSection />
      <LatestNewsSection />
    </main>
  );
}
