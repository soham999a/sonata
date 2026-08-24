# Sonata Part 2: Global Music Knowledge Engine

## Purpose

Part 2 establishes the operating model for a **serious global music knowledge base**. It does not manufacture 15,000 shallow entries. Instead, it defines a 15,350-concept coverage plan, staged import controls, editorial gates, provenance requirements, and culture-aware concept fields that let the corpus grow through reviewed batches.

> A number is a capacity target, not evidence of scholarly quality. Sonata publishes only source-linked concepts that satisfy its editorial gate.

## Research-grounded source strategy

Sonata uses controlled vocabularies and scholarly sources as **starting points**, not as a universal taxonomy imposed on every tradition. The Library of Congress provides music-relevant linked-data vocabularies and the AFS Ethnographic Thesaurus, whose stated purpose includes access and indexing for folklore and ethnomusicology. The Music Library Association catalogues music ontologies and controlled vocabularies such as DOREMUS, Music Ontology, the AFS Ethnographic Thesaurus, and Library of Congress linked data. A Global Jukebox-based study also demonstrates the value—and the interpretive limits—of large, cross-cultural musical datasets; Sonata treats regional classification as reviewable context rather than a definitive cultural claim. [1] [2] [3]

| Source tier | Permitted use in Sonata | Publishing requirement |
| --- | --- | --- |
| Tier A: primary, peer-reviewed, university, national-library, or cultural-institution source | Definitions, historical context, terminology, source claims | At least one linked source record; a source scope and confidence rationale are required |
| Tier B: professional controlled vocabulary or established reference work | Candidate names, normalized labels, synonym discovery, taxonomy alignment | Must be reviewed against source context before publishing a cultural claim |
| Tier C: community or collection metadata | Discovery leads and regional naming variants | Draft-only until independently verified |
| Tier D: unsourced or machine-generated candidate | Ingestion queue only | Never public; automatically marked `low` confidence |

## 15,350-concept coverage plan

The plan distributes capacity across the user-specified global regions rather than allowing English-language Western terminology to dominate. A single concept may legitimately appear in several regional or tradition pathways, but the target counts refer to **primary editorial coverage assignments** so progress reporting does not inflate totals.

| Primary coverage area | Target concepts | Editorial rationale |
| --- | ---: | --- |
| Europe | 1,700 | Includes art, folk, sacred, diasporic, and contemporary practices; not treated as the default model |
| South Asia | 1,600 | Hindustani, Carnatic, regional/folk, devotional, instrument, rhythm, and performance clusters |
| East Asia | 1,500 | Chinese, Japanese, Korean, local/indigenous, notation, ensemble, and instrument clusters |
| Southeast Asia | 1,100 | Gamelan and other regional systems, dance-music, ensembles, tuning, and performance contexts |
| Central Asia | 650 | Modal systems, instruments, epic/performance traditions, and transregional histories |
| Middle East | 1,300 | Arabic, Persian, Turkish, Kurdish, and related musical systems with differentiated labels and sources |
| North Africa | 650 | Amazigh, Arabic, Jewish, Andalusi, Gnawa, diaspora, and locally situated practice clusters |
| Sub-Saharan Africa | 1,600 | Regionally specific traditions, instruments, ensembles, performance contexts, and theory where documented |
| North America | 1,400 | Indigenous traditions, art music, popular forms, community/ceremonial practices, technology, and diaspora context |
| Latin America | 1,450 | Indigenous, Afro-descendant, local and transnational traditions, forms, instruments, dance-music, and production |
| Caribbean | 650 | Island-specific genres, diasporas, ritual, carnival, instruments, sound-system, and recording practices |
| Oceania | 500 | Aboriginal and Torres Strait Islander, Māori, Pacific, local/ceremonial, and contemporary contexts; culturally controlled terms require specialist review |
| Indigenous traditions globally | 1,250 | Cross-regional capacity for self-identified, community-led, and culturally governed terminology that cannot be absorbed into geographic defaults |
| **Total planned primary coverage** | **15,350** | **Capacity target, subject to source availability and specialist review** |

## Concept record standard

Every concept keeps a stable public identifier plus a structured distinction between what is asserted in its own tradition and any later comparison used for navigation or teaching.

| Field group | Required fields for publication |
| --- | --- |
| Identity | `publicId`, canonical name, entity type, one or more taxonomy assignments, editorial status |
| Language | Original-language form where appropriate, native script where available, transliteration system/notes, alternate names, historical names, regional labels |
| Understanding | `emicDescription` first, concise definition, practical use, historical context, modern/diaspora context where relevant |
| Comparison | Optional `eticComparison` stored separately and labeled as comparison rather than definition |
| Time and place | Origin/context notes, regional variation, era tags, period qualifier, uncertainty statement when evidence is incomplete |
| Provenance | Source links, source scope, source confidence, conflict records, editor and reviewer history |
| Graph context | Typed relationships, relationship context, cultural/temporal scope, source for each material relationship |

The era vocabulary includes `ancient`, `medieval`, `renaissance`, `baroque`, `classical`, `romantic`, `modern`, and `contemporary`, with `pre_modern`, `traditional`, `indigenous`, and `ongoing` available when Western periodization would obscure the record.

## Batch lifecycle

Imports operate in small, reviewable batches of 100–500 candidates. Source files land in a staged import record and no row becomes public merely because it parses successfully.

| Stage | System action | Gate |
| --- | --- | --- |
| 1. Intake | Parse CSV, JSON, JSONL, or XLSX; preserve source-row metadata | Valid file/schema required |
| 2. Normalize | Unicode-safe names, native script, transliteration notes, identifier formatting | Original labels never overwritten silently |
| 3. Match | Exact, alternate-name, script, transliteration, and taxonomy-context duplicate-risk checks | Suspected duplicates require merge review |
| 4. Classify | Region, tradition, domain, concept type, era, and culture-context assignments | Low-confidence classifications are flagged, not silently asserted |
| 5. Enrich | Add definitions, historical/practical context, and relationships from admissible sources | Machine output remains draft and carries its source/confidence status |
| 6. Review | Source, cultural-context, relationship, and conflict review | Specialist-review flags block publication |
| 7. Publish | Create a versioned published concept and refresh the search document | Source-linked record and editorial approval required |

## Quality gates and metrics

At the end of every batch, Sonata reports: new concepts, candidate duplicates, relationships created, low-confidence concepts, source conflicts, regional distribution, tradition/domain distribution, era distribution, validation issues, and blocked publication reasons. A quality score is never used to erase disagreement: records with competing definitions preserve variants with their source and context.

### Hard publication blockers

1. Missing canonical name, concept type, or taxonomy context.
2. No source record or no statement of source confidence.
3. Circular hierarchy edge, broken relationship target, or unresolved duplicate conflict.
4. Cultural-context or transliteration uncertainty that has been marked for specialist review.
5. A definition that substitutes a Western comparison for the record’s own conceptual description.

## Technical delivery model

The web application maintains canonical relational records, an auditable staged-import ledger, a rebuildable search projection, and a coverage-target projection. Bulk entry generation is intentionally **not** run automatically. The editorial team brings source-backed batches into the system; controlled validation and review determine what may be published. This protects the eventual 50,000-plus expansion path from untraceable or culturally flattening content.

## References

[1] [Library of Congress, “Controlled Vocabularies.”](https://www.loc.gov/librarians/controlled-vocabularies/)

[2] [Music Library Association, “Standards.”](https://cmc.wp.musiclibraryassoc.org/standards/)

[3] [Passmore and Savage, “The Exceptions and the Rules in Global Musical Diversity.” *Journal of Cognition* (2023).](https://journalofcognition.org/articles/10.5334/joc.312)
