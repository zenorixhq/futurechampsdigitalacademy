import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PlacementForm from "../PlacementForm";
import { createPlacement } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewPlacementPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <h1 className="adminPageTitle">New placement</h1>
      <p className="adminPageSub">Add a placed student to the placements page.</p>
      <div className="adminPanel">
        <PlacementForm action={createPlacement} />
      </div>
    </>
  );
}
