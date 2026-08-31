import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <SiteHeader />
      <main className="not-found-shell">
        <p className="eyebrow">404</p>
        <h1>This pathway does not exist yet.</h1>
        <Link href="/" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> Return to the catalogue
        </Link>
      </main>
    </div>
  );
}
