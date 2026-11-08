import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { deletePlacement } from "./actions";

export const dynamic = "force-dynamic";

export default async function PlacementsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const placements = await prisma.placement.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <div className="adminHeaderRow">
        <div>
          <h1 className="adminPageTitle">Placements</h1>
          <p className="adminPageSub" style={{ marginBottom: 0 }}>
            Students placed through the academy.
          </p>
        </div>
        <Link href="/admin/placements/new" className="adminBtn">
          New placement
        </Link>
      </div>

      {placements.length === 0 ? (
        <div className="adminPanel">
          <p className="adminEmpty">No placements yet.</p>
        </div>
      ) : (
        <div className="adminPanel">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Student</th>
                <th>Company</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.map((placement) => (
                <tr key={placement.id}>
                  <td>
                    <img src={placement.image} alt="" className="adminThumb" />
                  </td>
                  <td>{placement.studentName}</td>
                  <td>{placement.companyName}</td>
                  <td className="adminMuted">{placement.role}</td>
                  <td>
                    <div className="adminRowActions">
                      <Link
                        href={`/admin/placements/${placement.id}/edit`}
                        className="adminBtn adminBtnSecondary adminBtnSmall"
                      >
                        Edit
                      </Link>
                      <form action={deletePlacement.bind(null, placement.id)}>
                        <button type="submit" className="adminBtn adminBtnDanger adminBtnSmall">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
