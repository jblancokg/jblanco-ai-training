import { differenceInDays, parseISO, startOfDay } from "date-fns";
import type { ImportantDate } from "./types";

/**
 * Returns the effective next occurrence of a date.
 * For recurring dates, if the date has passed this year,
 * we roll it forward to the same month/day in the current year
 * (or next year if it already passed this year).
 */
export function getEffectiveDate(item: ImportantDate): Date {
	const parsed = parseISO(item.date);
	if (!item.recurring) return parsed;

	const today = startOfDay(new Date());
	const thisYear = new Date(today.getFullYear(), parsed.getMonth(), parsed.getDate());

	if (thisYear >= today) return thisYear;
	return new Date(today.getFullYear() + 1, parsed.getMonth(), parsed.getDate());
}

export function getDaysUntil(item: ImportantDate): number {
	const effective = getEffectiveDate(item);
	return differenceInDays(startOfDay(effective), startOfDay(new Date()));
}

export function formatDaysUntil(days: number): string {
	if (days === 0) return "today";
	if (days === 1) return "tomorrow";
	if (days < 0) return `${Math.abs(days)} days ago`;
	return `in ${days} days`;
}

export function isComingSoon(item: ImportantDate): boolean {
	const days = getDaysUntil(item);
	return days >= 0 && days <= 7;
}

export function isPastNonRecurring(item: ImportantDate): boolean {
	return !item.recurring && getDaysUntil(item) < 0;
}
