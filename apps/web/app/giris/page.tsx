import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ mode?: string; next?: string }> }) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";
  const initialMode = params.mode === "register" ? "register" : "login";

  return (
    <main className="auth-page">
      <LoginForm initialMode={initialMode} nextPath={nextPath} />
    </main>
  );
}
