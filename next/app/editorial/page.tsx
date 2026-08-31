"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/components/AuthProvider";
import { EditorialClient } from "@/components/EditorialClient";

function EditorialAccessDenied() {
  return (
    <main className="editorial-access-denied">
      <p className="eyebrow eyebrow--brass">Editorial access restricted</p>
      <h1>This workbench is reserved for Sonata editors.</h1>
      <p>The public catalogue remains available to every reader. Creating, reviewing, importing, and revising knowledge records require an administrator role.</p>
      <Link href="/" className="button-primary button-primary--light">
        Return to the catalogue <ArrowLeft size={16} />
      </Link>
    </main>
  );
}

export default function EditorialPage() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="editorial-access-loading">
        <SiteHeader />
        Checking editorial access…
      </div>
    );
  if (user && !user.isAdmin) return <EditorialAccessDenied />;
  if (!user)
    return (
      <div>
        <SiteHeader />
        <EditorialAccessDenied />
      </div>
    );
  return (
    <div>
      <SiteHeader />
      <EditorialClient />
    </div>
  );
}
