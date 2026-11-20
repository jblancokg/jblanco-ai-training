import { useCallback } from "react";
import { useStorage } from "@/hooks/use-storage";
import { SEED_DATES } from "./seed-data";
import type { DateCategory, ImportantDate } from "./types";

const STORAGE_KEY = "dashboard-important-dates";

export function useDates() {
	const [dates, setDates] = useStorage<ImportantDate[]>(STORAGE_KEY, SEED_DATES);

	const addDate = useCallback(
		(title: string, date: string, category: DateCategory, recurring: boolean) => {
			const newDate: ImportantDate = {
				id: crypto.randomUUID(),
				title,
				date,
				category,
				recurring,
			};
			setDates((prev) => [...prev, newDate]);
		},
		[setDates],
	);

	const updateDate = useCallback(
		(id: string, updates: Partial<Omit<ImportantDate, "id">>) => {
			setDates((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
		},
		[setDates],
	);

	const deleteDate = useCallback(
		(id: string) => {
			setDates((prev) => prev.filter((d) => d.id !== id));
		},
		[setDates],
	);

	return { dates, addDate, updateDate, deleteDate };
}
