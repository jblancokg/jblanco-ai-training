---
name: competitive-research
description: Conduct structured competitive research and produce polished deliverables (battlecards, SWOT analyses, comparison matrices, executive summaries). Use this skill whenever the user wants to research competitors, compare products or vendors, analyze a market landscape, build a battlecard, create a competitive comparison, evaluate alternatives, or do any form of market intelligence gathering. Also use it when the user mentions sizing up the competition, vendor selection, or wants to understand how their product stacks up.
---

# Competitive Research

This skill turns a vague "look into the competition" request into a structured, source-verified research workspace with polished deliverables. It handles everything from initial scoping through final output.

Research quality depends on discipline: citing every claim, verifying sources, acknowledging what you cannot confirm, and organizing findings so they are useful months later. This skill enforces that discipline.

## Step 0: Clarify the Research Brief

Before creating any files, ask the user enough questions to fill out a clear research brief. Adapt based on what they have already told you.

**Questions to resolve (skip any the user already answered):**

1. **Goal** -- What decision will this research inform? (vendor selection, product positioning, market entry, sales enablement, executive briefing, etc.)
2. **Competitors** -- Which specific companies or products? If the user is unsure, offer to do a landscape scan first to identify them.
3. **Dimensions** -- What matters most? (features, pricing, target market, integrations, developer experience, go-to-market, funding/trajectory, etc.)
4. **Audience** -- Who will read the final output? (engineering team, sales, leadership, investors)
5. **Deliverable format** -- What do they need? (comparison matrix, battlecard, SWOT, executive summary, detailed report, or "you decide")
6. **Known context** -- Do they have existing research, internal docs, or specific URLs to start from? Ask them to share files or links if so.
7. **Scope boundaries** -- Any competitors or dimensions to explicitly exclude?

Once you have enough to proceed, confirm the brief back to the user in a short summary before creating the workspace.

## Step 1: Create the Research Workspace

Create a folder named `competitive-research-[topic]` (kebab-case, descriptive). Use this exact structure:

```
competitive-research-[topic]/
  README.md
  competitors/
    [competitor-name]/
      overview.md
      features.md
      pricing.md
      sources.md
  analysis/
    comparison-matrix.md   (or .csv -- see format guidance below)
    key-findings.md
  deliverables/
```

Create the top-level folders and README.md immediately. Create competitor subdirectories as you begin researching each one. Create analysis and deliverable files as you reach those stages.

**README.md** serves as the research home base. Write it using the template in `references/templates.md` (section: Research README Template). It captures the research brief, methodology, status, and links to all other files.

## Step 2: Research Each Competitor

Work through competitors one at a time. For each competitor:

### 2a. Web Research

Use web search extensively. Do not rely on training data alone -- competitive landscapes change constantly. For each competitor:

- Search for the competitor's official website, pricing page, product pages, and documentation
- Search for recent news, funding announcements, and product launches
- Search for third-party reviews (G2, Capterra, TrustRadius, etc.)
- Search for comparison articles and analyst reports that mention them

Run multiple targeted searches rather than one broad search. Specific queries produce better results than generic ones.

### 2b. Write Findings to Files

As you research, write findings directly into the competitor's files:

- **overview.md** -- Company summary, founding date, funding, employee count (if findable), target market, positioning statement, key differentiators
- **features.md** -- Feature inventory organized by category. Note which features are strengths vs. table stakes vs. gaps. Include specific details, not just feature names.
- **pricing.md** -- Pricing tiers, model (per-seat, usage-based, flat), free tier details, enterprise pricing approach. Note if pricing is public or estimated.
- **sources.md** -- Every URL you referenced, with a one-line description of what it contained and the date accessed. This file is critical. See source citation rules below.

### 2c. Source Citation Rules

These rules are non-negotiable because research without sources is just opinion:

1. **Cite inline.** When you state a fact in any file, include the source URL in a markdown link or footnote right there. Do not make the reader cross-reference a separate file to verify a claim.
2. **Log to sources.md.** Also add every URL to the competitor's `sources.md` with context. This creates a single reference index per competitor.
3. **Mark unverified claims.** If you cannot find a primary source for something, mark it explicitly: `[UNVERIFIED]` or `[BASED ON TRAINING DATA - VERIFY]`. Never present uncertain information as confirmed fact.
4. **Prefer primary sources.** Official websites, documentation, and pricing pages over blog posts. Blog posts over forum comments. Recent over old.
5. **Note access dates.** Information you find today may change tomorrow. Include the date you accessed each source.
6. **Acknowledge gaps.** If pricing is not public, say so. If a feature list is incomplete because the docs are sparse, say so. Gaps are information too.

Read `references/source-quality.md` for detailed guidance on evaluating and ranking sources.

## Step 3: Build the Analysis

After researching all competitors, synthesize findings into the `analysis/` folder:

### Comparison Matrix

Create a comparison matrix covering the dimensions the user cares about. Choose the format based on complexity:

- **Markdown table** -- Good for up to ~8 columns and short cell values. Use for most cases.
- **CSV file** -- Better when there are many columns, or the user will import into a spreadsheet. Name it `comparison-matrix.csv`.
- **Both** -- If the matrix is complex, create the CSV as the source of truth and a simplified markdown version for quick reading.

See `references/templates.md` (section: Comparison Matrix) for column suggestions by research type.

### Key Findings

Write `key-findings.md` summarizing the most important cross-competitor insights:

- Where does the user's product (or preferred option) have clear advantages?
- Where are the biggest competitive threats?
- What unexpected patterns emerged?
- What gaps exist in the market that no competitor fills well?

Ground every finding in specific evidence from the competitor files. Link back to the relevant competitor file and source.

### SWOT Analysis (if requested or appropriate)

If the user asked for a SWOT, or if the research goal naturally calls for one (product positioning, market entry), create `analysis/swot.md`. See `references/templates.md` (section: SWOT Template) for the format.

## Step 4: Create the Deliverable

Based on the research goal and audience, create the final polished deliverable in `deliverables/`. The deliverable should be a standalone document that someone could read without looking at the raw research files.

Common deliverable types and when to use them:

| Deliverable | Best for | File |
|---|---|---|
| **Executive Summary** | Leadership, time-constrained readers | `executive-summary.md` |
| **Battlecard** | Sales teams, competitive positioning | `battlecard.md` |
| **Comparison Matrix** | Technical evaluation, vendor selection | `comparison-matrix.md` or `.csv` |
| **Detailed Report** | Deep analysis, strategic planning | `full-report.md` |
| **Recommendation Memo** | Decision support, vendor selection | `recommendation.md` |

See `references/templates.md` for templates for each type. Adapt them to the specific research -- they are starting structures, not rigid forms.

If the user said "you decide" on format, choose based on the stated goal and audience. Explain your choice.

## Step 5: Review and Limitations

Before presenting the final output, do a self-review:

1. **Source check** -- Scan deliverables for any claim that lacks a source link. Add sources or mark as unverified.
2. **Recency check** -- Flag any information that might be outdated (pricing especially changes frequently).
3. **Bias check** -- Are you presenting competitors fairly, or has framing crept in? Research should inform decisions, not confirm biases.
4. **Completeness check** -- Did you cover all dimensions the user asked about? Note any you could not adequately research and why.

Add a "Limitations and Caveats" section to the deliverable covering:
- Date of research (findings are a snapshot in time)
- Sources that were unavailable or paywalled
- Areas where information was sparse or unverifiable
- Any competitors that were difficult to research and why

Read `references/limitations-guide.md` for common limitation patterns and how to communicate them clearly.

## Updating Existing Research

If the user points you to an existing `competitive-research-*` folder, read the README.md first to understand the prior research scope and methodology. Then:

- Ask what has changed or what new questions they have
- Update competitor files with new findings (do not delete old information -- add updates with dates)
- Refresh the analysis and deliverables
- Update the README.md status and methodology sections

## Tool and Platform Notes

The company uses Google Suite, Confluence, and Jira. If the user mentions wanting to put findings into one of these:

- **Confluence** -- Structure deliverables with H2/H3 headings that map well to Confluence page hierarchy. Markdown converts cleanly.
- **Google Sheets** -- Offer CSV output for comparison matrices so they can import directly.
- **Jira** -- If research produces action items, offer to format them as Jira ticket descriptions.
- **Google Slides** -- For presentation-ready output, structure content as one key point per section with supporting bullets, which maps well to slides.
