export type RegionEntry = {
  id: string;
  label: string;
  tradition: string;
  regionSlug: string;
  taxonomyPath: string[];
  era: string;
  category: string;
  language: string;
};

export const REGION_CATALOG: RegionEntry[] = [
  {
    id: "south-asia",
    label: "South Asia",
    tradition: "Indian classical music",
    regionSlug: "south-asia",
    taxonomyPath: ["World", "Asia", "South Asia", "India", "Indian classical music"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Melody",
    language: "Sanskrit",
  },
  {
    id: "middle-east",
    label: "Middle East",
    tradition: "Maqām traditions",
    regionSlug: "middle-east",
    taxonomyPath: ["World", "West Asia", "Middle East", "Maqām traditions"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Mode",
    language: "Arabic",
  },
  {
    id: "europe",
    label: "Europe",
    tradition: "Western art music",
    regionSlug: "europe",
    taxonomyPath: ["World", "Europe", "Western art music"],
    era: "Modern and contemporary",
    category: "Form",
    language: "Italian",
  },
  {
    id: "east-asia",
    label: "East Asia",
    tradition: "East Asian traditions",
    regionSlug: "east-asia",
    taxonomyPath: ["World", "Asia", "East Asia"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Melody",
    language: "Chinese",
  },
  {
    id: "southeast-asia",
    label: "Southeast Asia",
    tradition: "Southeast Asian traditions",
    regionSlug: "southeast-asia",
    taxonomyPath: ["World", "Asia", "Southeast Asia"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Form",
    language: "Javanese",
  },
  {
    id: "sub-saharan-africa",
    label: "Sub-Saharan Africa",
    tradition: "African traditional music",
    regionSlug: "sub-saharan-africa",
    taxonomyPath: ["World", "Africa", "Sub-Saharan Africa", "African traditional music"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Rhythm",
    language: "Yoruba",
  },
  {
    id: "north-america",
    label: "North America",
    tradition: "Western art music",
    regionSlug: "north-america",
    taxonomyPath: ["World", "Americas", "North America"],
    era: "Modern and contemporary",
    category: "Form",
    language: "English",
  },
  {
    id: "latin-america",
    label: "Latin America",
    tradition: "Latin American music",
    regionSlug: "latin-america",
    taxonomyPath: ["World", "Americas", "Latin America", "Latin American music"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Genre",
    language: "Spanish",
  },
  {
    id: "caribbean",
    label: "Caribbean",
    tradition: "Caribbean music",
    regionSlug: "caribbean",
    taxonomyPath: ["World", "Americas", "Caribbean", "Caribbean music"],
    era: "Modern and contemporary",
    category: "Genre",
    language: "English",
  },
  {
    id: "oceania",
    label: "Oceania",
    tradition: "Multiple traditions",
    regionSlug: "oceania",
    taxonomyPath: ["World", "Oceania"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Form",
    language: "Māori",
  },
  {
    id: "central-asia",
    label: "Central Asia",
    tradition: "Central Asian traditions",
    regionSlug: "central-asia",
    taxonomyPath: ["World", "Asia", "Central Asia"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Mode",
    language: "Uzbek",
  },
  {
    id: "north-africa",
    label: "North Africa",
    tradition: "North African traditions",
    regionSlug: "north-africa",
    taxonomyPath: ["World", "Africa", "North Africa"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Mode",
    language: "Arabic",
  },
  {
    id: "indigenous-traditions-globally",
    label: "Indigenous traditions globally",
    tradition: "Indigenous and community-led traditions",
    regionSlug: "indigenous-traditions-globally",
    taxonomyPath: ["World", "Indigenous traditions globally"],
    era: "Ongoing, traditional, and Indigenous",
    category: "Tradition",
    language: "Multiple",
  },
];

export function regionById(id: string): RegionEntry | undefined {
  return REGION_CATALOG.find(region => region.id === id);
}
