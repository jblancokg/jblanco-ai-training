import { useEffect, useState } from "react";
import { Globe, Sun, Moon } from "lucide-react";
import { CLOCK_ZONES } from "./zones";
import type { ClockZone } from "./types";

/**
 * Formats the timezone offset relative to the user's local time.
 */
function getRelativeOffset(timezone: string): string {
	const now = new Date();
	const targetTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
	const localTime = new Date(now.toLocaleString("en-US"));
	const diffMinutes = (targetTime.getTime() - localTime.getTime()) / 60000;

	const roundedDiff = Math.round(diffMinutes);
	if (roundedDiff === 0) return "local";

	const sign = roundedDiff > 0 ? "+" : "-";
	const absDiff = Math.abs(roundedDiff);
	const hours = Math.floor(absDiff / 60);
	const mins = absDiff % 60;

	return mins > 0 ? `${sign}${hours}:${String(mins).padStart(2, "0")}` : `${sign}${hours}`;
}

function isDaytime(timezone: string): boolean {
	const hour = parseInt(
		new Intl.DateTimeFormat("en-US", {
			timeZone: timezone,
			hour: "numeric",
			hour12: false,
		}).format(new Date()),
	);
	return hour >= 6 && hour < 20;
}

/*
 * Each timezone gets a unique warm accent color so the grid has visual variety
 * without clashing. These pair well with the terracotta/sage/lavender palette.
 */
const ZONE_ACCENTS = [
	{ bg: "bg-coral-light dark:bg-coral/8", text: "text-terracotta dark:text-coral" },
	{ bg: "bg-warm-100 dark:bg-warm-500/8", text: "text-warm-500 dark:text-warm-200" },
	{ bg: "bg-sage-light dark:bg-sage/8", text: "text-sage dark:text-sage" },
	{ bg: "bg-lavender-light dark:bg-lavender/8", text: "text-lavender dark:text-lavender" },
	{ bg: "bg-sand-light dark:bg-sand/8", text: "text-sand dark:text-sand" },
];

function ClockDisplay({ zone, index }: { zone: ClockZone; index: number }) {
	const now = new Date();
	const timeStr = now.toLocaleTimeString("en-US", {
		timeZone: zone.timezone,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
	const dateStr = now.toLocaleDateString("en-US", {
		timeZone: zone.timezone,
		weekday: "short",
		month: "short",
		day: "numeric",
	});
	const isDay = isDaytime(zone.timezone);
	const offset = getRelativeOffset(zone.timezone);
	const accent = ZONE_ACCENTS[index % ZONE_ACCENTS.length];

	return (
		<div className={`rounded-lg p-2.5 transition-all duration-300 overflow-hidden ${accent.bg} hover:scale-[1.02]`}>
			<div className="flex items-center justify-between gap-1 mb-1">
				<span className={`text-[11px] font-semibold truncate ${accent.text}`}>
					{zone.city}
				</span>
				{isDay ? (
					<Sun className="h-3 w-3 shrink-0 text-amber-500 dark:text-amber-400" />
				) : (
					<Moon className="h-3 w-3 shrink-0 text-indigo-400 dark:text-indigo-300" />
				)}
			</div>
			<p className="text-lg font-mono font-bold tabular-nums leading-tight text-foreground">
				{timeStr}
			</p>
			<div className="flex items-center justify-between gap-1 mt-1">
				<span className="text-[10px] text-muted-foreground truncate">{dateStr}</span>
				<span className="text-[10px] font-medium text-muted-foreground shrink-0">{offset}</span>
			</div>
		</div>
	);
}

export function WorldClockCard() {
	const [, setTick] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => setTick((t) => t + 1), 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="glass-card rounded-xl overflow-hidden h-full">
			<div className="h-1 bg-gradient-to-r from-lavender via-sand to-coral/50" />

			<div className="p-5">
				<div className="flex items-center gap-2.5 mb-4">
					<div className="h-8 w-8 rounded-lg bg-lavender-light dark:bg-lavender/10 flex items-center justify-center">
						<Globe className="h-4 w-4 text-lavender dark:text-lavender" />
					</div>
					<h3 className="font-semibold tracking-tight">World Clock</h3>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					{CLOCK_ZONES.map((zone, i) => (
						<ClockDisplay key={zone.timezone} zone={zone} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
