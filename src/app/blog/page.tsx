import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Future Champs Digital Academy",
  description: "Insights on sports digital marketing, football media, and the business of modern sport from the Future Champs team.",
};
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import prisma from "@/lib/prisma";
import BlogHeroSection from "@/components/inner-pages/BlogHeroSection";
import BlogGridSection from "@/components/inner-pages/BlogGridSection";

export const revalidate = 60; // ISR

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <>
      <Header />
      <main>
        <BlogHeroSection />
        <BlogGridSection posts={posts} />
      </main>
      <Footer />
    </>
  );
}
