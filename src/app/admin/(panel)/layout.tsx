import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "@/app/admin/login/actions";
import AdminNav from "./AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <div className="adminBrand">Future Champs</div>
        <AdminNav />
        <div className="adminSidebarFooter">
          <form action={logout}>
            <button type="submit" className="adminBtn adminBtnSecondary adminBtnSmall">
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="adminMain">{children}</main>
    </div>
  );
}
