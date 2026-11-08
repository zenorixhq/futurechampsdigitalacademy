"use client";

import { useActionState } from "react";
import type { Placement } from "@prisma/client";
import type { PlacementFormState } from "./actions";

type PlacementFormProps = {
  action: (prevState: PlacementFormState, formData: FormData) => Promise<PlacementFormState>;
  placement?: Placement;
};

export default function PlacementForm({ action, placement }: PlacementFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      {state?.error && <p className="adminFormError">{state.error}</p>}
      {placement && <input type="hidden" name="id" value={placement.id} />}

      <div className="adminField">
        <label htmlFor="studentName">Student name</label>
        <input
          id="studentName"
          name="studentName"
          className="adminInput"
          defaultValue={placement?.studentName}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="companyName">Company</label>
        <input
          id="companyName"
          name="companyName"
          className="adminInput"
          defaultValue={placement?.companyName}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          className="adminInput"
          defaultValue={placement?.role}
          required
        />
      </div>

      <div className="adminField">
        <label htmlFor="imageFile">Photo</label>
        {placement?.image && (
          <>
            <img src={placement.image} alt="" className="adminThumb" />
            <input type="hidden" name="currentImage" value={placement.image} />
          </>
        )}
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="adminInput"
          required={!placement}
        />
        {placement && <span className="adminMuted">Leave empty to keep the current photo.</span>}
      </div>

      <button type="submit" className="adminBtn" disabled={pending}>
        {pending ? "Saving…" : placement ? "Save changes" : "Add placement"}
      </button>
    </form>
  );
}
