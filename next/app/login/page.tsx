import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — Sonata",
  description: "Sign in to Sonata with email and password or Google.",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <SiteHeader />
      <main className="auth-shell">
        <LoginForm />
      </main>
    </div>
  );
}
