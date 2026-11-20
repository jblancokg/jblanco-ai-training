# Important Dates

## Overview

The important dates feature will let users track birthdays, deadlines, anniversaries, holidays, and other notable dates. Users will be able to add, edit, and delete entries, mark them as recurring, and see upcoming dates highlighted. The feature will appear as a dashboard widget and a full-page view with category filtering.

## Requirements

1. **Add a Date Entry**
   - The user will be able to create a new entry with a required title (max 200 characters).
   - The user will select a date (required).
   - The user will choose a category from: Birthday, Deadline, Anniversary, Holiday, Other.
   - The user will optionally mark the entry as recurring (yearly).
   - After adding, the entry will appear in the list immediately.

2. **Edit a Date Entry**
   - The user will be able to edit any field of an existing entry (title, date, category, recurring flag).
   - Editing will open an inline form or modal pre-filled with the current values.
   - Changes will save to localStorage immediately on confirmation.

3. **Delete a Date Entry**
   - Each entry will have a delete button.
   - Clicking delete will remove the entry permanently with no confirmation dialog.
   - Deletion will update localStorage immediately.

4. **Upcoming Date Highlighting**
   - Entries with dates within the next 7 days will be visually highlighted (e.g., accent border or background color).
   - For recurring entries, the "next occurrence" will be calculated based on the current year. If this year's date has passed, it will use next year's date.

5. **Past Date Handling**
   - Non-recurring entries whose date has passed will appear dimmed (reduced opacity).
   - Recurring entries will never appear dimmed since they always have a future occurrence.

6. **Sorting**
   - The list will be sorted by nearest upcoming date first by default.
   - For recurring entries, sorting will use the next occurrence date.
   - Past non-recurring entries will sort to the bottom.

7. **Category Filtering (Full Page)**
   - The full page will provide filter buttons for each category plus an "All" option.
   - Selecting a category will show only entries in that category.
   - The selected filter will be visually highlighted.
   - The default filter will be "All".

8. **Dashboard Widget**
   - The dashboard card will show the next 5 upcoming entries sorted by nearest date.
   - Each entry will display the title, date, and a relative label (e.g., "in 3 days", "tomorrow", "today").
   - The card will include a "View all" link that navigates to `/important-dates`.
   - If there are no entries, the card will show a friendly empty state message.

9. **Full Page View (`/important-dates`)**
   - The full page will display all entries with title, date, category badge, recurring indicator, and edit/delete controls.
   - The add form will appear at the top of the page.
   - Category filter buttons will appear between the form and the list.

10. **Persist to localStorage**
    - All entries will be stored in localStorage under a consistent key.
    - Any change (add, edit, delete) will write to localStorage synchronously.
    - On page load, the app will read from localStorage and hydrate the list.

## UI/UX

The full page will have an add form at the top with fields for title (text input), date (date picker), category (select dropdown), and a recurring checkbox. Below the form, a row of filter pills will allow category selection. The list below will render as rows or cards, each showing the title, formatted date, a small colored category badge, and a recurring icon if applicable. Entries within 7 days will have a subtle highlight. Past non-recurring entries will be faded.

The dashboard widget will be a compact card listing up to 5 entries. Each line will show the title on the left and a relative date label ("in 3 days") on the right. Category will be indicated by a small colored dot or badge next to the title.

## Data Model

```typescript
// Stored in localStorage under key "important-dates"
interface ImportantDate {
  id: string;                // UUID, generated on creation
  title: string;             // Required, max 200 chars
  date: string;              // ISO date string (YYYY-MM-DD)
  category: DateCategory;
  recurring: boolean;        // If true, repeats yearly
  createdAt: string;         // ISO datetime string
}

type DateCategory = "birthday" | "deadline" | "anniversary" | "holiday" | "other";
```

## Edge Cases

- If a recurring birthday is set for February 29, the app will treat March 1 as the next occurrence in non-leap years.
- If the user creates an entry with a date in the past and it is not recurring, it will immediately appear dimmed.
- If localStorage is full, the app will show an error message and will not lose existing data.
- If stored data is corrupted or has an unexpected shape, the app will reset to an empty list and log a warning to the console.
- "Today" entries will show the label "today" and will be highlighted, not dimmed.
- If multiple entries share the same date, they will maintain a stable sort order by creation date as a tiebreaker.

## Out of Scope

- Time-of-day for events (date only, no time component).
- Notifications, reminders, or browser push alerts.
- Importing/exporting dates (CSV, ICS, etc.).
- Sharing dates with other users.
- Custom categories beyond the five provided.
- Multi-day events or date ranges.
- Syncing across tabs in real time (data will sync on next page load).
- Monthly or weekly recurrence patterns (only yearly is supported).

## Technical Notes

- Feature code will live in `src/features/important-dates/`.
- The full page route will be defined in `src/routes/important-dates.tsx`.
- The dashboard widget component will be imported into the dashboard home page.
- localStorage interaction will use the shared wrapper at `src/lib/storage.ts` and the `src/hooks/use-storage.ts` custom hook.
- shadcn components used: `Card`, `Button`, `Input`, `Select`, `Checkbox`, `Badge`, and `Popover` (for date picker).
- The `id` field will be generated using `crypto.randomUUID()`.
- Relative date labels ("in X days", "tomorrow", "today") will be calculated at render time, not stored.
- The next occurrence calculation for recurring dates will be a utility function in `src/features/important-dates/utils.ts`.
