import { useCallback, useSyncExternalStore } from "react";
import { getItem, setItem, subscribe } from "@/lib/storage";

/**
 * React hook that syncs component state with localStorage.
 * Uses useSyncExternalStore so concurrent features work correctly,
 * and components automatically re-render when the stored value changes
 * from anywhere in the app (even other components on the same page).
 */
export function useStorage<T>(key: string, fallback: T): [T, (value: T | ((prev: T) => T)) => void] {
	const subscribeToKey = useCallback((listener: () => void) => subscribe(key, listener), [key]);

	const getSnapshot = useCallback(() => {
		// JSON.stringify for stable snapshot comparison
		const raw = localStorage.getItem(key);
		return raw ?? JSON.stringify(fallback);
	}, [key, fallback]);

	const raw = useSyncExternalStore(subscribeToKey, getSnapshot);
	const value: T = raw === null ? fallback : JSON.parse(raw);

	const setValue = useCallback(
		(update: T | ((prev: T) => T)) => {
			const current = getItem<T>(key, fallback);
			const next = typeof update === "function" ? (update as (prev: T) => T)(current) : update;
			setItem(key, next);
		},
		[key, fallback],
	);

	return [value, setValue];
}
