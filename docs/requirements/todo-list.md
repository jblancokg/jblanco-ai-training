# Todo List

## Overview

The todo list feature will allow users to create, complete, and delete tasks directly in the browser. All data will persist in localStorage so nothing is lost on refresh. The feature will appear as both a compact dashboard widget and a full-page view with filtering and sorting.

## Requirements

1. **Add a Todo**
   - The user will be able to create a new todo with a required title (max 200 characters).
   - The user will optionally provide a description (max 1000 characters).
   - The user will optionally set a due date (date only, no time).
   - After adding, the new todo will appear at the top of the list immediately.
   - The input field will clear after successful creation.

2. **Toggle Complete/Incomplete**
   - Each todo will have a checkbox to toggle its completed status.
   - Completed todos will show a strikethrough on the title and reduced opacity.
   - Toggling will update localStorage immediately.

3. **Delete a Todo**
   - Each todo will have a delete button (trash icon or similar).
   - Clicking delete will remove the todo permanently with no confirmation dialog.
   - Deletion will update localStorage immediately.

4. **Filter Todos**
   - The full page will provide filter options: All, Active, and Completed.
   - "All" will show every todo regardless of status.
   - "Active" will show only incomplete todos.
   - "Completed" will show only completed todos.
   - The selected filter will be visually highlighted.

5. **Sort Todos**
   - The full page will provide sort options: Created Date (newest first) and Due Date (soonest first).
   - Todos without a due date will appear at the end when sorting by due date.
   - The default sort will be Created Date, newest first.

6. **Persist to localStorage**
   - All todos will be stored in localStorage under a consistent key.
   - Any change (add, toggle, delete) will write to localStorage synchronously.
   - On page load, the app will read from localStorage and hydrate the list.

7. **Dashboard Widget**
   - The dashboard card will display the count of active (incomplete) todos.
   - The card will list the 5 most recently created incomplete todos (title only, truncated if long).
   - The card will include a "View all" link that navigates to `/todos`.
   - If there are no todos, the card will show a friendly empty state message.

8. **Full Page View (`/todos`)**
   - The full page will display all todos with title, description (if present), due date (if present), status checkbox, and delete button.
   - The filter and sort controls will appear at the top of the list.
   - Todos with a due date in the past that are still incomplete will show a visual warning (e.g., red text on the date).

## UI/UX

The add-todo form on the full page will be a simple inline form at the top: a text input for the title, an optional date picker for the due date, and an "Add" button. The description field will expand below the title input as an optional textarea.

The todo list will render as a vertical stack of rows. Each row will contain: a checkbox on the left, the title and optional due date in the center, and a delete icon on the right. Completed items will appear muted. On mobile, the layout will remain single-column and touch-friendly.

The dashboard widget will be a compact card showing a bold active count ("3 active todos") followed by a short list of titles.

## Data Model

```typescript
// Stored in localStorage under key "todos"
interface Todo {
  id: string;           // UUID, generated on creation
  title: string;        // Required, max 200 chars
  description: string;  // Optional, max 1000 chars, defaults to ""
  dueDate: string | null; // ISO date string (YYYY-MM-DD) or null
  completed: boolean;
  createdAt: string;    // ISO datetime string
}
```

## Edge Cases

- If the user creates a todo with only whitespace as the title, the app will trim and reject it, keeping the form open.
- If localStorage is full, the app will show an error message and will not lose existing data.
- If stored data is corrupted or has an unexpected shape, the app will reset to an empty list and log a warning to the console.
- If the user has hundreds of todos, the list will still render without virtualization (acceptable for localStorage-scale data).
- Due dates in the past are valid and will not be blocked on creation.

## Out of Scope

- Editing a todo's title, description, or due date after creation.
- Priority levels or tags.
- Drag-and-drop reordering.
- Subtasks or nested todos.
- Due date reminders or notifications.
- Syncing across tabs in real time (data will sync on next page load).
- Search or text-based filtering.

## Technical Notes

- Feature code will live in `src/features/todos/`.
- The full page route will be defined in `src/routes/todos.tsx`.
- The dashboard widget component will be imported into the dashboard home page.
- localStorage interaction will use the shared wrapper at `src/lib/storage.ts` and the `src/hooks/use-storage.ts` custom hook.
- shadcn components used: `Card`, `Button`, `Input`, `Checkbox`, and `Popover` (for date picker).
- The `id` field will be generated using `crypto.randomUUID()`.
