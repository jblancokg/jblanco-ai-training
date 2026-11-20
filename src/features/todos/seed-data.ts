import type { Todo } from "./types";

// Helper to create dates relative to now so seed data always feels current
function daysFromNow(days: number): string {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString();
}

let idCounter = 0;
function makeId(): string {
	idCounter += 1;
	return `seed-todo-${idCounter}`;
}

export const SEED_TODOS: Todo[] = [
	{
		id: makeId(),
		title: "Review Q2 planning doc",
		description: "Go through the Q2 OKRs and leave comments on the shared doc",
		completed: false,
		createdAt: daysFromNow(-5),
		dueDate: daysFromNow(2),
	},
	{
		id: makeId(),
		title: "Book team lunch for Friday",
		description: "Reserve a table for 8 at the Italian place downtown",
		completed: false,
		createdAt: daysFromNow(-3),
		dueDate: daysFromNow(4),
	},
	{
		id: makeId(),
		title: "Update project README",
		description: "Add setup instructions for the new dev environment",
		completed: true,
		createdAt: daysFromNow(-7),
		dueDate: null,
	},
	{
		id: makeId(),
		title: "Send feedback on design mockups",
		description: "Review the Figma file and add comments on the checkout flow",
		completed: false,
		createdAt: daysFromNow(-2),
		dueDate: daysFromNow(1),
	},
	{
		id: makeId(),
		title: "Fix CI pipeline timeout",
		description: "The integration test suite is timing out on the staging branch",
		completed: true,
		createdAt: daysFromNow(-10),
		dueDate: daysFromNow(-3),
	},
	{
		id: makeId(),
		title: "Prepare sprint retro notes",
		description: "",
		completed: false,
		createdAt: daysFromNow(-1),
		dueDate: daysFromNow(5),
	},
	{
		id: makeId(),
		title: "Set up monitoring alerts",
		description: "Configure PagerDuty alerts for the new API endpoints",
		completed: false,
		createdAt: daysFromNow(-4),
		dueDate: null,
	},
	{
		id: makeId(),
		title: "Write unit tests for auth module",
		description: "Cover the token refresh and session expiry edge cases",
		completed: false,
		createdAt: daysFromNow(-6),
		dueDate: daysFromNow(7),
	},
	{
		id: makeId(),
		title: "Order new monitors for the team",
		description: "Two 27-inch 4K monitors from the approved vendor list",
		completed: true,
		createdAt: daysFromNow(-14),
		dueDate: daysFromNow(-7),
	},
	{
		id: makeId(),
		title: "Draft blog post on API versioning",
		description: "Cover our approach to backward-compatible API changes",
		completed: false,
		createdAt: daysFromNow(0),
		dueDate: daysFromNow(10),
	},
];
