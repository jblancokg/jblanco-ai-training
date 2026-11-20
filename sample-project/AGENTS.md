# Personal Dashboard

A browser-only personal dashboard for managing your day at a glance. No backend, no database. All data lives in localStorage.

This is a living project designed to grow with more tiles and features over time.

## Tech Stack

- **Vite** - bundler and dev server
- **React 19** with TypeScript (strict mode)
- **TanStack Router** - file-based routing (routes live in `src/routes/`)
- **Tailwind CSS v4** - utility-first styling with custom indigo/purple theme
- **shadcn/ui** - component library (components in `src/components/ui/`)
- **pnpm** - package manager

## Commands

- `pnpm dev` - start dev server
- `pnpm build` - production build (runs typecheck first)
- `pnpm lint` - run ESLint
- `pnpm typecheck` - TypeScript type checking

## Project Structure

```
src/
├── components/          # Shared UI (Header, shadcn components)
│   └── ui/              # shadcn/ui components
├── features/            # Feature-based folders
│   ├── todos/           # Todo list (types, hooks, components, seed data)
│   ├── world-clock/     # World clock widget
│   └── important-dates/ # Important dates tracker
├── hooks/               # Shared React hooks
├── lib/                 # Shared utilities (storage wrapper, shadcn utils)
├── routes/              # TanStack Router file-based routes
└── index.css            # Tailwind imports and theme variables
```

Each feature folder contains everything that feature needs: types, hooks, components, and seed data. This keeps related code together and makes it easy to add new features without touching unrelated files.

## Key Patterns

### localStorage Wrapper (`src/lib/storage.ts`)

All persistent data goes through the typed storage wrapper. It provides:
- `getItem<T>(key, fallback)` - typed reads with JSON parsing
- `setItem<T>(key, value)` - typed writes
- An event bus so multiple components react to storage changes within the same tab

The `useStorage` hook in `src/hooks/use-storage.ts` connects React components to this system. Use it like `useState`, but the data persists across page reloads and stays in sync across components.

### Adding a New Feature/Tile

1. Create a feature folder: `src/features/your-feature/`
2. Define types in `types.ts`
3. Create a `use-your-feature.ts` hook backed by `useStorage`
4. Build a `YourFeatureCard.tsx` for the dashboard compact view
5. If it needs a full page, add a route in `src/routes/your-feature.tsx`
6. Add the card to the dashboard grid in `src/routes/index.tsx`
7. Add navigation in `src/components/Header.tsx` if it has a full-page view

### Seed Data

Each feature with stored data includes a `seed-data.ts` file. Seed data uses relative date calculations so the app always looks fresh regardless of when it's first opened. The `useStorage` hook uses seed data as the fallback, so it only loads on the very first visit (before anything is saved to localStorage).

## Documentation

Requirements and task breakdowns live in `docs/`. New features should follow the same pattern: write requirements first (`docs/requirements/`), then break them into tasks (`docs/tasks/`), then build.

## Code Conventions

- Comments focus on **why**, not what
- Named exports for all components and utilities
- TypeScript interfaces colocated with the feature that owns them
- `function` declarations for components, arrow functions for callbacks
- Destructure props in function signatures
- Early returns for guard clauses

## shadcn/ui

Components live in `src/components/ui/`. Add new ones with:

```bash
pnpm dlx shadcn@latest add <component-name>
```

The theme is customized in `src/index.css` using CSS custom properties. Both light and dark mode are supported via a `.dark` class on `<html>`.
