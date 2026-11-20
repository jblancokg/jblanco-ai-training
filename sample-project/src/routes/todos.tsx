import { createFileRoute } from "@tanstack/react-router";
import { TodoList } from "@/features/todos/TodoList";

export const Route = createFileRoute("/todos")({
	component: TodosPage,
});

function TodosPage() {
	return (
		<div className="space-y-8">
			<div className="pt-2">
				<p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Tasks</p>
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 text-gradient">
					Todos
				</h1>
				<p className="text-muted-foreground mt-2">Manage your tasks and stay on track.</p>
			</div>
			<TodoList />
		</div>
	);
}
