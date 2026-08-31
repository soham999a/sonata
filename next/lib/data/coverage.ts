import { ALL_COVERAGE_TARGETS, PRIMARY_COVERAGE_TARGET, REGION_COVERAGE_TARGETS, type CoverageTargetSeed } from "../domain/sonata-coverage";
import { getAdminFirestore } from "../firebase/admin";

export type CoverageTarget = CoverageTargetSeed & {
  publishedCount: number;
  draftCount: number;
};

export type CoverageData = {
  primaryTarget: number;
  publishedConcepts: number;
  draftConcepts: number;
  regions: Array<{ slug: string; label: string; targetCount: number }>;
  targets: CoverageTarget[];
  editorialStatusCounts: Record<string, number>;
};

async function fetchPublishedCounts(): Promise<Record<string, number>> {
  const db = getAdminFirestore();
  if (!db) return {};
  try {
    const snapshot = await db.collection("concepts").where("editorialStatus", "==", "published").get();
    const regionCounts: Record<string, number> = {};
    snapshot.docs.forEach(doc => {
      const region = doc.data().originRegion;
      if (region) regionCounts[region] = (regionCounts[region] ?? 0) + 1;
    });
    return regionCounts;
  } catch {
    return {};
  }
}

export async function getKnowledgeCoverage(): Promise<CoverageData> {
  const regionPublished = await fetchPublishedCounts();
  const targets: CoverageTarget[] = ALL_COVERAGE_TARGETS.map(target => ({
    ...target,
    publishedCount: regionPublished[target.label] ?? 0,
    draftCount: 0,
  }));
  const regions = REGION_COVERAGE_TARGETS.map(target => ({
    slug: target.slug,
    label: target.label,
    targetCount: target.targetCount,
  }));
  const totalPublished = Object.values(regionPublished).reduce((sum, value) => sum + value, 0);
  return {
    primaryTarget: PRIMARY_COVERAGE_TARGET,
    publishedConcepts: totalPublished,
    draftConcepts: 0,
    regions,
    targets,
    editorialStatusCounts: { published: totalPublished },
  };
}
