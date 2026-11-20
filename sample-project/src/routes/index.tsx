import { createFileRoute } from "@tanstack/react-router";
import { TodoCard } from "@/features/todos/TodoCard";
import { WorldClockCard } from "@/features/world-clock/WorldClockCard";
import { DatesCard } from "@/features/important-dates/DatesCard";

export const Route = createFileRoute("/")({
	component: DashboardPage,
});

function DashboardPage() {
	const greeting = getGreeting();
	const now = new Date();
	const dateStr = now.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="space-y-8">
			{/* Hero greeting with gradient text and date */}
			<div className="pt-2">
				<p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
					{dateStr}
				</p>
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 text-gradient">
					Good {greeting}
				</h1>
			</div>

			{/* Dashboard grid with staggered animation */}
			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				<div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
					<TodoCard />
				</div>
				<div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
					<DatesCard />
				</div>
				<div className="md:col-span-2 lg:col-span-1 animate-fade-up" style={{ animationDelay: "160ms" }}>
					<WorldClockCard />
				</div>
			</div>
		</div>
	);
}

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "morning";
	if (hour < 17) return "afternoon";
	return "evening";
}
