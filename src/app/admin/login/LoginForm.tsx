"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction}>
      {state?.error && <div className="loginError">{state.error}</div>}
      <div className="adminField">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="adminInput"
          autoComplete="email"
          required
        />
      </div>
      <div className="adminField">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="adminInput"
          autoComplete="current-password"
          required
        />
      </div>
      <button type="submit" className="adminBtn" disabled={pending} style={{ width: "100%" }}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
