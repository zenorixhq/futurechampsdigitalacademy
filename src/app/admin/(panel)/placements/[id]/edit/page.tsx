import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import PlacementForm from "../../PlacementForm";
import { updatePlacement } from "../../actions";

export const dynamic = "force-dynamic";

type EditPlacementPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPlacementPage({ params }: EditPlacementPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const placement = await prisma.placement.findUnique({ where: { id } });
  if (!placement) notFound();

  return (
    <>
      <h1 className="adminPageTitle">Edit placement</h1>
      <p className="adminPageSub">{placement.studentName}</p>
      <div className="adminPanel">
        <PlacementForm action={updatePlacement} placement={placement} />
      </div>
    </>
  );
}
