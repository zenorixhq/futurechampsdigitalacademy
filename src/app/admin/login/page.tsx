import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="loginWrap">
      <div className="loginCard">
        <h1>Future Champs Admin</h1>
        <p>Sign in to manage site content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
