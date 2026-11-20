import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDates } from "./use-dates";
import { DATE_CATEGORIES, type DateCategory, type ImportantDate } from "./types";

interface EditDateDialogProps {
	date: ImportantDate;
	onClose: () => void;
}

export function EditDateDialog({ date, onClose }: EditDateDialogProps) {
	const { updateDate } = useDates();
	const [title, setTitle] = useState(date.title);
	const [dateValue, setDateValue] = useState(date.date);
	const [category, setCategory] = useState<DateCategory>(date.category);
	const [recurring, setRecurring] = useState(date.recurring);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim() || !dateValue) return;

		updateDate(date.id, {
			title: title.trim(),
			date: dateValue,
			category,
			recurring,
		});
		onClose();
	}

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Date</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 mt-2">
					<div className="space-y-2">
						<Label htmlFor="edit-title">Title</Label>
						<Input
							id="edit-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							autoFocus
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-date">Date</Label>
						<Input
							id="edit-date"
							type="date"
							value={dateValue}
							onChange={(e) => setDateValue(e.target.value)}
							className="h-10"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-category">Category</Label>
						<select
							id="edit-category"
							value={category}
							onChange={(e) => setCategory(e.target.value as DateCategory)}
							className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							{DATE_CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat.charAt(0).toUpperCase() + cat.slice(1)}
								</option>
							))}
						</select>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="edit-recurring"
							checked={recurring}
							onCheckedChange={(checked) => setRecurring(checked === true)}
						/>
						<Label htmlFor="edit-recurring" className="text-sm font-normal">
							Repeats yearly
						</Label>
					</div>
					<Button type="submit" className="w-full h-10 rounded-lg" disabled={!title.trim() || !dateValue}>
						Save Changes
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
