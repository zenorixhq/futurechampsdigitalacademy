import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { deletePost } from "./actions";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <div className="adminHeaderRow">
        <div>
          <h1 className="adminPageTitle">Posts</h1>
          <p className="adminPageSub" style={{ marginBottom: 0 }}>
            Blog articles shown on the public site.
          </p>
        </div>
        <Link href="/admin/posts/new" className="adminBtn">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="adminPanel">
          <p className="adminEmpty">No posts yet.</p>
        </div>
      ) : (
        <div className="adminPanel">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img src={post.image} alt="" className="adminThumb" />
                  </td>
                  <td>{post.title}</td>
                  <td className="adminMuted">{post.slug}</td>
                  <td>{post.publishedAt.toLocaleDateString()}</td>
                  <td>
                    <div className="adminRowActions">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="adminBtn adminBtnSecondary adminBtnSmall"
                      >
                        Edit
                      </Link>
                      <form action={deletePost.bind(null, post.id)}>
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
