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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useDates } from "./use-dates";
import { DATE_CATEGORIES, type DateCategory } from "./types";

export function AddDateDialog() {
	const { addDate } = useDates();
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [category, setCategory] = useState<DateCategory>("other");
	const [recurring, setRecurring] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim() || !date) return;

		addDate(title.trim(), date, category, recurring);
		setTitle("");
		setDate("");
		setCategory("other");
		setRecurring(false);
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="rounded-full gap-1.5">
					<Plus className="h-4 w-4" />
					Add Date
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>New Important Date</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 mt-2">
					<div className="space-y-2">
						<Label htmlFor="date-title">Title</Label>
						<Input
							id="date-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What's the occasion?"
							autoFocus
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="date-date">Date</Label>
						<Input
							id="date-date"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="date-category">Category</Label>
						<Select
							value={category}
							onValueChange={(value) => setCategory(value as DateCategory)}
						>
							{/* pr-2 gives the chevron the requested 8px gap to the border */}
							<SelectTrigger id="date-category" className="h-10 w-full rounded-lg pr-2">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{DATE_CATEGORIES.map((cat) => (
									<SelectItem key={cat} value={cat}>
										{cat.charAt(0).toUpperCase() + cat.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="date-recurring"
							checked={recurring}
							onCheckedChange={(checked) => setRecurring(checked === true)}
						/>
						<Label htmlFor="date-recurring" className="text-sm font-normal">
							Repeats yearly
						</Label>
					</div>
					<Button type="submit" className="w-full h-10 rounded-lg" disabled={!title.trim() || !date}>
						Add Date
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
