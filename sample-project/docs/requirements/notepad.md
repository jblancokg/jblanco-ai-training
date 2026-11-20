# Notepad

## Overview

The notepad feature provides a small area for short notes, snippets, or temporary information. It consists of a volatile dashboard "scratchpad" for immediate, temporary capture and a dedicated full-page view for managing a permanent collection of notes with autosave capabilities.

## Requirements

1. **Dashboard Notepad (Volatile)**
   - The dashboard widget features a single textarea notes (max 1000 characters).
   - This scratchpad is persists in the browser session but is not part of the permanent `/notes` collection until explicitly converted.
   - A **"Convert to Note"** button allows users to save the notepad content permanently.
   - Upon clicking "Convert to Note", the user is prompted to enter a title (max 100 characters).
   - On successful save, the scratchpad is cleared, and the user is redirected to the full-page view of the new note.

2. **Full-Page Note Management (`/notes`)**
   - A dedicated route to view, search, and manage all saved notes.
   - A "Create your first note" button appears when the list is empty, directing the user to the editor.
   - Users can select a note from the list to view its full content in the editor.
   - Notes autosave based on specific triggers (see Requirement 5).
   - Remove notes directly from the list with a delete icon.
   - A basic search bar at the top of the notes list filters notes by title (case-insensitive).
   - Notes are automatically sorted by the `updatedAt` timestamp (most recently updated first).

3. **Character Limits & Metadata**
   - Each note has a hard character limit of 10,000 characters.
   - The full note view UI displays a live character and word count in the editor's footer.
   - If the limit is reached, further input is blocked, and the count turns red as a visual warning.

4. **Copy to Clipboard**
   - A "Copy" button with icon is available in both the dashboard scratchpad and the full-page editor to quickly copy the entire note content.

5. **Autosave Behavior**
   - For notes already saved to the permanent collection:
     - Automatically saves every 30 seconds if any changes have been detected.
     - Saves immediately when the user navigates away from the `/notes` page or closes the tab.

6. **Persistence**
   - Permanent notes are stored in `localStorage` under the key `notes`.
   - The dashboard scratchpad uses a separate `scratchpad-temp` key to persist across refreshes but remains outside the main collection.

## UI/UX

The dashboard widget will occupy a standard dashboard card with a borderless, auto-expanding textarea. The footer contains a "Convert to Note" button and a "Copy" icon. The "View All" link in the header navigates to the `/notes` list. 

The full page will have a two column view. The left sidebar contains the search bar at the top, followed by a scrollable list of notes. Each list item shows the title and a small delete icon on hover. The editor area will exist to the right of the sidebar. On the top there is a large bold input for the note title, on the middle there is a text area for the note body, and on the bottom there is a metadata bar showing character counts and the "Saving.../Saved" status. When no notes exist, the sidebar is replaced by a centered "Create your first note" button with an edit icon. 

## Data Model

```typescript
// Stored in localStorage under key "notes"
interface Note {
  id: string;           // UUID
  title: string;        // Required, max 100 characters
  content: string;      // Required, max 10,000 characters
  createdAt: number;    // Unix timestamp
  updatedAt: number;    // Unix timestamp, used for sorting
}

// The dashboard scratchpad is a simple string persisted separately
const SCRATCHPAD_KEY = "scratchpad-temp";
```

## Edge Cases

- If `localStorage` is full, the app will prevent the "Convert to Note" action and show an error toast explaining the quota limit.
- Multiple notes can have the same title; they are distinguished by their `id` and `updatedAt` time.
- If the user closes the browser without converting the scratchpad, it remains in the dashboard widget upon return (via `scratchpad-temp`).
- To prevent performance lag, the editor uses a **300ms debounce** before triggering internal state updates or word count calculations.

## Out of Scope

- Rich text/Markdown support.
- Note categorization (folders/tags).
- Image or file attachments.
- Collaboration or cloud syncing.
- Version history or "Undo" for deleted notes.
- Customizable "sort by" functionality for the notes list. 

## Technical Notes

- Feature code resides in `src/features/notes/`.
- Routing is handled via TanStack Router in `src/routes/notes.tsx`.
- Uses a **300ms debounce** on the textarea to avoid redundant processing during active typing.
- The 30 seconds autosave timer is managed via a `useEffect` with `setInterval`, which is cleared on unmount.
- Navigation saves are implemented using the `beforeunload` window event and TanStack Router's `beforeLoad` or navigation guards.
- UI components: shadcn `Card`, `Button`, `Input`, `Textarea`, `ScrollArea`, and `Toast` for error handling.
- The `id` field will be generated using `crypto.randomUUID()`.
