import { CheckSquare, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTodos } from "./use-todos";

/**
 * Compact dashboard card showing a quick summary of todos.
 * Uses glass-card styling with a warm accent stripe on the left edge.
 */
export function TodoCard() {
	const { todos } = useTodos();
	const activeTodos = todos.filter((t) => !t.completed);
	const completedCount = todos.filter((t) => t.completed).length;
	const recentActive = activeTodos.slice(0, 5);

	return (
		<div className="glass-card rounded-xl overflow-hidden h-full">
			{/* Top accent gradient */}
			<div className="h-1 bg-gradient-to-r from-terracotta via-coral to-terracotta/50" />

			<div className="p-5">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2.5">
						<div className="h-8 w-8 rounded-lg bg-coral-light dark:bg-coral/10 flex items-center justify-center">
							<CheckSquare className="h-4 w-4 text-terracotta dark:text-coral" />
						</div>
						<h3 className="font-semibold tracking-tight">Todos</h3>
					</div>
					<div className="flex items-center gap-3 text-xs font-medium">
						<span className="text-primary">{activeTodos.length} active</span>
						<span className="text-muted-foreground">{completedCount} done</span>
					</div>
				</div>

				{recentActive.length === 0 ? (
					<p className="text-sm text-muted-foreground py-2">All caught up!</p>
				) : (
					<ul className="space-y-2.5">
						{recentActive.map((todo) => (
							<li key={todo.id} className="flex items-start gap-2.5 text-sm group">
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-terracotta/60 dark:bg-coral/60 shrink-0 group-hover:bg-terracotta dark:group-hover:bg-coral transition-colors" />
								<span className="line-clamp-1 text-foreground/80 group-hover:text-foreground transition-colors">
									{todo.title}
								</span>
							</li>
						))}
					</ul>
				)}

				{activeTodos.length > 5 && (
					<p className="text-xs text-muted-foreground mt-3">
						+{activeTodos.length - 5} more
					</p>
				)}

				<Link
					to="/todos"
					className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 mt-4 pt-3 border-t border-border/50 transition-colors group"
				>
					View all todos
					<ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
				</Link>
			</div>
		</div>
	);
}
