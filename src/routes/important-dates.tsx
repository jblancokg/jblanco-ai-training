import { createFileRoute } from "@tanstack/react-router";
import { DatesList } from "@/features/important-dates/DatesList";

export const Route = createFileRoute("/important-dates")({
	component: ImportantDatesPage,
});

function ImportantDatesPage() {
	return (
		<div className="space-y-8">
			<div className="pt-2">
				<p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Calendar</p>
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 text-gradient">
					Important Dates
				</h1>
				<p className="text-muted-foreground mt-2">
					Keep track of birthdays, deadlines, and everything in between.
				</p>
			</div>
			<DatesList />
		</div>
	);
}
