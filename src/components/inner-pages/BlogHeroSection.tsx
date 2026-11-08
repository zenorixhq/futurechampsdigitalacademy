import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function BlogHeroSection() {
  const img = await getSiteImage("blog-hero");
  return (
    <InnerHero
      eyebrow="Industry Insights"
      titleTop="The Future Champs"
      titleBottom="Blog."
      desc="Insights, industry news, and student stories from the world of sports digital marketing and broadcasting."
      ghost="INSIGHTS"
      placeholderLabel="Blog Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "Blog" } : {})}
    />
  );
}
