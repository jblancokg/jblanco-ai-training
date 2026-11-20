# Frontend Design Implementer Memory

## Project Overview
- Stack: Astro + React 19 + TypeScript + Tailwind CSS v4
- Routes: `src/pages/` (Astro file-based routing)
- Layouts: `src/layouts/MainLayout.astro` (sidebar + slot), `src/components/PageShell.astro`
- Shared data: `src/data/chapters.ts`
- React islands: `src/components/*.tsx`, mounted with `client:visible` or `client:load`
- Package manager: pnpm

## Design System
- Font: Source Serif 4 (Google Fonts), apply via `style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}`
- Base bg: warm off-white; accent: orange-500; stone palette for text/borders
- Active/highlight: orange ring + bg-orange-50 + border-orange-400
- Section heading pattern: `<h3 className="text-xl font-semibold text-stone-800 mt-10 mb-4" style={{ fontFamily: ... }}>`

## Existing Components
| File | Purpose |
|------|---------|
| TypeWriter.tsx | Char-by-char typewriter; props: text, speed, onDone |
| ChatDemo.tsx | Animated chat sequence using TypeWriter |
| WorkflowTrace.tsx | Step-by-step workflow with auto-advance |
| ReferenceSection.tsx | Reference/link block |
| LlmQueryFlow.tsx | Mock chat UI simulation of LLM request lifecycle (phase state machine) |

## Animation Patterns
- TypeWriter: import from `./TypeWriter`; use a `key` prop to remount/restart when phase changes
- Phase-based state machine: use a `Phase` union type + `PHASE_ORDER` array; compare with `phaseIndex()` via `indexOf`
- `phaseIndex(phase) >= phaseIndex("target")` pattern for "at or past" phase checks
- Auto-advance: `useEffect` keyed on phase + `setTimeout`; store in `useRef<ReturnType<typeof setTimeout> | null>`
- Overlay: separate `overlayVisible` boolean; set true inside a `setTimeout` after forgetting phase starts
- Step cards: `border-stone-200 bg-white opacity-40` future; `border-orange-300 bg-orange-50 shadow-sm` active; `opacity-50` past
- Keyframe animations: inject via `<style>` tag in JSX for slideInRight / fadeIn when Tailwind built-ins aren't enough
- Bounce dots loading indicator: three spans with `animate-bounce` and staggered `animationDelay` inline style
- Persistent caption: below controls, separated by `border-t border-stone-100`

## Layout Conventions
- Two-column: `flex flex-col lg:flex-row gap-4 items-start` (fixed-width left panel, flex-1 right)
- Chat window: `rounded-2xl border border-stone-200 shadow-md overflow-hidden flex flex-col bg-white`
- Chat bubbles: user = right-aligned `bg-orange-500 text-white`; AI = left-aligned `bg-white border border-stone-200`

## Formatting
- Biome: tabs, double quotes, semicolons, 100 char line width
- Run `pnpm format` before committing
- Use `npx tsc --noEmit` for fast type checking (`pnpm typecheck` prompts for package install interactively)
