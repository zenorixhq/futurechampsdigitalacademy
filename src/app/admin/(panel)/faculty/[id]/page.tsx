import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import FacultyForm from "../FacultyForm";
import { updateFaculty } from "../actions";

export const metadata = { title: "Edit Faculty - Admin" };

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const resolvedParams = await params;
  const faculty = await prisma.faculty.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!faculty) notFound();

  return (
    <>
      <h1 className="adminTitle">Edit Faculty Member</h1>
      <div className="adminCard" style={{ padding: "2rem", maxWidth: "600px" }}>
        <FacultyForm action={updateFaculty} faculty={faculty} />
      </div>
    </>
  );
}
