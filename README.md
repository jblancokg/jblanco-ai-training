# AI in the SDLC - Training Site

A training resource for using AI tools effectively throughout the Software Development Lifecycle. Covers practical workflows for both strategy (requirements, research, planning) and development (coding, debugging, testing) roles.

Built with Astro, React, and Tailwind CSS.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Commands

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start the dev server                       |
| `pnpm build`       | Production build                           |
| `pnpm lint`        | Run ESLint                                 |
| `pnpm format`      | Format all files with Biome                |
| `pnpm check`       | Format + lint + apply safe fixes via Biome |
| `pnpm typecheck`   | TypeScript type checking via `astro check` |

## Project Structure

```
src/
  data/chapters.ts    # Central entry point: all chapters, nav, and routing
  pages/              # File-based routes (Astro)
  layouts/            # MainLayout with sidebar
  components/         # Astro components + React islands
  index.css           # Tailwind v4 entry point
docs/                 # Requirements and supporting documents
sample-project/       # Hands-on practical exercises
TRAINING-PLAN.md      # Editorial plan for all chapters
CLAUDE.md             # AI tool configuration
```

## Stack

- **Astro** - static site generator with island architecture
- **React 19** + TypeScript - interactive components hydrated as islands
- **Tailwind CSS v4** - utility-first styling
- **Biome** - formatting and linting

## Sample Project

The `sample-project/` directory contains a **Personal Dashboard** app used for hands-on exercises during training. It's a browser-only React app (React 19, TanStack Router, Tailwind CSS v4, shadcn/ui) with widgets like a todo list, world clock, pomodoro timer, and habit tracker. All data lives in localStorage with no backend.

Trainees use this project to practice the full SDLC with AI tools: writing requirements, breaking down tasks, implementing features, debugging, and reviewing code. Requirements docs for unfinished features are in `sample-project/docs/`.

## Adding Content

1. Register new chapters in `src/data/chapters.ts`
2. Create the corresponding `.astro` page in `src/pages/`
3. Use `PageShell.astro` as the content wrapper
4. Interactive elements go in `src/components/` as React islands with `client:visible`
