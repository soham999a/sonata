import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.resolve(__dirname, "../next/lib/data/generated-catalogue.ts");
const outPath = path.resolve(__dirname, "../server/sonata.demo.ts");

const raw = fs.readFileSync(srcPath, "utf8");

function extractConst(name: string): string {
  const start = raw.indexOf("export const " + name);
  if (start === -1) throw new Error(`Cannot find ${name} in generated catalogue`);
  const assignEq = raw.indexOf("=", start);
  if (assignEq === -1) throw new Error(`No assignment for ${name}`);
  let openIdx = assignEq + 1;
  while (raw[openIdx] === " " || raw[openIdx] === "\n" || raw[openIdx] === "\t" || raw[openIdx] === "\r") openIdx++;
  const openChar = raw[openIdx] === "[" ? "[" : raw[openIdx] === "{" ? "{" : (() => { throw new Error(`Unexpected open char ${raw[openIdx]}`); })();
  const closeChar = openChar === "[" ? "]" : "}";
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = openIdx; i < raw.length; i++) {
    const c = raw[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === openChar) depth++;
    else if (c === closeChar) {
      depth--;
      if (depth === 0) return raw.slice(openIdx, i + 1);
    }
  }
  throw new Error(`Unbalanced in ${name}`);
}

const cardsJson = extractConst("GENERATED_CARDS");
const detailsJson = extractConst("GENERATED_DETAILS");

const header = `// AUTO-GENERATED from the published Firestore corpus (via next/lib/data/generated-catalogue.ts).\n// Bundled so the deployed site shows the real records without requiring a live database.\n// Regenerate with:  tsx scripts/generate-sonata-demo.ts\n`;

const content = `${header}
export type SonataEntryCard = {
  publicId: string;
  slug: string;
  name: string;
  originalName?: string;
  shortDefinition: string;
  entityType: string;
  region: string;
  tradition: string;
  tags: string[];
  relationshipCount: number;
  demonstration: true;
};

export type SonataEntryDetail = SonataEntryCard & {
  definition: string;
  historicalContext: string;
  practicalUsage: string;
  visualAudioDescription: string;
  theoryVisual?: {
    title: string;
    sourceScope: string;
    axes: Array<{ label: string; value: string }>;
    caution: string;
  };
  emicDescription?: string;
  eticComparison?: string;
  regionalVariation?: string;
  uncertaintyNote?: string;
  editorialStatus?: string;
  sourceQuality?: string;
  pronunciation?: string;
  languageOfOrigin?: string;
  nativeScript?: string;
  transliteration?: string;
  taxonomyPath: string[];
  related: Array<{ slug: string; name: string; relationshipType: string; note: string }>;
  sources: Array<{ label: string; citation: string; scope: string; note: string; url: string }>;
  graphNodes: Array<{ id: string; label: string; x: number; y: number; emphasis?: "main" | "accent"; linkable?: boolean }>;
};

export const DEMONSTRATION_ENTRIES: SonataEntryCard[] = ${cardsJson};

export const DEMONSTRATION_DETAILS: Record<string, SonataEntryDetail> = ${detailsJson};

export const SONATA_TAXONOMY_PREVIEW = [
  { label: "World", detail: "Global starting point", count: "Open" },
  { label: "Asia", detail: "Regional pathways", count: "03" },
  { label: "Africa", detail: "Regional pathways", count: "01" },
  { label: "Europe", detail: "Regional pathways", count: "01" },
  { label: "Americas", detail: "Regional pathways", count: "01" },
];
`;
fs.writeFileSync(outPath, content, "utf8");

const cardCount = (JSON.parse(cardsJson) as unknown[]).length;
const detailCount = Object.keys(JSON.parse(detailsJson)).length;
console.log(`Wrote ${cardCount} cards and ${detailCount} details to ${outPath}`);
process.exit(0);
