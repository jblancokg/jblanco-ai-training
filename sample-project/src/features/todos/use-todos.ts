import { useCallback } from "react";
import { useStorage } from "@/hooks/use-storage";
import { SEED_TODOS } from "./seed-data";
import type { Todo } from "./types";

const STORAGE_KEY = "dashboard-todos";

export function useTodos() {
	const [todos, setTodos] = useStorage<Todo[]>(STORAGE_KEY, SEED_TODOS);

	const addTodo = useCallback(
		(title: string, description: string, dueDate: string | null) => {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				title,
				description,
				completed: false,
				createdAt: new Date().toISOString(),
				dueDate,
			};
			setTodos((prev) => [newTodo, ...prev]);
		},
		[setTodos],
	);

	const toggleTodo = useCallback(
		(id: string) => {
			setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
		},
		[setTodos],
	);

	const deleteTodo = useCallback(
		(id: string) => {
			setTodos((prev) => prev.filter((t) => t.id !== id));
		},
		[setTodos],
	);

	return { todos, addTodo, toggleTodo, deleteTodo };
}
