import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty — Future Champs Digital Academy",
  description: "Learn from industry leaders in sports media, marketing, and football club management at Future Champs Digital Academy.",
};
import FacultyHeroSection from "@/components/inner-pages/FacultyHeroSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FacultyHighlightSection from "@/components/inner-pages/FacultyHighlightSection";
import GuestLecturersGrid from "@/components/inner-pages/GuestLecturersGrid";
import LeadershipSection from "@/components/inner-pages/LeadershipSection";
import EditorialCTASection from "@/components/inner-pages/EditorialCTASection";
import { getSiteImages, sitePhoto } from "@/lib/site-images";
import prisma from "@/lib/prisma";

export default async function FacultyPage() {

  const [facultyData, photos] = await Promise.all([
    prisma.faculty.findMany({
      orderBy: { order: "asc" },
    }),
    getSiteImages(["course-editorial"])
  ]);

  const coreFaculty = facultyData.find(f => f.category === "core");
  const guestLecturers = facultyData.filter(f => f.category === "guest");
  const teamMembers = facultyData.filter(f => f.category === "team").map(f => ({
    name: f.name,
    role: f.role,
    photo: f.image,
  }));

  return (
    <>
      <Header />
      <main>
        <FacultyHeroSection />
        
        <FacultyHighlightSection faculty={coreFaculty} />

        <GuestLecturersGrid guestLecturers={guestLecturers} />

        <LeadershipSection
          eyebrow="Our Team"
          title="Meet the team behind the classroom."
          members={teamMembers}
        />
        
        <EditorialCTASection imageSrc={sitePhoto(photos, "course-editorial")} />
        
      </main>
      <Footer />
    </>
  );
}
