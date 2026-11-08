import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placements — Future Champs Digital Academy",
  description: "See where Future Champs graduates land — roles across football clubs, sports agencies, broadcast teams, and digital media houses.",
};
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import prisma from "@/lib/prisma";
import PlacementsHeroSection from "@/components/inner-pages/PlacementsHeroSection";
import PlacementsGridSection from "@/components/inner-pages/PlacementsGridSection";

export const revalidate = 60; // ISR

export default async function PlacementsPage() {
  const placements = await prisma.placement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Header />
      <main>
        <PlacementsHeroSection />
        <PlacementsGridSection placements={placements} />
      </main>
      <Footer />
    </>
  );
}
