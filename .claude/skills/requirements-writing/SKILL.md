---
name: requirements-writing
description: Write structured, detailed product requirements documents and save them to the docs folder. Use this skill whenever the user wants to write requirements, create a product spec, document a feature, write acceptance criteria, draft a PRD, describe what needs to be built, or capture business requirements. Also use when someone says things like "write up what we need," "document this feature," "spec this out," or "what should the requirements look like for X." Even informal requests like "can you describe what we'd need to build" should trigger this skill.
---

# Requirements Writing

This skill produces clear, detailed requirements documents that bridge the gap between a business idea and what a development team needs to build it. The output lives in a `docs/` folder as markdown files that serve as a shared reference for the whole team.

Good requirements focus on what the system should do and why, without prescribing how to implement it. They give developers enough context to make smart technical decisions while giving stakeholders confidence that their needs are understood.

## Step 0: Deeply Understand the Problem

Do not write requirements until you genuinely understand the problem. Incomplete understanding leads to requirements that miss the point, and rewriting requirements wastes more time than asking good questions upfront.

This step is the most important part of the process. Think of yourself as a consultant who just walked into a company and needs to understand the full picture before making recommendations. You should be asking more questions than you think you need to. The user may not have thought through every angle, and your questions will help them clarify their own thinking.

**Start with the big picture:**

1. **What is being built?** A new feature, a change to something existing, a new product, a workflow improvement?
2. **Who is it for?** The end users, their roles, and what problem this solves for them.
3. **Why does it matter?** The business reason, the pain point, or the opportunity. This context shapes every requirement.
4. **What does success look like?** How will people know this feature is working well?

**Then dig deeper. Ask follow-up questions based on the answers:**

5. **What happens today?** Walk through the current workflow or workaround. Understanding the status quo reveals requirements that a surface-level description would miss.
6. **Who else is affected?** Features rarely exist in isolation. Ask about other teams, systems, or processes that touch this area.
7. **What are the edge cases?** What happens when things go wrong, when data is missing, when a user does something unexpected? These are the requirements that get forgotten and cause the most pain later.
8. **Are there constraints?** Timeline, budget, technical limitations, compliance needs, integration requirements.
9. **What already exists?** Current system behavior, existing documentation, designs, or prior conversations to reference.

**Keep asking until you could explain the feature to someone else.** A good test: if you cannot clearly articulate why this feature matters and how someone would use it in a real scenario, you do not yet understand it well enough to write requirements.

It is better to ask too many questions than to make assumptions. When in doubt, ask. Users would rather answer five more questions than review a requirements document that missed the mark.

**Surface problems and alternatives early.** As you learn about the feature, you may notice potential issues the user has not mentioned -- technical risks, edge cases that could blow up scope, or simpler approaches that would achieve the same goal. If it seems like the user has not already considered these, bring them up during this conversation -- once. A brief "have you considered X?" is helpful; repeatedly pushing back on their decisions is not. Trust that if they acknowledge it and move on, they have their reasons.

If the user provides a link to Confluence, Jira, or other documentation, read it thoroughly and use it as a starting point -- but still ask clarifying questions. Documentation often has gaps or outdated information, and the user's current thinking may have evolved beyond what is written.

## Step 1: Create the Requirements Document

Save the document to the `docs/` folder using a descriptive kebab-case filename:

```
docs/requirements-[feature-name].md
```

If the `docs/` folder does not exist, create it.

For large features with multiple distinct areas, split into separate files:

```
docs/
  requirements-[feature]-overview.md
  requirements-[feature]-user-management.md
  requirements-[feature]-reporting.md
```

Each file should stand on its own while cross-referencing related documents.

## Step 2: Write the Requirements

Follow this structure, adapting sections based on what makes sense for the feature. Not every section applies to every feature.

**Keep it short.** Requirements documents that nobody reads are worthless. Every sentence should earn its place. Use bullet points over paragraphs. One clear sentence beats three that repeat the same idea with different words. If a section can be cut without losing information, cut it. The goal is a document people actually reference, not one that impresses with its length.

### Document Structure

```markdown
# [Feature Name] Requirements

## Overview
[2-3 paragraphs explaining what this feature is, who it serves, and why it matters.
Include enough context that someone unfamiliar with the project can understand
the purpose without reading anything else.]

## Background and Motivation
[The problem being solved. What is happening today that is painful or missing?
What triggered the need for this work? Include specific examples or scenarios
where possible.]

## Users and Stakeholders
[Who interacts with this feature and what they care about. Be specific about
roles rather than generic "users." For example: "Account managers who need
to generate monthly client reports" rather than "users who make reports."]

## Requirements

### [Requirement Area 1]
- [Specific requirement with enough detail to be actionable]
- [Another requirement]

### [Requirement Area 2]
- [Requirements grouped by logical area, not by priority or sprint]

## User Scenarios
[2-4 realistic scenarios showing how different users would interact with the
feature. These are narratives, not test scripts. They help developers and
stakeholders build a shared picture of the intended experience.]

## Acceptance Criteria
[Measurable conditions that must be true for this feature to be considered
complete. Written from the user's perspective.]

## Out of Scope
[Things that are explicitly not included in this work and why. This prevents
scope creep and sets clear boundaries.]

## Open Questions
[Unresolved decisions or unknowns that need input before or during development.
Include who might have the answer.]

## Dependencies
[Other systems, teams, or features that this work depends on or that depend
on this work.]
```

### Writing Guidelines

These guidelines ensure the requirements are useful for the team:

**Be specific, not vague.** "The system should load the dashboard within 2 seconds" is useful. "The system should be fast" is not. When you cannot be specific because the detail is not known yet, say so explicitly and add it to Open Questions.

**Explain the why.** For every requirement, make sure the reason behind it is either obvious from context or stated directly. Developers make better decisions when they understand why something matters. A requirement like "Users must confirm before deleting a project" is better when followed by "because accidental deletions have caused data loss for three customers in the past quarter."

**Use plain language.** Write for the whole team, not just developers. Avoid technical jargon unless the audience is specifically technical. A product manager and a developer should both be able to read and understand the document. Say "the system sends an email" not "the system triggers an SMTP event."

**Include realistic examples.** When describing data or behavior, use real-looking examples rather than abstract descriptions. "A report showing revenue by region for Q3 2024, broken into monthly totals" paints a clearer picture than "the system should support reporting by various dimensions."

**State what, not how.** Requirements describe the desired outcome, not the implementation. "Users can search orders by date range, customer name, or order number" is a requirement. "Use Elasticsearch with a React autocomplete component" is an implementation detail that belongs elsewhere.

**Group logically.** Organize requirements by feature area or user workflow, not by priority or team assignment. Someone reading the document should be able to understand a complete feature area without jumping between sections.

**Flag uncertainties honestly.** If something is an assumption, label it. If a decision has not been made, put it in Open Questions. Do not fill gaps with guesses presented as facts.

**Keep scenarios grounded.** User scenarios should read like something that would actually happen, with realistic details, names, and situations. Avoid generic placeholders like "User A performs Action B."

## Step 3: Review and Refine

After writing the initial draft, do a self-review:

1. **Completeness check** -- Does the document cover everything the user described? Are there obvious gaps in the requirements?
2. **Clarity check** -- Could a new team member understand this without additional context? Are there ambiguous phrases?
3. **Actionability check** -- Could a developer start working from these requirements? Are the acceptance criteria measurable?
4. **Scope check** -- Are the boundaries clear? Is it obvious what is included and what is not?
5. **Assumption check** -- Are assumptions labeled? Are open questions captured?

If the document references other requirements, link to them. If it depends on decisions that have not been made, be explicit about that.

## Working with Existing Requirements

If the user points you to existing requirements (in docs/, Confluence, Jira, etc.):

- Read the existing material thoroughly before making changes
- Preserve the original intent while improving clarity and completeness
- Add new sections rather than deleting existing content unless it is clearly wrong
- Note what changed and why if doing a significant revision
- If the existing format differs from this template, adapt to match their existing conventions rather than forcing a new structure

## Tool and Platform Notes

The company uses Google Suite, Confluence, and Jira. Keep these in mind:

- **Confluence** -- Structure documents with clear H2/H3 headings that translate well to Confluence page hierarchy. Markdown works well for this.
- **Jira** -- If requirements naturally break into individual stories or tasks, note this in the document, but do not create the tickets. The requirements document is the source, the tickets come later.
- **Google Docs** -- If the user wants to share the document in Google Docs, keep formatting simple (headers, lists, tables) so it pastes cleanly.

## Tips for Better Requirements

- Start with the user's words, then refine. Do not over-formalize casual input into sterile corporate language.
- Short paragraphs and bullet points are easier to review than dense text.
- Tables work well for comparing options, listing fields, or showing role-based access.
- If a requirement has edge cases worth noting, include them inline rather than in a separate section.
- Cross-reference related requirements within the same document using section links.
