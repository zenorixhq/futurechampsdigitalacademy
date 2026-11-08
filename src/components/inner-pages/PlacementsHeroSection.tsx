import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function PlacementsHeroSection() {
  const img = await getSiteImage("placements-hero");
  return (
    <InnerHero
      eyebrow="Our Success Stories"
      titleTop="Building careers in"
      titleBottom="sports media."
      desc="See where our alumni are working today. We pride ourselves on building the next generation of sports media and marketing professionals."
      ghost="CAREERS"
      placeholderLabel="Placements Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "Placements" } : {})}
    />
  );
}
