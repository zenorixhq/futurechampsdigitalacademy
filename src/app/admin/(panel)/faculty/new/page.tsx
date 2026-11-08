import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import FacultyForm from "../FacultyForm";
import { createFaculty } from "../actions";

export const metadata = { title: "Add Faculty - Admin" };

export default async function NewFacultyPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <h1 className="adminTitle">Add Faculty or Team Member</h1>
      <div className="adminCard" style={{ padding: "2rem", maxWidth: "600px" }}>
        <FacultyForm action={createFaculty} />
      </div>
    </>
  );
}
