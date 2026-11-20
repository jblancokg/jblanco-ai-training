# Todo List Feature

A full todo list with localStorage persistence, filtering, sorting, and a dashboard summary widget.

---

## Task 1: Define Todo Types and Interfaces

**Description**

Create the TypeScript type definitions for the todo feature. This includes the core `Todo` interface and supporting types for filter and sort options used throughout the feature.

**Acceptance Criteria**

- [ ] `Todo` interface includes: `id` (string), `title` (string), `description` (string, optional), `completed` (boolean), `createdAt` (ISO string), `dueDate` (ISO string, optional)
- [ ] `TodoFilter` type defined as `"all" | "active" | "completed"`
- [ ] `TodoSortKey` type defined as `"createdAt" | "dueDate"`
- [ ] All types are exported for use across the feature

**Files to Create or Modify**

- `src/features/todos/types.ts`

**Dependencies**

None.

**Estimated Scope:** Small (1hr)

---

## Task 2: Create useTodos Hook

**Description**

Build the `useTodos` hook that manages all todo state through the `useStorage` hook. It will expose the todo list along with functions to add, toggle, and delete todos. IDs should be generated with `crypto.randomUUID()`.

**Acceptance Criteria**

- [ ] `useTodos` hook at `src/features/todos/use-todos.ts` returns `{ todos, addTodo, toggleTodo, deleteTodo }`
- [ ] `addTodo(title, description?, dueDate?)` creates a new todo with a unique ID and `createdAt` timestamp
- [ ] `toggleTodo(id)` flips the `completed` boolean for the matching todo
- [ ] `deleteTodo(id)` removes the todo from the list
- [ ] All state is persisted through `useStorage` under the key `todos`
- [ ] If storage is empty on first load, seed data from Task 3 is used as the initial value

**Files to Create or Modify**

- `src/features/todos/use-todos.ts`

**Dependencies**

- Dashboard Shell Task 4 (`useStorage` hook)
- Task 1 (types)
- Task 3 (seed data, can be a stub initially)

**Estimated Scope:** Small (1hr)

---

## Task 3: Create Seed Data

**Description**

Write a set of 8 to 10 realistic sample todos that will populate the app on first use. Use relative date calculations so the data always feels current regardless of when someone first opens the app.

**Acceptance Criteria**

- [ ] `src/features/todos/seed-data.ts` exports a `seedTodos` array of `Todo` objects
- [ ] Contains 8 to 10 todos with a mix of completed and active items
- [ ] Due dates are calculated relative to the current date (e.g., today + 3 days, yesterday, next week)
- [ ] Titles and descriptions reflect realistic personal tasks (groceries, appointments, project deadlines)
- [ ] At least 2 todos have no due date
- [ ] At least 2 todos are marked as completed

**Files to Create or Modify**

- `src/features/todos/seed-data.ts`

**Dependencies**

- Task 1 (types)

**Estimated Scope:** Small (1hr)

---

## Task 4: Build TodoCard Dashboard Widget

**Description**

Create a compact card component for the dashboard home page that shows a quick summary of the user's todos. It will display the count of active (incomplete) todos and list the 5 most recently created incomplete items.

**Acceptance Criteria**

- [ ] `TodoCard` component at `src/features/todos/TodoCard.tsx`
- [ ] Displays a count of active todos (e.g., "You have 7 active todos")
- [ ] Lists up to 5 most recent incomplete todos by title
- [ ] Each listed todo shows its title and due date if one exists
- [ ] Includes a "View all" link that navigates to `/todos`
- [ ] Uses shadcn Card component for consistent styling
- [ ] Updates reactively when todos change in storage

**Files to Create or Modify**

- `src/features/todos/TodoCard.tsx`
- `src/routes/index.tsx` (replace placeholder card with TodoCard)

**Dependencies**

- Dashboard Shell Task 5 (home page with grid)
- Task 2 (useTodos hook)

**Estimated Scope:** Small (1hr)

---

## Task 5: Build Full-Page TodoList Component

**Description**

Build the main todo list view with filtering and sorting controls. Users can filter between all, active, and completed todos, and sort by creation date or due date. Each todo item shows a checkbox, title, description, due date badge, and a delete button.

**Acceptance Criteria**

- [ ] `TodoList` component at `src/features/todos/TodoList.tsx`
- [ ] Filter buttons for All, Active, and Completed with visual indication of active filter
- [ ] Sort buttons for Created Date and Due Date with visual indication of active sort
- [ ] Each todo item displays: checkbox (toggles completion), title, description (if present), due date badge (if present), delete button
- [ ] Completed todos show a strikethrough on the title
- [ ] Due date badges are color-coded: red if overdue, yellow if due today, neutral otherwise
- [ ] Empty state message shown when no todos match the active filter
- [ ] List updates immediately when a todo is toggled, added, or deleted

**Files to Create or Modify**

- `src/features/todos/TodoList.tsx`

**Dependencies**

- Task 2 (useTodos hook)

**Estimated Scope:** Medium (2hr)

---

## Task 6: Build AddTodoDialog

**Description**

Create a dialog for adding new todos using the shadcn Dialog component. The form collects a title (required), description (optional), and due date (optional). On submit, it calls `addTodo` from the hook and closes the dialog.

**Acceptance Criteria**

- [ ] `AddTodoDialog` component at `src/features/todos/AddTodoDialog.tsx`
- [ ] Uses shadcn Dialog with a trigger button labeled "Add Todo"
- [ ] Form fields: title (text input, required), description (textarea, optional), due date (date input, optional)
- [ ] Submit button is disabled when title is empty
- [ ] On successful submit, the dialog closes and the form resets
- [ ] Pressing Escape or clicking outside closes the dialog without adding a todo
- [ ] Accessible: form fields have labels, focus is managed by shadcn Dialog

**Files to Create or Modify**

- `src/features/todos/AddTodoDialog.tsx`

**Dependencies**

- Task 2 (useTodos hook)
- Dashboard Shell Task 1 (shadcn Dialog component installed)

**Estimated Scope:** Small (1hr)

---

## Task 7: Create the /todos Route

**Description**

Wire up the `/todos` route file that renders the TodoList and AddTodoDialog together as the full todo management page.

**Acceptance Criteria**

- [ ] Route file at `src/routes/todos.tsx` renders the page
- [ ] Page title "Todos" displayed as a heading
- [ ] AddTodoDialog trigger button positioned near the page heading
- [ ] TodoList component rendered below the heading
- [ ] Navigation link in the header correctly highlights when on this route

**Files to Create or Modify**

- `src/routes/todos.tsx`

**Dependencies**

- Task 5 (TodoList)
- Task 6 (AddTodoDialog)
- Dashboard Shell Task 2 (layout and navigation)

**Estimated Scope:** Small (1hr)
