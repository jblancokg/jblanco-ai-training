import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Clock } from "lucide-react";
import { formatDistanceToNow, isPast, parseISO } from "date-fns";
import { useTodos } from "./use-todos";
import { AddTodoDialog } from "./AddTodoDialog";
import type { TodoFilter, TodoSort } from "./types";

/**
 * Full-page todo list with filtering, sorting, and CRUD.
 * Uses pill-shaped filter toggles and warm card styling.
 */
export function TodoList() {
	const { todos, toggleTodo, deleteTodo } = useTodos();
	const [filter, setFilter] = useState<TodoFilter>("all");
	const [sort, setSort] = useState<TodoSort>("created");

	const filtered = todos.filter((t) => {
		if (filter === "active") return !t.completed;
		if (filter === "completed") return t.completed;
		return true;
	});

	const sorted = [...filtered].sort((a, b) => {
		if (sort === "due") {
			if (!a.dueDate && !b.dueDate) return 0;
			if (!a.dueDate) return 1;
			if (!b.dueDate) return -1;
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		}
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	const filterOptions: { label: string; value: TodoFilter }[] = [
		{ label: "All", value: "all" },
		{ label: "Active", value: "active" },
		{ label: "Completed", value: "completed" },
	];

	const sortOptions: { label: string; value: TodoSort }[] = [
		{ label: "Newest", value: "created" },
		{ label: "Due Date", value: "due" },
	];

	return (
		<div className="space-y-6">
			{/* Controls bar */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-1.5">
					{filterOptions.map((f) => (
						<button
							key={f.value}
							onClick={() => setFilter(f.value)}
							data-active={filter === f.value}
							className="filter-pill cursor-pointer"
						>
							{f.label}
						</button>
					))}
				</div>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1.5">
						{sortOptions.map((s) => (
							<button
								key={s.value}
								onClick={() => setSort(s.value)}
								data-active={sort === s.value}
								className="filter-pill cursor-pointer"
							>
								{s.label}
							</button>
						))}
					</div>
					<AddTodoDialog />
				</div>
			</div>

			{sorted.length === 0 ? (
				<div className="text-center py-16">
					<p className="text-muted-foreground text-lg">
						{filter === "all" ? "No todos yet. Add one!" : `No ${filter} todos.`}
					</p>
				</div>
			) : (
				<div className="space-y-2">
					{sorted.map((todo, i) => {
						const isOverdue = todo.dueDate && !todo.completed && isPast(parseISO(todo.dueDate));
						return (
							<div
								key={todo.id}
								className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm animate-fade-up ${
									todo.completed
										? "bg-muted/30 border-border/50"
										: "glass-card"
								}`}
								style={{ animationDelay: `${i * 30}ms` }}
							>
								<Checkbox
									checked={todo.completed}
									onCheckedChange={() => toggleTodo(todo.id)}
									className="mt-1 data-[state=checked]:bg-sage data-[state=checked]:border-sage"
								/>
								<div className="flex-1 min-w-0">
									<p
										className={`font-medium transition-colors ${
											todo.completed
												? "line-through text-muted-foreground"
												: "text-foreground"
										}`}
									>
										{todo.title}
									</p>
									{todo.description && (
										<p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
											{todo.description}
										</p>
									)}
									<div className="flex items-center gap-3 mt-2">
										<span className="text-xs text-muted-foreground">
											{formatDistanceToNow(parseISO(todo.createdAt), { addSuffix: true })}
										</span>
										{todo.dueDate && (
											<span
												className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
													isOverdue
														? "bg-destructive/10 text-destructive"
														: "bg-warm-100 text-warm-500 dark:bg-warm-500/10 dark:text-warm-200"
												}`}
											>
												<Clock className="h-3 w-3" />
												{formatDistanceToNow(parseISO(todo.dueDate), { addSuffix: true })}
											</span>
										)}
									</div>
								</div>
								<button
									onClick={() => deleteTodo(todo.id)}
									className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200 p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
