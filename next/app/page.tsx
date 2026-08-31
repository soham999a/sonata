import { getKnowledgeCoverage } from "@/lib/data/coverage";
import { getPublicEntries } from "@/lib/data/repository";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  const [entries, coverage] = await Promise.all([getPublicEntries(), getKnowledgeCoverage()]);
  return <HomeClient initialEntries={entries} coverage={coverage} />;
}
