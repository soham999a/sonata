export const PUBLIC_EDITORIAL_STATUSES = ["draft", "machine_generated", "machine_reviewed", "expert_reviewed", "published", "deprecated"] as const;

export type PublicEditorialStatus = (typeof PUBLIC_EDITORIAL_STATUSES)[number];
export type EditorialStatusRow = { status: PublicEditorialStatus; count: number };

export function createEditorialStatusDataset(counts: Record<string, number> | undefined): EditorialStatusRow[] {
  return PUBLIC_EDITORIAL_STATUSES.map(status => ({ status, count: counts?.[status] ?? 0 }));
}

export function filterEditorialStatusDataset(rows: EditorialStatusRow[], selected: PublicEditorialStatus | "all") {
  return selected === "all" ? rows : rows.filter(row => row.status === selected);
}

export function editorialStatusFromSearchParam(value: string | null): PublicEditorialStatus | "all" {
  return value && (PUBLIC_EDITORIAL_STATUSES as readonly string[]).includes(value) ? value as PublicEditorialStatus : "all";
}
