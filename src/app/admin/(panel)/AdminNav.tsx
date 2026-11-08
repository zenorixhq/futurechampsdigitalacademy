"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/placements", label: "Placements" },
  { href: "/admin/faculty", label: "Faculty & Team" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "adminNavLink adminNavLinkActive" : "adminNavLink"}
          >
            {link.label}
          </Link>
        );
      })}
      <a href="/" target="_blank" rel="noreferrer" className="adminNavLink">
        View site
      </a>
    </>
  );
}
