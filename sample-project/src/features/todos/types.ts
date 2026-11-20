export interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	dueDate: string | null;
}

export type TodoFilter = "all" | "active" | "completed";
export type TodoSort = "created" | "due";
