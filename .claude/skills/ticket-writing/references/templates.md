# Ticket Templates

## Standard Ticket Template

```markdown
---
id: [NNN]
title: [Short descriptive title]
status: backlog
priority: high | medium | low
estimate: [N]d
assignee: ""
feature-area: [area-name]
requires: docs/requirements-[feature-name].md
depends-on: []
blocks: []
tags: []
created: [YYYY-MM-DD]
---

# [Title]

## Context

[1-2 paragraphs connecting this to the bigger picture. Reference the requirements doc.]

## What to Build

[Concrete description of the deliverable.]

## Acceptance Criteria

- [ ] [Specific, testable condition]
- [ ] [Specific, testable condition]
- [ ] [Specific, testable condition]

## Dependencies

**Depends on:**
- [#NNN - why]

**Blocks:**
- [#NNN - why]

## Notes

[Additional context, open questions, links.]
```

## Foundation Ticket Template

Use for tickets that set up shared infrastructure other tickets build on.

```markdown
---
id: [NNN]
title: [Infrastructure/foundation component]
status: backlog
priority: high
estimate: [N]d
assignee: ""
feature-area: foundation
requires: docs/requirements-[feature-name].md
depends-on: []
blocks: [list all tickets that need this]
tags: [infrastructure]
created: [YYYY-MM-DD]
---

# [Title]

## Context

This is a foundation ticket that sets up [what] for the [feature] feature. Multiple subsequent tickets depend on this work.

## What to Build

[Concrete description.]

## Acceptance Criteria

- [ ] [Condition]
- [ ] Other tickets can build on this without modification

## Dependencies

**Depends on:** None (foundation ticket)

**Blocks:**
- [List all dependent tickets with brief context]

## Notes

Because other work depends on this, prioritize getting the interfaces/contracts right. Implementation details can be refined later, but the shape of what this exposes should be stable.
```

## Index Template

```markdown
# Tickets: [Feature Name]

**Requirements:** [relative path to requirements doc]
**Created:** [YYYY-MM-DD]
**Total tickets:** [N]

## Dependency Graph

```
[Text tree showing dependencies]
```

## All Tickets

| # | Title | Status | Priority | Estimate | Depends On | Feature Area |
|---|-------|--------|----------|----------|------------|--------------|
| [NNN] | [Title] | [status] | [priority] | [Nd] | [deps] | [area] |

## By Feature Area

### [Area Name]
- #NNN [Title] ([estimate], depends: [deps])
```
