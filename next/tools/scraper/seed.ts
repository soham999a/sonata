import type { RegionEntry } from "./regions.ts";

export type SeedTerm = {
  term: string;
  transliteration?: string;
  definition: string;
  entityType: string;
  originRegion: string;
  regionId: string;
  language?: string;
  tags: string[];
  source: {
    label: string;
    citation: string;
    url?: string;
  };
};

export const SEED_TERMS: SeedTerm[] = [
  // South Asia
  {
    term: "Alap",
    transliteration: "ālāpa",
    definition:
      "The unmetered, improvised introductory section of a Hindustani classical performance in which a rāga is gradually revealed note by note, without percussion.",
    entityType: "Form",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Melody", "Performance", "Form"],
    source: { label: "Reference glossary", citation: "The New Grove Dictionary of Music and Musicians, s.v. 'ālāpa'.", url: "https://en.wikipedia.org/wiki/Alap" },
  },
  {
    term: "Tala",
    transliteration: "tāla",
    definition:
      "A rhythmic cycle or metrical framework used in Indian classical music, organizing time through repeating patterns of beats (mātrās) and stresses.",
    entityType: "Rhythmic concept",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Rhythm", "Performance", "Theory"],
    source: { label: "Reference glossary", citation: "The New Grove Dictionary of Music and Musicians, s.v. 'tāla'.", url: "https://en.wikipedia.org/wiki/Tala_(music)" },
  },
  {
    term: "Raga",
    transliteration: "rāga",
    definition:
      "A melodic framework in Indian classical music defined by a set of characteristic notes, ascending and descending patterns, and expressive nuances, rather than a fixed scale.",
    entityType: "Musical concept",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Melody", "Melodic framework", "Theory"],
    source: { label: "Reference glossary", citation: "Jairazbhoy, The Rāgs of North Indian Music (1971).", url: "https://en.wikipedia.org/wiki/Raga" },
  },
  {
    term: "Raga-Ragini",
    transliteration: "rāga-rāgiṇī",
    definition:
      "A historical South Asian scheme that personified modal melodic frameworks as male rāgas and female rāgiṇīs, used in painting and musical theory across several regional traditions.",
    entityType: "Musical concept",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Melody", "History", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rāga-rāgiṇī'.", url: "https://en.wikipedia.org/wiki/Raga-Ragini" },
  },
  {
    term: "Sitar",
    definition:
      "A long-necked plucked string instrument of the Hindustani tradition, with a gourd resonator, movable frets, and sympathetic strings, used widely in classical and popular music.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Instrument", "Strings", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sitār'.", url: "https://en.wikipedia.org/wiki/Sitar" },
  },
  {
    term: "Tabla",
    definition:
      "A pair of hand-played drums used in Hindustani music, comprising a small treble drum (dāyāṅ) and a larger bass drum (bāyāṅ), tuned to the tonic of the performance.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Instrument", "Rhythm", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'tablā'.", url: "https://en.wikipedia.org/wiki/Tabla" },
  },
  {
    term: "Tanpura",
    transliteration: "tambūrā",
    definition:
      "A long-necked plucked drone instrument in Indian classical music that continuously sounds the tonic and fifth, providing the fixed pitch reference for the performers.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Instrument", "Strings", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'tambūrā'.", url: "https://en.wikipedia.org/wiki/Tanpura" },
  },
  {
    term: "Sargam",
    definition:
      "The Indian solfège syllables (sa, re, ga, ma, pa, dha, ni) used to name the notes of a rāga, parallel in function to Western solfège.",
    entityType: "Theory",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Notation", "Melody", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sargam'.", url: "https://en.wikipedia.org/wiki/Sargam" },
  },
  {
    term: "Dhrupad",
    definition:
      "An ancient and austere form of Hindustani vocal music, characterized by a slow unfold and a strict, meditative treatment of the raga in a lower register.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Genre", "Performance", "Vocal"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'dhrupad'.", url: "https://en.wikipedia.org/wiki/Dhrupad" },
  },
  {
    term: "Khyal",
    transliteration: "khayāl",
    definition:
      "The most widespread form of Hindustani vocal music, offering the soloist greater melodic and expressive freedom within the frame of a rāga and tāla.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Genre", "Performance", "Vocal"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'khayāl'.", url: "https://en.wikipedia.org/wiki/Khyal" },
  },

  // Middle East
  {
    term: "Maqam",
    transliteration: "maqām",
    definition:
      "A system of melodic modes used in Middle Eastern and North African music, each defined by scale, characteristic phrases, tonal centers, and expressive conventions.",
    entityType: "Musical concept",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Mode", "Melody", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'maqām'.", url: "https://en.wikipedia.org/wiki/Maqam" },
  },
  {
    term: "Maqamat",
    transliteration: "maqāmāt",
    definition:
      "The plural of maqām, referring collectively to the melodic modal system and its family of modes in Middle Eastern and North African art music.",
    entityType: "Musical concept",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Mode", "Melody", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'maqām'.", url: "https://en.wikipedia.org/wiki/Maqam" },
  },
  {
    term: "Rast",
    transliteration: "Rāst",
    definition:
      "A principal maqām in Arabic and Turkish music, built on a scale with neutral second and sixth degrees, often regarded as a foundational and stable mode.",
    entityType: "Mode",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Mode", "Melody", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'maqām; Rast'.", url: "https://en.wikipedia.org/wiki/Rast_(maqam)" },
  },
  {
    term: "Ajnas",
    transliteration: "ajnās",
    definition:
      "In Arabic music theory, the tetrachords and pentachords (jins, pl. ajnās) from which maqām scales are constructed as combinations of small interlocking segments.",
    entityType: "Theory",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Theory", "Mode", "Scale"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'maqām; jins'.", url: "https://en.wikipedia.org/wiki/Maqam" },
  },
  {
    term: "Iqa",
    transliteration: "īqāʿ",
    definition:
      "A rhythmic cycle or pattern in Arabic music, analogous to a rhythmic mode, organized into beats, rests, and periodic cycles played on percussion.",
    entityType: "Rhythmic concept",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Rhythm", "Performance", "Cycle"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'īqāʿ'.", url: "https://en.wikipedia.org/wiki/Iqa'" },
  },
  {
    term: "Oud",
    transliteration: "ʿūd",
    definition:
      "A short-necked, fretless plucked lute with a pear-shaped body, central to Arabic, Turkish, Persian, and Greek music, ancestor of the Western lute.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Instrument", "Strings", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ʿūd'.", url: "https://en.wikipedia.org/wiki/Oud" },
  },
  {
    term: "Ney",
    definition:
      "An end-blown cane flute used throughout Middle Eastern and Turkish music, known for its breathy tone and central role in devotional and classical practice.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Turkish",
    tags: ["Instrument", "Wind", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'nay; ney'.", url: "https://en.wikipedia.org/wiki/Ney" },
  },
  {
    term: "Dastgah",
    transliteration: "dastgāh",
    definition:
      "A set of melodic modes and their associated repertory in Persian classical music, each representing a family of gushehs united by a modal basis.",
    entityType: "Musical concept",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Mode", "Melody", "Repertoire"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'dastgāh'.", url: "https://en.wikipedia.org/wiki/Dastgah" },
  },
  {
    term: "Gusheh",
    transliteration: "gusheh",
    definition:
      "A distinct melodic unit or phrase within the Persian radif, grouped according to their dastgāh, that forms the basis of improvisation.",
    entityType: "Form",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Melody", "Form", "Modal"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'gusheh'.", url: "https://en.wikipedia.org/wiki/Gusheh" },
  },
  {
    term: "Radif",
    definition:
      "The canonical repertory of Persian classical music: a memorized sequence of gushehs organized by dastgāh, serving both as a teaching device and performance resource.",
    entityType: "Repertoire",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Repertoire", "Melody", "Tradition"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'radif'.", url: "https://en.wikipedia.org/wiki/Radif_(music)" },
  },

  // Europe
  {
    term: "Fugue",
    definition:
      "A contrapuntal composition in which a subject is stated and then developed through successive imitative entries in different voices, characteristic of the Baroque period.",
    entityType: "Musical form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Counterpoint", "Baroque"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'fugue'.", url: "https://en.wikipedia.org/wiki/Fugue" },
  },
  {
    term: "Sonata",
    definition:
      "A multi-movement work for one or more instruments, and as a formal principle (sonata form) organizing the first movement of such works through exposition, development, and recapitulation.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Composition", "Instrumental"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sonata'.", url: "https://en.wikipedia.org/wiki/Sonata" },
  },
  {
    term: "Concerto",
    definition:
      "A composition typically featuring one or more solo instruments contrasted with an orchestra, in several movements, prominent in the Baroque, Classical, and Romantic eras.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Composition", "Orchestral"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'concerto'.", url: "https://en.wikipedia.org/wiki/Concerto" },
  },
  {
    term: "Symphony",
    definition:
      "An extended orchestral composition, usually in four movements, that became the central genre of Western art music from the Classical period onward.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Composition", "Orchestral"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'symphony'.", url: "https://en.wikipedia.org/wiki/Symphony" },
  },
  {
    term: "Aria",
    definition:
      "A self-contained vocal piece for solo voice with instrumental accompaniment, central to opera, oratorio, and cantata, often expressing a single emotional state.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Vocal", "Opera"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'aria'.", url: "https://en.wikipedia.org/wiki/Aria" },
  },
  {
    term: "Recitative",
    definition:
      "A style of vocal writing that follows the natural rhythms and inflections of speech, used in opera and oratorio to advance dialogue and narrative.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Vocal", "Opera"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'recitative'.", url: "https://en.wikipedia.org/wiki/Recitative" },
  },
  {
    term: "Piano",
    definition:
      "A keyboard instrument in which hammers strike strings, invented around 1700 by Bartolomeo Cristofori, whose dynamic range gave it its name (pianoforte).",
    entityType: "Instrument",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Instrument", "Keyboard", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'pianoforte'.", url: "https://en.wikipedia.org/wiki/Piano" },
  },
  {
    term: "Violin",
    definition:
      "A four-stringed bowed instrument, highest member of the violin family, central to Western classical, folk, and popular music, tuned in fifths.",
    entityType: "Instrument",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Instrument", "Strings", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'violin'.", url: "https://en.wikipedia.org/wiki/Violin" },
  },
  {
    term: "Chorale",
    transliteration: "chorāle",
    definition:
      "A hymn tune of the German Protestant church, typically in four-part homophonic harmonization, as used by J. S. Bach and later composers.",
    entityType: "Genre",
    originRegion: "Europe",
    regionId: "europe",
    language: "German",
    tags: ["Genre", "Vocal", "Sacred"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'chorale'.", url: "https://en.wikipedia.org/wiki/Chorale" },
  },
  {
    term: "Counterpoint",
    definition:
      "The combination of two or more independent melodic lines sounding together, governed by rules of consonance and dissonance, foundational to Western polyphony.",
    entityType: "Theory",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Theory", "Composition", "Polyphony"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'counterpoint'.", url: "https://en.wikipedia.org/wiki/Counterpoint" },
  },

  // East Asia
  {
    term: "Gagaku",
    definition:
      "The ancient court music of Japan, combining instrumental, vocal, and dance traditions that have been preserved continuously since at least the eighth century.",
    entityType: "Genre",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Genre", "Court music", "Tradition"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'gagaku'.", url: "https://en.wikipedia.org/wiki/Gagaku" },
  },
  {
    term: "Koto",
    definition:
      "A long Japanese zither with thirteen silk or nylon strings and movable bridges, played with finger picks, associated with court, chamber, and solo repertoire.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Instrument", "Strings", "Zither"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'koto'.", url: "https://en.wikipedia.org/wiki/Koto_(instrument)" },
  },
  {
    term: "Shamisen",
    definition:
      "A three-stringed plucked lute of Japan, with a square body covered in skin, central to kabuki, bunraku, and folk music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'shamisen'.", url: "https://en.wikipedia.org/wiki/Shamisen" },
  },
  {
    term: "Gugin",
    transliteration: "gǔqín",
    definition:
      "A seven-stringed Chinese zither with a history of over three thousand years, associated with literati culture and refined solo performance.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Chinese",
    tags: ["Instrument", "Strings", "Zither"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'qin'.", url: "https://en.wikipedia.org/wiki/Guqin" },
  },
  {
    term: "Pipa",
    transliteration: "pípá",
    definition:
      "A pear-shaped four-stringed plucked lute of China, with a long tradition in court, solo, and narrative repertoire.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Chinese",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'pipa'.", url: "https://en.wikipedia.org/wiki/Pipa" },
  },
  {
    term: "Gayageum",
    transliteration: "gayageum",
    definition:
      "A twelve-stringed Korean plucked zither, historically divided into court (jeong-ak) and popular/sanjo (sanjomyeon) styles.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Korean",
    tags: ["Instrument", "Strings", "Zither"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'kayagŭm'.", url: "https://en.wikipedia.org/wiki/Gayageum" },
  },
  {
    term: "Pungmul",
    transliteration: "p'ungmul",
    definition:
      "A Korean folk tradition combining percussion, wind, dance, and spectacle, centered on rhythmic patterns played with janggu and buk drums.",
    entityType: "Genre",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Korean",
    tags: ["Genre", "Folk", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'p'ungmul'.", url: "https://en.wikipedia.org/wiki/Pungmul" },
  },
  {
    term: "Sanjo",
    definition:
      "A Korean genre of instrumental solo music that unfolds a sequence of contrasting movements within a single piece, often for gayageum or other instruments.",
    entityType: "Genre",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Korean",
    tags: ["Genre", "Instrumental", "Solo"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sanjo'.", url: "https://en.wikipedia.org/wiki/Sanjo" },
  },

  // Southeast Asia
  {
    term: "Gamelan",
    definition:
      "An Indonesian (especially Balinese and Javanese) instrumental ensemble of metallophones, gongs, drums, and other instruments, tuned to distinct scales and played together as a unified ensemble.",
    entityType: "Genre",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Genre", "Ensemble", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'gamelan'.", url: "https://en.wikipedia.org/wiki/Gamelan" },
  },
  {
    term: "Kendang",
    transliteration: "kendhang",
    definition:
      "A double-headed drum, often in pairs, that leads and shapes tempo and dynamics in Javanese and Balinese gamelan ensembles.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Instrument", "Rhythm", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'kendang'.", url: "https://en.wikipedia.org/wiki/Kendang" },
  },
  {
    term: "Slendro",
    transliteration: "sléndro",
    definition:
      "One of the two principal tuning systems (laras) of Javanese gamelan, a pentatonic scale with roughly equidistant steps.",
    entityType: "Theory",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Tuning", "Scale", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sléndro'.", url: "https://en.wikipedia.org/wiki/Slendro" },
  },
  {
    term: "Pelog",
    transliteration: "pélog",
    definition:
      "One of the two principal tuning systems of Javanese gamelan, a seven-tone scale from which subsets of five tones are used in practice.",
    entityType: "Theory",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Tuning", "Scale", "Theory"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'pélog'.", url: "https://en.wikipedia.org/wiki/Pelog" },
  },
  {
    term: "Khaen",
    transliteration: "khāēn",
    definition:
      "A free-reed mouth organ of Laos and northeastern Thailand, made of bamboo pipes arranged in a frame, associated with lam and mor lam vocal traditions.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Lao",
    tags: ["Instrument", "Wind", "Free reed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'khaen'.", url: "https://en.wikipedia.org/wiki/Khaen" },
  },
  {
    term: "Angklung",
    definition:
      "A bamboo rattle instrument of Sundanese (West Java) tradition, played in tuned frames or shaken individually to produce pitched notes.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Sundanese",
    tags: ["Instrument", "Percussion", "Idiophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'angklung'.", url: "https://en.wikipedia.org/wiki/Angklung" },
  },

  // Sub-Saharan Africa
  {
    term: "Mbira",
    transliteration: "mbira",
    definition:
      "A lamellophone of the Shona people of Zimbabwe, consisting of metal tines plucked over a wooden board and resonator, central to ceremonial music.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Shona",
    tags: ["Instrument", "Idiophone", "Lamellophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'mbira'.", url: "https://en.wikipedia.org/wiki/Mbira" },
  },
  {
    term: "Djembe",
    transliteration: "djembe",
    definition:
      "A goblet-shaped, single-headed drum of West Africa, played with the hands and capable of a wide range of tones, used in ensemble music and dance.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Bambara",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'djembe'.", url: "https://en.wikipedia.org/wiki/Djembe" },
  },
  {
    term: "Talking drum",
    definition:
      "A West African drum (notably the Yoruba dùndún) whose pitch can be modulated by squeezing the lacing, allowing it to imitate the tones of speech.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Yoruba",
    tags: ["Instrument", "Percussion", "Drum", "Communication"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'talking drum'.", url: "https://en.wikipedia.org/wiki/Talking_drum" },
  },
  {
    term: "Kora",
    definition:
      "A 21-stringed bridge-harp of the Mande peoples of West Africa, combining harp and lute characteristics, played by griots (jeli) as accompaniment to song and praise.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Mandinka",
    tags: ["Instrument", "Strings", "Harp-lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'kora'.", url: "https://en.wikipedia.org/wiki/Kora_(instrument)" },
  },
  {
    term: "Highlife",
    definition:
      "A West African popular music genre combining indigenous dance rhythms with Western brass-band and guitar idioms, prominent in Ghana and Nigeria from the early twentieth century.",
    entityType: "Genre",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "English",
    tags: ["Genre", "Popular music", "Band"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'highlife'.", url: "https://en.wikipedia.org/wiki/Highlife" },
  },
  {
    term: "Afrobeat",
    definition:
      "A Nigerian popular music genre pioneered by Fela Kuti, merging West African highlife and Yoruba rhythms with funk, jazz, and political lyricism in large ensemble arrangements.",
    entityType: "Genre",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "English",
    tags: ["Genre", "Popular music", "Funk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'afrobeat'.", url: "https://en.wikipedia.org/wiki/Afrobeat" },
  },

  // North America
  {
    term: "Jazz",
    definition:
      "A music of African American origin characterized by swing, improvisation, and blue notes, which developed through blues, ragtime, and early band traditions and produced numerous styles.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Improvisation", "Swing"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'jazz'.", url: "https://en.wikipedia.org/wiki/Jazz" },
  },
  {
    term: "Blues",
    definition:
      "A secular African American music and form, characterized by the twelve-bar structure and blue notes, originating in the rural South and foundational to later popular styles.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Form", "Blue notes"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'blues'.", url: "https://en.wikipedia.org/wiki/Blues" },
  },
  {
    term: "Improvisation",
    definition:
      "The spontaneous creation of music in performance, which may range from ornamentation of composed material to wholly spontaneous invention, central to jazz and many traditions.",
    entityType: "Theory",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Performance", "Theory", "Creation"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'improvisation'.", url: "https://en.wikipedia.org/wiki/Musical_improvisation" },
  },
  {
    term: "Blue note",
    definition:
      "In blues and jazz, the lowered (flatted) third, fifth, or seventh scale degree sung or played for expressive effect, contributing the music's characteristic color.",
    entityType: "Theory",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Theory", "Pitch", "Harmony"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'blue note'.", url: "https://en.wikipedia.org/wiki/Blue_note" },
  },
  {
    term: "Banjo",
    definition:
      "A plucked string instrument of West African origin, with a skin head stretched over a circular rim and a long neck, central to American folk and bluegrass traditions.",
    entityType: "Instrument",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Instrument", "Strings", "Folk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'banjo'.", url: "https://en.wikipedia.org/wiki/Banjo" },
  },
  {
    term: "Swing",
    definition:
      "A rhythmic feel, especially in jazz, created by unequal subdivision of the beat and a forward momentum that invites dancing; also a genre designation for 1930s big band music.",
    entityType: "Theory",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Rhythm", "Genre", "Jazz"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'swing'.", url: "https://en.wikipedia.org/wiki/Swing_(jazz_performance_style)" },
  },

  // Latin America
  {
    term: "Tango",
    definition:
      "A music and partnered dance genre that emerged in the Río de la Plata region (Argentina and Uruguay), combining African, European, and local elements with a distinctive habanera-based rhythm.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Genre", "Dance", "Popular music"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'tango'.", url: "https://en.wikipedia.org/wiki/Tango" },
  },
  {
    term: "Salsa",
    definition:
      "A popular dance music style of the Caribbean and Latin America, consolidating Cuban son and other forms with New York arrangements, characterized by a driving montuno rhythm and clave.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Genre", "Dance", "Popular music"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'salsa'.", url: "https://en.wikipedia.org/wiki/Salsa_music" },
  },
  {
    term: "Samba",
    definition:
      "A Brazilian music and dance genre of African origin, central to Carnival, with syncopated percussion and a danceable 2/4 rhythm, and a rich family of regional variants.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Portuguese",
    tags: ["Genre", "Dance", "Carnival"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'samba'.", url: "https://en.wikipedia.org/wiki/Samba" },
  },
  {
    term: "Cumbia",
    definition:
      "A Colombian music and dance genre of Indigenous, African, and Spanish origins, characterized by a rhythmic 2/4 pattern and accordion-led ensembles, with broad Latin American popularity.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Genre", "Dance", "Popular music"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'cumbia'.", url: "https://en.wikipedia.org/wiki/Cumbia" },
  },
  {
    term: "Marimba",
    definition:
      "A struck idiophone with wooden bars and resonators, indigenous to Mesoamerica and west Africa and prominent in Guatemala and Mexico, played with mallets.",
    entityType: "Instrument",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Instrument", "Idiophone", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'marimba'.", url: "https://en.wikipedia.org/wiki/Marimba" },
  },
  {
    term: "Charango",
    definition:
      "A small Andean stringed instrument of the lute family, traditionally with ten strings in five courses, whose body may be made from an armadillo shell or wood.",
    entityType: "Instrument",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'charango'.", url: "https://en.wikipedia.org/wiki/Charango" },
  },

  // Caribbean
  {
    term: "Reggae",
    definition:
      "A Jamaican popular music genre that grew out of ska and rocksteady, characterized by an offbeat rhythm and a heavy bass line, and closely associated with Rastafari themes.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "English",
    tags: ["Genre", "Popular music", "Reggae"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'reggae'.", url: "https://en.wikipedia.org/wiki/Reggae" },
  },
  {
    term: "Calypso",
    definition:
      "A Trinidadian vocal and instrumental music genre with roots in African and French-Caribbean traditions, known for witty, topical lyrics and steel-band and carnival associations.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "English",
    tags: ["Genre", "Vocal", "Carnival"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'calypso'.", url: "https://en.wikipedia.org/wiki/Calypso_music" },
  },
  {
    term: "Steel pan",
    definition:
      "A pitched percussion instrument of Trinidad and Tobago made from a tuned steel drum, played with mallets and central to carnival and pan ensembles.",
    entityType: "Instrument",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "English",
    tags: ["Instrument", "Percussion", "Idiophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'steel band'.", url: "https://en.wikipedia.org/wiki/Steelpan" },
  },
  {
    term: "Soca",
    definition:
      "A Trinidadian popular dance music that fused calypso with Indian, funk, and soul elements in the 1970s, characterized by an energetic beat and carnival association.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "English",
    tags: ["Genre", "Dance", "Carnival"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'soca'.", url: "https://en.wikipedia.org/wiki/Soca_music" },
  },
  {
    term: "Ska",
    definition:
      "A Jamaican music genre of the late 1950s and early 1960s, characterized by a walking bass line, guitar offbeats, and a driving beat, antecedent to rocksteady and reggae.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "English",
    tags: ["Genre", "Popular music", "Rhythm"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ska'.", url: "https://en.wikipedia.org/wiki/Ska" },
  },

  // Oceania
  {
    term: "Haka",
    definition:
      "A Māori ceremonial posture dance combining vigorous movement, foot-stamping, and chanting, performed in formal and communal contexts, often by groups.",
    entityType: "Genre",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Māori",
    tags: ["Genre", "Dance", "Ceremonial"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'New Zealand, §I; haka'.", url: "https://en.wikipedia.org/wiki/Haka" },
  },
  {
    term: "Didgeridoo",
    definition:
      "A wind instrument of the Aboriginal peoples of northern Australia, a long wooden tube played with circular breathing to produce a deep drone, often with rhythmic vocal effects.",
    entityType: "Instrument",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Yolngu",
    tags: ["Instrument", "Wind", "Aerophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'didjeridu'.", url: "https://en.wikipedia.org/wiki/Didgeridoo" },
  },
  {
    term: "Fatele",
    definition:
      "A Tokelauan song-dance genre combining sung poetry, rhythm, and dance, performed communally at celebrations and events.",
    entityType: "Genre",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Tokelauan",
    tags: ["Genre", "Dance", "Song"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Tokelau'.", url: "https://en.wikipedia.org/wiki/Fatele" },
  },
  {
    term: "Taonga pūoro",
    transliteration: "taonga pūoro",
    definition:
      "The traditional musical instruments of the Māori people of New Zealand, a term meaning 'treasures that sound,' encompassing flutes, trumpets, and resonant idiophones.",
    entityType: "Concept",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Māori",
    tags: ["Instrument", "Tradition", "Indigenous"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'New Zealand, §I'.", url: "https://en.wikipedia.org/wiki/Taonga_pūoro" },
  },
];

export const SEED_TERMS_BY_REGION: Record<string, SeedTerm[]> = SEED_TERMS.reduce(
  (accumulator, term) => {
    (accumulator[term.regionId] = accumulator[term.regionId] ?? []).push(term);
    return accumulator;
  },
  {} as Record<string, SeedTerm[]>,
);

export function seedTermsForRegion(regionId: string): SeedTerm[] {
  return SEED_TERMS_BY_REGION[regionId] ?? [];
}
