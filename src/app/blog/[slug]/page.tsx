import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import prisma from "@/lib/prisma";
import { getSiteImage, isRealImage } from "@/lib/site-images";
import BlogDetailHeroSection from "@/components/inner-pages/BlogDetailHeroSection";
import BlogDetailContentSection from "@/components/inner-pages/BlogDetailContentSection";

export const revalidate = 60; // ISR

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Post Not Found — Future Champs Digital Academy" };
  }

  return {
    title: `${post.title} — Future Champs Digital Academy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post) {
    notFound();
  }

  // Fall back to the admin-managed default image when the post has no real one
  const defaultImage = isRealImage(post.image) ? null : await getSiteImage("blog-detail-default");
  const image = isRealImage(post.image)
    ? post.image
    : isRealImage(defaultImage?.url)
      ? defaultImage.url
      : post.image;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <Header />
      <main>
        <BlogDetailHeroSection title={post.title} date={formattedDate} />
        <BlogDetailContentSection image={image} content={post.content} />
      </main>
      <Footer />
    </>
  );
}
