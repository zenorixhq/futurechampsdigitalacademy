import InnerHero from "./InnerHero";
import { getSiteImage, isRealImage } from "@/lib/site-images";

export default async function ContactHeroSection() {
  const img = await getSiteImage("contact-hero");
  return (
    <InnerHero
      eyebrow="Get in Touch"
      titleTop="Start your"
      titleBottom="journey here."
      desc="Whether you have a question about the diploma, admissions, or our partnership with Kannur Warriors FC, our team is ready to help."
      ghost="CONTACT"
      placeholderLabel="Contact Hero Image"
      {...(isRealImage(img?.url) ? { imageSrc: img.url, imageAlt: img.alt ?? "Contact" } : {})}
    />
  );
}
