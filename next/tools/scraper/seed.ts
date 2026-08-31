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

  // ---- South Asia (expanded) ----
  {
    term: "Mridangam",
    transliteration: "mṛdaṅgam",
    definition:
      "A double-headed barrel drum of South Indian (Carnatic) classical music, played with the hands and central to rhythmic (tāla) accompaniment.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Tamil",
    tags: ["Instrument", "Rhythm", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'mṛdaṅga'.", url: "https://en.wikipedia.org/wiki/Mridangam" },
  },
  {
    term: "Veena",
    transliteration: "vīṇā",
    definition:
      "A family of plucked string instruments of South Asian music; the Saraswati veena is the principal concert instrument of Carnatic music.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Instrument", "Strings", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'vīṇā'.", url: "https://en.wikipedia.org/wiki/Veena" },
  },
  {
    term: "Sarod",
    definition:
      "A fretless plucked lute of Hindustani music, with a metal fingerboard and sympathetic strings, used in classical and instrumental performance.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sarod'.", url: "https://en.wikipedia.org/wiki/Sarod" },
  },
  {
    term: "Thumri",
    transliteration: "ṭhumrī",
    definition:
      "A light and expressive genre of North Indian vocal music, associated with romantic and devotional subjects and a flexible treatment of rāga and rhythm.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Genre", "Vocal", "Light classical"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ṭhumrī'.", url: "https://en.wikipedia.org/wiki/Thumri" },
  },
  {
    term: "Kriti",
    transliteration: "kṛti",
    definition:
      "The principal fixed composition form of Carnatic music, setting devotional or narrative text to a rāga and tāla, usually in three sections.",
    entityType: "Form",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Telugu",
    tags: ["Form", "Composition", "Carnatic"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'kṛti'.", url: "https://en.wikipedia.org/wiki/Kriti_(music)" },
  },
  {
    term: "Ragamalika",
    transliteration: "rāgamālikā",
    definition:
      "A Carnatic composition that moves through a succession of different rāgas, one per section, united by a single tāla and melodic continuity.",
    entityType: "Form",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Sanskrit",
    tags: ["Form", "Melody", "Carnatic"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rāgamālā'.", url: "https://en.wikipedia.org/wiki/Ragamalika" },
  },
  {
    term: "Ghazal",
    transliteration: "ghazal",
    definition:
      "A poetic-musical genre of South Asian (especially Urdu and Persian) tradition, setting rhymed couplets to music, popular in North Indian and Pakistani performance.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Urdu",
    tags: ["Genre", "Vocal", "Poetry"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ghazal'.", url: "https://en.wikipedia.org/wiki/Ghazal" },
  },
  {
    term: "Ghatam",
    definition:
      "A clay pot idiophone played with the hands in Carnatic music, its pitch varied by the player's open and closed mouth resonance.",
    entityType: "Instrument",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Tamil",
    tags: ["Instrument", "Percussion", "Idiophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ghaṭam'.", url: "https://en.wikipedia.org/wiki/Ghatam" },
  },
  {
    term: "Bhajan",
    definition:
      "A devotional Hindu song of South Asia, combining hymn text with melodic and rhythmic frameworks in both solo and congregational performance.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Genre", "Devotional", "Vocal"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bhajan'.", url: "https://en.wikipedia.org/wiki/Bhajan" },
  },
  {
    term: "Jhala",
    transliteration: "jhālā",
    definition:
      "A fast, climactic section of Hindustani instrumental music, characterized by rapid repeated strokes and rhythmic intensification within a rāga.",
    entityType: "Form",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Hindi",
    tags: ["Form", "Instrumental", "Performance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'jhālā'.", url: "https://en.wikipedia.org/wiki/Jhala" },
  },

  // ---- Middle East (expanded) ----
  {
    term: "Santur",
    transliteration: "santūr",
    definition:
      "A trapezoidal hammered dulcimer with strings struck by light wooden mallets, used in Persian, Turkish, and Iraqi classical and folk music.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Instrument", "Strings", "Struck"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'santūr'.", url: "https://en.wikipedia.org/wiki/Santur" },
  },
  {
    term: "Setar",
    transliteration: "setār",
    definition:
      "A long-necked plucked lute of Persian classical music, historically with three playing strings plus sympathetic strings, central to Sufi and art traditions.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'setār'.", url: "https://en.wikipedia.org/wiki/Setar" },
  },
  {
    term: "Tar",
    transliteration: "tār",
    definition:
      "A long-necked plucked lute of Iran and the Caucasus, with six strings in three courses and a double-bowl resonance body.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Persian",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'tār'.", url: "https://en.wikipedia.org/wiki/Tar_(string_instrument)" },
  },
  {
    term: "Darbuka",
    transliteration: "darbūka",
    definition:
      "A single-headed goblet drum of the Middle East and North Africa, played with the fingers and used in classical, folk, and popular ensemble music.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'darbūka'.", url: "https://en.wikipedia.org/wiki/Darbuka" },
  },
  {
    term: "Kanun",
    transliteration: "qānūn",
    definition:
      "A plucked zither of the Middle East and North Africa, with a trapezoidal soundboard and numerous strings grouped in courses, played with finger plectra.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Instrument", "Strings", "Zither"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'qānūn'.", url: "https://en.wikipedia.org/wiki/Qanun_(instrument)" },
  },
  {
    term: "Saz",
    definition:
      "A family of long-necked plucked lutes of Turkey and Central Asia, with movable frets, central to Turkish folk and aşık (minstrel) music.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Turkish",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'saz'.", url: "https://en.wikipedia.org/wiki/Ba%C4%9Flama" },
  },
  {
    term: "Duduk",
    definition:
      "A double-reed wind instrument of Armenia and the Caucasus, with a warm nasal tone, used in folk and ceremonial music.",
    entityType: "Instrument",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Armenian",
    tags: ["Instrument", "Wind", "Reed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'duduk'.", url: "https://en.wikipedia.org/wiki/Duduk" },
  },
  {
    term: "Usul",
    definition:
      "In Turkish classical music, a rhythmic cycle or pattern that organizes large and small time units, analogous to the concept of rhythmic mode.",
    entityType: "Rhythmic concept",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Turkish",
    tags: ["Rhythm", "Theory", "Cycle"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'usūl'.", url: "https://en.wikipedia.org/wiki/Usul" },
  },
  {
    term: "Pesrev",
    transliteration: "peşrev",
    definition:
      "An instrumental prelude form in Turkish and Ottoman classical music, usually in a single makam and usul, that opens a performance or suite (fasıl).",
    entityType: "Form",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Turkish",
    tags: ["Form", "Instrumental", "Ottoman"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'peşrev'.", url: "https://en.wikipedia.org/wiki/Peshrev" },
  },
  {
    term: "Taqsim",
    transliteration: "taqsīm",
    definition:
      "A solo instrumental improvisation in Arabic, Turkish, and Persian music that unfolds a maqam or mode in a free, often metric-less manner.",
    entityType: "Form",
    originRegion: "Middle East",
    regionId: "middle-east",
    language: "Arabic",
    tags: ["Form", "Improvisation", "Modal"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'taqsīm'.", url: "https://en.wikipedia.org/wiki/Taqsim" },
  },

  // ---- Europe (expanded) ----
  {
    term: "Tarantella",
    definition:
      "A fast, duple-meter folk dance-music of southern Italy, traditionally associated with tarantism and performed with tambourine accompaniment.",
    entityType: "Genre",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Genre", "Dance", "Folk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'tarantella'.", url: "https://en.wikipedia.org/wiki/Tarantella" },
  },
  {
    term: "Fado",
    definition:
      "A melancholic Portuguese urban song genre, sung to guitar and viola accompaniment, associated with Lisbon and Coimbra.",
    entityType: "Genre",
    originRegion: "Europe",
    regionId: "europe",
    language: "Portuguese",
    tags: ["Genre", "Vocal", "Popular music"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'fado'.", url: "https://en.wikipedia.org/wiki/Fado" },
  },
  {
    term: "Cantata",
    definition:
      "A vocal composition for one or more voices with instrumental accompaniment, comprising several movements, significant in Baroque church and secular music.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Vocal", "Baroque"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'cantata'.", url: "https://en.wikipedia.org/wiki/Cantata" },
  },
  {
    term: "Oratorio",
    definition:
      "A large-scale sacred vocal-instrumental work, usually dramatic in narrative but staged without acting, prominent in the Baroque period.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Vocal", "Sacred"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'oratorio'.", url: "https://en.wikipedia.org/wiki/Oratorio" },
  },
  {
    term: "Rondo",
    definition:
      "A musical form built on the recurrence of a principal theme (refrain) alternating with contrasting episodes, common in Classical sonata and concerto movements.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Italian",
    tags: ["Form", "Instrumental", "Structure"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rondo'.", url: "https://en.wikipedia.org/wiki/Rondo" },
  },
  {
    term: "Motet",
    definition:
      "A polyphonic sacred choral work, historically on a given text, central to medieval, Renaissance, and Baroque church music.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "Latin",
    tags: ["Form", "Vocal", "Sacred"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'motet'.", url: "https://en.wikipedia.org/wiki/Motet" },
  },
  {
    term: "Allemande",
    definition:
      "A stately processional dance of German origin in duple meter, frequently the first movement of the Baroque dance suite.",
    entityType: "Genre",
    originRegion: "Europe",
    regionId: "europe",
    language: "French",
    tags: ["Genre", "Dance", "Suite"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'allemande'.", url: "https://en.wikipedia.org/wiki/Allemande" },
  },
  {
    term: "Sarabande",
    definition:
      "A slow triple-meter dance of Spanish origin, common as a slow movement of the Baroque suite, characterized by an accent on the second beat.",
    entityType: "Genre",
    originRegion: "Europe",
    regionId: "europe",
    language: "Spanish",
    tags: ["Genre", "Dance", "Suite"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'sarabande'.", url: "https://en.wikipedia.org/wiki/Sarabande" },
  },
  {
    term: "Prelude",
    definition:
      "A short instrumental piece that precedes and introduces a larger work or serves as an independent character piece, common from the Baroque period onward.",
    entityType: "Form",
    originRegion: "Europe",
    regionId: "europe",
    language: "French",
    tags: ["Form", "Instrumental", "Introduction"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'prelude'.", url: "https://en.wikipedia.org/wiki/Prelude_(music)" },
  },
  {
    term: "Bagpipe",
    definition:
      "A wind instrument family using enclosed reeds supplied with air from a bag, found across Europe, especially the Scottish Great Highland bagpipe and related forms.",
    entityType: "Instrument",
    originRegion: "Europe",
    regionId: "europe",
    language: "English",
    tags: ["Instrument", "Wind", "Reed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bagpipe'.", url: "https://en.wikipedia.org/wiki/Bagpipes" },
  },

  // ---- East Asia (expanded) ----
  {
    term: "Erhu",
    transliteration: "èrhú",
    definition:
      "A two-stringed spike fiddle of China, with a long neck and a snake-skin-covered resonator, central to solo, chamber, and opera music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Chinese",
    tags: ["Instrument", "Strings", "Bowed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'erhu'.", url: "https://en.wikipedia.org/wiki/Erhu" },
  },
  {
    term: "Dizi",
    transliteration: "dízi",
    definition:
      "A transverse bamboo flute of China, with a distinctive buzzing membrane-covered hole, used in folk and classical instrumental music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Chinese",
    tags: ["Instrument", "Wind", "Flute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'dizi'.", url: "https://en.wikipedia.org/wiki/Dizi_(instrument)" },
  },
  {
    term: "Guzheng",
    transliteration: "gǔzhēng",
    definition:
      "A large plucked zither of China with movable bridges and (modernly) up to 21 strings, used in solo and ensemble music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Chinese",
    tags: ["Instrument", "Strings", "Zither"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'zheng'.", url: "https://en.wikipedia.org/wiki/Guzheng" },
  },
  {
    term: "Taiko",
    definition:
      "A family of large Japanese barrel drums, played with sticks in ritual, theater, and contemporary ensemble performance.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'taiko'.", url: "https://en.wikipedia.org/wiki/Taiko" },
  },
  {
    term: "Shakuhachi",
    definition:
      "An end-blown bamboo flute of Japan, associated with Zen meditation (honkyoku) and ensemble and contemporary music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Instrument", "Wind", "Flute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'shakuhachi'.", url: "https://en.wikipedia.org/wiki/Shakuhachi" },
  },
  {
    term: "Hichiriki",
    definition:
      "A short double-reed wind instrument of Japan, central to the court music gagaku, valued for its penetrating nasal tone.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Instrument", "Wind", "Reed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'hichiriki'.", url: "https://en.wikipedia.org/wiki/Hichiriki" },
  },
  {
    term: "Pansori",
    transliteration: "p'ansori",
    definition:
      "A Korean narrative vocal genre in which a single singer (kwangdae) tells a story with dramatic vocal technique and a barrel-drum (puk) accompaniment.",
    entityType: "Genre",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Korean",
    tags: ["Genre", "Vocal", "Narrative"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'p'ansori'.", url: "https://en.wikipedia.org/wiki/Pansori" },
  },
  {
    term: "Janggu",
    transliteration: "changgo",
    definition:
      "A Korean hourglass-shaped double-headed drum, played with a stick and a hand, central to folk (pungmul, samulnori) and classical music.",
    entityType: "Instrument",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Korean",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'changgo'.", url: "https://en.wikipedia.org/wiki/Janggu" },
  },
  {
    term: "Noh",
    definition:
      "A Japanese masked theater genre integrating stylized movement, chant (utai), and instrumental ensemble (hayashi), evolving from the medieval period.",
    entityType: "Genre",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Genre", "Theater", "Ritual"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'nō'.", url: "https://en.wikipedia.org/wiki/Noh" },
  },
  {
    term: "Rokudan",
    definition:
      "A well-known koto solo composition of the Edo period, consisting of six dan (sections) of rising length and momentum.",
    entityType: "Form",
    originRegion: "East Asia",
    regionId: "east-asia",
    language: "Japanese",
    tags: ["Form", "Instrumental", "Repertoire"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rokudan'.", url: "https://en.wikipedia.org/wiki/Rokudan_no_Shirabe" },
  },

  // ---- Southeast Asia (expanded) ----
  {
    term: "Saron",
    definition:
      "A metallophone struck with a mallet in the Javanese and Balinese gamelan, one of the core melodic instruments of the ensemble.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Instrument", "Idiophone", "Metallophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'saron'.", url: "https://en.wikipedia.org/wiki/Saron_(instrument)" },
  },
  {
    term: "Bonang",
    definition:
      "A set of small tuned gongs arranged in rows on a frame, struck with padded mallets, prominent in the Javanese gamelan.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Instrument", "Gong", "Metallophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bonang'.", url: "https://en.wikipedia.org/wiki/Bonang" },
  },
  {
    term: "Gong ageng",
    definition:
      "The largest and deepest gong in the Javanese gamelan, struck to punctuate the largest musical phrases and mark structural periods.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Instrument", "Gong", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'gong'.", url: "https://en.wikipedia.org/wiki/Gong_ageng" },
  },
  {
    term: "Rebab",
    definition:
      "A two-stringed spike fiddle, usually bowed, that leads the melodic elaboration in the Javanese gamelan.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Javanese",
    tags: ["Instrument", "Strings", "Bowed"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rebab'.", url: "https://en.wikipedia.org/wiki/Rebab" },
  },
  {
    term: "Pinpeat",
    definition:
      "The principal ceremonial orchestra of Cambodia, a percussion-and-wind ensemble associated with court, ritual, and shadow-puppet performance.",
    entityType: "Ensemble",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Khmer",
    tags: ["Ensemble", "Ceremonial", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Cambodia'.", url: "https://en.wikipedia.org/wiki/Pinpeat" },
  },
  {
    term: "Mahori",
    definition:
      "A Thai ensemble combining string, wind, and percussion instruments, known for warm textures and moderate tempo.",
    entityType: "Ensemble",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Thai",
    tags: ["Ensemble", "Mixed", "Court"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Thailand'.", url: "https://en.wikipedia.org/wiki/Mahori" },
  },
  {
    term: "Kulintang",
    definition:
      "A gong-chime ensemble tradition of the southern Philippines, Indonesia (Kalimantan), and Borneo, centered on a row of small bossed gongs.",
    entityType: "Ensemble",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Maranao",
    tags: ["Ensemble", "Gong", "Tradition"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'kulintang'.", url: "https://en.wikipedia.org/wiki/Kulintang" },
  },
  {
    term: "Saung",
    definition: "A Burmese arched harp with a curved neck and silk strings, the national instrument of Myanmar, associated with classical court music.",
    entityType: "Instrument",
    originRegion: "Southeast Asia",
    regionId: "southeast-asia",
    language: "Burmese",
    tags: ["Instrument", "Strings", "Harp"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Myanmar'.", url: "https://en.wikipedia.org/wiki/Saung" },
  },
  {
    term: "Kathakali",
    definition:
      "A classical dance-drama of Kerala, South India, in which elaborately costumed performers mime a narrative to vocal and percussion accompaniment.",
    entityType: "Genre",
    originRegion: "South Asia",
    regionId: "south-asia",
    language: "Malayalam",
    tags: ["Genre", "Dance-drama", "Ritual theater"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Kathakali'.", url: "https://en.wikipedia.org/wiki/Kathakali" },
  },

  // ---- Sub-Saharan Africa (expanded) ----
  {
    term: "Adowa",
    definition:
      "A ceremonial Akan (Ghanaian) music and dance tradition of the Ashanti and related peoples, performed at funerals and festivals with drum and song.",
    entityType: "Genre",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Twi",
    tags: ["Genre", "Drum", "Ceremonial"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Ghana'.", url: "https://en.wikipedia.org/wiki/Adowa" },
  },
  {
    term: "Udu",
    definition:
      "A clay-pot idiophone with a side hole, played with the hands and producing deep resonant tones, traditionally of the Igbo people of Nigeria.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Igbo",
    tags: ["Instrument", "Percussion", "Idiophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'udū'.", url: "https://en.wikipedia.org/wiki/Udu" },
  },
  {
    term: "Shekere",
    definition:
      "A gourd rattle covered with a net of beads or seeds, shaken and struck in West African and Afro-diasporic music.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Yoruba",
    tags: ["Instrument", "Percussion", "Shaken"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'shekere'.", url: "https://en.wikipedia.org/wiki/Shekere" },
  },
  {
    term: "Balafon",
    definition:
      "A struck xylophone with gourd resonators, of the Mande peoples of West Africa, played by griots and central to ceremonial and praise music.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Mandinka",
    tags: ["Instrument", "Idiophone", "Xylophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'balafon'.", url: "https://en.wikipedia.org/wiki/Balafon" },
  },
  {
    term: "Soukous",
    definition:
      "A Congolese popular dance music genre, known for fast-paced guitar riffs, dynamic rhythm, and prominent bass lines, influential across Africa.",
    entityType: "Genre",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Lingala",
    tags: ["Genre", "Popular music", "Dance"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Congo, Democratic Republic of the'.", url: "https://en.wikipedia.org/wiki/Soukous" },
  },
  {
    term: "Mbalax",
    definition:
      "A Senegalese popular music genre fusing traditional sabar drumming with American funk, jazz, and rock influences, pioneered in the 1970s.",
    entityType: "Genre",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Wolof",
    tags: ["Genre", "Popular music", "Percussion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Senegal'.", url: "https://en.wikipedia.org/wiki/Mbalax" },
  },
  {
    term: "Amadinda",
    definition:
      "A log xylophone of the Baganda people of Uganda, played by several performers and central to royal and ceremonial music.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Luganda",
    tags: ["Instrument", "Idiophone", "Xylophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Uganda'.", url: "https://en.wikipedia.org/wiki/Amadinda" },
  },
  {
    term: "Jembe",
    transliteration: "djembe",
    definition:
      "An alternative spelling of djembe, a goblet-shaped hand drum of West Africa capable of bass, tone, and slap sounds.",
    entityType: "Instrument",
    originRegion: "Sub-Saharan Africa",
    regionId: "sub-saharan-africa",
    language: "Bambara",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'djembe'.", url: "https://en.wikipedia.org/wiki/Djembe" },
  },

  // ---- North America (expanded) ----
  {
    term: "Ragtime",
    definition:
      "A late-19th-century African American piano genre characterized by syncopated melody over a steady, march-like bass, influential on early jazz.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Piano", "Syncopation"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ragtime'.", url: "https://en.wikipedia.org/wiki/Ragtime" },
  },
  {
    term: "Gospel",
    definition:
      "A genre of Christian vocal music rooted in African American churches, combining call-and-response, harmony, and emotional delivery; also a related white southern tradition.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Vocal", "Sacred"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'gospel music'.", url: "https://en.wikipedia.org/wiki/Gospel_music" },
  },
  {
    term: "Bluegrass",
    definition:
      "A country music subgenre of the American South, featuring acoustic string instruments and close vocal harmonies, rooted in Appalachian traditions.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Strings", "Folk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bluegrass'.", url: "https://en.wikipedia.org/wiki/Bluegrass_music" },
  },
  {
    term: "Fiddle",
    definition:
      "The colloquial term for the violin, especially as used in folk, country, bluegrass, and traditional music of North America and elsewhere.",
    entityType: "Instrument",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Instrument", "Strings", "Folk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'fiddle'.", url: "https://en.wikipedia.org/wiki/Fiddle" },
  },
  {
    term: "Washboard",
    definition:
      "A corrugated metal board played with thimbles or sticks as a percussion instrument, used in jug bands, blues, and folk music.",
    entityType: "Instrument",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Instrument", "Percussion", "Folk"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'washboard'.", url: "https://en.wikipedia.org/wiki/Washboard_(musical_instrument)" },
  },
  {
    term: "Zydeco",
    definition:
      "A dance music of the Louisiana Creole (Black Creole) community, combining French folk songs with blues, R&B, and accordion/fiddle instrumentation.",
    entityType: "Genre",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Genre", "Dance", "Creole"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'zydeco'.", url: "https://en.wikipedia.org/wiki/Zydeco" },
  },
  {
    term: "Powwow drum",
    definition:
      "A large communal drum central to North American Indigenous powwow singing, around which a singing group (drum) performs songs in unison.",
    entityType: "Instrument",
    originRegion: "North America",
    regionId: "north-america",
    language: "English",
    tags: ["Instrument", "Percussion", "Indigenous"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Native American music'.", url: "https://en.wikipedia.org/wiki/Pow_wow" },
  },

  // ---- Latin America (expanded) ----
  {
    term: "Mariachi",
    definition:
      "A Mexican ensemble tradition combining violin, guitarrones, trumpets, and vihuela, performing rancheras, corridos, and other regional songs in festive and formal settings.",
    entityType: "Ensemble",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Ensemble", "Folk", "Mexico"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'mariachi'.", url: "https://en.wikipedia.org/wiki/Mariachi" },
  },
  {
    term: "Ranchera",
    definition:
      "A Mexican song genre rooted in rural life and derived from the mariachi tradition, characterized by its verse-chorus form and expressive vocal delivery.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Genre", "Song", "Mexico"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'ranchera'.", url: "https://en.wikipedia.org/wiki/Ranchera" },
  },
  {
    term: "Corrido",
    definition:
      "A Mexican narrative ballad genre that recounts historical, political, and social events, typically sung over simple guitar accompaniment.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Genre", "Narrative", "Ballad"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'corrido'.", url: "https://en.wikipedia.org/wiki/Corrido" },
  },
  {
    term: "Bossa nova",
    definition:
      "A Brazilian genre combining samba rhythm with jazz harmony and cool vocal style, emerging in Rio de Janeiro in the late 1950s.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Portuguese",
    tags: ["Genre", "Popular music", "Brazil"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bossa nova'.", url: "https://en.wikipedia.org/wiki/Bossa_nova" },
  },
  {
    term: "Forró",
    definition:
      "A Brazilian dance music of the Northeast, featuring accordion (sanfona), zabumba drum, and triangle, popular at festivals and informal gatherings.",
    entityType: "Genre",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Portuguese",
    tags: ["Genre", "Dance", "Brazil"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Brazil'.", url: "https://en.wikipedia.org/wiki/Forr%C3%B3" },
  },
  {
    term: "Agogo",
    definition:
      "A West African and Brazilian bell idiophone, a double (usually two-pitched) bell struck with a stick, prominent in samba and Afro-Brazilian music.",
    entityType: "Instrument",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Portuguese",
    tags: ["Instrument", "Percussion", "Bell"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'agogô'.", url: "https://en.wikipedia.org/wiki/Agog%C3%B4" },
  },
  {
    term: "Conjunto",
    definition:
      "A Mexican-American (Tejano) ensemble and genre built around button accordion and bajo sexto, associated with norteño music of northern Mexico and Texas.",
    entityType: "Ensemble",
    originRegion: "Latin America",
    regionId: "latin-america",
    language: "Spanish",
    tags: ["Ensemble", "Tejano", "Accordion"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'conjunto'.", url: "https://en.wikipedia.org/wiki/Conjunto" },
  },

  // ---- Caribbean (expanded) ----
  {
    term: "Son",
    definition:
      "A Cuban music and dance genre combining Spanish guitar and song with African rhythm, a foundation of later salsa; son montuno is a key variant.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "Spanish",
    tags: ["Genre", "Dance", "Cuba"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'son'.", url: "https://en.wikipedia.org/wiki/Son_music" },
  },
  {
    term: "Merengue",
    definition:
      "A fast duple-meter dance music of the Dominican Republic, combining accordion, saxophone, and percussion, central to Dominican national identity.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "Spanish",
    tags: ["Genre", "Dance", "Dominican Republic"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'merengue'.", url: "https://en.wikipedia.org/wiki/Merengue_music" },
  },
  {
    term: "Rara",
    definition:
      "A Haitian street music and procession genre performed during Lent, using bamboo (vaccines), drums, horns, and call-and-response song.",
    entityType: "Genre",
    originRegion: "Caribbean",
    regionId: "caribbean",
    language: "Haitian Creole",
    tags: ["Genre", "Street", "Procession"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Haiti'.", url: "https://en.wikipedia.org/wiki/Rara" },
  },

  // ---- Oceania (expanded) ----
  {
    term: "Hula",
    definition:
      "A Hawaiian dance accompanied by chant (oli) or song (mele), of two main forms: hula kahiko (ancient) and hula 'auana (modern).",
    entityType: "Genre",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Hawaiian",
    tags: ["Genre", "Dance", "Hawaii"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Hawaii'.", url: "https://en.wikipedia.org/wiki/Hula" },
  },
  {
    term: "Ipap",
    definition:
      "A Melanesian (Papua New Guinea) slit gong or garamut, a hollowed log idiophone struck to signal, accompany dance, and mark ritual events.",
    entityType: "Instrument",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Tok Pisin",
    tags: ["Instrument", "Idiophone", "Slit drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Papua New Guinea'.", url: "https://en.wikipedia.org/wiki/Garamut" },
  },
  {
    term: "Taonga",
    definition:
      "In Māori culture, a term meaning 'treasure,' used broadly for culturally valuable objects including taonga pūoro (musical instruments).",
    entityType: "Concept",
    originRegion: "Oceania",
    regionId: "oceania",
    language: "Māori",
    tags: ["Concept", "Culture", "Māori"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'New Zealand, §I'.", url: "https://en.wikipedia.org/wiki/Taonga" },
  },

  // ---- Central Asia (new region) ----
  {
    term: "Shashmaqom",
    transliteration: "šashmaqom",
    definition:
      "A canonical cycle of six maqom suites of the classical music of Uzbekistan and Tajikistan, combining vocal (nasr) and instrumental (mushkilot) sections.",
    entityType: "Repertoire",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Uzbek",
    tags: ["Repertoire", "Maqom", "Classical"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Uzbekistan'.", url: "https://en.wikipedia.org/wiki/Shashmaqam" },
  },
  {
    term: "Dutar",
    transliteration: "dutār",
    definition:
      "A long-necked two-stringed plucked lute of Central Asia (Turkmen, Uzbek, and related traditions), with a pear-shaped body and silk or metal strings.",
    entityType: "Instrument",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Turkmen",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'dutār'.", url: "https://en.wikipedia.org/wiki/Dutar" },
  },
  {
    term: "Rubab",
    transliteration: "rubāb",
    definition:
      "A short-necked plucked lute of Central and South Asia, with a wooden body and sympathetic strings, important in Afghan and North Indian music.",
    entityType: "Instrument",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Dari",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'rubāb'.", url: "https://en.wikipedia.org/wiki/Rubab_(instrument)" },
  },
  {
    term: "Dombra",
    transliteration: "dombra",
    definition:
      "A long-necked two-stringed plucked lute of Kazakhstan, central to Kazakh folk, epic, and instrumental (kuy) music.",
    entityType: "Instrument",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Kazakh",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Kazakhstan'.", url: "https://en.wikipedia.org/wiki/Dombra" },
  },
  {
    term: "Kuy",
    transliteration: "küi",
    definition:
      "A Kazakh solo instrumental composition, especially for the dombra, often programmatic and central to the oral instrumental tradition.",
    entityType: "Form",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Kazakh",
    tags: ["Form", "Instrumental", "Kazakh"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Kazakhstan'.", url: "https://en.wikipedia.org/wiki/K%C3%BCi" },
  },
  {
    term: "Bakhshi",
    transliteration: "baxši",
    definition:
      "A Central Asian epic singer and instrumentalist (often of the dutar or dombra), who recites traditional narratives and songs.",
    entityType: "Role",
    originRegion: "Central Asia",
    regionId: "central-asia",
    language: "Uzbek",
    tags: ["Role", "Epic", "Oral tradition"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Uzbekistan'.", url: "https://en.wikipedia.org/wiki/Bakhshi" },
  },

  // ---- North Africa (new region) ----
  {
    term: "Gnawa",
    transliteration: "gnāwa",
    definition:
      "A Moroccan Sufi brotherhood music and ritual tradition of sub-Saharan African heritage, featuring the guembri, qraqeb, and call-and-response song.",
    entityType: "Genre",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Arabic",
    tags: ["Genre", "Ritual", "Morocco"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Gnawa'.", url: "https://en.wikipedia.org/wiki/Gnawa" },
  },
  {
    term: "Guembri",
    transliteration: "gembri",
    definition:
      "A three-stringed bass lute of the Gnawa tradition of Morocco, a hollow wooden resonator with a skin face, played to set the ritual's rhythmic foundation.",
    entityType: "Instrument",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Berber",
    tags: ["Instrument", "Strings", "Lute"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Gnawa'.", url: "https://en.wikipedia.org/wiki/Guembri" },
  },
  {
    term: "Qraqeb",
    transliteration: "qarāqib",
    definition:
      "Large metal castanets or clappers played in pairs in the Gnawa ritual of Morocco, providing a percussive, rhythmic framework.",
    entityType: "Instrument",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Arabic",
    tags: ["Instrument", "Percussion", "Idiophone"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Gnawa'.", url: "https://en.wikipedia.org/wiki/Qraqeb" },
  },
  {
    term: "Andalusian music",
    definition:
      "A classical music tradition of North Africa, especially Morocco, Algeria, and Tunisia, preserving vocal-instrumental nubas descended from medieval Iberian (Al-Andalus) practice.",
    entityType: "Genre",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Arabic",
    tags: ["Genre", "Classical", "Maghreb"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'nuba'.", url: "https://en.wikipedia.org/wiki/Andalusian_classical_music" },
  },
  {
    term: "Nuba",
    transliteration: "nūba",
    definition:
      "A large multi-movement vocal-instrumental suite of North African (Maghrebi) Andalusian music, organized by rhythmic cycles and modes.",
    entityType: "Form",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Arabic",
    tags: ["Form", "Suite", "Maghreb"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'nūba'.", url: "https://en.wikipedia.org/wiki/Nuba_(music)" },
  },
  {
    term: "Bendir",
    definition:
      "A frame drum of North Africa, especially Morocco, with a single skin and often a snare, used in Berber, Sufi, and folk music.",
    entityType: "Instrument",
    originRegion: "North Africa",
    regionId: "north-africa",
    language: "Berber",
    tags: ["Instrument", "Percussion", "Drum"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'bendir'.", url: "https://en.wikipedia.org/wiki/Bendir" },
  },

  // ---- Indigenous traditions globally (new region) ----
  {
    term: "Inuit throat singing",
    definition:
      "A vocal tradition of Inuit communities in the Arctic (Canada, Greenland, Alaska), typically a duet of two performers producing rhythmic percussive vocal sounds.",
    entityType: "Genre",
    originRegion: "Indigenous traditions globally",
    regionId: "indigenous-traditions-globally",
    language: "Inuktitut",
    tags: ["Genre", "Vocal", "Arctic"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Inuit'.", url: "https://en.wikipedia.org/wiki/Inuit_throat_singing" },
  },

  // ---- Indigenous traditions globally (cont.) ----
  {
    term: "Patagonian trutruka",
    definition:
      "A long trumpet of the Mapuche people of Patagonia (Chile/Argentina), made from a hollowed plant stem with an animal-horn bell, used in ceremonial music.",
    entityType: "Instrument",
    originRegion: "Indigenous traditions globally",
    regionId: "indigenous-traditions-globally",
    language: "Mapudungun",
    tags: ["Instrument", "Wind", "Ceremonial"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Mapuche'.", url: "https://en.wikipedia.org/wiki/Trutruka" },
  },
  {
    term: "Kultrun",
    definition:
      "A ceremonial drum of the Mapuche people, a shallow kettledrum used in the religious machitun ritual, with a decorated skin head.",
    entityType: "Instrument",
    originRegion: "Indigenous traditions globally",
    regionId: "indigenous-traditions-globally",
    language: "Mapudungun",
    tags: ["Instrument", "Percussion", "Ceremonial"],
    source: { label: "Reference glossary", citation: "New Grove, s.v. 'Mapuche'.", url: "https://en.wikipedia.org/wiki/Kultr%C3%BAn" },
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
