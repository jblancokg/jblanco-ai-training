import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useDates } from "./use-dates";
import { getDaysUntil, formatDaysUntil, getEffectiveDate } from "./date-utils";

/**
 * Dashboard card showing the next 5 upcoming dates.
 * Each date gets a warm countdown badge that intensifies as it approaches.
 */
export function DatesCard() {
	const { dates } = useDates();

	const upcoming = [...dates]
		.map((d) => ({ ...d, daysUntil: getDaysUntil(d), effective: getEffectiveDate(d) }))
		.filter((d) => d.daysUntil >= 0)
		.sort((a, b) => a.daysUntil - b.daysUntil)
		.slice(0, 5);

	return (
		<div className="glass-card rounded-xl overflow-hidden h-full flex flex-col">
			<div className="h-1 bg-gradient-to-r from-sage via-sage/70 to-lavender/50" />

			<div className="p-5 flex flex-1 flex-col">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2.5">
						<div className="h-8 w-8 rounded-lg bg-sage-light dark:bg-sage/10 flex items-center justify-center">
							<Calendar className="h-4 w-4 text-sage dark:text-sage" />
						</div>
						<h3 className="font-semibold tracking-tight">Important Dates</h3>
					</div>
					<span className="text-xs font-medium text-muted-foreground">{upcoming.length} upcoming</span>
				</div>

				{upcoming.length === 0 ? (
					<p className="text-sm text-muted-foreground py-2">No upcoming dates</p>
				) : (
					<ul className="space-y-2.5">
						{upcoming.map((d) => (
							<li key={d.id} className="flex items-center justify-between text-sm">
								<span className="line-clamp-1 text-foreground/80">{d.title}</span>
								<span
									className={`shrink-0 ml-3 text-xs font-medium px-2.5 py-0.5 rounded-full ${
										d.daysUntil === 0
											? "bg-primary text-primary-foreground"
											: d.daysUntil <= 2
												? "bg-coral-light text-terracotta dark:bg-coral/15 dark:text-coral"
												: "bg-muted text-muted-foreground"
									}`}
								>
									{formatDaysUntil(d.daysUntil)}
								</span>
							</li>
						))}
					</ul>
				)}

				{/* mt-auto pins the link to the card bottom so both cards align */}
				<div className="mt-auto pt-4">
					<Link
						to="/important-dates"
						className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 pt-3 border-t border-border/50 transition-colors group"
					>
						View all dates
						<ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
					</Link>
				</div>
			</div>
		</div>
	);
}
