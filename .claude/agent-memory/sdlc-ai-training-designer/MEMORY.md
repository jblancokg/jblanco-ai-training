# Designer Agent Memory

## Project Structure
- Routes at `src/routes/N.tsx` (1-8), file-based TanStack Router
- Shared data/components in `src/routes/-design-shared.tsx`
- Each route is self-contained: inline data + components + single default export
- Pattern: `createFileRoute('/N')({ component: DesignN })`

## Existing Designs (1-5)
1. Top Timeline, 2. Left Sidebar, 3. Scroll Story, 4. Command Palette, 5. Card Hub

## New Designs (6-8) — Specs in DESIGN-SPECS.md
6. Mission Control (dark dashboard, 3-col grid)
7. Lab Notebook (warm paper, scientific method structure)
8. Terminal/CLI (command-driven exploration)

## Data Constants (shared across all designs)
- SDLC_STEPS: 8 phases with id, label, num, track (strategy/dev/both)
- TRACK_META: colors per track (violet=strategy, teal=dev, orange=both)
- CHAT_MSGS: 4 messages (user/ai/tool/ai)
- CODE_BLOCK: zod signup schema string
- WORKFLOW: 8 events (user/agent/tool actors)
- MODEL_ROWS: 3 models (Opus/Sonnet/Haiku)
- TypeWriter component: useState + setInterval pattern

## Color Palette
- Backgrounds: stone-50 to stone-950
- Strategy track: violet-400/500/600
- Dev track: teal-400/500/600
- Both track: orange-400/500/600
- Font: Source Serif 4 for headings
