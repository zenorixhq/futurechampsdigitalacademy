import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function CourseHeroSection() {
  const img = await getSiteImage("course-hero");
  return (
    <InnerHero
      eyebrow="Course Details"
      titleTop="Master the digital"
      titleBottom="business of sport."
      desc="An intensive 3-month diploma designed to equip you with the practical skills needed to thrive in modern sports broadcasting, marketing, and media."
      ghost="COURSE"
      placeholderLabel="Course Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "Course" } : {})}
    />
  );
}
