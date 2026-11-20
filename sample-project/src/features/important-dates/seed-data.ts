import type { ImportantDate } from "./types";

function formatDate(date: Date): string {
	return date.toISOString().split("T")[0];
}

function daysFromNow(days: number): string {
	const d = new Date();
	d.setDate(d.getDate() + days);
	return formatDate(d);
}

let idCounter = 0;
function makeId(): string {
	idCounter += 1;
	return `seed-date-${idCounter}`;
}

export const SEED_DATES: ImportantDate[] = [
	{
		id: makeId(),
		title: "Mom's Birthday",
		date: daysFromNow(3),
		category: "birthday",
		recurring: true,
	},
	{
		id: makeId(),
		title: "Project Alpha Deadline",
		date: daysFromNow(5),
		category: "deadline",
		recurring: false,
	},
	{
		id: makeId(),
		title: "Team Offsite",
		date: daysFromNow(0), // today
		category: "other",
		recurring: false,
	},
	{
		id: makeId(),
		title: "Wedding Anniversary",
		date: daysFromNow(14),
		category: "anniversary",
		recurring: true,
	},
	{
		id: makeId(),
		title: "Company Founding Day",
		date: daysFromNow(-10),
		category: "holiday",
		recurring: true,
	},
	{
		id: makeId(),
		title: "Jake's Birthday",
		date: daysFromNow(1), // tomorrow
		category: "birthday",
		recurring: true,
	},
	{
		id: makeId(),
		title: "Quarterly Review",
		date: daysFromNow(-3),
		category: "deadline",
		recurring: false,
	},
	{
		id: makeId(),
		title: "Canada Day",
		date: daysFromNow(30),
		category: "holiday",
		recurring: true,
	},
	{
		id: makeId(),
		title: "Design System v2 Launch",
		date: daysFromNow(6),
		category: "deadline",
		recurring: false,
	},
	{
		id: makeId(),
		title: "Sarah's Work Anniversary",
		date: daysFromNow(21),
		category: "anniversary",
		recurring: true,
	},
];
