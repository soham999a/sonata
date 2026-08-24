# Sonata — Design Brainstorm

## Three distinct directions

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| **Editorial Cartography** | A premium knowledge atlas that treats music traditions as connected territories. Fine rules, structured margins, warm paper, and exacting typography express the calm authority of a research publication. | 0.07 |
| **Resonant Archive** | A soft, tactile archival interface inspired by record sleeves, library cards, and acoustic material. It would feel intimate and human, with layered paper surfaces and deliberately slow visual rhythm. | 0.04 |
| **Instrumental Fieldwork** | A spatial, image-led catalog that pairs documentary-scale cultural photography with precise metadata panels. It would foreground musical practice in place while keeping navigation functional and terse. | 0.09 |

## Chosen direction — Editorial Cartography

### Design Movement

Sonata will use **contemporary editorial modernism** influenced by the Matrix identity system: disciplined grids, generous white space, fine hierarchy, and a highly controlled relationship between information and ornament. Rather than decorate music with cliché notation, the interface will represent music as an interconnected field of knowledge.

### Core Principles

1. **Structure creates confidence.** Every page will make its information model visible through considered labels, dividers, proportions, and navigation hierarchy.
2. **Global knowledge without flattening.** Taxonomy and detail views will respect cultural specificity, original-language terms, and non-equivalent concepts.
3. **Reading is the primary interaction.** Search, filters, and graph links should make scholarship easier to move through, never compete with the entry itself.
4. **Restraint is a feature.** Motion, color, curvature, and imagery will be used selectively so the product retains calm authority.

### Color Philosophy

Sonata will be led by **ink black** on an **ivory paper** ground to evoke research material without mimicry. A muted mineral-grey system maintains hierarchy; selective **brass gold** highlights mark citations, taxonomy, active paths, and relationship details. The gold is used sparingly so it feels referential rather than decorative. The ownable color is **Sonata Brass — #B68A4A**.

### Layout Paradigm

The app will behave like a navigable musical atlas: a slim persistent left rail for collection-level navigation, a broad reading field for the active entry, and a contextual right rail for relationships and sources. The landing page will break this structure deliberately with an asymmetric catalogue composition: a search field that spans the page, a vertical taxonomy spine, and a discovery pane.

### Signature Elements

1. **Taxonomy ribbons:** fine horizontal labels and small rectangular markers that trace a concept’s route through world, region, tradition, and category.
2. **Relationship constellations:** quiet line-and-node diagrams that make concept links tangible without pretending to be a scientific graphing tool.
3. **Reference rules:** thin dark rules with brass micro-labels that separate editorial moments, sources, and related knowledge.

### Interaction Philosophy

Interactions should feel like turning attention from one reference note to another. Searches reveal an intentional result panel; taxonomy filters refine content without a hard page break; relationship nodes offer clear, short pathways to adjacent concepts. High-frequency interactions remain near-instant. Focus, selected states, and keyboard navigation are explicit and accessible.

### Animation

Motion is low-amplitude and purposeful. Results, panels, and side sheets enter through 160–240 ms opacity and 6–12 px transform transitions using an assertive ease-out. The relationship constellation may draw in on first load in a single restrained sequence. Hover states use color and a subtle translate/scale treatment, never glowing or bouncing. All non-essential movement is disabled under `prefers-reduced-motion`.

### Typography System

**Manrope** will provide clear, precise interface typography and all uppercase metadata labels. **Newsreader** will provide the entry-title and reading voice, lending a scholarly but open quality without becoming nostalgic. Entry titles use a generous serif scale with tight line-height; interface labels are spaced uppercase at a small scale; definitions remain readable at 16–18 px with comfortable measure.

### Brand Essence

**Sonata is the global music reference system for curious listeners, educators, and researchers who need culture-aware knowledge, not flattened definitions.**

Personality: **scholarly, expansive, composed.**

### Brand Voice

Headlines are precise and invitational; CTAs name an action rather than selling a mood; microcopy acknowledges scope and uncertainty carefully.

> “Follow a term through the musical worlds that give it meaning.”

> “See relationships, sources, and cultural context.”

### Wordmark & Logo

The wordmark should set **SONATA** with expanded, slightly tracked letterforms, paired with a bespoke abstract mark: three offset brass bars connected by a fine black diagonal, suggesting a route through a score and a knowledge graph at once. The mark is not a note, clef, or instrument; it signals structure, relation, and motion.

### Implementation guardrail

Every frontend decision should answer: **“Does this reinforce or dilute Editorial Cartography?”**
