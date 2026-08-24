# Sonata Foundation Architecture

## Purpose and implementation boundary

Sonata is designed as a **global music knowledge platform**, not a flat dictionary. This foundation therefore separates the public reading experience from the knowledge model, editorial lifecycle, and import pipeline required to responsibly grow from a curated launch corpus to tens of thousands of concepts. The current implementation will establish the data contracts, UI patterns, and a small clearly labeled demonstration layer; it will not pretend to contain a complete scholarly corpus.

## System shape

| Layer | Responsibility | Foundation decision |
| --- | --- | --- |
| Public web client | Discovery, reading, taxonomy browsing, relationship navigation | React client with responsive routes and read-focused components |
| Application contract | Typed queries and mutations | tRPC routers with public procedures for published content and protected procedures for editorial work |
| Knowledge database | Canonical concepts, names, taxonomy, relationships, sources, revisions | MySQL/TiDB through Drizzle, with UUID public IDs and numeric relation keys where appropriate |
| File storage | Source files, import artifacts, media derivatives | S3-backed object storage; only references and metadata are persisted in the database |
| Editorial workflow | Drafting, review, publication, deprecation, provenance | Explicit status and revision records; no silent overwrite of published material |
| Search service boundary | Exact, prefix, alternate-name, native-script, transliteration, full-text, and filter search | Searchable fields normalize into a `search_documents` projection; database-backed starter queries can later be replaced with an external index without redesigning clients |

## Canonical entities

| Entity | Primary identity | Core responsibility |
| --- | --- | --- |
| `concepts` | Stable UUID (`publicId`) | The durable identity of a musical concept, person, place, work, organization, or instrument. |
| `concept_names` | Stable UUID | English canonical name, original-language form, native script, transliteration, historical spelling, and alternate names. |
| `taxonomy_nodes` | Stable UUID | Browsable nodes for world region, culture, tradition, genre, era, category, theory, form, rhythm, tuning, notation, performance, technology, and instrument. |
| `concept_taxonomy` | Composite mapping | Connects a concept to one or more taxonomy nodes without forcing false equivalence. |
| `concept_relationships` | Stable UUID | A directional, typed edge between concepts with optional context and editorial notes. |
| `sources` | Stable UUID | Reusable bibliographic, archival, or institutional source record. |
| `concept_sources` | Stable UUID | Links a source to a specific concept, claim scope, confidence, and editorial annotation. |
| `concept_revisions` | Stable UUID | Immutable record of who changed a concept, when, why, and which structured fields changed. |
| `editorial_reviews` | Stable UUID | Reviewer decision, status movement, notes, and confidence evaluation. |
| `imports` / `import_rows` | Stable UUID | An auditable data-ingestion batch and its validation results before any publish action. |
| `quality_issues` | Stable UUID | Detected duplication, orphaning, broken references, circular relationships, metadata gaps, or suspected normalization faults. |
| `search_documents` | Stable UUID | Denormalized search projection, generated from canonical data and safe to rebuild. |

## Concept model

`concepts` is intentionally narrow: it holds stable identity, entity type, short and long definition fields, historical/practical/visual-audio context, editorial status, confidence, and timestamps. Culture-specific language and taxonomy are modeled in related records rather than one collection of Western-default columns. This means a concept can be connected to multiple traditions, names, regions, and eras without data loss.

All public interfaces use stable UUIDs. Human-readable slugs are optional presentation aliases and must never be used as a relational primary key. Entity types include `term`, `instrument`, `form`, `genre`, `person`, `place`, `work`, `organization`, and `conceptual_collection`.

## Relationship model

Every relationship is explicitly typed and directional. The allowed starter vocabulary is `related_to`, `part_of`, `type_of`, `subtype_of`, `originated_in`, `used_in`, `influenced`, `influenced_by`, `contrasts_with`, `synonym_of`, `variant_of`, `performed_with`, `associated_with`, `developed_from`, `predecessor_of`, and `successor_of`. Edges store provenance, relevance weight, optional temporal/cultural context, and editorial notes. A relationship is not created simply to increase density.

For symmetric concepts such as `related_to`, the application will canonicalize the pair during validation so duplicate reverse edges cannot exist. Cycle detection applies to hierarchical edge types such as `part_of`, `type_of`, and `subtype_of`.

## Taxonomy approach

Taxonomy is a forest, not a single ladder. A node may have a parent path for browsing, but a concept may attach to several valid taxonomy nodes. This permits navigation such as `World → Asia → South Asia → India → Hindustani Classical → Rāga` without treating `Rāga` as merely a Western scale. Taxonomy nodes carry their own cultural scope and editorial notes so the hierarchy can acknowledge uncertainty and contested groupings.

## Search architecture

The search pipeline has three stages. First, query normalization retains unicode while generating accent-folded and transliteration-friendly forms. Second, matching evaluates canonical names, alternate names, native scripts, transliterations, synomyms, definitions, taxonomy labels, and selected associated entities. Third, ranking balances exact-name match, matched-name role, editorial status, source confidence, and contextual taxonomy relevance. Filters can narrow by category, region, culture, tradition, genre, era, instrument, and relationship type.

The initial release keeps public search results limited to published records. The `search_documents` projection lets the data team later move to a dedicated search service while preserving request and response contracts.

## Editorial workflow

An editor creates or imports a `draft`; automated enrichment is visibly marked `machine_generated` or `machine_reviewed`; an assigned expert can advance a record to `expert_reviewed`; a final publication step exposes it publicly as `published`. `deprecated` concepts remain retrievable by direct identifier but clearly point readers to successor concepts. Every status change requires a reason and creates a revision record.

Editorial confidence is compositional: `confidence_score` is a reviewable signal, while `source_count`, `source_quality`, and review notes explain its basis. Conflicting scholarly interpretations are attached as sourced claims rather than silently merged.

## Import and export pipeline

Imports accept CSV, JSON, JSONL, and XLSX through an upload record and staged rows. Each staged batch proceeds through schema validation, name normalization, UUID validation, duplicate detection, relationship validation, taxonomy classification, uncertainty flagging, and report generation. Nothing becomes published by import alone. The `import_rows` table records warnings and error codes so an editor can correct and rerun only affected rows.

Exports are generated from an explicit concept/revision scope and include schema version metadata. The starter UI will expose an editorial placeholder, while file handling and background jobs are reserved for a subsequent data-operations milestone.

## Quality-control rules

| Rule | Detection strategy | Resolution path |
| --- | --- | --- |
| Duplicate concepts | Normalized name, same-language alias, and definition similarity signals | Queue for merge review; do not merge automatically |
| Invalid UUID or schema | Import-stage validation | Reject row and preserve error report |
| Missing definition | Required field validation before status can become published | Hold as draft |
| Circular hierarchy | Graph traversal on hierarchical edges | Block relationship creation and surface path |
| Broken references | Foreign-key validation and periodic integrity scan | Flag to editor with source row or revision |
| Inconsistent transliteration | Language-aware normalization checks | Mark as needs editorial review, never auto-rewrite original script |
| Unsupported claims | Published claim lacks a linked source or suitable confidence explanation | Flag quality issue and restrict status movement |
| Culturally suspect classification | Taxonomy assignment lacks a context note or reviewer approval where a sensitive grouping is flagged | Send to expert review |

## Implementation sequence

The first foundation will create the normalized schema and validation utilities; expose public read contracts; deliver a polished browse-and-read interface; and provide an internal editorial workbench shell. Bulk import execution, automated enrichment, production search indexing, source-file processing, and broader role management remain next milestones because they require real source data, editorial policy decisions, and staged operations.

## Sample-content policy

Interface preview entries remain intentionally few and are treated as **demonstration records**. They illustrate model shape and navigation only; they are not represented as a scholarly launch dataset, and no customer reviews, ratings, or fabricated testimonials are included.

