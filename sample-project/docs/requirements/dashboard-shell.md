# Dashboard Shell

## Overview

The dashboard shell provides the top-level layout, navigation, and routing for the personal dashboard application. It will serve as the structural foundation that all feature pages render within. The shell will be fully responsive and support light/dark mode theming.

## Requirements

1. **Root Layout**
   - The application will render a persistent layout via TanStack Router's root route (`src/routes/__root.tsx`).
   - The layout will include a fixed header and a scrollable main content area below it.
   - All child routes will render inside the main content area via an `<Outlet />`.

2. **Header**
   - The header will display the application name ("My Dashboard") on the left.
   - The header will include a dark mode toggle button on the right.
   - The header will include navigation links to: Dashboard (`/`), Todos (`/todos`), and Important Dates (`/important-dates`).
   - The active route's navigation link will be visually distinguished (e.g., underline or bold).

3. **Dark Mode Toggle**
   - Clicking the toggle will switch between light and dark themes.
   - The selected theme will persist to localStorage so it survives page reloads.
   - The toggle will display a sun icon in dark mode and a moon icon in light mode.
   - On first visit, the system will respect the user's OS-level color scheme preference.

4. **Routing**
   - The app will use TanStack Router with the following routes:
     - `/` — Dashboard (home page with widget grid)
     - `/todos` — Full todo list page
     - `/important-dates` — Full important dates page
   - Navigating to an unknown route will display a simple "Page not found" message.

5. **Dashboard Home Page (`/`)**
   - The dashboard will display feature widgets as compact cards in a responsive grid.
   - On desktop (>=1024px), the grid will show 3 columns.
   - On tablet (>=640px), the grid will show 2 columns.
   - On mobile (<640px), the grid will stack into a single column.
   - Each card widget will have a consistent style: rounded corners, subtle border, padding, and a heading.

6. **Responsive Design**
   - The layout will be usable on viewports from 320px wide and up.
   - The header navigation will collapse into a horizontal scrollable list on small screens.
   - Touch targets will be at least 44x44px on mobile.

## UI/UX

The header will be a slim bar (h-14 or similar) pinned to the top of the viewport with a slight shadow or border to separate it from content. Navigation links will sit inline in the header on desktop. The main content area will have horizontal padding and a max-width container to keep content readable on ultra-wide screens.

The dashboard grid cards will have a white background in light mode and a dark surface color in dark mode. Cards will use shadcn's `Card` component for visual consistency. Each card will include a title and a compact summary of its feature's data, with a "View all" link where a full page exists.

## Data Model

No feature-specific data model. The shell manages only the theme preference:

```typescript
// Stored in localStorage under key "theme"
type Theme = "light" | "dark";
```

## Edge Cases

- If localStorage is unavailable (e.g., private browsing in some browsers), the app will fall back to the OS color scheme preference and will not crash.
- If the user navigates directly to a deep URL (e.g., `/todos`), the shell and header will still render correctly.
- If JavaScript fails to load, the user will see a blank page (this is a known limitation of a client-side SPA).

## Out of Scope

- Server-side rendering or static pre-rendering.
- User authentication or multi-user support.
- Mobile hamburger menu or sidebar navigation drawer.
- Breadcrumb navigation.
- Keyboard shortcut navigation between pages.

## Technical Notes

- The root route and layout live in `src/routes/__root.tsx`.
- The header component lives in `src/components/Header.tsx`.
- shadcn UI components are located in `src/components/ui/`.
- Theme persistence will use the shared localStorage wrapper at `src/lib/storage.ts` via the `src/hooks/use-storage.ts` hook.
- Tailwind v4 dark mode will use the `class` strategy, toggling a `dark` class on the `<html>` element.
- Route definitions live in `src/routes/`.
