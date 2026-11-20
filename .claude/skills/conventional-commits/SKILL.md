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
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Type

Pick the type that best describes the *primary purpose* of the change:

| Type       | When to use |
|------------|-------------|
| `feat`     | New functionality visible to users |
| `fix`      | Bug fix |
| `docs`     | Documentation only (README, comments, SKILL.md, training content) |
| `style`    | Formatting, whitespace, missing semicolons (no logic change) |
| `refactor` | Code restructuring that doesn't add features or fix bugs |
| `perf`     | Performance improvement |
| `test`     | Adding or updating tests |
| `build`    | Build system, dependencies, config (astro.config, package.json, biome.json) |
| `ci`       | CI/CD pipeline changes |
| `chore`    | Maintenance tasks that don't fit above |
| `content`  | Adding or updating training/educational content (pages, chapters) |

The `content` type is specific to this project since it's a training site and many changes are content additions rather than code features.

### Scope

A short word identifying the area of the codebase. Use the most specific scope that makes sense:

- Page/chapter names: `competitive-research`, `task-breakdowns`, `sidebar`
- System areas: `layout`, `nav`, `components`, `config`, `deps`
- Omit the scope if the change is truly cross-cutting

### Subject line

- Start with a lowercase verb in imperative mood ("add", not "added" or "adds")
- Keep under 50 characters when possible, hard max 72
- No period at the end
- Describe *what* changed, not *how*

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
5. Draft the message and present it to the user before committing
6. Stage the appropriate files (prefer specific files over `git add .`)
7. Commit using a heredoc to preserve formatting

## Examples

**Simple feature:**
```
feat(sidebar): add collapsible chapter groups
```

**Content addition:**
```
content(competitive-research): add setting up your research page
```

**Bug fix with context:**
```
fix(nav): correct prev/next links skipping subchapters

The navigation was using the flat chapter list instead of the
expanded subchapter list, causing it to jump over pages that
were nested under a parent chapter.
```

**Build/config change:**
```
build(deps): upgrade astro to 5.x and update config
```

**Multi-concern change (suggest splitting):**
If staged changes include both a new component and an unrelated config fix, suggest:
```
I see two unrelated changes here. Want me to split these into separate commits?
1. feat(components): add interactive quiz component
2. fix(config): correct base URL in astro config
```

## What to avoid

- Vague messages like "update files" or "fix stuff" or "wip"
- Huge commits that bundle unrelated changes
- Repeating the diff in the commit body (the reader can look at the diff themselves)
- Starting the subject with a capital letter (unless it's a proper noun)
- Adding a period at the end of the subject line
