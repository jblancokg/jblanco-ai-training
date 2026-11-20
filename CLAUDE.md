# AI Training UI

Astro site with React islands, Tailwind CSS v4. No backend.

This project explores how to work with AI tools throughout the SDLC (Software Development LifeCycle) and how to get the most out of each step in the process.

## Editorial Notes
- don't use em dashes, people interpret this as AI written immediately and will often dismiss the content.
- Focus on practical examples when possible. We want people to have ah-ha moments that relate to their current workflows
- if you see or think content is incorrect please bring it up, it should probably be corrected
- the company uses he google suite, gemini, jira, confluence, claude code, claude cowork and cursor.
- if you see a fact that seems wrong point it out to the user
- Avoid rhetorical flourishes and editorializing: no superlative claims ("This is the single most important..."), no rhetorical amplifiers ("These are exactly the kinds of..."), no throat-clearing ("The reason is simple."). State the point directly and let the content speak for itself.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm format` — format all files with Biome
- `pnpm check` — format + lint + apply safe fixes with Biome
- `pnpm typecheck` — TypeScript type checking via `astro check`

## Stack

- **Astro** — static site generator with island architecture
- **React 19** + TypeScript — interactive components hydrated as islands
- **Tailwind CSS v4** — utility-first styling (imported via `@import "tailwindcss"` in `src/index.css`)

## Project Structure

- `src/data/chapters.ts` — **the central entry point**: defines all chapters, subchapters, navigation, and URL routing. Any new page must be registered here first.
- `src/pages/` — file-based routes (Astro). Chapters with subchapters use folders (e.g., `src/pages/competitive-research/setting-up-your-research.astro`). Leaf chapters without subchapters are single files (e.g., `src/pages/task-breakdowns.astro`).
- `src/layouts/MainLayout.astro` — HTML shell with sidebar and `<slot />`
- `src/components/Sidebar.astro` — navigation sidebar (pure Astro, zero JS)
- `src/components/PageShell.astro` — content page wrapper with breadcrumb and prev/next nav
- `src/components/` — React components used as islands (`client:visible` or `client:load`)
- `astro.config.mjs` — Astro config with React integration and Tailwind
- `TRAINING-PLAN.md` — editorial plan outlining all chapters and what to cover in each

## Formatting

- **Biome** handles formatting and linting (`biome.json`)
- Formatting: tabs, double quotes, semicolons, 160 char line width
- Linting: recommended rules enabled; unused imports/vars off (Astro compat); noisy a11y/React rules off
- Run `pnpm format` to format, `pnpm check` for format + lint + fixes
- Run `pnpm typecheck` for TypeScript checking

## Conventions

- Use Tailwind utility classes for styling; avoid CSS files
- Add new pages as `.astro` files in `src/pages/`
- Interactive React components use `client:visible` (or `client:load` for immediately needed)
- Use `pnpm` as the package manager
- For preformatted/multiline text blocks (folder structures, code examples), use `{`backtick...backtick`}` with `whitespace-pre-wrap` on the container div, not `<pre>` tags. See `src/pages/task-breakdowns/agents-md.astro` for examples.
- Animated and interactive widgets keep a constant size, so text below them never shifts while someone is reading. Timers, step loops, streaming/typing text and revealed messages must not resize the widget. Reserve the space up front: stack every state in one grid cell (`grid` parent, `col-start-1 row-start-1` children, inactive ones `invisible`), or render the final text invisibly behind the animated text (see `src/components/TypeWriter.tsx`). Give every state of an element the same border width and vary only the color.
- Inline element spacing: Astro drops a whitespace-only gap (newline + indentation) between a text node and an adjacent inline element (`<a>`, `<strong>`, `<em>`, `<code>`). So `word⏎<a>…</a>` renders as `word<a>` with no space, and the mirror case `</a>⏎word` renders `</a>word`. When an inline tag (or the word after it) starts on its own line, put an explicit `{" "}` at the end of the preceding line to preserve the space. Keep the space visible in the rendered page, not just the source.
