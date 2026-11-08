import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PostForm from "../PostForm";
import { createPost } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <h1 className="adminPageTitle">New post</h1>
      <p className="adminPageSub">Publish a new article to the blog.</p>
      <div className="adminPanel">
        <PostForm action={createPost} />
      </div>
    </>
  );
}
