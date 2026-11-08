import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function AboutHeroSection() {
  const img = await getSiteImage("about-hero");
  return (
    <InnerHero
      eyebrow="About Future Champs"
      titleTop="We teach the people"
      titleBottom="behind the game."
      desc="Future Champs is a premium sports education institution dedicated to preparing the next generation of professionals who build, market, broadcast, and produce modern sport."
      ghost="ABOUT"
      placeholderLabel="About Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "About Future Champs" } : {})}
    />
  );
}
