"use client";

import { useActionState } from "react";
import type { Project } from "@prisma/client";
import type { ProjectFormState } from "./actions";

type ProjectFormProps = {
  action: (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  project?: Project;
};

export default function ProjectForm({ action, project }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      {state?.error && <p className="adminFormError">{state.error}</p>}
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="adminField">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className="adminInput"
          defaultValue={project?.title}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="categories">Categories</label>
        <input
          id="categories"
          name="categories"
          className="adminInput"
          defaultValue={project?.categories.join(", ")}
        />
        <span className="adminMuted">Comma-separated, e.g. Branding, Web, Print.</span>
      </div>

      <div className="adminField">
        <label htmlFor="imageAlt">Image alt text</label>
        <input
          id="imageAlt"
          name="imageAlt"
          className="adminInput"
          defaultValue={project?.imageAlt ?? ""}
        />
      </div>

      <div className="adminField">
        <label htmlFor="order">Order</label>
        <input
          id="order"
          name="order"
          type="number"
          className="adminInput"
          defaultValue={project?.order ?? 0}
        />
        <span className="adminMuted">Lower numbers appear first.</span>
      </div>

      <div className="adminField">
        <label htmlFor="imageFile">Image</label>
        {project?.image && (
          <>
            <img src={project.image} alt="" className="adminThumb" />
            <input type="hidden" name="currentImage" value={project.image} />
          </>
        )}
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="adminInput"
          required={!project}
        />
        {project && <span className="adminMuted">Leave empty to keep the current image.</span>}
      </div>

      <button type="submit" className="adminBtn" disabled={pending}>
        {pending ? "Saving…" : project ? "Save changes" : "Add project"}
      </button>
    </form>
  );
}
