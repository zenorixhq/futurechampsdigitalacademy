import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteFaculty } from "./actions";

export const metadata = { title: "Manage Faculty - Admin" };

export default async function FacultyAdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const faculty = await prisma.faculty.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <div className="adminHeaderRow">
        <h1 className="adminTitle">Faculty & Team</h1>
        <Link href="/admin/faculty/new" className="adminBtn">
          Add Member
        </Link>
      </div>

      <div className="adminCard">
        {faculty.length === 0 ? (
          <p className="adminMuted" style={{ padding: "1rem" }}>
            No faculty or team members added yet.
          </p>
        ) : (
          <table className="adminTable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Category</th>
                <th>Order</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((member) => (
                <tr key={member.id}>
                  <td>
                    <img src={member.image} alt={member.name} className="adminThumb" />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td><span style={{ textTransform: "capitalize" }}>{member.category}</span></td>
                  <td>{member.order}</td>
                  <td className="text-right">
                    <Link href={`/admin/faculty/${member.id}`} className="adminBtn adminBtnSmall adminBtnSecondary">
                      Edit
                    </Link>
                    <form action={deleteFaculty.bind(null, member.id)} style={{ display: "inline-block", marginLeft: "1rem" }}>
                      <button type="submit" className="adminBtn adminBtnSmall adminBtnDanger">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
