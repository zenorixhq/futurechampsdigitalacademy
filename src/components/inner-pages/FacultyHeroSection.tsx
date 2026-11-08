import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function FacultyHeroSection() {
  const img = await getSiteImage("faculty-hero");
  return (
    <InnerHero
      eyebrow="Our Faculty"
      titleTop="Learn from"
      titleBottom="industry leaders."
      desc="Our faculty aren't just academics—they are active professionals leading the digital transformation of sports clubs across the globe."
      ghost="FACULTY"
      placeholderLabel="Faculty Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "Faculty" } : {})}
    />
  );
}
