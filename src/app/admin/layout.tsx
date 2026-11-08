import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin — Future Champs",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adminRoot">{children}</div>;
}
