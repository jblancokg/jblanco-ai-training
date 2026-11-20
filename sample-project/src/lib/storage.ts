/**
 * Typed localStorage wrapper with cross-component synchronization.
 *
 * localStorage doesn't fire 'storage' events for changes within the same tab,
 * so we use a custom event bus to keep components in sync when data changes.
 * Any component can subscribe to a specific key and re-render when that key
 * is updated from anywhere in the app.
 */

type StorageListener = () => void;

const listeners = new Map<string, Set<StorageListener>>();

function notifyListeners(key: string) {
	const keyListeners = listeners.get(key);
	if (keyListeners) {
		keyListeners.forEach((listener) => listener());
	}
}

export function subscribe(key: string, listener: StorageListener): () => void {
	if (!listeners.has(key)) {
		listeners.set(key, new Set());
	}
	listeners.get(key)!.add(listener);

	// Return an unsubscribe function for easy cleanup in useEffect
	return () => {
		listeners.get(key)!.delete(listener);
	};
}

export function getItem<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		// Corrupted data shouldn't crash the app; fall back gracefully
		return fallback;
	}
}

export function setItem<T>(key: string, value: T): void {
	localStorage.setItem(key, JSON.stringify(value));
	notifyListeners(key);
}

export function removeItem(key: string): void {
	localStorage.removeItem(key);
	notifyListeners(key);
}
