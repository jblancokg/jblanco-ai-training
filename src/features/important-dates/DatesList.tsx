import { useState } from "react";
import { Trash2, Repeat, Pencil } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useDates } from "./use-dates";
import { AddDateDialog } from "./AddDateDialog";
import { EditDateDialog } from "./EditDateDialog";
import {
	getDaysUntil,
	formatDaysUntil,
	isComingSoon,
	isPastNonRecurring,
	getEffectiveDate,
} from "./date-utils";
import type { DateCategory, ImportantDate } from "./types";

/*
 * Each category gets a distinct color from our warm palette
 * so users can scan the list visually without reading labels.
 */
const CATEGORY_STYLES: Record<DateCategory, { pill: string; icon: string }> = {
	birthday: {
		pill: "bg-coral-light text-terracotta dark:bg-coral/10 dark:text-coral",
		icon: "🎂",
	},
	deadline: {
		pill: "bg-warm-100 text-warm-500 dark:bg-warm-500/10 dark:text-warm-200",
		icon: "⏰",
	},
	anniversary: {
		pill: "bg-lavender-light text-lavender dark:bg-lavender/10 dark:text-lavender",
		icon: "💜",
	},
	holiday: {
		pill: "bg-sage-light text-sage dark:bg-sage/10 dark:text-sage",
		icon: "🌿",
	},
	other: {
		pill: "bg-sand-light text-warm-900 dark:bg-sand/10 dark:text-sand",
		icon: "📌",
	},
};

/**
 * Full-page view for important dates with all CRUD controls,
 * category filtering, and visual highlighting for upcoming dates.
 */
export function DatesList() {
	const { dates, deleteDate } = useDates();
	const [categoryFilter, setCategoryFilter] = useState<DateCategory | "all">("all");
	const [editingDate, setEditingDate] = useState<ImportantDate | null>(null);

	const filtered = dates.filter((d) => categoryFilter === "all" || d.category === categoryFilter);

	const sorted = [...filtered].sort((a, b) => {
		const aEffective = getEffectiveDate(a);
		const bEffective = getEffectiveDate(b);
		return aEffective.getTime() - bEffective.getTime();
	});

	const allCategories: (DateCategory | "all")[] = [
		"all",
		"birthday",
		"deadline",
		"anniversary",
		"holiday",
		"other",
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-1.5 flex-wrap">
					{allCategories.map((cat) => (
						<button
							key={cat}
							onClick={() => setCategoryFilter(cat)}
							data-active={categoryFilter === cat}
							className="filter-pill cursor-pointer"
						>
							{cat === "all" ? "All" : `${CATEGORY_STYLES[cat].icon} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
						</button>
					))}
				</div>
				<AddDateDialog />
			</div>

			{sorted.length === 0 ? (
				<div className="text-center py-16">
					<p className="text-muted-foreground text-lg">No dates to show.</p>
				</div>
			) : (
				<div className="space-y-2">
					{sorted.map((item, i) => {
						const daysUntil = getDaysUntil(item);
						const soon = isComingSoon(item);
						const past = isPastNonRecurring(item);
						const style = CATEGORY_STYLES[item.category];

						return (
							<div
								key={item.id}
								className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm animate-fade-up ${
									soon
										? "glass-card border-primary/20 bg-primary/[0.03]"
										: past
											? "bg-muted/30 border-border/50 opacity-50"
											: "glass-card"
								}`}
								style={{ animationDelay: `${i * 30}ms` }}
							>
								{/* Category emoji avatar */}
								<div
									className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${style.pill}`}
								>
									{style.icon}
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap">
										<span className="font-medium">{item.title}</span>
										{item.recurring && (
											<Repeat className="h-3.5 w-3.5 text-muted-foreground" />
										)}
										<span
											className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.pill}`}
										>
											{item.category}
										</span>
									</div>
									<div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
										<span>{format(parseISO(item.date), "MMMM d, yyyy")}</span>
										<span
											className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
												soon
													? "bg-primary text-primary-foreground"
													: "bg-muted text-muted-foreground"
											}`}
										>
											{formatDaysUntil(daysUntil)}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<button
										onClick={() => setEditingDate(item)}
										className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
									>
										<Pencil className="h-4 w-4" />
									</button>
									<button
										onClick={() => deleteDate(item.id)}
										className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{editingDate && (
				<EditDateDialog date={editingDate} onClose={() => setEditingDate(null)} />
			)}
		</div>
	);
}
