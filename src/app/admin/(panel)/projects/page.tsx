import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <>
      <div className="adminHeaderRow">
        <div>
          <h1 className="adminPageTitle">Projects</h1>
          <p className="adminPageSub" style={{ marginBottom: 0 }}>
            Student work showcased on the home page.
          </p>
        </div>
        <Link href="/admin/projects/new" className="adminBtn">
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="adminPanel">
          <p className="adminEmpty">No projects yet.</p>
        </div>
      ) : (
        <div className="adminPanel">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Categories</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <img src={project.image} alt="" className="adminThumb" />
                  </td>
                  <td>{project.title}</td>
                  <td className="adminMuted">{project.categories.join(", ")}</td>
                  <td>{project.order}</td>
                  <td>
                    <div className="adminRowActions">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="adminBtn adminBtnSecondary adminBtnSmall"
                      >
                        Edit
                      </Link>
                      <form action={deleteProject.bind(null, project.id)}>
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
