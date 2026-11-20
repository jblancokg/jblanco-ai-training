---
name: ticket-writing
description: Break down features and requirements into well-structured development tickets saved to the filesystem. Use this skill whenever the user wants to create tickets, break down work into tasks, plan a sprint, write user stories, create dev tasks from requirements, or organize development work. Also use when someone says things like "break this down into tickets," "create tasks for this feature," "what tickets do we need," "plan the work for this," or "turn these requirements into tasks." Even informal requests like "what do we need to build" or "break this up" should trigger this skill when there's a feature or requirements doc involved.
---

# Ticket Writing

You help teams break features down into development tickets that live on the filesystem. Each ticket is a markdown file with YAML frontmatter, organized into status folders. The goal is to produce tickets that a developer can pick up, understand quickly, and deliver in 2-3 days.

## Philosophy

Good tickets share a few qualities that make them genuinely useful rather than bureaucratic overhead:

**Feature ownership over task isolation.** When possible, structure tickets so one developer owns a coherent slice of functionality end-to-end rather than getting handed disconnected pieces. A developer who builds the data model, API endpoint, and basic UI for a feature understands it deeply enough to debug it, extend it, and review others' work on it. This isn't always achievable (some work is naturally cross-cutting), but it's the default to aim for.

**Right-sized work.** Each ticket should represent roughly 2-3 days of development effort. Smaller tickets create overhead and context-switching. Larger tickets hide complexity and make progress hard to track. When something feels like it needs more than 3 days, that's a signal to split it, but split along feature boundaries, not arbitrary lines. Note: Come tasks cannot be broken down, point these out to the user so they are aware.

**Dependencies are first-class.** Tickets explicitly declare what they depend on and what depends on them. This makes sequencing obvious and helps the team see the critical path without a separate planning session.

**Link back to why.** Every ticket connects to the requirements document that motivated it. A developer should be able to trace from their ticket back to the broader feature context in one click.

## Step 0: Understand the Work

Before generating any tickets, get oriented.

### Find the requirements

This skill expects a requirements document to exist. Look for it in `docs/` (typically `docs/requirements-[feature-name].md`). If one doesn't exist, tell the user and suggest they create one first using the requirements-writing skill, or point you to an existing document (Confluence page, Google Doc, etc.) you can work from.

Read the requirements document thoroughly. Understand:
- What is being built and for whom?
- What are the acceptance criteria?
- What's explicitly out of scope?
- What are the open questions or uncertainties?

### Understand the codebase context

If you're in a code repository, look at the existing structure to understand:
- What tech stack is in use?
- What patterns exist for similar features?
- Are there existing components or APIs that this feature will extend?
- Check for an AGENTS.md, CLAUDE.md, or README that describes conventions.

This context shapes how you break down the work. A ticket to "add a new API endpoint" means very different things in a Rails monolith vs. a microservices architecture.

### Ask the user how they want to work

Before generating tickets, ask: "Would you like me to generate a full breakdown of all tickets at once, or walk through them one at a time so you can shape each one?"

**Full breakdown** works well when the requirements are clear and the user wants to see the whole picture quickly. You generate all tickets, the user reviews and adjusts.

**Interactive mode** works well when requirements are fuzzy, the feature is complex, or the user wants to think through sequencing carefully. You propose one ticket at a time, discuss it, then move on.

## Step 1: Break Down the Work

### Think in vertical slices

Prefer breaking features into vertical slices (a complete path through the system) over horizontal layers (all the database work, then all the API work, then all the UI work). Vertical slices:
- Deliver value incrementally
- Keep one developer in context across the stack
- Make it easier to demo progress
- Reduce integration risk

For example, instead of:
- Ticket 1: Create all database tables
- Ticket 2: Build all API endpoints
- Ticket 3: Build all UI components

Prefer:
- Ticket 1: User registration (DB + API + basic UI)
- Ticket 2: User profile editing (DB + API + UI)
- Ticket 3: User avatar upload (storage + API + UI)

### Identify the dependency graph

Map out which tickets block others. Common patterns:
- **Foundation tickets** set up shared infrastructure (data models, auth, core utilities) and should come first
- **Feature tickets** build on the foundation and can often run in parallel
- **Polish tickets** handle edge cases, error states, and UX refinements after core functionality works

### Size check

Review each ticket against the 2-3 day target. If a ticket feels too large, split it if you can. If several tickets feel too small (under a day each), consider combining related ones. Remember: these time estimates assume a developer working with AI tools, so what might traditionally be 4-5 days of work can often fit in 2-3 days.

## Step 2: Write the Tickets

### Directory structure

Tickets live in `docs/tickets/` organized by status:

```
docs/tickets/
  backlog/       # Not yet ready for development
  ready/         # Groomed and ready to pick up
  in-progress/   # Currently being worked on
  done/          # Completed
```

Create these directories if they don't exist. New tickets go in `backlog/` by default.

### Ticket counter

Keep a `.counter` file in `docs/tickets/` that tracks the next ticket number:

```
next: 4
```

Read this file before creating new tickets to get the starting number, then update it after all tickets are written. This prevents numbering collisions when tickets are created across multiple sessions. If the file doesn't exist, scan existing tickets for the highest number and create it.

### File naming

Use this pattern: `[ticket-number]-[short-descriptor].md`

Examples:
- `001-user-data-model.md`
- `002-registration-api.md`
- `003-registration-ui.md`

Number tickets sequentially. The number provides a stable reference for dependencies even if the file gets renamed.

### Ticket format

Every ticket is a markdown file with YAML frontmatter:

```markdown
---
id: 001
title: Short descriptive title
status: backlog
priority: high | medium | low
estimate: 2d
assignee: ""
feature-area: name-of-feature-slice
requires: docs/requirements-[feature-name].md
depends-on: []
blocks: [002, 003]
tags: [backend, api, database]
created: YYYY-MM-DD
---

# [Title]

## Context

A brief paragraph connecting this ticket to the bigger picture. Why does this work need to happen? Link to the requirements doc and reference the specific section that drives this ticket. A developer reading this should immediately understand where this fits.

## What to Build

Clear, specific description of the deliverable. Be concrete about:
- What components, endpoints, models, or files to create/modify
- Expected behavior and key interactions
- Important edge cases to handle

Keep this focused on **what**, not **how**. The developer (possibly with AI assistance) will figure out the implementation approach.

## Acceptance Criteria

- [ ] Criterion 1: specific, testable condition
- [ ] Criterion 2: specific, testable condition
- [ ] Criterion 3: specific, testable condition

These should be checkboxes a developer can tick off. Each one should be independently verifiable.

## Dependencies

**Depends on:** List tickets that must be completed before this one can start, with brief explanation of why.
- #001 - Data model must exist before API can be built

**Blocks:** List tickets that cannot start until this one is done.
- #003 - Registration UI needs this API

## Notes

Any additional context, open questions, links to designs, or technical considerations. Keep it brief. If there are open questions that could affect the work, flag them clearly.
```

### Writing guidelines

- **Be specific.** "Build the user registration endpoint" is better than "Handle user creation." Include expected request/response shapes if relevant.
- **Include the why.** A sentence or two connecting the ticket to user value helps developers make better decisions when they hit ambiguity.
- **Flag unknowns.** If something depends on a decision that hasn't been made, say so explicitly rather than guessing.
- **Cross-reference.** Link to the requirements doc section, related tickets, and any design assets. Use relative paths so links work locally.
- **Keep it scannable.** Developers will skim tickets. Use headers, bullet points, and short paragraphs.

## Step 3: Generate the Index

After creating all tickets, generate (or update) an index file at `docs/tickets/INDEX.md`:

```markdown
# Tickets: [Feature Name]

**Requirements:** [link to requirements doc]
**Created:** YYYY-MM-DD
**Total tickets:** N

## Dependency Graph

A text representation showing the dependency flow:

```
#001 User Data Model
  └── #002 Registration API
       └── #003 Registration UI
  └── #004 Profile API
       └── #005 Profile UI
#006 Avatar Upload (independent)
```

## All Tickets

| # | Title | Status | Priority | Estimate | Depends On | Feature Area |
|---|-------|--------|----------|----------|------------|--------------|
| 001 | User Data Model | backlog | high | 2d | - | registration |
| 002 | Registration API | backlog | high | 2d | #001 | registration |
| ... | ... | ... | ... | ... | ... | ... |

## By Feature Area

### Registration
- #001 User Data Model (2d)
- #002 Registration API (2d, depends: #001)
- #003 Registration UI (3d, depends: #002)

### Profile
- #004 Profile API (2d, depends: #001)
- #005 Profile UI (2d, depends: #004)
```

This index gives the team an at-a-glance view of all the work, its sequencing, and current status. Update it whenever tickets change status.

## Step 4: Review with the User

After generating tickets, walk through them with the user:

1. **Show the dependency graph first** so they see the overall shape of the work
2. **Highlight any sequencing concerns** (too many tickets in sequence = slow; too many in parallel = coordination risk)
3. **Call out assumptions** you made about sizing, grouping, or technical approach
4. **Ask specifically about feature ownership** - do the groupings make sense for how their team works?

Be ready to split, combine, reorder, or rewrite tickets based on feedback. The first pass is a starting point, not a final answer.

## Moving Tickets Between Statuses

When a user asks to update ticket status, move the file to the appropriate folder and update the `status` field in the frontmatter. Update INDEX.md to reflect the change.

To move a ticket: change the `status` frontmatter value and move the file to the matching folder. For example, moving ticket 002 to in-progress:
1. Update frontmatter: `status: in-progress`
2. Move file: `docs/tickets/backlog/002-registration-api.md` to `docs/tickets/in-progress/002-registration-api.md`
3. Update INDEX.md table

## Tips for Better Tickets

- **Don't over-specify implementation.** "Use a PostgreSQL JSONB column" is usually too prescriptive. "Store user preferences in a flexible format" gives the developer room to make good choices.
- **One clear deliverable per ticket.** If you find yourself writing "and also..." that's often a sign to split.
- **Acceptance criteria are a contract.** If it's not in the acceptance criteria, it's not required for this ticket. Be deliberate about what makes the cut.
- **Estimates are guidance, not commitments.** The 2-3 day target helps with sizing, but real work varies. If something turns out bigger, split it during development rather than rushing.
- **Update tickets as you learn.** Tickets written before development starts will have gaps. That's fine. Update them as the team learns more.
