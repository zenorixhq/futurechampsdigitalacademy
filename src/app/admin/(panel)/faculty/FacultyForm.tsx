"use client";

import { useActionState } from "react";
import type { Faculty } from "@prisma/client";
import type { FacultyFormState } from "./actions";

type FacultyFormProps = {
  action: (prevState: FacultyFormState, formData: FormData) => Promise<FacultyFormState>;
  faculty?: Faculty;
};

export default function FacultyForm({ action, faculty }: FacultyFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      {state?.error && <p className="adminFormError">{state.error}</p>}
      {faculty && <input type="hidden" name="id" value={faculty.id} />}

      <div className="adminField">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="adminInput"
          defaultValue={faculty?.name}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="role">Role / Designation</label>
        <input
          id="role"
          name="role"
          className="adminInput"
          defaultValue={faculty?.role}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="adminInput"
          defaultValue={faculty?.category || "core"}
          required
        >
          <option value="core">Core Faculty (e.g. Jushna)</option>
          <option value="guest">Guest Lecturer (e.g. Lloyd)</option>
          <option value="team">Team / Administration (e.g. Mukund)</option>
        </select>
      </div>

      <div className="adminField">
        <label htmlFor="experienceYears">Experience (Years / Highlights)</label>
        <input
          id="experienceYears"
          name="experienceYears"
          className="adminInput"
          defaultValue={faculty?.experienceYears ?? ""}
          placeholder="e.g. 4 YEARS OF PROFESSIONAL EXPERIENCE"
        />
      </div>

      <div className="adminField">
        <label htmlFor="careerHighlights">Career Highlights (One per line)</label>
        <textarea
          id="careerHighlights"
          name="careerHighlights"
          className="adminInput"
          rows={5}
          defaultValue={faculty?.careerHighlights?.join("\n") || ""}
        />
      </div>

      <div className="adminField">
        <label htmlFor="teachingExperience">Teaching Experience (One per line)</label>
        <textarea
          id="teachingExperience"
          name="teachingExperience"
          className="adminInput"
          rows={4}
          defaultValue={faculty?.teachingExperience?.join("\n") || ""}
        />
      </div>

      <div className="adminField">
        <label htmlFor="video">Video URL (Optional)</label>
        <input
          id="video"
          name="video"
          className="adminInput"
          defaultValue={faculty?.video ?? ""}
          placeholder="e.g. /assets/videos/lloyd intro video.mp4"
        />
      </div>

      <div className="adminField">
        <label htmlFor="order">Display Order (Lower numbers show first)</label>
        <input
          id="order"
          name="order"
          type="number"
          className="adminInput"
          defaultValue={faculty?.order ?? 0}
        />
      </div>

      <div className="adminField">
        <label htmlFor="imageFile">Photo</label>
        {faculty?.image && (
          <>
            <img src={faculty.image} alt="" className="adminThumb" />
            <input type="hidden" name="currentImage" value={faculty.image} />
          </>
        )}
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="adminInput"
          required={!faculty}
        />
        {faculty && <span className="adminMuted">Leave empty to keep the current photo.</span>}
      </div>

      <button type="submit" className="adminBtn" disabled={pending}>
        {pending ? "Saving…" : faculty ? "Save changes" : "Add faculty member"}
      </button>
    </form>
  );
}
