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
  related: Array<{
    slug: string;
    name: string;
    relationshipType: string;
    note: string;
  }>;
  sources: Array<{
    label: string;
    citation: string;
    scope: string;
    note: string;
    url: string;
  }>;
  graphNodes: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    emphasis?: "main" | "accent";
    linkable?: boolean;
  }>;
};

export const DEMONSTRATION_ENTRIES: SonataEntryCard[] = [
  {
    publicId: "7f1f462a-b870-4f31-beb7-99bd96a82f1d",
    slug: "raga",
    name: "Rāga",
    originalName: "राग",
    shortDefinition:
      "A melodic framework whose meaning and use vary across South Asian classical traditions.",
    entityType: "Musical concept",
    region: "South Asia",
    tradition: "Indian classical music",
    tags: ["Melody", "Performance", "Tradition"],
    relationshipCount: 7,
    demonstration: true,
  },
  {
    publicId: "1fc32cd8-02e8-4dc6-a835-20cf10e9d60b",
    slug: "maqam",
    name: "Maqām",
    originalName: "مقام",
    shortDefinition:
      "A family of modal concepts used in several musical cultures of West Asia and North Africa.",
    entityType: "Musical concept",
    region: "West Asia & North Africa",
    tradition: "Maqām traditions",
    tags: ["Mode", "Melody", "Tradition"],
    relationshipCount: 6,
    demonstration: true,
  },
  {
    publicId: "b9a34532-17b6-43a5-b00f-0dd146e7d862",
    slug: "fugue",
    name: "Fugue",
    shortDefinition:
      "A contrapuntal form organized around the recurring and transformative treatment of a subject.",
    entityType: "Musical form",
    region: "Europe",
    tradition: "Western art music",
    tags: ["Form", "Counterpoint", "Baroque"],
    relationshipCount: 5,
    demonstration: true,
  },
  {
    publicId: "7cdd6bf5-90cf-4711-b880-2c0df1d2e555",
    slug: "polyrhythm",
    name: "Polyrhythm",
    shortDefinition:
      "The concurrent organization of contrasting rhythmic patterns within a shared performance context.",
    entityType: "Rhythmic concept",
    region: "Global",
    tradition: "Multiple traditions",
    tags: ["Rhythm", "Performance", "Analysis"],
    relationshipCount: 4,
    demonstration: true,
  },
];

export const DEMONSTRATION_DETAILS: Record<string, SonataEntryDetail> = {
  raga: {
    ...DEMONSTRATION_ENTRIES[0],
    pronunciation: "RAA-guh",
    languageOfOrigin: "Sanskrit",
    nativeScript: "राग",
    transliteration: "Rāga",
    definition:
      "This foundation record presents Rāga as a culture-specific melodic concept rather than treating it as a direct synonym for a Western scale. A future curated entry will distinguish the terminology, repertoire, and performance practice of the traditions in which it is used.",
    historicalContext:
      "The production knowledge model can preserve multiple historical accounts and sources without silently collapsing scholarly disagreement into a single statement.",
    practicalUsage:
      "In Sonata, related concepts can be connected with explicitly typed relationships such as `used_in`, `part_of`, and `associated_with`, each carrying its own context and source record.",
    visualAudioDescription:
      "The future entry format can hold descriptive listening and performance cues alongside written explanation, without privileging notation over sound or practice.",
    theoryVisual: {
      title: "Melodic framework, not a scale substitute",
      sourceScope: "Entry framing · Jairazbhoy, 1971",
      axes: [
        { label: "Identity", value: "Culture-specific melodic framework" },
        { label: "Use", value: "Repertoire and performance practice" },
        { label: "Boundary", value: "Not a direct Western-scale synonym" },
      ],
      caution: "The diagram organizes only the source-framed dimensions of this foundation record. It does not encode pitch material, a fixed scale, or a universal analytical equivalence.",
    },
    taxonomyPath: [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Melodic concepts",
      "Rāga",
    ],
    related: [
      {
        slug: "maqam",
        name: "Maqām",
        relationshipType: "contrasts_with",
        note: "A separate modal concept; relation requires contextual explanation rather than equivalence.",
      },
      {
        slug: "polyrhythm",
        name: "Polyrhythm",
        relationshipType: "related_to",
        note: "Representative cross-category navigation in the foundation interface.",
      },
      {
        slug: "fugue",
        name: "Fugue",
        relationshipType: "contrasts_with",
        note: "A navigation bridge, not a claim of shared theoretical structure.",
      },
    ],
    sources: [
      {
        label: "Scholarly monograph",
        citation:
          "Jairazbhoy, Nazir Ali. The Rāgs of North Indian Music: Their Structure and Evolution. Wesleyan University Press, 1971.",
        scope: "Entry framing",
        note: "Bibliographic details verified through the public Google Books record.",
        url: "https://books.google.com/books/about/The_R%C4%81gs_of_North_Indian_Music.html?id=xsO5AAAAIAAJ",
      },
      {
        label: "Digital item record",
        citation:
          "The rags of North Indian music: their structure and evolution. Internet Archive item dli.ministry.26725.",
        scope: "Access record",
        note: "A digitized item record that preserves publication metadata and access context.",
        url: "https://archive.org/details/dli.ministry.26725",
      },
    ],
    graphNodes: [
      { id: "raga", label: "Rāga", x: 50, y: 49, emphasis: "main", linkable: true },
      { id: "south-asia", label: "South Asia", x: 21, y: 26 },
      { id: "melody", label: "Melody", x: 77, y: 25, emphasis: "accent" },
      { id: "performance", label: "Performance", x: 79, y: 72 },
      { id: "tradition", label: "Tradition", x: 24, y: 73 },
      { id: "maqam", label: "Maqām", x: 15, y: 49, linkable: true },
      { id: "tala", label: "Tāla", x: 52, y: 87 },
    ],
  },
};

export const SONATA_TAXONOMY_PREVIEW = [
  { label: "World", detail: "Global starting point", count: "Open" },
  { label: "Asia", detail: "Regional pathways", count: "03" },
  { label: "Africa", detail: "Regional pathways", count: "01" },
  { label: "Europe", detail: "Regional pathways", count: "01" },
  { label: "Americas", detail: "Regional pathways", count: "01" },
];
