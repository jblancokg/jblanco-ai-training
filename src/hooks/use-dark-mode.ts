import { useCallback, useEffect } from "react";
import { useStorage } from "./use-storage";

/**
 * Manages dark mode by toggling a 'dark' class on <html>.
 * We use a class-based approach instead of media queries because
 * shadcn/ui's dark variant is configured as (&:is(.dark *)).
 */
export function useDarkMode() {
	const [isDark, setIsDark] = useStorage("dashboard-dark-mode", false);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);

	const toggle = useCallback(() => setIsDark((prev) => !prev), [setIsDark]);

	return { isDark, toggle };
}
