import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <h1 className="adminPageTitle">New project</h1>
      <p className="adminPageSub">Add a student project to the home page showcase.</p>
      <div className="adminPanel">
        <ProjectForm action={createProject} />
      </div>
    </>
  );
}
