// AUTO-GENERATED from the published Firestore corpus (via next/lib/data/generated-catalogue.ts).
// Bundled so the deployed site shows the real records without requiring a live database.
// Regenerate with:  tsx scripts/generate-sonata-demo.ts

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

export const DEMONSTRATION_ENTRIES: SonataEntryCard[] = [
  {
    "publicId": "d0e6bf64-0e80-4007-9c98-e03d049dadc1",
    "slug": "adowa",
    "name": "Adowa",
    "shortDefinition": "A ceremonial Akan (Ghanaian) music and dance tradition of the Ashanti and related peoples, performed at funerals and festivals with drum and song.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Drum",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "f75c96f7-233c-47ee-87dd-b890dc729b1b",
    "slug": "afrobeat",
    "name": "Afrobeat",
    "shortDefinition": "A Nigerian popular music genre pioneered by Fela Kuti, merging West African highlife and Yoruba rhythms with funk, jazz, and political lyricism in large ensembl…",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Funk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "15c76b46-eeea-4922-b40c-8239ce82f307",
    "slug": "agogo",
    "name": "Agogo",
    "shortDefinition": "A West African and Brazilian bell idiophone, a double (usually two-pitched) bell struck with a stick, prominent in samba and Afro-Brazilian music.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Percussion",
      "Bell"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "1fb7d4e9-e87c-4c8f-8790-57a9e20f7d86",
    "slug": "ajnas",
    "name": "Ajnas",
    "originalName": "ajnās",
    "shortDefinition": "In Arabic music theory, the tetrachords and pentachords (jins, pl. ajnās) from which maqām scales are constructed as combinations of small interlocking segments…",
    "entityType": "Theory",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Theory",
      "Mode",
      "Scale"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e27ef772-38d4-4fa0-b317-1dba1aa94645",
    "slug": "alap",
    "name": "Alap",
    "originalName": "ālāpa",
    "shortDefinition": "The unmetered, improvised introductory section of a Hindustani classical performance in which a rāga is gradually revealed note by note, without percussion.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "Performance",
      "Form"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "bce97bee-ffe5-4e21-96fe-04902d1dc8d7",
    "slug": "allemande",
    "name": "Allemande",
    "shortDefinition": "A stately processional dance of German origin in duple meter, frequently the first movement of the Baroque dance suite.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Suite"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8e82f788-e68b-4717-b768-b1c925099daa",
    "slug": "amadinda",
    "name": "Amadinda",
    "shortDefinition": "A log xylophone of the Baganda people of Uganda, played by several performers and central to royal and ceremonial music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Xylophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "69ffb655-fda0-4173-803a-e693e85f8b25",
    "slug": "andalusian-music",
    "name": "Andalusian music",
    "shortDefinition": "A classical music tradition of North Africa, especially Morocco, Algeria, and Tunisia, preserving vocal-instrumental nubas descended from medieval Iberian (Al-A…",
    "entityType": "Genre",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Genre",
      "Classical",
      "Maghreb"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9889d805-f438-410a-9fb4-271de672ffe2",
    "slug": "angklung",
    "name": "Angklung",
    "shortDefinition": "A bamboo rattle instrument of Sundanese (West Java) tradition, played in tuned frames or shaken individually to produce pitched notes.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "fb8c7e2e-36a7-4142-a03d-06c0e0917a4c",
    "slug": "aria",
    "name": "Aria",
    "shortDefinition": "A self-contained vocal piece for solo voice with instrumental accompaniment, central to opera, oratorio, and cantata, often expressing a single emotional state.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Opera"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "22f534a3-98ba-40cb-9de0-2b6be8d3ab51",
    "slug": "bagpipe",
    "name": "Bagpipe",
    "shortDefinition": "A wind instrument family using enclosed reeds supplied with air from a bag, found across Europe, especially the Scottish Great Highland bagpipe and related form…",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "035fc689-c831-4887-8efa-c371518aa5b0",
    "slug": "bakhshi",
    "name": "Bakhshi",
    "originalName": "baxši",
    "shortDefinition": "A Central Asian epic singer and instrumentalist (often of the dutar or dombra), who recites traditional narratives and songs.",
    "entityType": "Role",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Role",
      "Epic",
      "Oral tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "27212afb-fe3b-42c1-ac47-872c44758f00",
    "slug": "balafon",
    "name": "Balafon",
    "shortDefinition": "A struck xylophone with gourd resonators, of the Mande peoples of West Africa, played by griots and central to ceremonial and praise music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Xylophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8d42ac1e-3afd-4dda-9689-e6a7baa0615a",
    "slug": "banjo",
    "name": "Banjo",
    "shortDefinition": "A plucked string instrument of West African origin, with a skin head stretched over a circular rim and a long neck, central to American folk and bluegrass tradi…",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "7829cec5-0a12-4a5f-a66c-dbd14e8be5cc",
    "slug": "bendir",
    "name": "Bendir",
    "shortDefinition": "A frame drum of North Africa, especially Morocco, with a single skin and often a snare, used in Berber, Sufi, and folk music.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "595ec337-d495-4a81-9921-b1df8ad25b32",
    "slug": "bhajan",
    "name": "Bhajan",
    "shortDefinition": "A devotional Hindu song of South Asia, combining hymn text with melodic and rhythmic frameworks in both solo and congregational performance.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Devotional",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "47afc620-15c2-44a5-8739-44f248450822",
    "slug": "blue-note",
    "name": "Blue note",
    "shortDefinition": "In blues and jazz, the lowered (flatted) third, fifth, or seventh scale degree sung or played for expressive effect, contributing the music's characteristic col…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Theory",
      "Pitch",
      "Harmony"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ccabef53-8173-446c-a4f0-073e8169ca40",
    "slug": "bluegrass",
    "name": "Bluegrass",
    "shortDefinition": "A country music subgenre of the American South, featuring acoustic string instruments and close vocal harmonies, rooted in Appalachian traditions.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9e85270d-eccd-48f5-89a7-27f0bd50a8a2",
    "slug": "blues",
    "name": "Blues",
    "shortDefinition": "A secular African American music and form, characterized by the twelve-bar structure and blue notes, originating in the rural South and foundational to later po…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Form",
      "Blue notes"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ad7f2963-87f0-44bc-9c4d-6411913e9168",
    "slug": "bonang",
    "name": "Bonang",
    "shortDefinition": "A set of small tuned gongs arranged in rows on a frame, struck with padded mallets, prominent in the Javanese gamelan.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Gong",
      "Metallophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "532db711-35b4-4442-aa12-1604abc74058",
    "slug": "bossa-nova",
    "name": "Bossa nova",
    "shortDefinition": "A Brazilian genre combining samba rhythm with jazz harmony and cool vocal style, emerging in Rio de Janeiro in the late 1950s.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Popular music",
      "Brazil"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "44a24eca-9bcc-41f9-86fc-6114672460ae",
    "slug": "calypso",
    "name": "Calypso",
    "shortDefinition": "A Trinidadian vocal and instrumental music genre with roots in African and French-Caribbean traditions, known for witty, topical lyrics and steel-band and carni…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Vocal",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b1a377f9-baf0-40da-b949-5fa6da005a2e",
    "slug": "cantata",
    "name": "Cantata",
    "shortDefinition": "A vocal composition for one or more voices with instrumental accompaniment, comprising several movements, significant in Baroque church and secular music.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Baroque"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "bda23fe3-433f-469d-8f03-5eb0e6f56f50",
    "slug": "charango",
    "name": "Charango",
    "shortDefinition": "A small Andean stringed instrument of the lute family, traditionally with ten strings in five courses, whose body may be made from an armadillo shell or wood.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cbe7c467-7335-4189-b9c9-83a70ca57b37",
    "slug": "chorale",
    "name": "Chorale",
    "originalName": "chorāle",
    "shortDefinition": "A hymn tune of the German Protestant church, typically in four-part homophonic harmonization, as used by J. S. Bach and later composers.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "0797cca8-89bd-421e-8891-6f449969b2a8",
    "slug": "concerto",
    "name": "Concerto",
    "shortDefinition": "A composition typically featuring one or more solo instruments contrasted with an orchestra, in several movements, prominent in the Baroque, Classical, and Roma…",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Orchestral"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "0728092e-8261-47ba-9d5c-1159cb506a97",
    "slug": "conjunto",
    "name": "Conjunto",
    "shortDefinition": "A Mexican-American (Tejano) ensemble and genre built around button accordion and bajo sexto, associated with norteño music of northern Mexico and Texas.",
    "entityType": "Ensemble",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Ensemble",
      "Tejano",
      "Accordion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d472f698-bc81-46ab-b1ca-324cd74f8bb5",
    "slug": "corrido",
    "name": "Corrido",
    "shortDefinition": "A Mexican narrative ballad genre that recounts historical, political, and social events, typically sung over simple guitar accompaniment.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Narrative",
      "Ballad"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "3e9b3f95-6112-4a80-9d2b-8d6a77b1dd71",
    "slug": "counterpoint",
    "name": "Counterpoint",
    "shortDefinition": "The combination of two or more independent melodic lines sounding together, governed by rules of consonance and dissonance, foundational to Western polyphony.",
    "entityType": "Theory",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Theory",
      "Composition",
      "Polyphony"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "dc9c16fc-0cbe-42f6-bd74-5537d50181ed",
    "slug": "cumbia",
    "name": "Cumbia",
    "shortDefinition": "A Colombian music and dance genre of Indigenous, African, and Spanish origins, characterized by a rhythmic 2/4 pattern and accordion-led ensembles, with broad L…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2718adf7-bf1b-4006-a34f-bb59f6ee946f",
    "slug": "darbuka",
    "name": "Darbuka",
    "originalName": "darbūka",
    "shortDefinition": "A single-headed goblet drum of the Middle East and North Africa, played with the fingers and used in classical, folk, and popular ensemble music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "c55969a1-05d6-4b44-9f22-7b1f50100f5d",
    "slug": "dastgah",
    "name": "Dastgah",
    "originalName": "dastgāh",
    "shortDefinition": "A set of melodic modes and their associated repertory in Persian classical music, each representing a family of gushehs united by a modal basis.",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Repertoire"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a849a277-96bf-4d0b-b676-30bd4a1d6f02",
    "slug": "dhrupad",
    "name": "Dhrupad",
    "shortDefinition": "An ancient and austere form of Hindustani vocal music, characterized by a slow unfold and a strict, meditative treatment of the raga in a lower register.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Performance",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d0c13cfe-4787-4352-b526-1904a51866c8",
    "slug": "didgeridoo",
    "name": "Didgeridoo",
    "shortDefinition": "A wind instrument of the Aboriginal peoples of northern Australia, a long wooden tube played with circular breathing to produce a deep drone, often with rhythmi…",
    "entityType": "Instrument",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Aerophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "0aab94a1-11e9-4b21-8136-b44adac48275",
    "slug": "dizi",
    "name": "Dizi",
    "originalName": "dízi",
    "shortDefinition": "A transverse bamboo flute of China, with a distinctive buzzing membrane-covered hole, used in folk and classical instrumental music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Flute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "c45fd367-3f36-42bf-a432-edc1a3ff89b6",
    "slug": "djembe",
    "name": "Djembe",
    "originalName": "djembe",
    "shortDefinition": "A goblet-shaped, single-headed drum of West Africa, played with the hands and capable of a wide range of tones, used in ensemble music and dance.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "82cf97af-bef2-4257-921b-a4329017b133",
    "slug": "dombra",
    "name": "Dombra",
    "originalName": "dombra",
    "shortDefinition": "A long-necked two-stringed plucked lute of Kazakhstan, central to Kazakh folk, epic, and instrumental (kuy) music.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "bd2b4ff5-e7b4-46a3-be96-c9bdda1bc04d",
    "slug": "duduk",
    "name": "Duduk",
    "shortDefinition": "A double-reed wind instrument of Armenia and the Caucasus, with a warm nasal tone, used in folk and ceremonial music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "df876888-a474-4b26-9521-7c757c661751",
    "slug": "dutar",
    "name": "Dutar",
    "originalName": "dutār",
    "shortDefinition": "A long-necked two-stringed plucked lute of Central Asia (Turkmen, Uzbek, and related traditions), with a pear-shaped body and silk or metal strings.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a202bd74-41c2-4da3-a50e-9d8cb4875c02",
    "slug": "erhu",
    "name": "Erhu",
    "originalName": "èrhú",
    "shortDefinition": "A two-stringed spike fiddle of China, with a long neck and a snake-skin-covered resonator, central to solo, chamber, and opera music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Bowed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "99cb59c2-e81a-4c26-9d1f-42f3b84dc389",
    "slug": "fado",
    "name": "Fado",
    "shortDefinition": "A melancholic Portuguese urban song genre, sung to guitar and viola accompaniment, associated with Lisbon and Coimbra.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9a2b49f7-7289-445a-88cf-e5a2769a00c9",
    "slug": "fatele",
    "name": "Fatele",
    "shortDefinition": "A Tokelauan song-dance genre combining sung poetry, rhythm, and dance, performed communally at celebrations and events.",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Song"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cdb961ad-115d-4e52-a9e0-34cac065f69b",
    "slug": "fiddle",
    "name": "Fiddle",
    "shortDefinition": "The colloquial term for the violin, especially as used in folk, country, bluegrass, and traditional music of North America and elsewhere.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "04983ce7-829f-454d-8bdb-bb8a97a3a31f",
    "slug": "forro",
    "name": "Forró",
    "shortDefinition": "A Brazilian dance music of the Northeast, featuring accordion (sanfona), zabumba drum, and triangle, popular at festivals and informal gatherings.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Brazil"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2aa0c1f9-bcd1-44e9-8d38-108fe4251681",
    "slug": "fugue",
    "name": "Fugue",
    "shortDefinition": "A contrapuntal composition in which a subject is stated and then developed through successive imitative entries in different voices, characteristic of the Baroq…",
    "entityType": "Musical form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Counterpoint",
      "Baroque"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e299f67d-656c-4270-853b-8c522b09d1ad",
    "slug": "gagaku",
    "name": "Gagaku",
    "shortDefinition": "The ancient court music of Japan, combining instrumental, vocal, and dance traditions that have been preserved continuously since at least the eighth century.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Court music",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8f1ee456-b168-49fa-b611-268a2ae45cce",
    "slug": "gamelan",
    "name": "Gamelan",
    "shortDefinition": "An Indonesian (especially Balinese and Javanese) instrumental ensemble of metallophones, gongs, drums, and other instruments, tuned to distinct scales and playe…",
    "entityType": "Genre",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Genre",
      "Ensemble",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "39808b9d-67c0-48ec-ae55-6af24805bc14",
    "slug": "gayageum",
    "name": "Gayageum",
    "originalName": "gayageum",
    "shortDefinition": "A twelve-stringed Korean plucked zither, historically divided into court (jeong-ak) and popular/sanjo (sanjomyeon) styles.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "6dda394c-0de9-4d16-a10e-c2b2e5274422",
    "slug": "ghatam",
    "name": "Ghatam",
    "shortDefinition": "A clay pot idiophone played with the hands in Carnatic music, its pitch varied by the player's open and closed mouth resonance.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "c0e9c63e-2d4a-4d2f-bd64-7458f6f57ac9",
    "slug": "ghazal",
    "name": "Ghazal",
    "originalName": "ghazal",
    "shortDefinition": "A poetic-musical genre of South Asian (especially Urdu and Persian) tradition, setting rhymed couplets to music, popular in North Indian and Pakistani performan…",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Vocal",
      "Poetry"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "05558f0d-4c19-436a-9861-dda12d416b13",
    "slug": "gnawa",
    "name": "Gnawa",
    "originalName": "gnāwa",
    "shortDefinition": "A Moroccan Sufi brotherhood music and ritual tradition of sub-Saharan African heritage, featuring the guembri, qraqeb, and call-and-response song.",
    "entityType": "Genre",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Genre",
      "Ritual",
      "Morocco"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4c5f01a0-a79a-44cf-a6f6-91fd4bc44527",
    "slug": "gong-ageng",
    "name": "Gong ageng",
    "shortDefinition": "The largest and deepest gong in the Javanese gamelan, struck to punctuate the largest musical phrases and mark structural periods.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Gong",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ee28a146-0ab0-4868-a8a8-4ad6cccf8e2a",
    "slug": "gospel",
    "name": "Gospel",
    "shortDefinition": "A genre of Christian vocal music rooted in African American churches, combining call-and-response, harmony, and emotional delivery; also a related white souther…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "7a8353fc-1af5-449d-9b06-9cd5f029f6f3",
    "slug": "guembri",
    "name": "Guembri",
    "originalName": "gembri",
    "shortDefinition": "A three-stringed bass lute of the Gnawa tradition of Morocco, a hollow wooden resonator with a skin face, played to set the ritual's rhythmic foundation.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d72806f4-48be-4fc5-9b3e-ec6ce474d105",
    "slug": "gugin",
    "name": "Gugin",
    "originalName": "gǔqín",
    "shortDefinition": "A seven-stringed Chinese zither with a history of over three thousand years, associated with literati culture and refined solo performance.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4e6d4609-ecde-4707-a107-5bb6d3cd5beb",
    "slug": "gusheh",
    "name": "Gusheh",
    "originalName": "gusheh",
    "shortDefinition": "A distinct melodic unit or phrase within the Persian radif, grouped according to their dastgāh, that forms the basis of improvisation.",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Melody",
      "Form",
      "Modal"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "98a10427-067c-498b-ba66-53a427952df1",
    "slug": "guzheng",
    "name": "Guzheng",
    "originalName": "gǔzhēng",
    "shortDefinition": "A large plucked zither of China with movable bridges and (modernly) up to 21 strings, used in solo and ensemble music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b6f0db9b-60d7-4bcc-af57-807cd00e26af",
    "slug": "haka",
    "name": "Haka",
    "shortDefinition": "A Māori ceremonial posture dance combining vigorous movement, foot-stamping, and chanting, performed in formal and communal contexts, often by groups.",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "09764af7-6576-4b3e-82e5-74d20db4a437",
    "slug": "hichiriki",
    "name": "Hichiriki",
    "shortDefinition": "A short double-reed wind instrument of Japan, central to the court music gagaku, valued for its penetrating nasal tone.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e2d6f632-b3dc-4af8-9a68-962af831551d",
    "slug": "highlife",
    "name": "Highlife",
    "shortDefinition": "A West African popular music genre combining indigenous dance rhythms with Western brass-band and guitar idioms, prominent in Ghana and Nigeria from the early t…",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Band"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a461a8df-4e6f-4c4c-b72f-64d847336538",
    "slug": "hula",
    "name": "Hula",
    "shortDefinition": "A Hawaiian dance accompanied by chant (oli) or song (mele), of two main forms: hula kahiko (ancient) and hula 'auana (modern).",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Hawaii"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "35549570-c795-4250-9f74-c6e9d41df0e0",
    "slug": "improvisation",
    "name": "Improvisation",
    "shortDefinition": "The spontaneous creation of music in performance, which may range from ornamentation of composed material to wholly spontaneous invention, central to jazz and m…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Performance",
      "Theory",
      "Creation"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "26c49379-3199-49da-a434-0e3156ff7d9c",
    "slug": "inuit-throat-singing",
    "name": "Inuit throat singing",
    "shortDefinition": "A vocal tradition of Inuit communities in the Arctic (Canada, Greenland, Alaska), typically a duet of two performers producing rhythmic percussive vocal sounds.",
    "entityType": "Genre",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Genre",
      "Vocal",
      "Arctic"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "34151b05-91c6-404b-9407-6d88b4275534",
    "slug": "ipap",
    "name": "Ipap",
    "shortDefinition": "A Melanesian (Papua New Guinea) slit gong or garamut, a hollowed log idiophone struck to signal, accompany dance, and mark ritual events.",
    "entityType": "Instrument",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Idiophone",
      "Slit drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cceed076-9a87-41f8-9b5b-77c607317594",
    "slug": "iqa",
    "name": "Iqa",
    "originalName": "īqāʿ",
    "shortDefinition": "A rhythmic cycle or pattern in Arabic music, analogous to a rhythmic mode, organized into beats, rests, and periodic cycles played on percussion.",
    "entityType": "Rhythmic concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Rhythm",
      "Performance",
      "Cycle"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "41cece5a-0104-4c6c-b98e-fac355e57a5c",
    "slug": "janggu",
    "name": "Janggu",
    "originalName": "changgo",
    "shortDefinition": "A Korean hourglass-shaped double-headed drum, played with a stick and a hand, central to folk (pungmul, samulnori) and classical music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ba111aef-6b91-4b62-a816-87d0b8f2caee",
    "slug": "jazz",
    "name": "Jazz",
    "shortDefinition": "A music of African American origin characterized by swing, improvisation, and blue notes, which developed through blues, ragtime, and early band traditions and…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Improvisation",
      "Swing"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "de07d5a6-fd75-47c0-a728-d9a2c9e0fd99",
    "slug": "jembe",
    "name": "Jembe",
    "originalName": "djembe",
    "shortDefinition": "An alternative spelling of djembe, a goblet-shaped hand drum of West Africa capable of bass, tone, and slap sounds.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "da961f47-75ad-483c-ae59-de69c4d9e04e",
    "slug": "jhala",
    "name": "Jhala",
    "originalName": "jhālā",
    "shortDefinition": "A fast, climactic section of Hindustani instrumental music, characterized by rapid repeated strokes and rhythmic intensification within a rāga.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Instrumental",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d132365c-825b-4488-afa0-639b2a6d1444",
    "slug": "kanun",
    "name": "Kanun",
    "originalName": "qānūn",
    "shortDefinition": "A plucked zither of the Middle East and North Africa, with a trapezoidal soundboard and numerous strings grouped in courses, played with finger plectra.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "31f48db7-8aef-4ed8-8b2f-b1b63ce227ef",
    "slug": "kathakali",
    "name": "Kathakali",
    "shortDefinition": "A classical dance-drama of Kerala, South India, in which elaborately costumed performers mime a narrative to vocal and percussion accompaniment.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Dance-drama",
      "Ritual theater"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "f6efaf95-217b-4581-bbc8-cd780ef81b5f",
    "slug": "kendang",
    "name": "Kendang",
    "originalName": "kendhang",
    "shortDefinition": "A double-headed drum, often in pairs, that leads and shapes tempo and dynamics in Javanese and Balinese gamelan ensembles.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4f72fc7e-a8b7-48f3-a6b8-262ca73e1032",
    "slug": "khaen",
    "name": "Khaen",
    "originalName": "khāēn",
    "shortDefinition": "A free-reed mouth organ of Laos and northeastern Thailand, made of bamboo pipes arranged in a frame, associated with lam and mor lam vocal traditions.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Free reed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "f45aa43f-09ca-4401-8e5e-e67b84490111",
    "slug": "khyal",
    "name": "Khyal",
    "originalName": "khayāl",
    "shortDefinition": "The most widespread form of Hindustani vocal music, offering the soloist greater melodic and expressive freedom within the frame of a rāga and tāla.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Performance",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2ee0b3cf-031b-4d28-a909-d71b71a19aa3",
    "slug": "kora",
    "name": "Kora",
    "shortDefinition": "A 21-stringed bridge-harp of the Mande peoples of West Africa, combining harp and lute characteristics, played by griots (jeli) as accompaniment to song and pra…",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Strings",
      "Harp-lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "362d38e0-020d-4503-af27-7d136e1ec5b5",
    "slug": "koto",
    "name": "Koto",
    "shortDefinition": "A long Japanese zither with thirteen silk or nylon strings and movable bridges, played with finger picks, associated with court, chamber, and solo repertoire.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4f4d29b0-da41-4587-a718-6a014b767699",
    "slug": "kriti",
    "name": "Kriti",
    "originalName": "kṛti",
    "shortDefinition": "The principal fixed composition form of Carnatic music, setting devotional or narrative text to a rāga and tāla, usually in three sections.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Composition",
      "Carnatic"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "6d6df41c-4b2d-480b-ac17-48167ad1cd40",
    "slug": "kulintang",
    "name": "Kulintang",
    "shortDefinition": "A gong-chime ensemble tradition of the southern Philippines, Indonesia (Kalimantan), and Borneo, centered on a row of small bossed gongs.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Gong",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9364194a-9f74-4491-a44d-4270224f1829",
    "slug": "kultrun",
    "name": "Kultrun",
    "shortDefinition": "A ceremonial drum of the Mapuche people, a shallow kettledrum used in the religious machitun ritual, with a decorated skin head.",
    "entityType": "Instrument",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e1be5be2-36b0-43f7-90ef-e4c4540d52ee",
    "slug": "kuy",
    "name": "Kuy",
    "originalName": "küi",
    "shortDefinition": "A Kazakh solo instrumental composition, especially for the dombra, often programmatic and central to the oral instrumental tradition.",
    "entityType": "Form",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Kazakh"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "3e060254-a925-4e2b-abb2-f0d03e8cdbbc",
    "slug": "mahori",
    "name": "Mahori",
    "shortDefinition": "A Thai ensemble combining string, wind, and percussion instruments, known for warm textures and moderate tempo.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Mixed",
      "Court"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "45c9ef4d-86dc-495d-9f8a-de6112b5906b",
    "slug": "maqam",
    "name": "Maqam",
    "originalName": "maqām",
    "shortDefinition": "A system of melodic modes used in Middle Eastern and North African music, each defined by scale, characteristic phrases, tonal centers, and expressive conventio…",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cfa7fc60-de00-4d5f-9065-5ef5ebd6ae41",
    "slug": "maqamat",
    "name": "Maqamat",
    "originalName": "maqāmāt",
    "shortDefinition": "The plural of maqām, referring collectively to the melodic modal system and its family of modes in Middle Eastern and North African art music.",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "18e3676b-f3ad-41b0-8b34-664883e2ad60",
    "slug": "mariachi",
    "name": "Mariachi",
    "shortDefinition": "A Mexican ensemble tradition combining violin, guitarrones, trumpets, and vihuela, performing rancheras, corridos, and other regional songs in festive and forma…",
    "entityType": "Ensemble",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Ensemble",
      "Folk",
      "Mexico"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8aa71843-fcb0-4b97-86dd-f32921795ae2",
    "slug": "marimba",
    "name": "Marimba",
    "shortDefinition": "A struck idiophone with wooden bars and resonators, indigenous to Mesoamerica and west Africa and prominent in Guatemala and Mexico, played with mallets.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "7d27f93c-dc2d-4add-ae90-4fbe3e390b9e",
    "slug": "mbalax",
    "name": "Mbalax",
    "shortDefinition": "A Senegalese popular music genre fusing traditional sabar drumming with American funk, jazz, and rock influences, pioneered in the 1970s.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "83e7364d-8b0e-46ce-81fd-cddd7243c3fa",
    "slug": "mbira",
    "name": "Mbira",
    "originalName": "mbira",
    "shortDefinition": "A lamellophone of the Shona people of Zimbabwe, consisting of metal tines plucked over a wooden board and resonator, central to ceremonial music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Lamellophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b5f494c2-30b7-43f6-a88f-4d7b0e21fe0a",
    "slug": "merengue",
    "name": "Merengue",
    "shortDefinition": "A fast duple-meter dance music of the Dominican Republic, combining accordion, saxophone, and percussion, central to Dominican national identity.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Dominican Republic"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "181d4dba-e1d9-44af-9f56-4d5c6789bf3b",
    "slug": "motet",
    "name": "Motet",
    "shortDefinition": "A polyphonic sacred choral work, historically on a given text, central to medieval, Renaissance, and Baroque church music.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8c5c7aac-0159-4be9-9fec-fd61f75cb7c6",
    "slug": "mridangam",
    "name": "Mridangam",
    "originalName": "mṛdaṅgam",
    "shortDefinition": "A double-headed barrel drum of South Indian (Carnatic) classical music, played with the hands and central to rhythmic (tāla) accompaniment.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9489a63c-bc41-4f94-9d20-be5ed084e3c3",
    "slug": "ney",
    "name": "Ney",
    "shortDefinition": "An end-blown cane flute used throughout Middle Eastern and Turkish music, known for its breathy tone and central role in devotional and classical practice.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "dd0a81e1-dee5-426a-80f5-977beb994f78",
    "slug": "noh",
    "name": "Noh",
    "shortDefinition": "A Japanese masked theater genre integrating stylized movement, chant (utai), and instrumental ensemble (hayashi), evolving from the medieval period.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Theater",
      "Ritual"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "0f452876-f803-45ee-ac71-adbc54b7c6a9",
    "slug": "nuba",
    "name": "Nuba",
    "originalName": "nūba",
    "shortDefinition": "A large multi-movement vocal-instrumental suite of North African (Maghrebi) Andalusian music, organized by rhythmic cycles and modes.",
    "entityType": "Form",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Form",
      "Suite",
      "Maghreb"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a34773ef-bd96-484c-bd48-204722757676",
    "slug": "oratorio",
    "name": "Oratorio",
    "shortDefinition": "A large-scale sacred vocal-instrumental work, usually dramatic in narrative but staged without acting, prominent in the Baroque period.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9d971ed6-1457-446b-8019-f77cb8b8be15",
    "slug": "oud",
    "name": "Oud",
    "originalName": "ʿūd",
    "shortDefinition": "A short-necked, fretless plucked lute with a pear-shaped body, central to Arabic, Turkish, Persian, and Greek music, ancestor of the Western lute.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "fc95c8b8-2ef2-46d7-89cc-8de139788bf4",
    "slug": "pansori",
    "name": "Pansori",
    "originalName": "p'ansori",
    "shortDefinition": "A Korean narrative vocal genre in which a single singer (kwangdae) tells a story with dramatic vocal technique and a barrel-drum (puk) accompaniment.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Vocal",
      "Narrative"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b3ee30b2-c7f3-4019-9596-de97279be462",
    "slug": "patagonian-trutruka",
    "name": "Patagonian trutruka",
    "shortDefinition": "A long trumpet of the Mapuche people of Patagonia (Chile/Argentina), made from a hollowed plant stem with an animal-horn bell, used in ceremonial music.",
    "entityType": "Instrument",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "3a87aa58-9ba4-4859-a4aa-2b737686d892",
    "slug": "pelog",
    "name": "Pelog",
    "originalName": "pélog",
    "shortDefinition": "One of the two principal tuning systems of Javanese gamelan, a seven-tone scale from which subsets of five tones are used in practice.",
    "entityType": "Theory",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Tuning",
      "Scale",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "21fc9101-c576-4185-bf77-c45602fcf8de",
    "slug": "pesrev",
    "name": "Pesrev",
    "originalName": "peşrev",
    "shortDefinition": "An instrumental prelude form in Turkish and Ottoman classical music, usually in a single makam and usul, that opens a performance or suite (fasıl).",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Ottoman"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d5383946-62ec-42d1-88a3-8fb91490830a",
    "slug": "piano",
    "name": "Piano",
    "shortDefinition": "A keyboard instrument in which hammers strike strings, invented around 1700 by Bartolomeo Cristofori, whose dynamic range gave it its name (pianoforte).",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Keyboard",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2c172835-bd53-4987-9522-c63de01ea978",
    "slug": "pinpeat",
    "name": "Pinpeat",
    "shortDefinition": "The principal ceremonial orchestra of Cambodia, a percussion-and-wind ensemble associated with court, ritual, and shadow-puppet performance.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Ceremonial",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d1b70e85-254d-49e3-b2ba-b54ee1169e54",
    "slug": "pipa",
    "name": "Pipa",
    "originalName": "pípá",
    "shortDefinition": "A pear-shaped four-stringed plucked lute of China, with a long tradition in court, solo, and narrative repertoire.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9c56c38b-98e8-4aa8-ab77-a32962ab3add",
    "slug": "powwow-drum",
    "name": "Powwow drum",
    "shortDefinition": "A large communal drum central to North American Indigenous powwow singing, around which a singing group (drum) performs songs in unison.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Percussion",
      "Indigenous"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "5dbb6959-abb2-4c6a-b72e-044f83709715",
    "slug": "prelude",
    "name": "Prelude",
    "shortDefinition": "A short instrumental piece that precedes and introduces a larger work or serves as an independent character piece, common from the Baroque period onward.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Instrumental",
      "Introduction"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "7a841ac0-0912-42b0-87b5-6dea1a005f54",
    "slug": "pungmul",
    "name": "Pungmul",
    "originalName": "p'ungmul",
    "shortDefinition": "A Korean folk tradition combining percussion, wind, dance, and spectacle, centered on rhythmic patterns played with janggu and buk drums.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Folk",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "34849261-90c8-4b0a-8b27-c94d32e50ac3",
    "slug": "qraqeb",
    "name": "Qraqeb",
    "originalName": "qarāqib",
    "shortDefinition": "Large metal castanets or clappers played in pairs in the Gnawa ritual of Morocco, providing a percussive, rhythmic framework.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "03db8ba1-bdcf-42d0-bcb8-dce7a3e55159",
    "slug": "radif",
    "name": "Radif",
    "shortDefinition": "The canonical repertory of Persian classical music: a memorized sequence of gushehs organized by dastgāh, serving both as a teaching device and performance reso…",
    "entityType": "Repertoire",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Repertoire",
      "Melody",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "25c8cebe-1bcd-404a-b88b-8e4f503bc389",
    "slug": "raga",
    "name": "Raga",
    "originalName": "rāga",
    "shortDefinition": "A melodic framework in Indian classical music defined by a set of characteristic notes, ascending and descending patterns, and expressive nuances, rather than a…",
    "entityType": "Musical concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "Melodic framework",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9ca84ef1-5d9c-4062-897f-e01ed3de1a9d",
    "slug": "raga-ragini",
    "name": "Raga-Ragini",
    "originalName": "rāga-rāgiṇī",
    "shortDefinition": "A historical South Asian scheme that personified modal melodic frameworks as male rāgas and female rāgiṇīs, used in painting and musical theory across several r…",
    "entityType": "Musical concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "History",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "d069665b-9cf5-44c9-9a8c-06250993303b",
    "slug": "ragamalika",
    "name": "Ragamalika",
    "originalName": "rāgamālikā",
    "shortDefinition": "A Carnatic composition that moves through a succession of different rāgas, one per section, united by a single tāla and melodic continuity.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Melody",
      "Carnatic"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2ffa051f-9b10-48f0-bb7a-c3773604447d",
    "slug": "ragtime",
    "name": "Ragtime",
    "shortDefinition": "A late-19th-century African American piano genre characterized by syncopated melody over a steady, march-like bass, influential on early jazz.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Piano",
      "Syncopation"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "99971d06-ea94-46fd-b1c7-f4823c610564",
    "slug": "ranchera",
    "name": "Ranchera",
    "shortDefinition": "A Mexican song genre rooted in rural life and derived from the mariachi tradition, characterized by its verse-chorus form and expressive vocal delivery.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Song",
      "Mexico"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "c134fea5-e598-4114-8f27-68584dd17b1a",
    "slug": "rara",
    "name": "Rara",
    "shortDefinition": "A Haitian street music and procession genre performed during Lent, using bamboo (vaccines), drums, horns, and call-and-response song.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Street",
      "Procession"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ddc7b37b-c2ec-482e-976f-3655aff863b3",
    "slug": "rast",
    "name": "Rast",
    "originalName": "Rāst",
    "shortDefinition": "A principal maqām in Arabic and Turkish music, built on a scale with neutral second and sixth degrees, often regarded as a foundational and stable mode.",
    "entityType": "Mode",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a4d414d4-69e3-49a8-b893-7d6009f1f256",
    "slug": "rebab",
    "name": "Rebab",
    "shortDefinition": "A two-stringed spike fiddle, usually bowed, that leads the melodic elaboration in the Javanese gamelan.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Bowed"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "aaab3755-b7da-4ebf-a327-ef55b5c97970",
    "slug": "recitative",
    "name": "Recitative",
    "shortDefinition": "A style of vocal writing that follows the natural rhythms and inflections of speech, used in opera and oratorio to advance dialogue and narrative.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Opera"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "c3695b33-9c1d-42ce-8d29-2930e0426664",
    "slug": "reggae",
    "name": "Reggae",
    "shortDefinition": "A Jamaican popular music genre that grew out of ska and rocksteady, characterized by an offbeat rhythm and a heavy bass line, and closely associated with Rastaf…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Popular music",
      "Reggae"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "40e3d186-7112-41ef-a1df-89f8786723d4",
    "slug": "rokudan",
    "name": "Rokudan",
    "shortDefinition": "A well-known koto solo composition of the Edo period, consisting of six dan (sections) of rising length and momentum.",
    "entityType": "Form",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Repertoire"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "041b7ca6-8edc-4625-bf9c-b33ab9cead73",
    "slug": "rondo",
    "name": "Rondo",
    "shortDefinition": "A musical form built on the recurrence of a principal theme (refrain) alternating with contrasting episodes, common in Classical sonata and concerto movements.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Instrumental",
      "Structure"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "80ed3642-1a35-4699-af72-911bac059153",
    "slug": "rubab",
    "name": "Rubab",
    "originalName": "rubāb",
    "shortDefinition": "A short-necked plucked lute of Central and South Asia, with a wooden body and sympathetic strings, important in Afghan and North Indian music.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "853bd065-be51-422d-98ea-2cf6cdedae63",
    "slug": "salsa",
    "name": "Salsa",
    "shortDefinition": "A popular dance music style of the Caribbean and Latin America, consolidating Cuban son and other forms with New York arrangements, characterized by a driving m…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "a9e0621a-69e6-4170-8d6f-298733b251b5",
    "slug": "samba",
    "name": "Samba",
    "shortDefinition": "A Brazilian music and dance genre of African origin, central to Carnival, with syncopated percussion and a danceable 2/4 rhythm, and a rich family of regional v…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "79141cc0-79a8-4a7e-8eb5-a72c4cecd123",
    "slug": "sanjo",
    "name": "Sanjo",
    "shortDefinition": "A Korean genre of instrumental solo music that unfolds a sequence of contrasting movements within a single piece, often for gayageum or other instruments.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Instrumental",
      "Solo"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cb069686-6b26-4093-b089-4af661af9707",
    "slug": "santur",
    "name": "Santur",
    "originalName": "santūr",
    "shortDefinition": "A trapezoidal hammered dulcimer with strings struck by light wooden mallets, used in Persian, Turkish, and Iraqi classical and folk music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Struck"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e3890cb1-9f9e-4d9f-8dc1-3b183826ea75",
    "slug": "sarabande",
    "name": "Sarabande",
    "shortDefinition": "A slow triple-meter dance of Spanish origin, common as a slow movement of the Baroque suite, characterized by an accent on the second beat.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Suite"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8181c8a0-adb5-4d46-839e-faf0ee60f786",
    "slug": "sargam",
    "name": "Sargam",
    "shortDefinition": "The Indian solfège syllables (sa, re, ga, ma, pa, dha, ni) used to name the notes of a rāga, parallel in function to Western solfège.",
    "entityType": "Theory",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Notation",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "f32895ae-846f-4170-8d79-872d2f6a2675",
    "slug": "sarod",
    "name": "Sarod",
    "shortDefinition": "A fretless plucked lute of Hindustani music, with a metal fingerboard and sympathetic strings, used in classical and instrumental performance.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "03c23563-f5af-4753-979a-64c29d059fd8",
    "slug": "saron",
    "name": "Saron",
    "shortDefinition": "A metallophone struck with a mallet in the Javanese and Balinese gamelan, one of the core melodic instruments of the ensemble.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Idiophone",
      "Metallophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "6ba0f213-9527-4652-b428-97586b4db104",
    "slug": "saung",
    "name": "Saung",
    "shortDefinition": "A Burmese arched harp with a curved neck and silk strings, the national instrument of Myanmar, associated with classical court music.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Harp"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "bdef075d-bef3-458e-9dea-ea0e0c0e63e3",
    "slug": "saz",
    "name": "Saz",
    "shortDefinition": "A family of long-necked plucked lutes of Turkey and Central Asia, with movable frets, central to Turkish folk and aşık (minstrel) music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8c2f6d21-6720-4fb1-aaa2-cfd5aff23c83",
    "slug": "setar",
    "name": "Setar",
    "originalName": "setār",
    "shortDefinition": "A long-necked plucked lute of Persian classical music, historically with three playing strings plus sympathetic strings, central to Sufi and art traditions.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2f4c9db9-72e5-44de-8ddc-eb836324a87a",
    "slug": "shakuhachi",
    "name": "Shakuhachi",
    "shortDefinition": "An end-blown bamboo flute of Japan, associated with Zen meditation (honkyoku) and ensemble and contemporary music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Flute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2ab6b70f-a432-471d-8152-8dc82fb2c4c0",
    "slug": "shamisen",
    "name": "Shamisen",
    "shortDefinition": "A three-stringed plucked lute of Japan, with a square body covered in skin, central to kabuki, bunraku, and folk music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "7dededef-29c5-4ad7-9beb-6ff35cac1659",
    "slug": "shashmaqom",
    "name": "Shashmaqom",
    "originalName": "šashmaqom",
    "shortDefinition": "A canonical cycle of six maqom suites of the classical music of Uzbekistan and Tajikistan, combining vocal (nasr) and instrumental (mushkilot) sections.",
    "entityType": "Repertoire",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Repertoire",
      "Maqom",
      "Classical"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "52a08bdc-81a9-4a20-8852-ada1c1c95515",
    "slug": "shekere",
    "name": "Shekere",
    "shortDefinition": "A gourd rattle covered with a net of beads or seeds, shaken and struck in West African and Afro-diasporic music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Shaken"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "be155306-d244-42fe-86e0-131e667a0512",
    "slug": "sitar",
    "name": "Sitar",
    "shortDefinition": "A long-necked plucked string instrument of the Hindustani tradition, with a gourd resonator, movable frets, and sympathetic strings, used widely in classical an…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cb4e8be6-196c-419b-ade0-af43b7e69e4d",
    "slug": "ska",
    "name": "Ska",
    "shortDefinition": "A Jamaican music genre of the late 1950s and early 1960s, characterized by a walking bass line, guitar offbeats, and a driving beat, antecedent to rocksteady an…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Popular music",
      "Rhythm"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8e106510-8137-4427-9704-05634ef8b834",
    "slug": "slendro",
    "name": "Slendro",
    "originalName": "sléndro",
    "shortDefinition": "One of the two principal tuning systems (laras) of Javanese gamelan, a pentatonic scale with roughly equidistant steps.",
    "entityType": "Theory",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Tuning",
      "Scale",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "acbc4a66-6a6e-487a-8823-9a6ae6eb3d75",
    "slug": "soca",
    "name": "Soca",
    "shortDefinition": "A Trinidadian popular dance music that fused calypso with Indian, funk, and soul elements in the 1970s, characterized by an energetic beat and carnival associat…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9b8cfd53-6d95-455e-879f-bbc1c84ed4d8",
    "slug": "son",
    "name": "Son",
    "shortDefinition": "A Cuban music and dance genre combining Spanish guitar and song with African rhythm, a foundation of later salsa; son montuno is a key variant.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Cuba"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "8f2ed50e-d0f3-4a40-9343-b41669b47799",
    "slug": "sonata",
    "name": "Sonata",
    "shortDefinition": "A multi-movement work for one or more instruments, and as a formal principle (sonata form) organizing the first movement of such works through exposition, devel…",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Instrumental"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "6c9d0982-e080-4872-a9eb-ca80608da93b",
    "slug": "soukous",
    "name": "Soukous",
    "shortDefinition": "A Congolese popular dance music genre, known for fast-paced guitar riffs, dynamic rhythm, and prominent bass lines, influential across Africa.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Dance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "e269d377-9dc4-4c8f-b8d4-3e15e59d121c",
    "slug": "steel-pan",
    "name": "Steel pan",
    "shortDefinition": "A pitched percussion instrument of Trinidad and Tobago made from a tuned steel drum, played with mallets and central to carnival and pan ensembles.",
    "entityType": "Instrument",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "22bcf695-d278-4278-9521-c04855c7a68a",
    "slug": "swing",
    "name": "Swing",
    "shortDefinition": "A rhythmic feel, especially in jazz, created by unequal subdivision of the beat and a forward momentum that invites dancing; also a genre designation for 1930s…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Rhythm",
      "Genre",
      "Jazz"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "fbac97a4-669e-490c-ac74-bb259c0b0d0b",
    "slug": "symphony",
    "name": "Symphony",
    "shortDefinition": "An extended orchestral composition, usually in four movements, that became the central genre of Western art music from the Classical period onward.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Orchestral"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "02456c3b-6b2f-46d5-8fd3-4049b4cc3b68",
    "slug": "tabla",
    "name": "Tabla",
    "shortDefinition": "A pair of hand-played drums used in Hindustani music, comprising a small treble drum (dāyāṅ) and a larger bass drum (bāyāṅ), tuned to the tonic of the performan…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "ae5ecaea-d34f-4947-a5a5-154c4820a92a",
    "slug": "taiko",
    "name": "Taiko",
    "shortDefinition": "A family of large Japanese barrel drums, played with sticks in ritual, theater, and contemporary ensemble performance.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b09e1bc6-9509-4ae7-96a7-6f32eb67f5e4",
    "slug": "tala",
    "name": "Tala",
    "originalName": "tāla",
    "shortDefinition": "A rhythmic cycle or metrical framework used in Indian classical music, organizing time through repeating patterns of beats (mātrās) and stresses.",
    "entityType": "Rhythmic concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Rhythm",
      "Performance",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "191317a2-c4a3-4313-a212-43dfbf875606",
    "slug": "talking-drum",
    "name": "Talking drum",
    "shortDefinition": "A West African drum (notably the Yoruba dùndún) whose pitch can be modulated by squeezing the lacing, allowing it to imitate the tones of speech.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum",
      "Communication"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "1fb7686d-5e13-4a66-b22b-2cffe760ee9e",
    "slug": "tango",
    "name": "Tango",
    "shortDefinition": "A music and partnered dance genre that emerged in the Río de la Plata region (Argentina and Uruguay), combining African, European, and local elements with a dis…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "6cc41db2-36e9-4ca7-a54d-5dc7c14a038d",
    "slug": "tanpura",
    "name": "Tanpura",
    "originalName": "tambūrā",
    "shortDefinition": "A long-necked plucked drone instrument in Indian classical music that continuously sounds the tonic and fifth, providing the fixed pitch reference for the perfo…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "de1609e3-5472-4cc5-9e6b-2cf28644c526",
    "slug": "taonga",
    "name": "Taonga",
    "shortDefinition": "In Māori culture, a term meaning 'treasure,' used broadly for culturally valuable objects including taonga pūoro (musical instruments).",
    "entityType": "Concept",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Concept",
      "Culture",
      "Māori"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "bf68371d-c258-44b0-8e9f-76fce62f7e89",
    "slug": "taonga-puoro",
    "name": "Taonga pūoro",
    "originalName": "taonga pūoro",
    "shortDefinition": "The traditional musical instruments of the Māori people of New Zealand, a term meaning 'treasures that sound,' encompassing flutes, trumpets, and resonant idiop…",
    "entityType": "Concept",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Tradition",
      "Indigenous"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4a81b71e-9cf6-480f-9bb9-b30f977aaad4",
    "slug": "taqsim",
    "name": "Taqsim",
    "originalName": "taqsīm",
    "shortDefinition": "A solo instrumental improvisation in Arabic, Turkish, and Persian music that unfolds a maqam or mode in a free, often metric-less manner.",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Form",
      "Improvisation",
      "Modal"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2f5132c7-01eb-445c-ade5-48c60440a6f6",
    "slug": "tar",
    "name": "Tar",
    "originalName": "tār",
    "shortDefinition": "A long-necked plucked lute of Iran and the Caucasus, with six strings in three courses and a double-bowl resonance body.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "4c1b6746-daed-4dcf-a7ad-39d4affaec7f",
    "slug": "tarantella",
    "name": "Tarantella",
    "shortDefinition": "A fast, duple-meter folk dance-music of southern Italy, traditionally associated with tarantism and performed with tambourine accompaniment.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "96dcac64-a5f1-430c-8fff-420c47c0f404",
    "slug": "thumri",
    "name": "Thumri",
    "originalName": "ṭhumrī",
    "shortDefinition": "A light and expressive genre of North Indian vocal music, associated with romantic and devotional subjects and a flexible treatment of rāga and rhythm.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Vocal",
      "Light classical"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "5dfb1ad9-79ac-44b6-a21b-c3b7bcdd3918",
    "slug": "udu",
    "name": "Udu",
    "shortDefinition": "A clay-pot idiophone with a side hole, played with the hands and producing deep resonant tones, traditionally of the Igbo people of Nigeria.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "cca20468-13af-4ae1-851e-bbcc048dfbb7",
    "slug": "usul",
    "name": "Usul",
    "shortDefinition": "In Turkish classical music, a rhythmic cycle or pattern that organizes large and small time units, analogous to the concept of rhythmic mode.",
    "entityType": "Rhythmic concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Rhythm",
      "Theory",
      "Cycle"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "2bed9bb1-2e35-4677-8971-c49b42e5e1ad",
    "slug": "veena",
    "name": "Veena",
    "originalName": "vīṇā",
    "shortDefinition": "A family of plucked string instruments of South Asian music; the Saraswati veena is the principal concert instrument of Carnatic music.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "9001f020-b507-423f-91bd-464c527080bc",
    "slug": "violin",
    "name": "Violin",
    "shortDefinition": "A four-stringed bowed instrument, highest member of the violin family, central to Western classical, folk, and popular music, tuned in fifths.",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "08987a65-e541-484e-ab86-ab7a4380c78a",
    "slug": "washboard",
    "name": "Washboard",
    "shortDefinition": "A corrugated metal board played with thimbles or sticks as a percussion instrument, used in jug bands, blues, and folk music.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Percussion",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true
  },
  {
    "publicId": "b6f4d2fc-46eb-49e5-98bf-be1aa8a43f46",
    "slug": "zydeco",
    "name": "Zydeco",
    "shortDefinition": "A dance music of the Louisiana Creole (Black Creole) community, combining French folk songs with blues, R&B, and accordion/fiddle instrumentation.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Creole"
    ],
    "relationshipCount": 0,
    "demonstration": true
  }
];

export const DEMONSTRATION_DETAILS: Record<string, SonataEntryDetail> = {
  "tabla": {
    "publicId": "02456c3b-6b2f-46d5-8fd3-4049b4cc3b68",
    "slug": "tabla",
    "name": "Tabla",
    "shortDefinition": "A pair of hand-played drums used in Hindustani music, comprising a small treble drum (dāyāṅ) and a larger bass drum (bāyāṅ), tuned to the tonic of the performan…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A pair of hand-played drums used in Hindustani music, comprising a small treble drum (dāyāṅ) and a larger bass drum (bāyāṅ), tuned to the tonic of the performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Tabla"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'tablā'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tabla"
      }
    ],
    "graphNodes": [
      {
        "id": "tabla",
        "label": "Tabla",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bakhshi": {
    "publicId": "035fc689-c831-4887-8efa-c371518aa5b0",
    "slug": "bakhshi",
    "name": "Bakhshi",
    "originalName": "baxši",
    "shortDefinition": "A Central Asian epic singer and instrumentalist (often of the dutar or dombra), who recites traditional narratives and songs.",
    "entityType": "Role",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Role",
      "Epic",
      "Oral tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Central Asian epic singer and instrumentalist (often of the dutar or dombra), who recites traditional narratives and songs.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Uzbek",
    "transliteration": "baxši",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Bakhshi"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Uzbekistan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bakhshi"
      }
    ],
    "graphNodes": [
      {
        "id": "bakhshi",
        "label": "Bakhshi",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "saron": {
    "publicId": "03c23563-f5af-4753-979a-64c29d059fd8",
    "slug": "saron",
    "name": "Saron",
    "shortDefinition": "A metallophone struck with a mallet in the Javanese and Balinese gamelan, one of the core melodic instruments of the ensemble.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Idiophone",
      "Metallophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A metallophone struck with a mallet in the Javanese and Balinese gamelan, one of the core melodic instruments of the ensemble.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Saron"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'saron'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Saron_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "saron",
        "label": "Saron",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "radif": {
    "publicId": "03db8ba1-bdcf-42d0-bcb8-dce7a3e55159",
    "slug": "radif",
    "name": "Radif",
    "shortDefinition": "The canonical repertory of Persian classical music: a memorized sequence of gushehs organized by dastgāh, serving both as a teaching device and performance reso…",
    "entityType": "Repertoire",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Repertoire",
      "Melody",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The canonical repertory of Persian classical music: a memorized sequence of gushehs organized by dastgāh, serving both as a teaching device and performance resource.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Radif"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'radif'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Radif_(music)"
      }
    ],
    "graphNodes": [
      {
        "id": "radif",
        "label": "Radif",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rondo": {
    "publicId": "041b7ca6-8edc-4625-bf9c-b33ab9cead73",
    "slug": "rondo",
    "name": "Rondo",
    "shortDefinition": "A musical form built on the recurrence of a principal theme (refrain) alternating with contrasting episodes, common in Classical sonata and concerto movements.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Instrumental",
      "Structure"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A musical form built on the recurrence of a principal theme (refrain) alternating with contrasting episodes, common in Classical sonata and concerto movements.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Rondo"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rondo'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rondo"
      }
    ],
    "graphNodes": [
      {
        "id": "rondo",
        "label": "Rondo",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "forro": {
    "publicId": "04983ce7-829f-454d-8bdb-bb8a97a3a31f",
    "slug": "forro",
    "name": "Forró",
    "shortDefinition": "A Brazilian dance music of the Northeast, featuring accordion (sanfona), zabumba drum, and triangle, popular at festivals and informal gatherings.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Brazil"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Brazilian dance music of the Northeast, featuring accordion (sanfona), zabumba drum, and triangle, popular at festivals and informal gatherings.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Portuguese",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Forró"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Brazil'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Forr%C3%B3"
      }
    ],
    "graphNodes": [
      {
        "id": "forro",
        "label": "Forró",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gnawa": {
    "publicId": "05558f0d-4c19-436a-9861-dda12d416b13",
    "slug": "gnawa",
    "name": "Gnawa",
    "originalName": "gnāwa",
    "shortDefinition": "A Moroccan Sufi brotherhood music and ritual tradition of sub-Saharan African heritage, featuring the guembri, qraqeb, and call-and-response song.",
    "entityType": "Genre",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Genre",
      "Ritual",
      "Morocco"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Moroccan Sufi brotherhood music and ritual tradition of sub-Saharan African heritage, featuring the guembri, qraqeb, and call-and-response song.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "gnāwa",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Gnawa"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Gnawa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gnawa"
      }
    ],
    "graphNodes": [
      {
        "id": "gnawa",
        "label": "Gnawa",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "conjunto": {
    "publicId": "0728092e-8261-47ba-9d5c-1159cb506a97",
    "slug": "conjunto",
    "name": "Conjunto",
    "shortDefinition": "A Mexican-American (Tejano) ensemble and genre built around button accordion and bajo sexto, associated with norteño music of northern Mexico and Texas.",
    "entityType": "Ensemble",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Ensemble",
      "Tejano",
      "Accordion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Mexican-American (Tejano) ensemble and genre built around button accordion and bajo sexto, associated with norteño music of northern Mexico and Texas.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Conjunto"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'conjunto'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Conjunto"
      }
    ],
    "graphNodes": [
      {
        "id": "conjunto",
        "label": "Conjunto",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "concerto": {
    "publicId": "0797cca8-89bd-421e-8891-6f449969b2a8",
    "slug": "concerto",
    "name": "Concerto",
    "shortDefinition": "A composition typically featuring one or more solo instruments contrasted with an orchestra, in several movements, prominent in the Baroque, Classical, and Roma…",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Orchestral"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A composition typically featuring one or more solo instruments contrasted with an orchestra, in several movements, prominent in the Baroque, Classical, and Romantic eras.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Concerto"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'concerto'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Concerto"
      }
    ],
    "graphNodes": [
      {
        "id": "concerto",
        "label": "Concerto",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "washboard": {
    "publicId": "08987a65-e541-484e-ab86-ab7a4380c78a",
    "slug": "washboard",
    "name": "Washboard",
    "shortDefinition": "A corrugated metal board played with thimbles or sticks as a percussion instrument, used in jug bands, blues, and folk music.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Percussion",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A corrugated metal board played with thimbles or sticks as a percussion instrument, used in jug bands, blues, and folk music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Washboard"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'washboard'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Washboard_(musical_instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "washboard",
        "label": "Washboard",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "hichiriki": {
    "publicId": "09764af7-6576-4b3e-82e5-74d20db4a437",
    "slug": "hichiriki",
    "name": "Hichiriki",
    "shortDefinition": "A short double-reed wind instrument of Japan, central to the court music gagaku, valued for its penetrating nasal tone.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A short double-reed wind instrument of Japan, central to the court music gagaku, valued for its penetrating nasal tone.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Hichiriki"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'hichiriki'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Hichiriki"
      }
    ],
    "graphNodes": [
      {
        "id": "hichiriki",
        "label": "Hichiriki",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "dizi": {
    "publicId": "0aab94a1-11e9-4b21-8136-b44adac48275",
    "slug": "dizi",
    "name": "Dizi",
    "originalName": "dízi",
    "shortDefinition": "A transverse bamboo flute of China, with a distinctive buzzing membrane-covered hole, used in folk and classical instrumental music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Flute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A transverse bamboo flute of China, with a distinctive buzzing membrane-covered hole, used in folk and classical instrumental music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Chinese",
    "transliteration": "dízi",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Dizi"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'dizi'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Dizi_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "dizi",
        "label": "Dizi",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "nuba": {
    "publicId": "0f452876-f803-45ee-ac71-adbc54b7c6a9",
    "slug": "nuba",
    "name": "Nuba",
    "originalName": "nūba",
    "shortDefinition": "A large multi-movement vocal-instrumental suite of North African (Maghrebi) Andalusian music, organized by rhythmic cycles and modes.",
    "entityType": "Form",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Form",
      "Suite",
      "Maghreb"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A large multi-movement vocal-instrumental suite of North African (Maghrebi) Andalusian music, organized by rhythmic cycles and modes.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "nūba",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Nuba"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'nūba'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Nuba_(music)"
      }
    ],
    "graphNodes": [
      {
        "id": "nuba",
        "label": "Nuba",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "agogo": {
    "publicId": "15c76b46-eeea-4922-b40c-8239ce82f307",
    "slug": "agogo",
    "name": "Agogo",
    "shortDefinition": "A West African and Brazilian bell idiophone, a double (usually two-pitched) bell struck with a stick, prominent in samba and Afro-Brazilian music.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Percussion",
      "Bell"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A West African and Brazilian bell idiophone, a double (usually two-pitched) bell struck with a stick, prominent in samba and Afro-Brazilian music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Portuguese",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Agogo"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'agogô'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Agog%C3%B4"
      }
    ],
    "graphNodes": [
      {
        "id": "agogo",
        "label": "Agogo",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "motet": {
    "publicId": "181d4dba-e1d9-44af-9f56-4d5c6789bf3b",
    "slug": "motet",
    "name": "Motet",
    "shortDefinition": "A polyphonic sacred choral work, historically on a given text, central to medieval, Renaissance, and Baroque church music.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A polyphonic sacred choral work, historically on a given text, central to medieval, Renaissance, and Baroque church music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Latin",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Motet"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'motet'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Motet"
      }
    ],
    "graphNodes": [
      {
        "id": "motet",
        "label": "Motet",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "mariachi": {
    "publicId": "18e3676b-f3ad-41b0-8b34-664883e2ad60",
    "slug": "mariachi",
    "name": "Mariachi",
    "shortDefinition": "A Mexican ensemble tradition combining violin, guitarrones, trumpets, and vihuela, performing rancheras, corridos, and other regional songs in festive and forma…",
    "entityType": "Ensemble",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Ensemble",
      "Folk",
      "Mexico"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Mexican ensemble tradition combining violin, guitarrones, trumpets, and vihuela, performing rancheras, corridos, and other regional songs in festive and formal settings.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Mariachi"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'mariachi'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Mariachi"
      }
    ],
    "graphNodes": [
      {
        "id": "mariachi",
        "label": "Mariachi",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "talking-drum": {
    "publicId": "191317a2-c4a3-4313-a212-43dfbf875606",
    "slug": "talking-drum",
    "name": "Talking drum",
    "shortDefinition": "A West African drum (notably the Yoruba dùndún) whose pitch can be modulated by squeezing the lacing, allowing it to imitate the tones of speech.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum",
      "Communication"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A West African drum (notably the Yoruba dùndún) whose pitch can be modulated by squeezing the lacing, allowing it to imitate the tones of speech.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Yoruba",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Talking drum"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'talking drum'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Talking_drum"
      }
    ],
    "graphNodes": [
      {
        "id": "talking-drum",
        "label": "Talking drum",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "tango": {
    "publicId": "1fb7686d-5e13-4a66-b22b-2cffe760ee9e",
    "slug": "tango",
    "name": "Tango",
    "shortDefinition": "A music and partnered dance genre that emerged in the Río de la Plata region (Argentina and Uruguay), combining African, European, and local elements with a dis…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A music and partnered dance genre that emerged in the Río de la Plata region (Argentina and Uruguay), combining African, European, and local elements with a distinctive habanera-based rhythm.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Tango"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'tango'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tango"
      }
    ],
    "graphNodes": [
      {
        "id": "tango",
        "label": "Tango",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ajnas": {
    "publicId": "1fb7d4e9-e87c-4c8f-8790-57a9e20f7d86",
    "slug": "ajnas",
    "name": "Ajnas",
    "originalName": "ajnās",
    "shortDefinition": "In Arabic music theory, the tetrachords and pentachords (jins, pl. ajnās) from which maqām scales are constructed as combinations of small interlocking segments…",
    "entityType": "Theory",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Theory",
      "Mode",
      "Scale"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "In Arabic music theory, the tetrachords and pentachords (jins, pl. ajnās) from which maqām scales are constructed as combinations of small interlocking segments.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "ajnās",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Ajnas"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'maqām; jins'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Maqam"
      }
    ],
    "graphNodes": [
      {
        "id": "ajnas",
        "label": "Ajnas",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pesrev": {
    "publicId": "21fc9101-c576-4185-bf77-c45602fcf8de",
    "slug": "pesrev",
    "name": "Pesrev",
    "originalName": "peşrev",
    "shortDefinition": "An instrumental prelude form in Turkish and Ottoman classical music, usually in a single makam and usul, that opens a performance or suite (fasıl).",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Ottoman"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An instrumental prelude form in Turkish and Ottoman classical music, usually in a single makam and usul, that opens a performance or suite (fasıl).",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Turkish",
    "transliteration": "peşrev",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Pesrev"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'peşrev'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Peshrev"
      }
    ],
    "graphNodes": [
      {
        "id": "pesrev",
        "label": "Pesrev",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "swing": {
    "publicId": "22bcf695-d278-4278-9521-c04855c7a68a",
    "slug": "swing",
    "name": "Swing",
    "shortDefinition": "A rhythmic feel, especially in jazz, created by unequal subdivision of the beat and a forward momentum that invites dancing; also a genre designation for 1930s…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Rhythm",
      "Genre",
      "Jazz"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A rhythmic feel, especially in jazz, created by unequal subdivision of the beat and a forward momentum that invites dancing; also a genre designation for 1930s big band music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Swing"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'swing'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Swing_(jazz_performance_style)"
      }
    ],
    "graphNodes": [
      {
        "id": "swing",
        "label": "Swing",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bagpipe": {
    "publicId": "22f534a3-98ba-40cb-9de0-2b6be8d3ab51",
    "slug": "bagpipe",
    "name": "Bagpipe",
    "shortDefinition": "A wind instrument family using enclosed reeds supplied with air from a bag, found across Europe, especially the Scottish Great Highland bagpipe and related form…",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A wind instrument family using enclosed reeds supplied with air from a bag, found across Europe, especially the Scottish Great Highland bagpipe and related forms.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Bagpipe"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bagpipe'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bagpipes"
      }
    ],
    "graphNodes": [
      {
        "id": "bagpipe",
        "label": "Bagpipe",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "raga": {
    "publicId": "25c8cebe-1bcd-404a-b88b-8e4f503bc389",
    "slug": "raga",
    "name": "Raga",
    "originalName": "rāga",
    "shortDefinition": "A melodic framework in Indian classical music defined by a set of characteristic notes, ascending and descending patterns, and expressive nuances, rather than a…",
    "entityType": "Musical concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "Melodic framework",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A melodic framework in Indian classical music defined by a set of characteristic notes, ascending and descending patterns, and expressive nuances, rather than a fixed scale.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "rāga",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Raga"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "Jairazbhoy, The Rāgs of North Indian Music (1971).",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Raga"
      }
    ],
    "graphNodes": [
      {
        "id": "raga",
        "label": "Raga",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "inuit-throat-singing": {
    "publicId": "26c49379-3199-49da-a434-0e3156ff7d9c",
    "slug": "inuit-throat-singing",
    "name": "Inuit throat singing",
    "shortDefinition": "A vocal tradition of Inuit communities in the Arctic (Canada, Greenland, Alaska), typically a duet of two performers producing rhythmic percussive vocal sounds.",
    "entityType": "Genre",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Genre",
      "Vocal",
      "Arctic"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A vocal tradition of Inuit communities in the Arctic (Canada, Greenland, Alaska), typically a duet of two performers producing rhythmic percussive vocal sounds.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Inuktitut",
    "taxonomyPath": [
      "World",
      "Indigenous traditions globally",
      "Inuit throat singing"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Inuit'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Inuit_throat_singing"
      }
    ],
    "graphNodes": [
      {
        "id": "inuit-throat-singing",
        "label": "Inuit throat singing",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "darbuka": {
    "publicId": "2718adf7-bf1b-4006-a34f-bb59f6ee946f",
    "slug": "darbuka",
    "name": "Darbuka",
    "originalName": "darbūka",
    "shortDefinition": "A single-headed goblet drum of the Middle East and North Africa, played with the fingers and used in classical, folk, and popular ensemble music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A single-headed goblet drum of the Middle East and North Africa, played with the fingers and used in classical, folk, and popular ensemble music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "darbūka",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Darbuka"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'darbūka'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Darbuka"
      }
    ],
    "graphNodes": [
      {
        "id": "darbuka",
        "label": "Darbuka",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "balafon": {
    "publicId": "27212afb-fe3b-42c1-ac47-872c44758f00",
    "slug": "balafon",
    "name": "Balafon",
    "shortDefinition": "A struck xylophone with gourd resonators, of the Mande peoples of West Africa, played by griots and central to ceremonial and praise music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Xylophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A struck xylophone with gourd resonators, of the Mande peoples of West Africa, played by griots and central to ceremonial and praise music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Mandinka",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Balafon"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'balafon'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Balafon"
      }
    ],
    "graphNodes": [
      {
        "id": "balafon",
        "label": "Balafon",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "fugue": {
    "publicId": "2aa0c1f9-bcd1-44e9-8d38-108fe4251681",
    "slug": "fugue",
    "name": "Fugue",
    "shortDefinition": "A contrapuntal composition in which a subject is stated and then developed through successive imitative entries in different voices, characteristic of the Baroq…",
    "entityType": "Musical form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Counterpoint",
      "Baroque"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A contrapuntal composition in which a subject is stated and then developed through successive imitative entries in different voices, characteristic of the Baroque period.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Fugue"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'fugue'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Fugue"
      }
    ],
    "graphNodes": [
      {
        "id": "fugue",
        "label": "Fugue",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "shamisen": {
    "publicId": "2ab6b70f-a432-471d-8152-8dc82fb2c4c0",
    "slug": "shamisen",
    "name": "Shamisen",
    "shortDefinition": "A three-stringed plucked lute of Japan, with a square body covered in skin, central to kabuki, bunraku, and folk music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A three-stringed plucked lute of Japan, with a square body covered in skin, central to kabuki, bunraku, and folk music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Shamisen"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'shamisen'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Shamisen"
      }
    ],
    "graphNodes": [
      {
        "id": "shamisen",
        "label": "Shamisen",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "veena": {
    "publicId": "2bed9bb1-2e35-4677-8971-c49b42e5e1ad",
    "slug": "veena",
    "name": "Veena",
    "originalName": "vīṇā",
    "shortDefinition": "A family of plucked string instruments of South Asian music; the Saraswati veena is the principal concert instrument of Carnatic music.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A family of plucked string instruments of South Asian music; the Saraswati veena is the principal concert instrument of Carnatic music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "vīṇā",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Veena"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'vīṇā'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Veena"
      }
    ],
    "graphNodes": [
      {
        "id": "veena",
        "label": "Veena",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pinpeat": {
    "publicId": "2c172835-bd53-4987-9522-c63de01ea978",
    "slug": "pinpeat",
    "name": "Pinpeat",
    "shortDefinition": "The principal ceremonial orchestra of Cambodia, a percussion-and-wind ensemble associated with court, ritual, and shadow-puppet performance.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Ceremonial",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The principal ceremonial orchestra of Cambodia, a percussion-and-wind ensemble associated with court, ritual, and shadow-puppet performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Khmer",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Pinpeat"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Cambodia'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pinpeat"
      }
    ],
    "graphNodes": [
      {
        "id": "pinpeat",
        "label": "Pinpeat",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kora": {
    "publicId": "2ee0b3cf-031b-4d28-a909-d71b71a19aa3",
    "slug": "kora",
    "name": "Kora",
    "shortDefinition": "A 21-stringed bridge-harp of the Mande peoples of West Africa, combining harp and lute characteristics, played by griots (jeli) as accompaniment to song and pra…",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Strings",
      "Harp-lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A 21-stringed bridge-harp of the Mande peoples of West Africa, combining harp and lute characteristics, played by griots (jeli) as accompaniment to song and praise.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Mandinka",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Kora"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'kora'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kora_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "kora",
        "label": "Kora",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "shakuhachi": {
    "publicId": "2f4c9db9-72e5-44de-8ddc-eb836324a87a",
    "slug": "shakuhachi",
    "name": "Shakuhachi",
    "shortDefinition": "An end-blown bamboo flute of Japan, associated with Zen meditation (honkyoku) and ensemble and contemporary music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Flute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An end-blown bamboo flute of Japan, associated with Zen meditation (honkyoku) and ensemble and contemporary music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Shakuhachi"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'shakuhachi'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Shakuhachi"
      }
    ],
    "graphNodes": [
      {
        "id": "shakuhachi",
        "label": "Shakuhachi",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "tar": {
    "publicId": "2f5132c7-01eb-445c-ade5-48c60440a6f6",
    "slug": "tar",
    "name": "Tar",
    "originalName": "tār",
    "shortDefinition": "A long-necked plucked lute of Iran and the Caucasus, with six strings in three courses and a double-bowl resonance body.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked plucked lute of Iran and the Caucasus, with six strings in three courses and a double-bowl resonance body.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "transliteration": "tār",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Tar"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'tār'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tar_(string_instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "tar",
        "label": "Tar",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ragtime": {
    "publicId": "2ffa051f-9b10-48f0-bb7a-c3773604447d",
    "slug": "ragtime",
    "name": "Ragtime",
    "shortDefinition": "A late-19th-century African American piano genre characterized by syncopated melody over a steady, march-like bass, influential on early jazz.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Piano",
      "Syncopation"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A late-19th-century African American piano genre characterized by syncopated melody over a steady, march-like bass, influential on early jazz.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Ragtime"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ragtime'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ragtime"
      }
    ],
    "graphNodes": [
      {
        "id": "ragtime",
        "label": "Ragtime",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kathakali": {
    "publicId": "31f48db7-8aef-4ed8-8b2f-b1b63ce227ef",
    "slug": "kathakali",
    "name": "Kathakali",
    "shortDefinition": "A classical dance-drama of Kerala, South India, in which elaborately costumed performers mime a narrative to vocal and percussion accompaniment.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Dance-drama",
      "Ritual theater"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A classical dance-drama of Kerala, South India, in which elaborately costumed performers mime a narrative to vocal and percussion accompaniment.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Malayalam",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Kathakali"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Kathakali'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kathakali"
      }
    ],
    "graphNodes": [
      {
        "id": "kathakali",
        "label": "Kathakali",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ipap": {
    "publicId": "34151b05-91c6-404b-9407-6d88b4275534",
    "slug": "ipap",
    "name": "Ipap",
    "shortDefinition": "A Melanesian (Papua New Guinea) slit gong or garamut, a hollowed log idiophone struck to signal, accompany dance, and mark ritual events.",
    "entityType": "Instrument",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Idiophone",
      "Slit drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Melanesian (Papua New Guinea) slit gong or garamut, a hollowed log idiophone struck to signal, accompany dance, and mark ritual events.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Tok Pisin",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Ipap"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Papua New Guinea'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Garamut"
      }
    ],
    "graphNodes": [
      {
        "id": "ipap",
        "label": "Ipap",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "qraqeb": {
    "publicId": "34849261-90c8-4b0a-8b27-c94d32e50ac3",
    "slug": "qraqeb",
    "name": "Qraqeb",
    "originalName": "qarāqib",
    "shortDefinition": "Large metal castanets or clappers played in pairs in the Gnawa ritual of Morocco, providing a percussive, rhythmic framework.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "Large metal castanets or clappers played in pairs in the Gnawa ritual of Morocco, providing a percussive, rhythmic framework.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "qarāqib",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Qraqeb"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Gnawa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Qraqeb"
      }
    ],
    "graphNodes": [
      {
        "id": "qraqeb",
        "label": "Qraqeb",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "improvisation": {
    "publicId": "35549570-c795-4250-9f74-c6e9d41df0e0",
    "slug": "improvisation",
    "name": "Improvisation",
    "shortDefinition": "The spontaneous creation of music in performance, which may range from ornamentation of composed material to wholly spontaneous invention, central to jazz and m…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Performance",
      "Theory",
      "Creation"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The spontaneous creation of music in performance, which may range from ornamentation of composed material to wholly spontaneous invention, central to jazz and many traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Improvisation"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'improvisation'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Musical_improvisation"
      }
    ],
    "graphNodes": [
      {
        "id": "improvisation",
        "label": "Improvisation",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "koto": {
    "publicId": "362d38e0-020d-4503-af27-7d136e1ec5b5",
    "slug": "koto",
    "name": "Koto",
    "shortDefinition": "A long Japanese zither with thirteen silk or nylon strings and movable bridges, played with finger picks, associated with court, chamber, and solo repertoire.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long Japanese zither with thirteen silk or nylon strings and movable bridges, played with finger picks, associated with court, chamber, and solo repertoire.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Koto"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'koto'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Koto_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "koto",
        "label": "Koto",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gayageum": {
    "publicId": "39808b9d-67c0-48ec-ae55-6af24805bc14",
    "slug": "gayageum",
    "name": "Gayageum",
    "originalName": "gayageum",
    "shortDefinition": "A twelve-stringed Korean plucked zither, historically divided into court (jeong-ak) and popular/sanjo (sanjomyeon) styles.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A twelve-stringed Korean plucked zither, historically divided into court (jeong-ak) and popular/sanjo (sanjomyeon) styles.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Korean",
    "transliteration": "gayageum",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Gayageum"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'kayagŭm'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gayageum"
      }
    ],
    "graphNodes": [
      {
        "id": "gayageum",
        "label": "Gayageum",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pelog": {
    "publicId": "3a87aa58-9ba4-4859-a4aa-2b737686d892",
    "slug": "pelog",
    "name": "Pelog",
    "originalName": "pélog",
    "shortDefinition": "One of the two principal tuning systems of Javanese gamelan, a seven-tone scale from which subsets of five tones are used in practice.",
    "entityType": "Theory",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Tuning",
      "Scale",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "One of the two principal tuning systems of Javanese gamelan, a seven-tone scale from which subsets of five tones are used in practice.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "transliteration": "pélog",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Pelog"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'pélog'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pelog"
      }
    ],
    "graphNodes": [
      {
        "id": "pelog",
        "label": "Pelog",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "mahori": {
    "publicId": "3e060254-a925-4e2b-abb2-f0d03e8cdbbc",
    "slug": "mahori",
    "name": "Mahori",
    "shortDefinition": "A Thai ensemble combining string, wind, and percussion instruments, known for warm textures and moderate tempo.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Mixed",
      "Court"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Thai ensemble combining string, wind, and percussion instruments, known for warm textures and moderate tempo.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Thai",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Mahori"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Thailand'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Mahori"
      }
    ],
    "graphNodes": [
      {
        "id": "mahori",
        "label": "Mahori",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "counterpoint": {
    "publicId": "3e9b3f95-6112-4a80-9d2b-8d6a77b1dd71",
    "slug": "counterpoint",
    "name": "Counterpoint",
    "shortDefinition": "The combination of two or more independent melodic lines sounding together, governed by rules of consonance and dissonance, foundational to Western polyphony.",
    "entityType": "Theory",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Theory",
      "Composition",
      "Polyphony"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The combination of two or more independent melodic lines sounding together, governed by rules of consonance and dissonance, foundational to Western polyphony.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Counterpoint"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'counterpoint'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Counterpoint"
      }
    ],
    "graphNodes": [
      {
        "id": "counterpoint",
        "label": "Counterpoint",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rokudan": {
    "publicId": "40e3d186-7112-41ef-a1df-89f8786723d4",
    "slug": "rokudan",
    "name": "Rokudan",
    "shortDefinition": "A well-known koto solo composition of the Edo period, consisting of six dan (sections) of rising length and momentum.",
    "entityType": "Form",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Repertoire"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A well-known koto solo composition of the Edo period, consisting of six dan (sections) of rising length and momentum.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Rokudan"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rokudan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rokudan_no_Shirabe"
      }
    ],
    "graphNodes": [
      {
        "id": "rokudan",
        "label": "Rokudan",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "janggu": {
    "publicId": "41cece5a-0104-4c6c-b98e-fac355e57a5c",
    "slug": "janggu",
    "name": "Janggu",
    "originalName": "changgo",
    "shortDefinition": "A Korean hourglass-shaped double-headed drum, played with a stick and a hand, central to folk (pungmul, samulnori) and classical music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Korean hourglass-shaped double-headed drum, played with a stick and a hand, central to folk (pungmul, samulnori) and classical music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Korean",
    "transliteration": "changgo",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Janggu"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'changgo'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Janggu"
      }
    ],
    "graphNodes": [
      {
        "id": "janggu",
        "label": "Janggu",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "calypso": {
    "publicId": "44a24eca-9bcc-41f9-86fc-6114672460ae",
    "slug": "calypso",
    "name": "Calypso",
    "shortDefinition": "A Trinidadian vocal and instrumental music genre with roots in African and French-Caribbean traditions, known for witty, topical lyrics and steel-band and carni…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Vocal",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Trinidadian vocal and instrumental music genre with roots in African and French-Caribbean traditions, known for witty, topical lyrics and steel-band and carnival associations.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Calypso"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'calypso'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Calypso_music"
      }
    ],
    "graphNodes": [
      {
        "id": "calypso",
        "label": "Calypso",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "maqam": {
    "publicId": "45c9ef4d-86dc-495d-9f8a-de6112b5906b",
    "slug": "maqam",
    "name": "Maqam",
    "originalName": "maqām",
    "shortDefinition": "A system of melodic modes used in Middle Eastern and North African music, each defined by scale, characteristic phrases, tonal centers, and expressive conventio…",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A system of melodic modes used in Middle Eastern and North African music, each defined by scale, characteristic phrases, tonal centers, and expressive conventions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "maqām",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Maqam"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'maqām'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Maqam"
      }
    ],
    "graphNodes": [
      {
        "id": "maqam",
        "label": "Maqam",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "blue-note": {
    "publicId": "47afc620-15c2-44a5-8739-44f248450822",
    "slug": "blue-note",
    "name": "Blue note",
    "shortDefinition": "In blues and jazz, the lowered (flatted) third, fifth, or seventh scale degree sung or played for expressive effect, contributing the music's characteristic col…",
    "entityType": "Theory",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Theory",
      "Pitch",
      "Harmony"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "In blues and jazz, the lowered (flatted) third, fifth, or seventh scale degree sung or played for expressive effect, contributing the music's characteristic color.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Blue note"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'blue note'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Blue_note"
      }
    ],
    "graphNodes": [
      {
        "id": "blue-note",
        "label": "Blue note",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "taqsim": {
    "publicId": "4a81b71e-9cf6-480f-9bb9-b30f977aaad4",
    "slug": "taqsim",
    "name": "Taqsim",
    "originalName": "taqsīm",
    "shortDefinition": "A solo instrumental improvisation in Arabic, Turkish, and Persian music that unfolds a maqam or mode in a free, often metric-less manner.",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Form",
      "Improvisation",
      "Modal"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A solo instrumental improvisation in Arabic, Turkish, and Persian music that unfolds a maqam or mode in a free, often metric-less manner.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "taqsīm",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Taqsim"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'taqsīm'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Taqsim"
      }
    ],
    "graphNodes": [
      {
        "id": "taqsim",
        "label": "Taqsim",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "tarantella": {
    "publicId": "4c1b6746-daed-4dcf-a7ad-39d4affaec7f",
    "slug": "tarantella",
    "name": "Tarantella",
    "shortDefinition": "A fast, duple-meter folk dance-music of southern Italy, traditionally associated with tarantism and performed with tambourine accompaniment.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A fast, duple-meter folk dance-music of southern Italy, traditionally associated with tarantism and performed with tambourine accompaniment.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Tarantella"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'tarantella'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tarantella"
      }
    ],
    "graphNodes": [
      {
        "id": "tarantella",
        "label": "Tarantella",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gong-ageng": {
    "publicId": "4c5f01a0-a79a-44cf-a6f6-91fd4bc44527",
    "slug": "gong-ageng",
    "name": "Gong ageng",
    "shortDefinition": "The largest and deepest gong in the Javanese gamelan, struck to punctuate the largest musical phrases and mark structural periods.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Gong",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The largest and deepest gong in the Javanese gamelan, struck to punctuate the largest musical phrases and mark structural periods.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Gong ageng"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'gong'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gong_ageng"
      }
    ],
    "graphNodes": [
      {
        "id": "gong-ageng",
        "label": "Gong ageng",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gusheh": {
    "publicId": "4e6d4609-ecde-4707-a107-5bb6d3cd5beb",
    "slug": "gusheh",
    "name": "Gusheh",
    "originalName": "gusheh",
    "shortDefinition": "A distinct melodic unit or phrase within the Persian radif, grouped according to their dastgāh, that forms the basis of improvisation.",
    "entityType": "Form",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Melody",
      "Form",
      "Modal"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A distinct melodic unit or phrase within the Persian radif, grouped according to their dastgāh, that forms the basis of improvisation.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "transliteration": "gusheh",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Gusheh"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'gusheh'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gusheh"
      }
    ],
    "graphNodes": [
      {
        "id": "gusheh",
        "label": "Gusheh",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kriti": {
    "publicId": "4f4d29b0-da41-4587-a718-6a014b767699",
    "slug": "kriti",
    "name": "Kriti",
    "originalName": "kṛti",
    "shortDefinition": "The principal fixed composition form of Carnatic music, setting devotional or narrative text to a rāga and tāla, usually in three sections.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Composition",
      "Carnatic"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The principal fixed composition form of Carnatic music, setting devotional or narrative text to a rāga and tāla, usually in three sections.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Telugu",
    "transliteration": "kṛti",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Kriti"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'kṛti'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kriti_(music)"
      }
    ],
    "graphNodes": [
      {
        "id": "kriti",
        "label": "Kriti",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "khaen": {
    "publicId": "4f72fc7e-a8b7-48f3-a6b8-262ca73e1032",
    "slug": "khaen",
    "name": "Khaen",
    "originalName": "khāēn",
    "shortDefinition": "A free-reed mouth organ of Laos and northeastern Thailand, made of bamboo pipes arranged in a frame, associated with lam and mor lam vocal traditions.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Free reed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A free-reed mouth organ of Laos and northeastern Thailand, made of bamboo pipes arranged in a frame, associated with lam and mor lam vocal traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Lao",
    "transliteration": "khāēn",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Khaen"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'khaen'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Khaen"
      }
    ],
    "graphNodes": [
      {
        "id": "khaen",
        "label": "Khaen",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "shekere": {
    "publicId": "52a08bdc-81a9-4a20-8852-ada1c1c95515",
    "slug": "shekere",
    "name": "Shekere",
    "shortDefinition": "A gourd rattle covered with a net of beads or seeds, shaken and struck in West African and Afro-diasporic music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Shaken"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A gourd rattle covered with a net of beads or seeds, shaken and struck in West African and Afro-diasporic music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Yoruba",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Shekere"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'shekere'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Shekere"
      }
    ],
    "graphNodes": [
      {
        "id": "shekere",
        "label": "Shekere",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bossa-nova": {
    "publicId": "532db711-35b4-4442-aa12-1604abc74058",
    "slug": "bossa-nova",
    "name": "Bossa nova",
    "shortDefinition": "A Brazilian genre combining samba rhythm with jazz harmony and cool vocal style, emerging in Rio de Janeiro in the late 1950s.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Popular music",
      "Brazil"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Brazilian genre combining samba rhythm with jazz harmony and cool vocal style, emerging in Rio de Janeiro in the late 1950s.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Portuguese",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Bossa nova"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bossa nova'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bossa_nova"
      }
    ],
    "graphNodes": [
      {
        "id": "bossa-nova",
        "label": "Bossa nova",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bhajan": {
    "publicId": "595ec337-d495-4a81-9921-b1df8ad25b32",
    "slug": "bhajan",
    "name": "Bhajan",
    "shortDefinition": "A devotional Hindu song of South Asia, combining hymn text with melodic and rhythmic frameworks in both solo and congregational performance.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Devotional",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A devotional Hindu song of South Asia, combining hymn text with melodic and rhythmic frameworks in both solo and congregational performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Bhajan"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bhajan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bhajan"
      }
    ],
    "graphNodes": [
      {
        "id": "bhajan",
        "label": "Bhajan",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "prelude": {
    "publicId": "5dbb6959-abb2-4c6a-b72e-044f83709715",
    "slug": "prelude",
    "name": "Prelude",
    "shortDefinition": "A short instrumental piece that precedes and introduces a larger work or serves as an independent character piece, common from the Baroque period onward.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Instrumental",
      "Introduction"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A short instrumental piece that precedes and introduces a larger work or serves as an independent character piece, common from the Baroque period onward.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "French",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Prelude"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'prelude'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Prelude_(music)"
      }
    ],
    "graphNodes": [
      {
        "id": "prelude",
        "label": "Prelude",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "udu": {
    "publicId": "5dfb1ad9-79ac-44b6-a21b-c3b7bcdd3918",
    "slug": "udu",
    "name": "Udu",
    "shortDefinition": "A clay-pot idiophone with a side hole, played with the hands and producing deep resonant tones, traditionally of the Igbo people of Nigeria.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A clay-pot idiophone with a side hole, played with the hands and producing deep resonant tones, traditionally of the Igbo people of Nigeria.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Igbo",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Udu"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'udū'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Udu"
      }
    ],
    "graphNodes": [
      {
        "id": "udu",
        "label": "Udu",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "andalusian-music": {
    "publicId": "69ffb655-fda0-4173-803a-e693e85f8b25",
    "slug": "andalusian-music",
    "name": "Andalusian music",
    "shortDefinition": "A classical music tradition of North Africa, especially Morocco, Algeria, and Tunisia, preserving vocal-instrumental nubas descended from medieval Iberian (Al-A…",
    "entityType": "Genre",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Genre",
      "Classical",
      "Maghreb"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A classical music tradition of North Africa, especially Morocco, Algeria, and Tunisia, preserving vocal-instrumental nubas descended from medieval Iberian (Al-Andalus) practice.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Andalusian music"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'nuba'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Andalusian_classical_music"
      }
    ],
    "graphNodes": [
      {
        "id": "andalusian-music",
        "label": "Andalusian music",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "saung": {
    "publicId": "6ba0f213-9527-4652-b428-97586b4db104",
    "slug": "saung",
    "name": "Saung",
    "shortDefinition": "A Burmese arched harp with a curved neck and silk strings, the national instrument of Myanmar, associated with classical court music.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Harp"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Burmese arched harp with a curved neck and silk strings, the national instrument of Myanmar, associated with classical court music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Burmese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Saung"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Myanmar'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Saung"
      }
    ],
    "graphNodes": [
      {
        "id": "saung",
        "label": "Saung",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "soukous": {
    "publicId": "6c9d0982-e080-4872-a9eb-ca80608da93b",
    "slug": "soukous",
    "name": "Soukous",
    "shortDefinition": "A Congolese popular dance music genre, known for fast-paced guitar riffs, dynamic rhythm, and prominent bass lines, influential across Africa.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Dance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Congolese popular dance music genre, known for fast-paced guitar riffs, dynamic rhythm, and prominent bass lines, influential across Africa.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Lingala",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Soukous"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Congo, Democratic Republic of the'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Soukous"
      }
    ],
    "graphNodes": [
      {
        "id": "soukous",
        "label": "Soukous",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "tanpura": {
    "publicId": "6cc41db2-36e9-4ca7-a54d-5dc7c14a038d",
    "slug": "tanpura",
    "name": "Tanpura",
    "originalName": "tambūrā",
    "shortDefinition": "A long-necked plucked drone instrument in Indian classical music that continuously sounds the tonic and fifth, providing the fixed pitch reference for the perfo…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked plucked drone instrument in Indian classical music that continuously sounds the tonic and fifth, providing the fixed pitch reference for the performers.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "transliteration": "tambūrā",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Tanpura"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'tambūrā'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tanpura"
      }
    ],
    "graphNodes": [
      {
        "id": "tanpura",
        "label": "Tanpura",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kulintang": {
    "publicId": "6d6df41c-4b2d-480b-ac17-48167ad1cd40",
    "slug": "kulintang",
    "name": "Kulintang",
    "shortDefinition": "A gong-chime ensemble tradition of the southern Philippines, Indonesia (Kalimantan), and Borneo, centered on a row of small bossed gongs.",
    "entityType": "Ensemble",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Ensemble",
      "Gong",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A gong-chime ensemble tradition of the southern Philippines, Indonesia (Kalimantan), and Borneo, centered on a row of small bossed gongs.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Maranao",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Kulintang"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'kulintang'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kulintang"
      }
    ],
    "graphNodes": [
      {
        "id": "kulintang",
        "label": "Kulintang",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ghatam": {
    "publicId": "6dda394c-0de9-4d16-a10e-c2b2e5274422",
    "slug": "ghatam",
    "name": "Ghatam",
    "shortDefinition": "A clay pot idiophone played with the hands in Carnatic music, its pitch varied by the player's open and closed mouth resonance.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A clay pot idiophone played with the hands in Carnatic music, its pitch varied by the player's open and closed mouth resonance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Tamil",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Ghatam"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ghaṭam'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ghatam"
      }
    ],
    "graphNodes": [
      {
        "id": "ghatam",
        "label": "Ghatam",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bendir": {
    "publicId": "7829cec5-0a12-4a5f-a66c-dbd14e8be5cc",
    "slug": "bendir",
    "name": "Bendir",
    "shortDefinition": "A frame drum of North Africa, especially Morocco, with a single skin and often a snare, used in Berber, Sufi, and folk music.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A frame drum of North Africa, especially Morocco, with a single skin and often a snare, used in Berber, Sufi, and folk music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Berber",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Bendir"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bendir'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bendir"
      }
    ],
    "graphNodes": [
      {
        "id": "bendir",
        "label": "Bendir",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sanjo": {
    "publicId": "79141cc0-79a8-4a7e-8eb5-a72c4cecd123",
    "slug": "sanjo",
    "name": "Sanjo",
    "shortDefinition": "A Korean genre of instrumental solo music that unfolds a sequence of contrasting movements within a single piece, often for gayageum or other instruments.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Instrumental",
      "Solo"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Korean genre of instrumental solo music that unfolds a sequence of contrasting movements within a single piece, often for gayageum or other instruments.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Korean",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Sanjo"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sanjo'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sanjo"
      }
    ],
    "graphNodes": [
      {
        "id": "sanjo",
        "label": "Sanjo",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "guembri": {
    "publicId": "7a8353fc-1af5-449d-9b06-9cd5f029f6f3",
    "slug": "guembri",
    "name": "Guembri",
    "originalName": "gembri",
    "shortDefinition": "A three-stringed bass lute of the Gnawa tradition of Morocco, a hollow wooden resonator with a skin face, played to set the ritual's rhythmic foundation.",
    "entityType": "Instrument",
    "region": "North Africa",
    "tradition": "North African traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A three-stringed bass lute of the Gnawa tradition of Morocco, a hollow wooden resonator with a skin face, played to set the ritual's rhythmic foundation.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Berber",
    "transliteration": "gembri",
    "taxonomyPath": [
      "World",
      "Africa",
      "North Africa",
      "Guembri"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Gnawa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Guembri"
      }
    ],
    "graphNodes": [
      {
        "id": "guembri",
        "label": "Guembri",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pungmul": {
    "publicId": "7a841ac0-0912-42b0-87b5-6dea1a005f54",
    "slug": "pungmul",
    "name": "Pungmul",
    "originalName": "p'ungmul",
    "shortDefinition": "A Korean folk tradition combining percussion, wind, dance, and spectacle, centered on rhythmic patterns played with janggu and buk drums.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Folk",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Korean folk tradition combining percussion, wind, dance, and spectacle, centered on rhythmic patterns played with janggu and buk drums.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Korean",
    "transliteration": "p'ungmul",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Pungmul"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'p'ungmul'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pungmul"
      }
    ],
    "graphNodes": [
      {
        "id": "pungmul",
        "label": "Pungmul",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "mbalax": {
    "publicId": "7d27f93c-dc2d-4add-ae90-4fbe3e390b9e",
    "slug": "mbalax",
    "name": "Mbalax",
    "shortDefinition": "A Senegalese popular music genre fusing traditional sabar drumming with American funk, jazz, and rock influences, pioneered in the 1970s.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Senegalese popular music genre fusing traditional sabar drumming with American funk, jazz, and rock influences, pioneered in the 1970s.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Wolof",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Mbalax"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Senegal'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Mbalax"
      }
    ],
    "graphNodes": [
      {
        "id": "mbalax",
        "label": "Mbalax",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "shashmaqom": {
    "publicId": "7dededef-29c5-4ad7-9beb-6ff35cac1659",
    "slug": "shashmaqom",
    "name": "Shashmaqom",
    "originalName": "šashmaqom",
    "shortDefinition": "A canonical cycle of six maqom suites of the classical music of Uzbekistan and Tajikistan, combining vocal (nasr) and instrumental (mushkilot) sections.",
    "entityType": "Repertoire",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Repertoire",
      "Maqom",
      "Classical"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A canonical cycle of six maqom suites of the classical music of Uzbekistan and Tajikistan, combining vocal (nasr) and instrumental (mushkilot) sections.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Uzbek",
    "transliteration": "šashmaqom",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Shashmaqom"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Uzbekistan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Shashmaqam"
      }
    ],
    "graphNodes": [
      {
        "id": "shashmaqom",
        "label": "Shashmaqom",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rubab": {
    "publicId": "80ed3642-1a35-4699-af72-911bac059153",
    "slug": "rubab",
    "name": "Rubab",
    "originalName": "rubāb",
    "shortDefinition": "A short-necked plucked lute of Central and South Asia, with a wooden body and sympathetic strings, important in Afghan and North Indian music.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A short-necked plucked lute of Central and South Asia, with a wooden body and sympathetic strings, important in Afghan and North Indian music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Dari",
    "transliteration": "rubāb",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Rubab"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rubāb'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rubab_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "rubab",
        "label": "Rubab",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sargam": {
    "publicId": "8181c8a0-adb5-4d46-839e-faf0ee60f786",
    "slug": "sargam",
    "name": "Sargam",
    "shortDefinition": "The Indian solfège syllables (sa, re, ga, ma, pa, dha, ni) used to name the notes of a rāga, parallel in function to Western solfège.",
    "entityType": "Theory",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Notation",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The Indian solfège syllables (sa, re, ga, ma, pa, dha, ni) used to name the notes of a rāga, parallel in function to Western solfège.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Sargam"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sargam'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sargam"
      }
    ],
    "graphNodes": [
      {
        "id": "sargam",
        "label": "Sargam",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "dombra": {
    "publicId": "82cf97af-bef2-4257-921b-a4329017b133",
    "slug": "dombra",
    "name": "Dombra",
    "originalName": "dombra",
    "shortDefinition": "A long-necked two-stringed plucked lute of Kazakhstan, central to Kazakh folk, epic, and instrumental (kuy) music.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked two-stringed plucked lute of Kazakhstan, central to Kazakh folk, epic, and instrumental (kuy) music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Kazakh",
    "transliteration": "dombra",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Dombra"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Kazakhstan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Dombra"
      }
    ],
    "graphNodes": [
      {
        "id": "dombra",
        "label": "Dombra",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "mbira": {
    "publicId": "83e7364d-8b0e-46ce-81fd-cddd7243c3fa",
    "slug": "mbira",
    "name": "Mbira",
    "originalName": "mbira",
    "shortDefinition": "A lamellophone of the Shona people of Zimbabwe, consisting of metal tines plucked over a wooden board and resonator, central to ceremonial music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Lamellophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A lamellophone of the Shona people of Zimbabwe, consisting of metal tines plucked over a wooden board and resonator, central to ceremonial music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Shona",
    "transliteration": "mbira",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Mbira"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'mbira'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Mbira"
      }
    ],
    "graphNodes": [
      {
        "id": "mbira",
        "label": "Mbira",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "salsa": {
    "publicId": "853bd065-be51-422d-98ea-2cf6cdedae63",
    "slug": "salsa",
    "name": "Salsa",
    "shortDefinition": "A popular dance music style of the Caribbean and Latin America, consolidating Cuban son and other forms with New York arrangements, characterized by a driving m…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A popular dance music style of the Caribbean and Latin America, consolidating Cuban son and other forms with New York arrangements, characterized by a driving montuno rhythm and clave.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Salsa"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'salsa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Salsa_music"
      }
    ],
    "graphNodes": [
      {
        "id": "salsa",
        "label": "Salsa",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "marimba": {
    "publicId": "8aa71843-fcb0-4b97-86dd-f32921795ae2",
    "slug": "marimba",
    "name": "Marimba",
    "shortDefinition": "A struck idiophone with wooden bars and resonators, indigenous to Mesoamerica and west Africa and prominent in Guatemala and Mexico, played with mallets.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A struck idiophone with wooden bars and resonators, indigenous to Mesoamerica and west Africa and prominent in Guatemala and Mexico, played with mallets.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Marimba"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'marimba'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Marimba"
      }
    ],
    "graphNodes": [
      {
        "id": "marimba",
        "label": "Marimba",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "setar": {
    "publicId": "8c2f6d21-6720-4fb1-aaa2-cfd5aff23c83",
    "slug": "setar",
    "name": "Setar",
    "originalName": "setār",
    "shortDefinition": "A long-necked plucked lute of Persian classical music, historically with three playing strings plus sympathetic strings, central to Sufi and art traditions.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked plucked lute of Persian classical music, historically with three playing strings plus sympathetic strings, central to Sufi and art traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "transliteration": "setār",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Setar"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'setār'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Setar"
      }
    ],
    "graphNodes": [
      {
        "id": "setar",
        "label": "Setar",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "mridangam": {
    "publicId": "8c5c7aac-0159-4be9-9fec-fd61f75cb7c6",
    "slug": "mridangam",
    "name": "Mridangam",
    "originalName": "mṛdaṅgam",
    "shortDefinition": "A double-headed barrel drum of South Indian (Carnatic) classical music, played with the hands and central to rhythmic (tāla) accompaniment.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A double-headed barrel drum of South Indian (Carnatic) classical music, played with the hands and central to rhythmic (tāla) accompaniment.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Tamil",
    "transliteration": "mṛdaṅgam",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Mridangam"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'mṛdaṅga'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Mridangam"
      }
    ],
    "graphNodes": [
      {
        "id": "mridangam",
        "label": "Mridangam",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "banjo": {
    "publicId": "8d42ac1e-3afd-4dda-9689-e6a7baa0615a",
    "slug": "banjo",
    "name": "Banjo",
    "shortDefinition": "A plucked string instrument of West African origin, with a skin head stretched over a circular rim and a long neck, central to American folk and bluegrass tradi…",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A plucked string instrument of West African origin, with a skin head stretched over a circular rim and a long neck, central to American folk and bluegrass traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Banjo"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'banjo'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Banjo"
      }
    ],
    "graphNodes": [
      {
        "id": "banjo",
        "label": "Banjo",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "slendro": {
    "publicId": "8e106510-8137-4427-9704-05634ef8b834",
    "slug": "slendro",
    "name": "Slendro",
    "originalName": "sléndro",
    "shortDefinition": "One of the two principal tuning systems (laras) of Javanese gamelan, a pentatonic scale with roughly equidistant steps.",
    "entityType": "Theory",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Tuning",
      "Scale",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "One of the two principal tuning systems (laras) of Javanese gamelan, a pentatonic scale with roughly equidistant steps.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "transliteration": "sléndro",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Slendro"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sléndro'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Slendro"
      }
    ],
    "graphNodes": [
      {
        "id": "slendro",
        "label": "Slendro",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "amadinda": {
    "publicId": "8e82f788-e68b-4717-b768-b1c925099daa",
    "slug": "amadinda",
    "name": "Amadinda",
    "shortDefinition": "A log xylophone of the Baganda people of Uganda, played by several performers and central to royal and ceremonial music.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Idiophone",
      "Xylophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A log xylophone of the Baganda people of Uganda, played by several performers and central to royal and ceremonial music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Luganda",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Amadinda"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Uganda'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Amadinda"
      }
    ],
    "graphNodes": [
      {
        "id": "amadinda",
        "label": "Amadinda",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gamelan": {
    "publicId": "8f1ee456-b168-49fa-b611-268a2ae45cce",
    "slug": "gamelan",
    "name": "Gamelan",
    "shortDefinition": "An Indonesian (especially Balinese and Javanese) instrumental ensemble of metallophones, gongs, drums, and other instruments, tuned to distinct scales and playe…",
    "entityType": "Genre",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Genre",
      "Ensemble",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An Indonesian (especially Balinese and Javanese) instrumental ensemble of metallophones, gongs, drums, and other instruments, tuned to distinct scales and played together as a unified ensemble.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Gamelan"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'gamelan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gamelan"
      }
    ],
    "graphNodes": [
      {
        "id": "gamelan",
        "label": "Gamelan",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sonata": {
    "publicId": "8f2ed50e-d0f3-4a40-9343-b41669b47799",
    "slug": "sonata",
    "name": "Sonata",
    "shortDefinition": "A multi-movement work for one or more instruments, and as a formal principle (sonata form) organizing the first movement of such works through exposition, devel…",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Instrumental"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A multi-movement work for one or more instruments, and as a formal principle (sonata form) organizing the first movement of such works through exposition, development, and recapitulation.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Sonata"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sonata'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sonata"
      }
    ],
    "graphNodes": [
      {
        "id": "sonata",
        "label": "Sonata",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "violin": {
    "publicId": "9001f020-b507-423f-91bd-464c527080bc",
    "slug": "violin",
    "name": "Violin",
    "shortDefinition": "A four-stringed bowed instrument, highest member of the violin family, central to Western classical, folk, and popular music, tuned in fifths.",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A four-stringed bowed instrument, highest member of the violin family, central to Western classical, folk, and popular music, tuned in fifths.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Violin"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'violin'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Violin"
      }
    ],
    "graphNodes": [
      {
        "id": "violin",
        "label": "Violin",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kultrun": {
    "publicId": "9364194a-9f74-4491-a44d-4270224f1829",
    "slug": "kultrun",
    "name": "Kultrun",
    "shortDefinition": "A ceremonial drum of the Mapuche people, a shallow kettledrum used in the religious machitun ritual, with a decorated skin head.",
    "entityType": "Instrument",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A ceremonial drum of the Mapuche people, a shallow kettledrum used in the religious machitun ritual, with a decorated skin head.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Mapudungun",
    "taxonomyPath": [
      "World",
      "Indigenous traditions globally",
      "Kultrun"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Mapuche'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kultr%C3%BAn"
      }
    ],
    "graphNodes": [
      {
        "id": "kultrun",
        "label": "Kultrun",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ney": {
    "publicId": "9489a63c-bc41-4f94-9d20-be5ed084e3c3",
    "slug": "ney",
    "name": "Ney",
    "shortDefinition": "An end-blown cane flute used throughout Middle Eastern and Turkish music, known for its breathy tone and central role in devotional and classical practice.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An end-blown cane flute used throughout Middle Eastern and Turkish music, known for its breathy tone and central role in devotional and classical practice.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Turkish",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Ney"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'nay; ney'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ney"
      }
    ],
    "graphNodes": [
      {
        "id": "ney",
        "label": "Ney",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "thumri": {
    "publicId": "96dcac64-a5f1-430c-8fff-420c47c0f404",
    "slug": "thumri",
    "name": "Thumri",
    "originalName": "ṭhumrī",
    "shortDefinition": "A light and expressive genre of North Indian vocal music, associated with romantic and devotional subjects and a flexible treatment of rāga and rhythm.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Vocal",
      "Light classical"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A light and expressive genre of North Indian vocal music, associated with romantic and devotional subjects and a flexible treatment of rāga and rhythm.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "transliteration": "ṭhumrī",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Thumri"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ṭhumrī'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Thumri"
      }
    ],
    "graphNodes": [
      {
        "id": "thumri",
        "label": "Thumri",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "angklung": {
    "publicId": "9889d805-f438-410a-9fb4-271de672ffe2",
    "slug": "angklung",
    "name": "Angklung",
    "shortDefinition": "A bamboo rattle instrument of Sundanese (West Java) tradition, played in tuned frames or shaken individually to produce pitched notes.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A bamboo rattle instrument of Sundanese (West Java) tradition, played in tuned frames or shaken individually to produce pitched notes.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sundanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Angklung"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'angklung'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Angklung"
      }
    ],
    "graphNodes": [
      {
        "id": "angklung",
        "label": "Angklung",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "guzheng": {
    "publicId": "98a10427-067c-498b-ba66-53a427952df1",
    "slug": "guzheng",
    "name": "Guzheng",
    "originalName": "gǔzhēng",
    "shortDefinition": "A large plucked zither of China with movable bridges and (modernly) up to 21 strings, used in solo and ensemble music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A large plucked zither of China with movable bridges and (modernly) up to 21 strings, used in solo and ensemble music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Chinese",
    "transliteration": "gǔzhēng",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Guzheng"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'zheng'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Guzheng"
      }
    ],
    "graphNodes": [
      {
        "id": "guzheng",
        "label": "Guzheng",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ranchera": {
    "publicId": "99971d06-ea94-46fd-b1c7-f4823c610564",
    "slug": "ranchera",
    "name": "Ranchera",
    "shortDefinition": "A Mexican song genre rooted in rural life and derived from the mariachi tradition, characterized by its verse-chorus form and expressive vocal delivery.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Song",
      "Mexico"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Mexican song genre rooted in rural life and derived from the mariachi tradition, characterized by its verse-chorus form and expressive vocal delivery.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Ranchera"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ranchera'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ranchera"
      }
    ],
    "graphNodes": [
      {
        "id": "ranchera",
        "label": "Ranchera",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "fado": {
    "publicId": "99cb59c2-e81a-4c26-9d1f-42f3b84dc389",
    "slug": "fado",
    "name": "Fado",
    "shortDefinition": "A melancholic Portuguese urban song genre, sung to guitar and viola accompaniment, associated with Lisbon and Coimbra.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A melancholic Portuguese urban song genre, sung to guitar and viola accompaniment, associated with Lisbon and Coimbra.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Portuguese",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Fado"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'fado'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Fado"
      }
    ],
    "graphNodes": [
      {
        "id": "fado",
        "label": "Fado",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "fatele": {
    "publicId": "9a2b49f7-7289-445a-88cf-e5a2769a00c9",
    "slug": "fatele",
    "name": "Fatele",
    "shortDefinition": "A Tokelauan song-dance genre combining sung poetry, rhythm, and dance, performed communally at celebrations and events.",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Song"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Tokelauan song-dance genre combining sung poetry, rhythm, and dance, performed communally at celebrations and events.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Tokelauan",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Fatele"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Tokelau'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Fatele"
      }
    ],
    "graphNodes": [
      {
        "id": "fatele",
        "label": "Fatele",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "son": {
    "publicId": "9b8cfd53-6d95-455e-879f-bbc1c84ed4d8",
    "slug": "son",
    "name": "Son",
    "shortDefinition": "A Cuban music and dance genre combining Spanish guitar and song with African rhythm, a foundation of later salsa; son montuno is a key variant.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Cuba"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Cuban music and dance genre combining Spanish guitar and song with African rhythm, a foundation of later salsa; son montuno is a key variant.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Son"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'son'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Son_music"
      }
    ],
    "graphNodes": [
      {
        "id": "son",
        "label": "Son",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "powwow-drum": {
    "publicId": "9c56c38b-98e8-4aa8-ab77-a32962ab3add",
    "slug": "powwow-drum",
    "name": "Powwow drum",
    "shortDefinition": "A large communal drum central to North American Indigenous powwow singing, around which a singing group (drum) performs songs in unison.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Percussion",
      "Indigenous"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A large communal drum central to North American Indigenous powwow singing, around which a singing group (drum) performs songs in unison.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Powwow drum"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Native American music'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pow_wow"
      }
    ],
    "graphNodes": [
      {
        "id": "powwow-drum",
        "label": "Powwow drum",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "raga-ragini": {
    "publicId": "9ca84ef1-5d9c-4062-897f-e01ed3de1a9d",
    "slug": "raga-ragini",
    "name": "Raga-Ragini",
    "originalName": "rāga-rāgiṇī",
    "shortDefinition": "A historical South Asian scheme that personified modal melodic frameworks as male rāgas and female rāgiṇīs, used in painting and musical theory across several r…",
    "entityType": "Musical concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "History",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A historical South Asian scheme that personified modal melodic frameworks as male rāgas and female rāgiṇīs, used in painting and musical theory across several regional traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "rāga-rāgiṇī",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Raga-Ragini"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rāga-rāgiṇī'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Raga-Ragini"
      }
    ],
    "graphNodes": [
      {
        "id": "raga-ragini",
        "label": "Raga-Ragini",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "oud": {
    "publicId": "9d971ed6-1457-446b-8019-f77cb8b8be15",
    "slug": "oud",
    "name": "Oud",
    "originalName": "ʿūd",
    "shortDefinition": "A short-necked, fretless plucked lute with a pear-shaped body, central to Arabic, Turkish, Persian, and Greek music, ancestor of the Western lute.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A short-necked, fretless plucked lute with a pear-shaped body, central to Arabic, Turkish, Persian, and Greek music, ancestor of the Western lute.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "ʿūd",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Oud"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ʿūd'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Oud"
      }
    ],
    "graphNodes": [
      {
        "id": "oud",
        "label": "Oud",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "blues": {
    "publicId": "9e85270d-eccd-48f5-89a7-27f0bd50a8a2",
    "slug": "blues",
    "name": "Blues",
    "shortDefinition": "A secular African American music and form, characterized by the twelve-bar structure and blue notes, originating in the rural South and foundational to later po…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Form",
      "Blue notes"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A secular African American music and form, characterized by the twelve-bar structure and blue notes, originating in the rural South and foundational to later popular styles.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Blues"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'blues'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Blues"
      }
    ],
    "graphNodes": [
      {
        "id": "blues",
        "label": "Blues",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "erhu": {
    "publicId": "a202bd74-41c2-4da3-a50e-9d8cb4875c02",
    "slug": "erhu",
    "name": "Erhu",
    "originalName": "èrhú",
    "shortDefinition": "A two-stringed spike fiddle of China, with a long neck and a snake-skin-covered resonator, central to solo, chamber, and opera music.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Bowed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A two-stringed spike fiddle of China, with a long neck and a snake-skin-covered resonator, central to solo, chamber, and opera music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Chinese",
    "transliteration": "èrhú",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Erhu"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'erhu'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Erhu"
      }
    ],
    "graphNodes": [
      {
        "id": "erhu",
        "label": "Erhu",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "oratorio": {
    "publicId": "a34773ef-bd96-484c-bd48-204722757676",
    "slug": "oratorio",
    "name": "Oratorio",
    "shortDefinition": "A large-scale sacred vocal-instrumental work, usually dramatic in narrative but staged without acting, prominent in the Baroque period.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A large-scale sacred vocal-instrumental work, usually dramatic in narrative but staged without acting, prominent in the Baroque period.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Oratorio"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'oratorio'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Oratorio"
      }
    ],
    "graphNodes": [
      {
        "id": "oratorio",
        "label": "Oratorio",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "hula": {
    "publicId": "a461a8df-4e6f-4c4c-b72f-64d847336538",
    "slug": "hula",
    "name": "Hula",
    "shortDefinition": "A Hawaiian dance accompanied by chant (oli) or song (mele), of two main forms: hula kahiko (ancient) and hula 'auana (modern).",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Hawaii"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Hawaiian dance accompanied by chant (oli) or song (mele), of two main forms: hula kahiko (ancient) and hula 'auana (modern).",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hawaiian",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Hula"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Hawaii'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Hula"
      }
    ],
    "graphNodes": [
      {
        "id": "hula",
        "label": "Hula",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rebab": {
    "publicId": "a4d414d4-69e3-49a8-b893-7d6009f1f256",
    "slug": "rebab",
    "name": "Rebab",
    "shortDefinition": "A two-stringed spike fiddle, usually bowed, that leads the melodic elaboration in the Javanese gamelan.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Bowed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A two-stringed spike fiddle, usually bowed, that leads the melodic elaboration in the Javanese gamelan.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Rebab"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rebab'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rebab"
      }
    ],
    "graphNodes": [
      {
        "id": "rebab",
        "label": "Rebab",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "dhrupad": {
    "publicId": "a849a277-96bf-4d0b-b676-30bd4a1d6f02",
    "slug": "dhrupad",
    "name": "Dhrupad",
    "shortDefinition": "An ancient and austere form of Hindustani vocal music, characterized by a slow unfold and a strict, meditative treatment of the raga in a lower register.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Performance",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An ancient and austere form of Hindustani vocal music, characterized by a slow unfold and a strict, meditative treatment of the raga in a lower register.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Dhrupad"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'dhrupad'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Dhrupad"
      }
    ],
    "graphNodes": [
      {
        "id": "dhrupad",
        "label": "Dhrupad",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "samba": {
    "publicId": "a9e0621a-69e6-4170-8d6f-298733b251b5",
    "slug": "samba",
    "name": "Samba",
    "shortDefinition": "A Brazilian music and dance genre of African origin, central to Carnival, with syncopated percussion and a danceable 2/4 rhythm, and a rich family of regional v…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Brazilian music and dance genre of African origin, central to Carnival, with syncopated percussion and a danceable 2/4 rhythm, and a rich family of regional variants.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Portuguese",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Samba"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'samba'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Samba"
      }
    ],
    "graphNodes": [
      {
        "id": "samba",
        "label": "Samba",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "recitative": {
    "publicId": "aaab3755-b7da-4ebf-a327-ef55b5c97970",
    "slug": "recitative",
    "name": "Recitative",
    "shortDefinition": "A style of vocal writing that follows the natural rhythms and inflections of speech, used in opera and oratorio to advance dialogue and narrative.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Opera"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A style of vocal writing that follows the natural rhythms and inflections of speech, used in opera and oratorio to advance dialogue and narrative.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Recitative"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'recitative'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Recitative"
      }
    ],
    "graphNodes": [
      {
        "id": "recitative",
        "label": "Recitative",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "soca": {
    "publicId": "acbc4a66-6a6e-487a-8823-9a6ae6eb3d75",
    "slug": "soca",
    "name": "Soca",
    "shortDefinition": "A Trinidadian popular dance music that fused calypso with Indian, funk, and soul elements in the 1970s, characterized by an energetic beat and carnival associat…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Carnival"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Trinidadian popular dance music that fused calypso with Indian, funk, and soul elements in the 1970s, characterized by an energetic beat and carnival association.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Soca"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'soca'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Soca_music"
      }
    ],
    "graphNodes": [
      {
        "id": "soca",
        "label": "Soca",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bonang": {
    "publicId": "ad7f2963-87f0-44bc-9c4d-6411913e9168",
    "slug": "bonang",
    "name": "Bonang",
    "shortDefinition": "A set of small tuned gongs arranged in rows on a frame, struck with padded mallets, prominent in the Javanese gamelan.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Gong",
      "Metallophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A set of small tuned gongs arranged in rows on a frame, struck with padded mallets, prominent in the Javanese gamelan.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Bonang"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bonang'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bonang"
      }
    ],
    "graphNodes": [
      {
        "id": "bonang",
        "label": "Bonang",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "taiko": {
    "publicId": "ae5ecaea-d34f-4947-a5a5-154c4820a92a",
    "slug": "taiko",
    "name": "Taiko",
    "shortDefinition": "A family of large Japanese barrel drums, played with sticks in ritual, theater, and contemporary ensemble performance.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A family of large Japanese barrel drums, played with sticks in ritual, theater, and contemporary ensemble performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Taiko"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'taiko'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Taiko"
      }
    ],
    "graphNodes": [
      {
        "id": "taiko",
        "label": "Taiko",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "tala": {
    "publicId": "b09e1bc6-9509-4ae7-96a7-6f32eb67f5e4",
    "slug": "tala",
    "name": "Tala",
    "originalName": "tāla",
    "shortDefinition": "A rhythmic cycle or metrical framework used in Indian classical music, organizing time through repeating patterns of beats (mātrās) and stresses.",
    "entityType": "Rhythmic concept",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Rhythm",
      "Performance",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A rhythmic cycle or metrical framework used in Indian classical music, organizing time through repeating patterns of beats (mātrās) and stresses.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "tāla",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Tala"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "The New Grove Dictionary of Music and Musicians, s.v. 'tāla'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Tala_(music)"
      }
    ],
    "graphNodes": [
      {
        "id": "tala",
        "label": "Tala",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "cantata": {
    "publicId": "b1a377f9-baf0-40da-b949-5fa6da005a2e",
    "slug": "cantata",
    "name": "Cantata",
    "shortDefinition": "A vocal composition for one or more voices with instrumental accompaniment, comprising several movements, significant in Baroque church and secular music.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Baroque"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A vocal composition for one or more voices with instrumental accompaniment, comprising several movements, significant in Baroque church and secular music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Cantata"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'cantata'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Cantata"
      }
    ],
    "graphNodes": [
      {
        "id": "cantata",
        "label": "Cantata",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "patagonian-trutruka": {
    "publicId": "b3ee30b2-c7f3-4019-9596-de97279be462",
    "slug": "patagonian-trutruka",
    "name": "Patagonian trutruka",
    "shortDefinition": "A long trumpet of the Mapuche people of Patagonia (Chile/Argentina), made from a hollowed plant stem with an animal-horn bell, used in ceremonial music.",
    "entityType": "Instrument",
    "region": "Indigenous traditions globally",
    "tradition": "Indigenous and community-led traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long trumpet of the Mapuche people of Patagonia (Chile/Argentina), made from a hollowed plant stem with an animal-horn bell, used in ceremonial music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Mapudungun",
    "taxonomyPath": [
      "World",
      "Indigenous traditions globally",
      "Patagonian trutruka"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Mapuche'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Trutruka"
      }
    ],
    "graphNodes": [
      {
        "id": "patagonian-trutruka",
        "label": "Patagonian trutruka",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "merengue": {
    "publicId": "b5f494c2-30b7-43f6-a88f-4d7b0e21fe0a",
    "slug": "merengue",
    "name": "Merengue",
    "shortDefinition": "A fast duple-meter dance music of the Dominican Republic, combining accordion, saxophone, and percussion, central to Dominican national identity.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Dance",
      "Dominican Republic"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A fast duple-meter dance music of the Dominican Republic, combining accordion, saxophone, and percussion, central to Dominican national identity.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Merengue"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'merengue'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Merengue_music"
      }
    ],
    "graphNodes": [
      {
        "id": "merengue",
        "label": "Merengue",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "haka": {
    "publicId": "b6f0db9b-60d7-4bcc-af57-807cd00e26af",
    "slug": "haka",
    "name": "Haka",
    "shortDefinition": "A Māori ceremonial posture dance combining vigorous movement, foot-stamping, and chanting, performed in formal and communal contexts, often by groups.",
    "entityType": "Genre",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Genre",
      "Dance",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Māori ceremonial posture dance combining vigorous movement, foot-stamping, and chanting, performed in formal and communal contexts, often by groups.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Māori",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Haka"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'New Zealand, §I; haka'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Haka"
      }
    ],
    "graphNodes": [
      {
        "id": "haka",
        "label": "Haka",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "zydeco": {
    "publicId": "b6f4d2fc-46eb-49e5-98bf-be1aa8a43f46",
    "slug": "zydeco",
    "name": "Zydeco",
    "shortDefinition": "A dance music of the Louisiana Creole (Black Creole) community, combining French folk songs with blues, R&B, and accordion/fiddle instrumentation.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Creole"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A dance music of the Louisiana Creole (Black Creole) community, combining French folk songs with blues, R&B, and accordion/fiddle instrumentation.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Zydeco"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'zydeco'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Zydeco"
      }
    ],
    "graphNodes": [
      {
        "id": "zydeco",
        "label": "Zydeco",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "jazz": {
    "publicId": "ba111aef-6b91-4b62-a816-87d0b8f2caee",
    "slug": "jazz",
    "name": "Jazz",
    "shortDefinition": "A music of African American origin characterized by swing, improvisation, and blue notes, which developed through blues, ragtime, and early band traditions and…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Improvisation",
      "Swing"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A music of African American origin characterized by swing, improvisation, and blue notes, which developed through blues, ragtime, and early band traditions and produced numerous styles.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Jazz"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'jazz'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Jazz"
      }
    ],
    "graphNodes": [
      {
        "id": "jazz",
        "label": "Jazz",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "allemande": {
    "publicId": "bce97bee-ffe5-4e21-96fe-04902d1dc8d7",
    "slug": "allemande",
    "name": "Allemande",
    "shortDefinition": "A stately processional dance of German origin in duple meter, frequently the first movement of the Baroque dance suite.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Suite"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A stately processional dance of German origin in duple meter, frequently the first movement of the Baroque dance suite.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "French",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Allemande"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'allemande'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Allemande"
      }
    ],
    "graphNodes": [
      {
        "id": "allemande",
        "label": "Allemande",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "duduk": {
    "publicId": "bd2b4ff5-e7b4-46a3-be96-c9bdda1bc04d",
    "slug": "duduk",
    "name": "Duduk",
    "shortDefinition": "A double-reed wind instrument of Armenia and the Caucasus, with a warm nasal tone, used in folk and ceremonial music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Reed"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A double-reed wind instrument of Armenia and the Caucasus, with a warm nasal tone, used in folk and ceremonial music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Armenian",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Duduk"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'duduk'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Duduk"
      }
    ],
    "graphNodes": [
      {
        "id": "duduk",
        "label": "Duduk",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "charango": {
    "publicId": "bda23fe3-433f-469d-8f03-5eb0e6f56f50",
    "slug": "charango",
    "name": "Charango",
    "shortDefinition": "A small Andean stringed instrument of the lute family, traditionally with ten strings in five courses, whose body may be made from an armadillo shell or wood.",
    "entityType": "Instrument",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A small Andean stringed instrument of the lute family, traditionally with ten strings in five courses, whose body may be made from an armadillo shell or wood.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Charango"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'charango'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Charango"
      }
    ],
    "graphNodes": [
      {
        "id": "charango",
        "label": "Charango",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "saz": {
    "publicId": "bdef075d-bef3-458e-9dea-ea0e0c0e63e3",
    "slug": "saz",
    "name": "Saz",
    "shortDefinition": "A family of long-necked plucked lutes of Turkey and Central Asia, with movable frets, central to Turkish folk and aşık (minstrel) music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A family of long-necked plucked lutes of Turkey and Central Asia, with movable frets, central to Turkish folk and aşık (minstrel) music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Turkish",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Saz"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'saz'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ba%C4%9Flama"
      }
    ],
    "graphNodes": [
      {
        "id": "saz",
        "label": "Saz",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sitar": {
    "publicId": "be155306-d244-42fe-86e0-131e667a0512",
    "slug": "sitar",
    "name": "Sitar",
    "shortDefinition": "A long-necked plucked string instrument of the Hindustani tradition, with a gourd resonator, movable frets, and sympathetic strings, used widely in classical an…",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked plucked string instrument of the Hindustani tradition, with a gourd resonator, movable frets, and sympathetic strings, used widely in classical and popular music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Sitar"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sitār'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sitar"
      }
    ],
    "graphNodes": [
      {
        "id": "sitar",
        "label": "Sitar",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "taonga-puoro": {
    "publicId": "bf68371d-c258-44b0-8e9f-76fce62f7e89",
    "slug": "taonga-puoro",
    "name": "Taonga pūoro",
    "originalName": "taonga pūoro",
    "shortDefinition": "The traditional musical instruments of the Māori people of New Zealand, a term meaning 'treasures that sound,' encompassing flutes, trumpets, and resonant idiop…",
    "entityType": "Concept",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Tradition",
      "Indigenous"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The traditional musical instruments of the Māori people of New Zealand, a term meaning 'treasures that sound,' encompassing flutes, trumpets, and resonant idiophones.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Māori",
    "transliteration": "taonga pūoro",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Taonga pūoro"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'New Zealand, §I'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Taonga_pūoro"
      }
    ],
    "graphNodes": [
      {
        "id": "taonga-puoro",
        "label": "Taonga pūoro",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ghazal": {
    "publicId": "c0e9c63e-2d4a-4d2f-bd64-7458f6f57ac9",
    "slug": "ghazal",
    "name": "Ghazal",
    "originalName": "ghazal",
    "shortDefinition": "A poetic-musical genre of South Asian (especially Urdu and Persian) tradition, setting rhymed couplets to music, popular in North Indian and Pakistani performan…",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Vocal",
      "Poetry"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A poetic-musical genre of South Asian (especially Urdu and Persian) tradition, setting rhymed couplets to music, popular in North Indian and Pakistani performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Urdu",
    "transliteration": "ghazal",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Ghazal"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ghazal'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ghazal"
      }
    ],
    "graphNodes": [
      {
        "id": "ghazal",
        "label": "Ghazal",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rara": {
    "publicId": "c134fea5-e598-4114-8f27-68584dd17b1a",
    "slug": "rara",
    "name": "Rara",
    "shortDefinition": "A Haitian street music and procession genre performed during Lent, using bamboo (vaccines), drums, horns, and call-and-response song.",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Street",
      "Procession"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Haitian street music and procession genre performed during Lent, using bamboo (vaccines), drums, horns, and call-and-response song.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Haitian Creole",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Rara"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Haiti'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rara"
      }
    ],
    "graphNodes": [
      {
        "id": "rara",
        "label": "Rara",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "reggae": {
    "publicId": "c3695b33-9c1d-42ce-8d29-2930e0426664",
    "slug": "reggae",
    "name": "Reggae",
    "shortDefinition": "A Jamaican popular music genre that grew out of ska and rocksteady, characterized by an offbeat rhythm and a heavy bass line, and closely associated with Rastaf…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Popular music",
      "Reggae"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Jamaican popular music genre that grew out of ska and rocksteady, characterized by an offbeat rhythm and a heavy bass line, and closely associated with Rastafari themes.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Reggae"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'reggae'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Reggae"
      }
    ],
    "graphNodes": [
      {
        "id": "reggae",
        "label": "Reggae",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "djembe": {
    "publicId": "c45fd367-3f36-42bf-a432-edc1a3ff89b6",
    "slug": "djembe",
    "name": "Djembe",
    "originalName": "djembe",
    "shortDefinition": "A goblet-shaped, single-headed drum of West Africa, played with the hands and capable of a wide range of tones, used in ensemble music and dance.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A goblet-shaped, single-headed drum of West Africa, played with the hands and capable of a wide range of tones, used in ensemble music and dance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Bambara",
    "transliteration": "djembe",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Djembe"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'djembe'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Djembe"
      }
    ],
    "graphNodes": [
      {
        "id": "djembe",
        "label": "Djembe",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "dastgah": {
    "publicId": "c55969a1-05d6-4b44-9f22-7b1f50100f5d",
    "slug": "dastgah",
    "name": "Dastgah",
    "originalName": "dastgāh",
    "shortDefinition": "A set of melodic modes and their associated repertory in Persian classical music, each representing a family of gushehs united by a modal basis.",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Repertoire"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A set of melodic modes and their associated repertory in Persian classical music, each representing a family of gushehs united by a modal basis.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "transliteration": "dastgāh",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Dastgah"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'dastgāh'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Dastgah"
      }
    ],
    "graphNodes": [
      {
        "id": "dastgah",
        "label": "Dastgah",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "santur": {
    "publicId": "cb069686-6b26-4093-b089-4af661af9707",
    "slug": "santur",
    "name": "Santur",
    "originalName": "santūr",
    "shortDefinition": "A trapezoidal hammered dulcimer with strings struck by light wooden mallets, used in Persian, Turkish, and Iraqi classical and folk music.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Struck"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A trapezoidal hammered dulcimer with strings struck by light wooden mallets, used in Persian, Turkish, and Iraqi classical and folk music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Persian",
    "transliteration": "santūr",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Santur"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'santūr'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Santur"
      }
    ],
    "graphNodes": [
      {
        "id": "santur",
        "label": "Santur",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ska": {
    "publicId": "cb4e8be6-196c-419b-ade0-af43b7e69e4d",
    "slug": "ska",
    "name": "Ska",
    "shortDefinition": "A Jamaican music genre of the late 1950s and early 1960s, characterized by a walking bass line, guitar offbeats, and a driving beat, antecedent to rocksteady an…",
    "entityType": "Genre",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Genre",
      "Popular music",
      "Rhythm"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Jamaican music genre of the late 1950s and early 1960s, characterized by a walking bass line, guitar offbeats, and a driving beat, antecedent to rocksteady and reggae.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Ska"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'ska'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ska"
      }
    ],
    "graphNodes": [
      {
        "id": "ska",
        "label": "Ska",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "chorale": {
    "publicId": "cbe7c467-7335-4189-b9c9-83a70ca57b37",
    "slug": "chorale",
    "name": "Chorale",
    "originalName": "chorāle",
    "shortDefinition": "A hymn tune of the German Protestant church, typically in four-part homophonic harmonization, as used by J. S. Bach and later composers.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A hymn tune of the German Protestant church, typically in four-part homophonic harmonization, as used by J. S. Bach and later composers.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "German",
    "transliteration": "chorāle",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Chorale"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'chorale'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Chorale"
      }
    ],
    "graphNodes": [
      {
        "id": "chorale",
        "label": "Chorale",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "usul": {
    "publicId": "cca20468-13af-4ae1-851e-bbcc048dfbb7",
    "slug": "usul",
    "name": "Usul",
    "shortDefinition": "In Turkish classical music, a rhythmic cycle or pattern that organizes large and small time units, analogous to the concept of rhythmic mode.",
    "entityType": "Rhythmic concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Rhythm",
      "Theory",
      "Cycle"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "In Turkish classical music, a rhythmic cycle or pattern that organizes large and small time units, analogous to the concept of rhythmic mode.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Turkish",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Usul"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'usūl'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Usul"
      }
    ],
    "graphNodes": [
      {
        "id": "usul",
        "label": "Usul",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "bluegrass": {
    "publicId": "ccabef53-8173-446c-a4f0-073e8169ca40",
    "slug": "bluegrass",
    "name": "Bluegrass",
    "shortDefinition": "A country music subgenre of the American South, featuring acoustic string instruments and close vocal harmonies, rooted in Appalachian traditions.",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A country music subgenre of the American South, featuring acoustic string instruments and close vocal harmonies, rooted in Appalachian traditions.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Bluegrass"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'bluegrass'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Bluegrass_music"
      }
    ],
    "graphNodes": [
      {
        "id": "bluegrass",
        "label": "Bluegrass",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "iqa": {
    "publicId": "cceed076-9a87-41f8-9b5b-77c607317594",
    "slug": "iqa",
    "name": "Iqa",
    "originalName": "īqāʿ",
    "shortDefinition": "A rhythmic cycle or pattern in Arabic music, analogous to a rhythmic mode, organized into beats, rests, and periodic cycles played on percussion.",
    "entityType": "Rhythmic concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Rhythm",
      "Performance",
      "Cycle"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A rhythmic cycle or pattern in Arabic music, analogous to a rhythmic mode, organized into beats, rests, and periodic cycles played on percussion.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "īqāʿ",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Iqa"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'īqāʿ'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Iqa'"
      }
    ],
    "graphNodes": [
      {
        "id": "iqa",
        "label": "Iqa",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "fiddle": {
    "publicId": "cdb961ad-115d-4e52-a9e0-34cac065f69b",
    "slug": "fiddle",
    "name": "Fiddle",
    "shortDefinition": "The colloquial term for the violin, especially as used in folk, country, bluegrass, and traditional music of North America and elsewhere.",
    "entityType": "Instrument",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Strings",
      "Folk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The colloquial term for the violin, especially as used in folk, country, bluegrass, and traditional music of North America and elsewhere.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Fiddle"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'fiddle'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Fiddle"
      }
    ],
    "graphNodes": [
      {
        "id": "fiddle",
        "label": "Fiddle",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "maqamat": {
    "publicId": "cfa7fc60-de00-4d5f-9065-5ef5ebd6ae41",
    "slug": "maqamat",
    "name": "Maqamat",
    "originalName": "maqāmāt",
    "shortDefinition": "The plural of maqām, referring collectively to the melodic modal system and its family of modes in Middle Eastern and North African art music.",
    "entityType": "Musical concept",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The plural of maqām, referring collectively to the melodic modal system and its family of modes in Middle Eastern and North African art music.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "maqāmāt",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Maqamat"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'maqām'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Maqam"
      }
    ],
    "graphNodes": [
      {
        "id": "maqamat",
        "label": "Maqamat",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "ragamalika": {
    "publicId": "d069665b-9cf5-44c9-9a8c-06250993303b",
    "slug": "ragamalika",
    "name": "Ragamalika",
    "originalName": "rāgamālikā",
    "shortDefinition": "A Carnatic composition that moves through a succession of different rāgas, one per section, united by a single tāla and melodic continuity.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Melody",
      "Carnatic"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Carnatic composition that moves through a succession of different rāgas, one per section, united by a single tāla and melodic continuity.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "rāgamālikā",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Ragamalika"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'rāgamālā'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Ragamalika"
      }
    ],
    "graphNodes": [
      {
        "id": "ragamalika",
        "label": "Ragamalika",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "didgeridoo": {
    "publicId": "d0c13cfe-4787-4352-b526-1904a51866c8",
    "slug": "didgeridoo",
    "name": "Didgeridoo",
    "shortDefinition": "A wind instrument of the Aboriginal peoples of northern Australia, a long wooden tube played with circular breathing to produce a deep drone, often with rhythmi…",
    "entityType": "Instrument",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Instrument",
      "Wind",
      "Aerophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A wind instrument of the Aboriginal peoples of northern Australia, a long wooden tube played with circular breathing to produce a deep drone, often with rhythmic vocal effects.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Yolngu",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Didgeridoo"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'didjeridu'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Didgeridoo"
      }
    ],
    "graphNodes": [
      {
        "id": "didgeridoo",
        "label": "Didgeridoo",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "adowa": {
    "publicId": "d0e6bf64-0e80-4007-9c98-e03d049dadc1",
    "slug": "adowa",
    "name": "Adowa",
    "shortDefinition": "A ceremonial Akan (Ghanaian) music and dance tradition of the Ashanti and related peoples, performed at funerals and festivals with drum and song.",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Drum",
      "Ceremonial"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A ceremonial Akan (Ghanaian) music and dance tradition of the Ashanti and related peoples, performed at funerals and festivals with drum and song.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Twi",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Adowa"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Ghana'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Adowa"
      }
    ],
    "graphNodes": [
      {
        "id": "adowa",
        "label": "Adowa",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kanun": {
    "publicId": "d132365c-825b-4488-afa0-639b2a6d1444",
    "slug": "kanun",
    "name": "Kanun",
    "originalName": "qānūn",
    "shortDefinition": "A plucked zither of the Middle East and North Africa, with a trapezoidal soundboard and numerous strings grouped in courses, played with finger plectra.",
    "entityType": "Instrument",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A plucked zither of the Middle East and North Africa, with a trapezoidal soundboard and numerous strings grouped in courses, played with finger plectra.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "qānūn",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Kanun"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'qānūn'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Qanun_(instrument)"
      }
    ],
    "graphNodes": [
      {
        "id": "kanun",
        "label": "Kanun",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pipa": {
    "publicId": "d1b70e85-254d-49e3-b2ba-b54ee1169e54",
    "slug": "pipa",
    "name": "Pipa",
    "originalName": "pípá",
    "shortDefinition": "A pear-shaped four-stringed plucked lute of China, with a long tradition in court, solo, and narrative repertoire.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A pear-shaped four-stringed plucked lute of China, with a long tradition in court, solo, and narrative repertoire.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Chinese",
    "transliteration": "pípá",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Pipa"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'pipa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pipa"
      }
    ],
    "graphNodes": [
      {
        "id": "pipa",
        "label": "Pipa",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "corrido": {
    "publicId": "d472f698-bc81-46ab-b1ca-324cd74f8bb5",
    "slug": "corrido",
    "name": "Corrido",
    "shortDefinition": "A Mexican narrative ballad genre that recounts historical, political, and social events, typically sung over simple guitar accompaniment.",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Narrative",
      "Ballad"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Mexican narrative ballad genre that recounts historical, political, and social events, typically sung over simple guitar accompaniment.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Corrido"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'corrido'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Corrido"
      }
    ],
    "graphNodes": [
      {
        "id": "corrido",
        "label": "Corrido",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "piano": {
    "publicId": "d5383946-62ec-42d1-88a3-8fb91490830a",
    "slug": "piano",
    "name": "Piano",
    "shortDefinition": "A keyboard instrument in which hammers strike strings, invented around 1700 by Bartolomeo Cristofori, whose dynamic range gave it its name (pianoforte).",
    "entityType": "Instrument",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Instrument",
      "Keyboard",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A keyboard instrument in which hammers strike strings, invented around 1700 by Bartolomeo Cristofori, whose dynamic range gave it its name (pianoforte).",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Piano"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'pianoforte'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Piano"
      }
    ],
    "graphNodes": [
      {
        "id": "piano",
        "label": "Piano",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gugin": {
    "publicId": "d72806f4-48be-4fc5-9b3e-ec6ce474d105",
    "slug": "gugin",
    "name": "Gugin",
    "originalName": "gǔqín",
    "shortDefinition": "A seven-stringed Chinese zither with a history of over three thousand years, associated with literati culture and refined solo performance.",
    "entityType": "Instrument",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Zither"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A seven-stringed Chinese zither with a history of over three thousand years, associated with literati culture and refined solo performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Chinese",
    "transliteration": "gǔqín",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Gugin"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'qin'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Guqin"
      }
    ],
    "graphNodes": [
      {
        "id": "gugin",
        "label": "Gugin",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "jhala": {
    "publicId": "da961f47-75ad-483c-ae59-de69c4d9e04e",
    "slug": "jhala",
    "name": "Jhala",
    "originalName": "jhālā",
    "shortDefinition": "A fast, climactic section of Hindustani instrumental music, characterized by rapid repeated strokes and rhythmic intensification within a rāga.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Form",
      "Instrumental",
      "Performance"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A fast, climactic section of Hindustani instrumental music, characterized by rapid repeated strokes and rhythmic intensification within a rāga.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "transliteration": "jhālā",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Jhala"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'jhālā'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Jhala"
      }
    ],
    "graphNodes": [
      {
        "id": "jhala",
        "label": "Jhala",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "cumbia": {
    "publicId": "dc9c16fc-0cbe-42f6-bd74-5537d50181ed",
    "slug": "cumbia",
    "name": "Cumbia",
    "shortDefinition": "A Colombian music and dance genre of Indigenous, African, and Spanish origins, characterized by a rhythmic 2/4 pattern and accordion-led ensembles, with broad L…",
    "entityType": "Genre",
    "region": "Latin America",
    "tradition": "Latin American music",
    "tags": [
      "Genre",
      "Dance",
      "Popular music"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Colombian music and dance genre of Indigenous, African, and Spanish origins, characterized by a rhythmic 2/4 pattern and accordion-led ensembles, with broad Latin American popularity.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Americas",
      "Latin America",
      "Latin American music",
      "Cumbia"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'cumbia'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Cumbia"
      }
    ],
    "graphNodes": [
      {
        "id": "cumbia",
        "label": "Cumbia",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "noh": {
    "publicId": "dd0a81e1-dee5-426a-80f5-977beb994f78",
    "slug": "noh",
    "name": "Noh",
    "shortDefinition": "A Japanese masked theater genre integrating stylized movement, chant (utai), and instrumental ensemble (hayashi), evolving from the medieval period.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Theater",
      "Ritual"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Japanese masked theater genre integrating stylized movement, chant (utai), and instrumental ensemble (hayashi), evolving from the medieval period.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Noh"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'nō'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Noh"
      }
    ],
    "graphNodes": [
      {
        "id": "noh",
        "label": "Noh",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "rast": {
    "publicId": "ddc7b37b-c2ec-482e-976f-3655aff863b3",
    "slug": "rast",
    "name": "Rast",
    "originalName": "Rāst",
    "shortDefinition": "A principal maqām in Arabic and Turkish music, built on a scale with neutral second and sixth degrees, often regarded as a foundational and stable mode.",
    "entityType": "Mode",
    "region": "Middle East",
    "tradition": "Maqām traditions",
    "tags": [
      "Mode",
      "Melody",
      "Theory"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A principal maqām in Arabic and Turkish music, built on a scale with neutral second and sixth degrees, often regarded as a foundational and stable mode.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Arabic",
    "transliteration": "Rāst",
    "taxonomyPath": [
      "World",
      "West Asia",
      "Middle East",
      "Maqām traditions",
      "Rast"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'maqām; Rast'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Rast_(maqam)"
      }
    ],
    "graphNodes": [
      {
        "id": "rast",
        "label": "Rast",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "jembe": {
    "publicId": "de07d5a6-fd75-47c0-a728-d9a2c9e0fd99",
    "slug": "jembe",
    "name": "Jembe",
    "originalName": "djembe",
    "shortDefinition": "An alternative spelling of djembe, a goblet-shaped hand drum of West Africa capable of bass, tone, and slap sounds.",
    "entityType": "Instrument",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Instrument",
      "Percussion",
      "Drum"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An alternative spelling of djembe, a goblet-shaped hand drum of West Africa capable of bass, tone, and slap sounds.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Bambara",
    "transliteration": "djembe",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Jembe"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'djembe'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Djembe"
      }
    ],
    "graphNodes": [
      {
        "id": "jembe",
        "label": "Jembe",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "taonga": {
    "publicId": "de1609e3-5472-4cc5-9e6b-2cf28644c526",
    "slug": "taonga",
    "name": "Taonga",
    "shortDefinition": "In Māori culture, a term meaning 'treasure,' used broadly for culturally valuable objects including taonga pūoro (musical instruments).",
    "entityType": "Concept",
    "region": "Oceania",
    "tradition": "Multiple traditions",
    "tags": [
      "Concept",
      "Culture",
      "Māori"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "In Māori culture, a term meaning 'treasure,' used broadly for culturally valuable objects including taonga pūoro (musical instruments).",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Māori",
    "taxonomyPath": [
      "World",
      "Oceania",
      "Taonga"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'New Zealand, §I'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Taonga"
      }
    ],
    "graphNodes": [
      {
        "id": "taonga",
        "label": "Taonga",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "dutar": {
    "publicId": "df876888-a474-4b26-9521-7c757c661751",
    "slug": "dutar",
    "name": "Dutar",
    "originalName": "dutār",
    "shortDefinition": "A long-necked two-stringed plucked lute of Central Asia (Turkmen, Uzbek, and related traditions), with a pear-shaped body and silk or metal strings.",
    "entityType": "Instrument",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A long-necked two-stringed plucked lute of Central Asia (Turkmen, Uzbek, and related traditions), with a pear-shaped body and silk or metal strings.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Turkmen",
    "transliteration": "dutār",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Dutar"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'dutār'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Dutar"
      }
    ],
    "graphNodes": [
      {
        "id": "dutar",
        "label": "Dutar",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kuy": {
    "publicId": "e1be5be2-36b0-43f7-90ef-e4c4540d52ee",
    "slug": "kuy",
    "name": "Kuy",
    "originalName": "küi",
    "shortDefinition": "A Kazakh solo instrumental composition, especially for the dombra, often programmatic and central to the oral instrumental tradition.",
    "entityType": "Form",
    "region": "Central Asia",
    "tradition": "Central Asian traditions",
    "tags": [
      "Form",
      "Instrumental",
      "Kazakh"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Kazakh solo instrumental composition, especially for the dombra, often programmatic and central to the oral instrumental tradition.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Kazakh",
    "transliteration": "küi",
    "taxonomyPath": [
      "World",
      "Asia",
      "Central Asia",
      "Kuy"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'Kazakhstan'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/K%C3%BCi"
      }
    ],
    "graphNodes": [
      {
        "id": "kuy",
        "label": "Kuy",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "steel-pan": {
    "publicId": "e269d377-9dc4-4c8f-b8d4-3e15e59d121c",
    "slug": "steel-pan",
    "name": "Steel pan",
    "shortDefinition": "A pitched percussion instrument of Trinidad and Tobago made from a tuned steel drum, played with mallets and central to carnival and pan ensembles.",
    "entityType": "Instrument",
    "region": "Caribbean",
    "tradition": "Caribbean music",
    "tags": [
      "Instrument",
      "Percussion",
      "Idiophone"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A pitched percussion instrument of Trinidad and Tobago made from a tuned steel drum, played with mallets and central to carnival and pan ensembles.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "Caribbean",
      "Caribbean music",
      "Steel pan"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'steel band'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Steelpan"
      }
    ],
    "graphNodes": [
      {
        "id": "steel-pan",
        "label": "Steel pan",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "alap": {
    "publicId": "e27ef772-38d4-4fa0-b317-1dba1aa94645",
    "slug": "alap",
    "name": "Alap",
    "originalName": "ālāpa",
    "shortDefinition": "The unmetered, improvised introductory section of a Hindustani classical performance in which a rāga is gradually revealed note by note, without percussion.",
    "entityType": "Form",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Melody",
      "Performance",
      "Form"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The unmetered, improvised introductory section of a Hindustani classical performance in which a rāga is gradually revealed note by note, without percussion.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Sanskrit",
    "transliteration": "ālāpa",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Alap"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "The New Grove Dictionary of Music and Musicians, s.v. 'ālāpa'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Alap"
      }
    ],
    "graphNodes": [
      {
        "id": "alap",
        "label": "Alap",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gagaku": {
    "publicId": "e299f67d-656c-4270-853b-8c522b09d1ad",
    "slug": "gagaku",
    "name": "Gagaku",
    "shortDefinition": "The ancient court music of Japan, combining instrumental, vocal, and dance traditions that have been preserved continuously since at least the eighth century.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Court music",
      "Tradition"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The ancient court music of Japan, combining instrumental, vocal, and dance traditions that have been preserved continuously since at least the eighth century.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Japanese",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Gagaku"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'gagaku'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gagaku"
      }
    ],
    "graphNodes": [
      {
        "id": "gagaku",
        "label": "Gagaku",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "highlife": {
    "publicId": "e2d6f632-b3dc-4af8-9a68-962af831551d",
    "slug": "highlife",
    "name": "Highlife",
    "shortDefinition": "A West African popular music genre combining indigenous dance rhythms with Western brass-band and guitar idioms, prominent in Ghana and Nigeria from the early t…",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Band"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A West African popular music genre combining indigenous dance rhythms with Western brass-band and guitar idioms, prominent in Ghana and Nigeria from the early twentieth century.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Highlife"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'highlife'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Highlife"
      }
    ],
    "graphNodes": [
      {
        "id": "highlife",
        "label": "Highlife",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sarabande": {
    "publicId": "e3890cb1-9f9e-4d9f-8dc1-3b183826ea75",
    "slug": "sarabande",
    "name": "Sarabande",
    "shortDefinition": "A slow triple-meter dance of Spanish origin, common as a slow movement of the Baroque suite, characterized by an accent on the second beat.",
    "entityType": "Genre",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Dance",
      "Suite"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A slow triple-meter dance of Spanish origin, common as a slow movement of the Baroque suite, characterized by an accent on the second beat.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Spanish",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Sarabande"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sarabande'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sarabande"
      }
    ],
    "graphNodes": [
      {
        "id": "sarabande",
        "label": "Sarabande",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "gospel": {
    "publicId": "ee28a146-0ab0-4868-a8a8-4ad6cccf8e2a",
    "slug": "gospel",
    "name": "Gospel",
    "shortDefinition": "A genre of Christian vocal music rooted in African American churches, combining call-and-response, harmony, and emotional delivery; also a related white souther…",
    "entityType": "Genre",
    "region": "North America",
    "tradition": "Western art music",
    "tags": [
      "Genre",
      "Vocal",
      "Sacred"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A genre of Christian vocal music rooted in African American churches, combining call-and-response, harmony, and emotional delivery; also a related white southern tradition.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Americas",
      "North America",
      "Gospel"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'gospel music'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Gospel_music"
      }
    ],
    "graphNodes": [
      {
        "id": "gospel",
        "label": "Gospel",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "sarod": {
    "publicId": "f32895ae-846f-4170-8d79-872d2f6a2675",
    "slug": "sarod",
    "name": "Sarod",
    "shortDefinition": "A fretless plucked lute of Hindustani music, with a metal fingerboard and sympathetic strings, used in classical and instrumental performance.",
    "entityType": "Instrument",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Instrument",
      "Strings",
      "Lute"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A fretless plucked lute of Hindustani music, with a metal fingerboard and sympathetic strings, used in classical and instrumental performance.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Sarod"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'sarod'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Sarod"
      }
    ],
    "graphNodes": [
      {
        "id": "sarod",
        "label": "Sarod",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "khyal": {
    "publicId": "f45aa43f-09ca-4401-8e5e-e67b84490111",
    "slug": "khyal",
    "name": "Khyal",
    "originalName": "khayāl",
    "shortDefinition": "The most widespread form of Hindustani vocal music, offering the soloist greater melodic and expressive freedom within the frame of a rāga and tāla.",
    "entityType": "Genre",
    "region": "South Asia",
    "tradition": "Indian classical music",
    "tags": [
      "Genre",
      "Performance",
      "Vocal"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "The most widespread form of Hindustani vocal music, offering the soloist greater melodic and expressive freedom within the frame of a rāga and tāla.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Hindi",
    "transliteration": "khayāl",
    "taxonomyPath": [
      "World",
      "Asia",
      "South Asia",
      "India",
      "Indian classical music",
      "Khyal"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'khayāl'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Khyal"
      }
    ],
    "graphNodes": [
      {
        "id": "khyal",
        "label": "Khyal",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "kendang": {
    "publicId": "f6efaf95-217b-4581-bbc8-cd780ef81b5f",
    "slug": "kendang",
    "name": "Kendang",
    "originalName": "kendhang",
    "shortDefinition": "A double-headed drum, often in pairs, that leads and shapes tempo and dynamics in Javanese and Balinese gamelan ensembles.",
    "entityType": "Instrument",
    "region": "Southeast Asia",
    "tradition": "Southeast Asian traditions",
    "tags": [
      "Instrument",
      "Rhythm",
      "Percussion"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A double-headed drum, often in pairs, that leads and shapes tempo and dynamics in Javanese and Balinese gamelan ensembles.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Javanese",
    "transliteration": "kendhang",
    "taxonomyPath": [
      "World",
      "Asia",
      "Southeast Asia",
      "Kendang"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'kendang'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Kendang"
      }
    ],
    "graphNodes": [
      {
        "id": "kendang",
        "label": "Kendang",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "afrobeat": {
    "publicId": "f75c96f7-233c-47ee-87dd-b890dc729b1b",
    "slug": "afrobeat",
    "name": "Afrobeat",
    "shortDefinition": "A Nigerian popular music genre pioneered by Fela Kuti, merging West African highlife and Yoruba rhythms with funk, jazz, and political lyricism in large ensembl…",
    "entityType": "Genre",
    "region": "Sub-Saharan Africa",
    "tradition": "African traditional music",
    "tags": [
      "Genre",
      "Popular music",
      "Funk"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Nigerian popular music genre pioneered by Fela Kuti, merging West African highlife and Yoruba rhythms with funk, jazz, and political lyricism in large ensemble arrangements.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "English",
    "taxonomyPath": [
      "World",
      "Africa",
      "Sub-Saharan Africa",
      "African traditional music",
      "Afrobeat"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'afrobeat'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Afrobeat"
      }
    ],
    "graphNodes": [
      {
        "id": "afrobeat",
        "label": "Afrobeat",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "aria": {
    "publicId": "fb8c7e2e-36a7-4142-a03d-06c0e0917a4c",
    "slug": "aria",
    "name": "Aria",
    "shortDefinition": "A self-contained vocal piece for solo voice with instrumental accompaniment, central to opera, oratorio, and cantata, often expressing a single emotional state.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Vocal",
      "Opera"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A self-contained vocal piece for solo voice with instrumental accompaniment, central to opera, oratorio, and cantata, often expressing a single emotional state.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Aria"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'aria'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Aria"
      }
    ],
    "graphNodes": [
      {
        "id": "aria",
        "label": "Aria",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "symphony": {
    "publicId": "fbac97a4-669e-490c-ac74-bb259c0b0d0b",
    "slug": "symphony",
    "name": "Symphony",
    "shortDefinition": "An extended orchestral composition, usually in four movements, that became the central genre of Western art music from the Classical period onward.",
    "entityType": "Form",
    "region": "Europe",
    "tradition": "Western art music",
    "tags": [
      "Form",
      "Composition",
      "Orchestral"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "An extended orchestral composition, usually in four movements, that became the central genre of Western art music from the Classical period onward.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Italian",
    "taxonomyPath": [
      "World",
      "Europe",
      "Western art music",
      "Symphony"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'symphony'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Symphony"
      }
    ],
    "graphNodes": [
      {
        "id": "symphony",
        "label": "Symphony",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  },
  "pansori": {
    "publicId": "fc95c8b8-2ef2-46d7-89cc-8de139788bf4",
    "slug": "pansori",
    "name": "Pansori",
    "originalName": "p'ansori",
    "shortDefinition": "A Korean narrative vocal genre in which a single singer (kwangdae) tells a story with dramatic vocal technique and a barrel-drum (puk) accompaniment.",
    "entityType": "Genre",
    "region": "East Asia",
    "tradition": "East Asian traditions",
    "tags": [
      "Genre",
      "Vocal",
      "Narrative"
    ],
    "relationshipCount": 0,
    "demonstration": true,
    "definition": "A Korean narrative vocal genre in which a single singer (kwangdae) tells a story with dramatic vocal technique and a barrel-drum (puk) accompaniment.",
    "historicalContext": "This record was staged by the corpus importer from a reference glossary. It remains a machine-generated draft pending editorial review and is not part of the published catalogue.",
    "practicalUsage": "Editorial review should verify the definition against the cited source and assign an entity type and taxonomy path before this record may be considered for publication.",
    "visualAudioDescription": "",
    "editorialStatus": "published",
    "sourceQuality": "unassessed",
    "languageOfOrigin": "Korean",
    "transliteration": "p'ansori",
    "taxonomyPath": [
      "World",
      "Asia",
      "East Asia",
      "Pansori"
    ],
    "related": [],
    "sources": [
      {
        "label": "Reference glossary",
        "citation": "New Grove, s.v. 'p'ansori'.",
        "scope": "Reference glossary",
        "note": "Imported as a machine-generated draft pending editorial review.",
        "url": "https://en.wikipedia.org/wiki/Pansori"
      }
    ],
    "graphNodes": [
      {
        "id": "pansori",
        "label": "Pansori",
        "x": 50,
        "y": 50,
        "emphasis": "main",
        "linkable": true
      }
    ]
  }
};

export const SONATA_TAXONOMY_PREVIEW = [
  { label: "World", detail: "Global starting point", count: "Open" },
  { label: "Asia", detail: "Regional pathways", count: "03" },
  { label: "Africa", detail: "Regional pathways", count: "01" },
  { label: "Europe", detail: "Regional pathways", count: "01" },
  { label: "Americas", detail: "Regional pathways", count: "01" },
];
