import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useTodos } from "./use-todos";

export function AddTodoDialog() {
	const { addTodo } = useTodos();
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim()) return;

		addTodo(title.trim(), description.trim(), dueDate || null);
		setTitle("");
		setDescription("");
		setDueDate("");
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="rounded-full gap-1.5">
					<Plus className="h-4 w-4" />
					Add Todo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>New Todo</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 mt-2">
					<div className="space-y-2">
						<Label htmlFor="todo-title">Title</Label>
						<Input
							id="todo-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What needs to be done?"
							autoFocus
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="todo-description">
							Description <span className="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<Input
							id="todo-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add some details..."
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="todo-due">
							Due Date <span className="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<Input
							id="todo-due"
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="h-10"
						/>
					</div>
					<Button type="submit" className="w-full h-10 rounded-lg" disabled={!title.trim()}>
						Add Todo
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
