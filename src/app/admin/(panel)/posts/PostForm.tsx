"use client";

import { useActionState } from "react";
import type { Post } from "@prisma/client";
import type { PostFormState } from "./actions";

type PostFormProps = {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: Post;
};

export default function PostForm({ action, post }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction}>
      {state?.error && <p className="adminFormError">{state.error}</p>}
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="adminField">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className="adminInput"
          defaultValue={post?.title}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          className="adminInput"
          defaultValue={post?.slug}
          required
        />
        <span className="adminMuted">
          Lowercase letters, numbers and hyphens — used in the post URL.
        </span>
      </div>

      <div className="adminField">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          className="adminTextarea"
          style={{ minHeight: 70 }}
          defaultValue={post?.excerpt ?? ""}
        />
      </div>

      <div className="adminField">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className="adminTextarea"
          style={{ minHeight: 240 }}
          defaultValue={post?.content}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="publishedAt">Published at</label>
        <input
          id="publishedAt"
          name="publishedAt"
          type="date"
          className="adminInput"
          defaultValue={post ? post.publishedAt.toISOString().slice(0, 10) : today}
        />
      </div>

      <div className="adminField">
        <label htmlFor="imageFile">Image</label>
        {post?.image && (
          <>
            <img src={post.image} alt="" className="adminThumb" />
            <input type="hidden" name="currentImage" value={post.image} />
          </>
        )}
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="adminInput"
          required={!post}
        />
        {post && <span className="adminMuted">Leave empty to keep the current image.</span>}
      </div>

      <div className="adminField">
        <label htmlFor="showOnHome" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            id="showOnHome"
            name="showOnHome"
            type="checkbox"
            defaultChecked={post?.showOnHome ?? false}
            style={{ width: '16px', height: '16px' }}
          />
          Show on Home Page
        </label>
        <span className="adminMuted" style={{ display: 'block', marginTop: '4px' }}>
          Check this box to display this post in the Latest News section on the Home Page.
        </span>
      </div>

      <div className="adminField">
        <label htmlFor="homeOrder">Home Page Order</label>
        <input
          id="homeOrder"
          name="homeOrder"
          type="number"
          className="adminInput"
          defaultValue={post?.homeOrder ?? 0}
        />
        <span className="adminMuted">
          Lower numbers appear first (e.g. 0, 1, 2).
        </span>
      </div>

      <button type="submit" className="adminBtn" disabled={pending}>
        {pending ? "Saving…" : post ? "Save changes" : "Publish post"}
      </button>
    </form>
  );
}
