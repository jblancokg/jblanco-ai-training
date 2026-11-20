# Requirements Templates

These templates are starting points. Adapt them to fit the feature being documented. Remove sections that do not apply, add sections that are needed.

## Full Requirements Template

```markdown
# [Feature Name] Requirements

## Overview
[2-3 paragraphs: what is being built, who is it for, and why it matters.]

## Background and Motivation
[The problem or opportunity. What is happening today that is painful, slow,
or missing? What triggered this work?]

## Users and Stakeholders
[Specific roles that interact with this feature and what they care about.]

| Role | What They Need | How They Interact |
|------|---------------|-------------------|
| [Role] | [Their goal] | [How they use the feature] |

## Requirements

### [Area 1: e.g., User Registration]
- [Requirement with enough detail to act on]
- [Another requirement]
- [Edge case or clarification if needed]

### [Area 2: e.g., Dashboard]
- [Grouped by feature area, not by priority]

## User Scenarios

### Scenario 1: [Descriptive name]
[A realistic narrative of a user interacting with the feature. Use a real-sounding
name and situation. Walk through what they do and what the system does in response.]

### Scenario 2: [Descriptive name]
[A different user or situation that exercises a different part of the feature.]

## Acceptance Criteria
- [ ] [Measurable condition that must be true when this feature is done]
- [ ] [Another condition, written from the user's perspective]
- [ ] [Include both happy path and important edge cases]

## Out of Scope
- [Thing explicitly not included] -- [brief reason]
- [Another exclusion] -- [brief reason]

## Open Questions
- [Unresolved question] -- [who might have the answer]
- [Decision that needs to be made] -- [options if known]

## Dependencies
- [System, team, or feature this depends on]
- [External service or API that must be available]
```

## Lightweight Requirements Template

For smaller features or changes that do not need the full treatment:

```markdown
# [Feature/Change Name]

## What and Why
[1 paragraph: what is changing and why it matters.]

## Requirements
- [Requirement]
- [Requirement]
- [Requirement]

## Acceptance Criteria
- [ ] [Condition]
- [ ] [Condition]

## Out of Scope
- [What this does not include]

## Open Questions
- [If any]
```

## User Scenario Template

When writing scenarios, follow this pattern:

```markdown
### [Scenario Name]

**Who:** [Role and relevant context about this person]
**Situation:** [What brought them to this feature]

[Narrative walkthrough of what happens, written in present tense. Include
what the user does, what they see, and how the system responds. Keep it
grounded in realistic details.]

**Outcome:** [What the user achieved and how they feel about it]
```

## Acceptance Criteria Patterns

Different types of requirements call for different acceptance criteria styles:

**Functional behavior:**
- [ ] When [trigger], the system [expected behavior]
- [ ] Given [context], when [action], then [result]

**Data requirements:**
- [ ] The [entity] includes fields for: [list of fields with types/constraints]
- [ ] [Field] accepts values between [min] and [max]

**Integration requirements:**
- [ ] The system sends [data] to [external system] when [trigger]
- [ ] The system handles [error condition] from [external system] by [response]

**User-facing requirements:**
- [ ] Users can [capability] from [location in the product]
- [ ] The [element] displays [information] when [condition]
