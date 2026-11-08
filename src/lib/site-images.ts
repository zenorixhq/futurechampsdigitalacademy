import prisma from "@/lib/prisma";

/**
 * Every dynamic image slot on the public site. The home hero banner and the
 * Kannur Warriors FC logo are intentionally NOT here — they stay static.
 */
export const SITE_IMAGE_SLOTS = [
  // Home Page
  { key: "partner-photo", label: "Partner Section Photo", page: "Home Page" },
  { key: "home-faculty-jushna", label: "Faculty — Jushna Shahin", page: "Home Page", fallback: "/assets/images/jushna.jpg" },
  { key: "home-faculty-lloyd", label: "Faculty — Lloyd Canfield", page: "Home Page", fallback: "/assets/images/lloyd.jpeg" },
  
  // About Page
  { key: "about-hero", label: "Hero Banner", page: "About Page" },
  { key: "about-mission", label: "Mission Image", page: "About Page" },
  { key: "about-vision", label: "Vision Image", page: "About Page" },
  { key: "leader-praveen", label: "Leadership — Praveen Raman", page: "About Page" },
  { key: "leader-regin", label: "Leadership — Regin C", page: "About Page" },
  { key: "leader-sayandh", label: "Leadership — Sayandh T M", page: "About Page" },

  // Course Page
  { key: "course-hero", label: "Hero Banner", page: "Course Page" },
  { key: "course-careers", label: "Careers Image", page: "Course Page" },
  { key: "course-editorial", label: "Students On The Field (Also used on About page)", page: "Course & About Pages" },

  // Faculty Page
  { key: "faculty-hero", label: "Hero Banner", page: "Faculty Page" },
  { key: "faculty-jushna", label: "Faculty Highlight Photo", page: "Faculty Page", fallback: "/assets/images/jushna.jpg" },
  { key: "faculty-lloyd", label: "Faculty Highlight — Lloyd", page: "Faculty Page", fallback: "/assets/images/lloyd.jpeg" },
  { key: "team-mukund", label: "Team — Mukund", page: "Faculty Page" },
  { key: "team-shahana", label: "Team — Shahana U P", page: "Faculty Page" },
  { key: "team-nandana", label: "Team — Nandana Bineesh", page: "Faculty Page" },
  { key: "team-sahal", label: "Team — Muhammed Sahal", page: "Faculty Page" },

  // Placements Page
  { key: "placements-hero", label: "Hero Banner", page: "Placements Page" },

  // Blog Page
  { key: "blog-hero", label: "Hero Banner", page: "Blog Page" },
  { key: "blog-detail-default", label: "Blog Post Default Image", page: "Blog Page" },

  // Contact Page
  { key: "contact-hero", label: "Hero Banner", page: "Contact Page" },
] as const;

export type SiteImageKey = (typeof SITE_IMAGE_SLOTS)[number]["key"];

const PLACEHOLDER_URL = "/assets/images/placeholder.png";

/** A slot counts as "no real image" when missing or still pointing at the seed placeholder. */
export function isRealImage(url: string | null | undefined): url is string {
  return !!url && url !== PLACEHOLDER_URL;
}

export async function getSiteImage(key: SiteImageKey) {
  return prisma.siteImage.findUnique({ where: { key } });
}

/** Fetches several slots at once; returns a Map keyed by slot key. */
export async function getSiteImages(keys: SiteImageKey[]) {
  const rows = await prisma.siteImage.findMany({ where: { key: { in: keys } } });
  return new Map(rows.map((row) => [row.key as SiteImageKey, row]));
}

/** Real photo URL for a slot, or null when it's missing/placeholder. */
export function sitePhoto(map: Map<SiteImageKey, { url: string }>, key: SiteImageKey): string | null {
  const url = map.get(key)?.url;
  return isRealImage(url) ? url : null;
}
