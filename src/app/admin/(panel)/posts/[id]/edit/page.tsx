import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import PostForm from "../../PostForm";
import { updatePost } from "../../actions";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <h1 className="adminPageTitle">Edit post</h1>
      <p className="adminPageSub">{post.title}</p>
      <div className="adminPanel">
        <PostForm action={updatePost} post={post} />
      </div>
    </>
  );
}
