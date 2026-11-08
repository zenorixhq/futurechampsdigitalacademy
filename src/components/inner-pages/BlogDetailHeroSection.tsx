import InnerHero from "./InnerHero";

export default function BlogDetailHeroSection({ title, date }: { title: string; date: string }) {
  return (
    <InnerHero
      eyebrow={date}
      titleTop={title}
      ghost="INSIGHTS"
    />
  );
}
