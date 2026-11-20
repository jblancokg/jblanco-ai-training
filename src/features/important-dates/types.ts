export interface ImportantDate {
	id: string;
	title: string;
	date: string; // ISO date string (YYYY-MM-DD)
	category: DateCategory;
	recurring: boolean;
}

export type DateCategory = "birthday" | "deadline" | "anniversary" | "holiday" | "other";

export const DATE_CATEGORIES: DateCategory[] = [
	"birthday",
	"deadline",
	"anniversary",
	"holiday",
	"other",
];
