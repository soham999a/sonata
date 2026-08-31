import type { EntityType } from "./sonata";

export const coverageDimensions = ["region", "tradition", "domain", "era"] as const;
export type CoverageDimension = (typeof coverageDimensions)[number];

export type CoverageTargetSeed = {
  dimension: CoverageDimension;
  slug: string;
  label: string;
  targetCount: number;
  detail: string;
};

export type TaxonomySeed = {
  slug: string;
  label: string;
  nodeType: "region" | "tradition" | "era" | "category";
  parentSlug?: string;
  pathKey: string;
  culturalScope?: string;
  editorialNote?: string;
};

export const REGION_COVERAGE_TARGETS: CoverageTargetSeed[] = [
  { dimension: "region", slug: "europe", label: "Europe", targetCount: 1700, detail: "Art, folk, sacred, diasporic, and contemporary practices without treating Europe as the default model." },
  { dimension: "region", slug: "south-asia", label: "South Asia", targetCount: 1600, detail: "Hindustani, Carnatic, regional, folk, devotional, instrument, rhythmic, and performance clusters." },
  { dimension: "region", slug: "east-asia", label: "East Asia", targetCount: 1500, detail: "Chinese, Japanese, Korean, Indigenous/local, notation, ensemble, and instrument contexts." },
  { dimension: "region", slug: "southeast-asia", label: "Southeast Asia", targetCount: 1100, detail: "Gamelan and other regional systems, dance-music, tuning, ensemble, and performance contexts." },
  { dimension: "region", slug: "central-asia", label: "Central Asia", targetCount: 650, detail: "Modal systems, instruments, epic performance, and transregional histories." },
  { dimension: "region", slug: "middle-east", label: "Middle East", targetCount: 1300, detail: "Differentiated Arabic, Persian, Turkish, Kurdish, and related music-system vocabularies." },
  { dimension: "region", slug: "north-africa", label: "North Africa", targetCount: 650, detail: "Amazigh, Arabic, Jewish, Andalusi, Gnawa, diaspora, and locally situated practice clusters." },
  { dimension: "region", slug: "sub-saharan-africa", label: "Sub-Saharan Africa", targetCount: 1600, detail: "Regionally specific traditions, instruments, ensembles, performance contexts, and theory where documented." },
  { dimension: "region", slug: "north-america", label: "North America", targetCount: 1400, detail: "Indigenous traditions, art music, popular forms, community practice, technology, and diaspora context." },
  { dimension: "region", slug: "latin-america", label: "Latin America", targetCount: 1450, detail: "Indigenous, Afro-descendant, local, transnational, dance-music, instrument, and production contexts." },
  { dimension: "region", slug: "caribbean", label: "Caribbean", targetCount: 650, detail: "Island-specific genres, ritual, carnival, diaspora, instruments, sound-system, and recording practices." },
  { dimension: "region", slug: "oceania", label: "Oceania", targetCount: 500, detail: "Aboriginal and Torres Strait Islander, Māori, Pacific, ceremonial, local, and contemporary contexts." },
  { dimension: "region", slug: "indigenous-traditions-globally", label: "Indigenous traditions globally", targetCount: 1250, detail: "Capacity for self-identified and community-led terminology that cannot be absorbed into geographic defaults." },
];

export const MATRIX_COVERAGE_TARGETS: CoverageTargetSeed[] = [
  { dimension: "tradition", slug: "indian-classical", label: "Indian classical traditions", targetCount: 900, detail: "Hindustani and Carnatic systems, practice, repertoire, theory, and instruments." },
  { dimension: "tradition", slug: "arabic-music", label: "Arabic musical traditions", targetCount: 650, detail: "Maqām, ajnās, īqāʿāt, forms, performance, and instrument contexts." },
  { dimension: "tradition", slug: "persian-music", label: "Persian musical traditions", targetCount: 400, detail: "Dastgāh, radif, gusheh, āvāz, repertoire, and performance contexts." },
  { dimension: "tradition", slug: "east-asian-traditions", label: "East Asian traditions", targetCount: 900, detail: "Chinese, Japanese, Korean, and locally governed contexts." },
  { dimension: "tradition", slug: "southeast-asian-traditions", label: "Southeast Asian traditions", targetCount: 650, detail: "Gamelan and other systems across the region, contextualized by locality and practice." },
  { dimension: "tradition", slug: "african-traditions", label: "African traditional and diasporic traditions", targetCount: 1200, detail: "Named local traditions alongside African diasporic developments and their own histories." },
  { dimension: "tradition", slug: "latin-caribbean-traditions", label: "Latin American and Caribbean traditions", targetCount: 900, detail: "Local, Indigenous, Afro-descendant, and transnational musical lineages." },
  { dimension: "tradition", slug: "western-classical", label: "Western classical traditions", targetCount: 900, detail: "A substantial but deliberately non-dominant portion of the coverage plan." },
  { dimension: "domain", slug: "melodic-modal-systems", label: "Melodic and modal systems", targetCount: 1800, detail: "Modes, rāgas, maqām-related systems, scales, melodic frameworks, and regional theory." },
  { dimension: "domain", slug: "rhythm-meter-cycle", label: "Rhythm, meter, and cycle", targetCount: 1500, detail: "Tālas, īqāʿāt, timeline patterns, meters, rhythmic cycles, and performance timing." },
  { dimension: "domain", slug: "instruments-performance", label: "Instruments and performance", targetCount: 2200, detail: "Instruments, families, techniques, vocal practice, ensembles, and performance contexts." },
  { dimension: "domain", slug: "forms-genres-repertoires", label: "Forms, genres, and repertoires", targetCount: 2400, detail: "Genres, subgenres, forms, repertoire types, ceremonial and social contexts." },
  { dimension: "domain", slug: "notation-tuning-theory", label: "Notation, tuning, and theory", targetCount: 1400, detail: "Notation systems, tuning, temperament, harmonic and analytic concepts." },
  { dimension: "domain", slug: "sound-technology-production", label: "Sound, technology, and production", targetCount: 1650, detail: "Acoustics, psychoacoustics, recording, synthesis, sampling, mixing, mastering, and tools." },
  { dimension: "era", slug: "ancient", label: "Ancient", targetCount: 500, detail: "Use only when the source justifies the period label." },
  { dimension: "era", slug: "medieval", label: "Medieval", targetCount: 650, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "renaissance", label: "Renaissance", targetCount: 500, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "baroque", label: "Baroque", targetCount: 550, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "classical", label: "Classical", targetCount: 600, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "romantic", label: "Romantic", targetCount: 600, detail: "One available period lens, not a global default." },
  { dimension: "era", slug: "modern-contemporary", label: "Modern and contemporary", targetCount: 2000, detail: "Modern, contemporary, diasporic, and evolving contexts." },
  { dimension: "era", slug: "ongoing-and-traditional", label: "Ongoing, traditional, and Indigenous", targetCount: 3500, detail: "For continuing practices where imported periodization would obscure the record." },
];

export const ALL_COVERAGE_TARGETS = [...REGION_COVERAGE_TARGETS, ...MATRIX_COVERAGE_TARGETS];

export const PRIMARY_COVERAGE_TARGET = REGION_COVERAGE_TARGETS.reduce((total, target) => total + target.targetCount, 0);

const regionNodes: TaxonomySeed[] = REGION_COVERAGE_TARGETS.map(target => ({
  slug: target.slug,
  label: target.label,
  nodeType: "region",
  parentSlug: "world-regions",
  pathKey: `music.regions.${target.slug}`,
  culturalScope: target.detail,
}));

export const SONATA_GLOBAL_TAXONOMY: TaxonomySeed[] = [
  { slug: "music", label: "Music", nodeType: "category", pathKey: "music", editorialNote: "Root of Sonata’s non-exclusive, multi-path taxonomy." },
  { slug: "world-regions", label: "World regions", nodeType: "category", parentSlug: "music", pathKey: "music.regions", editorialNote: "Regional pathways are browsing aids, not cultural containers." },
  { slug: "traditions", label: "Traditions and lineages", nodeType: "category", parentSlug: "music", pathKey: "music.traditions", editorialNote: "Terms may belong to multiple traditions and historical contexts." },
  { slug: "domains", label: "Concept and practice domains", nodeType: "category", parentSlug: "music", pathKey: "music.domains" },
  { slug: "global-era-model", label: "Global era model", nodeType: "category", parentSlug: "music", pathKey: "music.eras", editorialNote: "Use local, ongoing, traditional, and Indigenous descriptors when a Western period term is not appropriate." },
  ...regionNodes,
  { slug: "hindustani", label: "Hindustani", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.hindustani" },
  { slug: "carnatic", label: "Carnatic", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.carnatic" },
  { slug: "arabic-classical", label: "Arabic classical traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.arabic-classical" },
  { slug: "persian", label: "Persian traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.persian" },
  { slug: "turkish", label: "Turkish traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.turkish" },
  { slug: "chinese", label: "Chinese music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.chinese" },
  { slug: "japanese", label: "Japanese music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.japanese" },
  { slug: "korean", label: "Korean music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.korean" },
  { slug: "gamelan", label: "Southeast Asian gamelan traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.gamelan" },
  { slug: "african-traditions", label: "African traditional music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.african-traditions" },
  { slug: "african-diasporic", label: "African diasporic traditions", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.african-diasporic" },
  { slug: "latin-american", label: "Latin American music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.latin-american" },
  { slug: "caribbean-music", label: "Caribbean music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.caribbean-music" },
  { slug: "western-classical", label: "Western classical", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.western-classical" },
  { slug: "jazz", label: "Jazz", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.jazz" },
  { slug: "blues", label: "Blues", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.blues" },
  { slug: "hip-hop", label: "Hip-hop", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.hip-hop" },
  { slug: "electronic", label: "Electronic music", nodeType: "tradition", parentSlug: "traditions", pathKey: "music.traditions.electronic" },
  { slug: "melody-modes", label: "Melody, modes, and rāga/maqām systems", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.melody-modes" },
  { slug: "rhythm-cycle", label: "Rhythm, meter, and cycles", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.rhythm-cycle" },
  { slug: "forms-genres", label: "Forms, genres, and repertoires", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.forms-genres" },
  { slug: "instruments-performance", label: "Instruments and performance", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.instruments-performance" },
  { slug: "notation-tuning", label: "Notation, tuning, and theory", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.notation-tuning" },
  { slug: "technology-production", label: "Sound, technology, and production", nodeType: "category", parentSlug: "domains", pathKey: "music.domains.technology-production" },
  ...["ancient", "medieval", "renaissance", "baroque", "classical", "romantic", "modern", "contemporary", "pre-modern", "traditional", "indigenous", "ongoing"].map(slug => ({
    slug,
    label: slug.replace(/(^|-)\w/g, character => character.toUpperCase()),
    nodeType: "era" as const,
    parentSlug: "global-era-model",
    pathKey: `music.eras.${slug}`,
  })),
];

export type KnowledgeCandidate = {
  canonicalName: string;
  entityType: EntityType;
  emicDescription?: string;
  eticComparison?: string;
  taxonomySlugs: string[];
  sourceConfidence: "low" | "medium" | "high" | "primary";
  sources: Array<{ citation: string; uri?: string }>;
  alternateNames?: string[];
  requiresSpecialistReview?: boolean;
};
