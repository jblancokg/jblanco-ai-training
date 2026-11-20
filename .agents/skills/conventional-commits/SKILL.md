---
name: conventional-commits
description: Write well-structured conventional commit messages. Use this skill whenever the user asks to commit, says "/commit", wants to create a git commit, or asks for help with commit messages. Also trigger when the user says things like "commit this", "save my changes", "check in my work", or any variation of wanting to record changes to git.
---

# Conventional Commits

Write clear, consistent commit messages that tell a useful story about what changed and why.

## Why this matters

Good commit messages make `git log` useful. When someone runs `git log --oneline` six months from now, each line should tell them what happened without needing to read the diff. Conventional commits also enable automated changelogs and semantic versioning if the project ever needs them.

## Message format

```
<type>(<scope>): <subject> [TICKET-NUMBER]

[optional body]

[optional footer(s)]
```

### Type

Pick the type that best describes the *primary purpose* of the change:

| Type       | When to use |
|------------|-------------|
| `feat`     | New functionality visible to users |
| `fix`      | Bug fix |
| `docs`     | Documentation only (README, comments, guides) |
| `style`    | Formatting, whitespace, missing semicolons (no logic change) |
| `refactor` | Code restructuring that doesn't add features or fix bugs |
| `perf`     | Performance improvement |
| `test`     | Adding or updating tests |
| `build`    | Build system, dependencies, config |
| `ci`       | CI/CD pipeline changes |
| `chore`    | Maintenance tasks that don't fit above |

### Scope

A short word identifying the area of the codebase. Use the most specific scope that makes sense:

- Feature areas: `auth`, `cart`, `payments`, `notifications`
- System areas: `api`, `db`, `config`, `deps`
- Omit the scope if the change is truly cross-cutting

### Subject line

- Start with a lowercase verb in imperative mood ("add", not "added" or "adds")
- Keep under 50 characters when possible, hard max 72
- No period at the end
- Describe *what* changed, not *how*

### Ticket numbers

Include the ticket number in square brackets at the end of the subject line. This links every commit to the business reason behind it and makes tracing changes through your project management tool straightforward.

```
feat(auth): add password reset flow [PROJ-142]
fix(cart): correct discount calculation [PROJ-87]
```

If a commit relates to multiple tickets, include all of them:

```
refactor(api): extract validation middleware [PROJ-201] [PROJ-203]
```

If no ticket exists for the change (e.g., a small cleanup), omit the ticket number rather than making one up.

### Body (when to include one)

Add a body when the subject line alone doesn't explain *why* the change was made. Separate from the subject with a blank line. Wrap at 72 characters.

Good reasons to add a body:
- The change fixes a non-obvious bug (explain the root cause)
- There were multiple reasonable approaches (explain why you chose this one)
- The change has side effects worth noting

You don't need a body for straightforward changes where the subject says it all.

### Footer

Use footers for:
- **Breaking changes**: Start with `BREAKING CHANGE:` and describe what breaks
- **Issue references**: `Closes #123` or `Refs #456`
- **Co-authorship**: `Co-Authored-By: Name <email>`

## Process

When asked to commit:

1. Run `git status` and `git diff --staged` (and `git diff` for unstaged changes) to understand what's changing
2. Run `git log --oneline -5` to see recent commit style for consistency
3. Categorize the changes and pick the right type and scope
4. If changes span multiple unrelated concerns, suggest splitting into separate commits
5. Ask for the relevant ticket number if one isn't provided
6. Draft the message and present it to the user before committing
7. Stage the appropriate files (prefer specific files over `git add .`)
8. Commit using a heredoc to preserve formatting

## Examples

**Simple feature with ticket:**
```
feat(auth): add password reset email [PROJ-142]
```

**Bug fix with context:**
```
fix(nav): correct prev/next links skipping pages [PROJ-98]

The navigation was using the flat chapter list instead of the
expanded subchapter list, causing it to jump over pages that
were nested under a parent chapter.
```

**Build/config change:**
```
build(deps): upgrade react to v19 and update config
```

**Multi-concern change (suggest splitting):**
If staged changes include both a new component and an unrelated config fix, suggest:
```
I see two unrelated changes here. Want me to split these into separate commits?
1. feat(components): add interactive quiz component [PROJ-210]
2. fix(config): correct base URL in astro config [PROJ-211]
```

## What to avoid

- Vague messages like "update files" or "fix stuff" or "wip"
- Huge commits that bundle unrelated changes
- Repeating the diff in the commit body (the reader can look at the diff themselves)
- Starting the subject with a capital letter (unless it's a proper noun)
- Adding a period at the end of the subject line
- Fake or placeholder ticket numbers (omit if there's no ticket)
