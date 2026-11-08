import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import ProjectForm from "../../ProjectForm";
import { updateProject } from "../../actions";

export const dynamic = "force-dynamic";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <h1 className="adminPageTitle">Edit project</h1>
      <p className="adminPageSub">{project.title}</p>
      <div className="adminPanel">
        <ProjectForm action={updateProject} project={project} />
      </div>
    </>
  );
}
