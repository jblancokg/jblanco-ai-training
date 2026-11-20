import type React from "react";
import { useState } from "react";

interface TourStep {
	lineRange: [number, number];
	title: string;
	content: React.ReactNode;
	type: "critique" | "logic" | "style";
}

const steps: TourStep[] = [
	{
		lineRange: [1, 2],
		title: "Monday-First Assumption",
		content: (
			<>
				The AI assumes Monday is index 0 (<code>completedDays[0]</code>). You should verify if your project's date utility or the <code>HabitTracker</code> type
				actually treats Monday as the first day of the week or if this should be Sunday (ideally this was fleshed out during the requirements process).
			</>
		),
		type: "logic",
	},
	{
		lineRange: [2, 7],
		title: "Chain Calculation Logic",
		content: (
			<>
				Notice how the AI calculates the streak by adding <code>streakAtStartOfWeek</code> to the current week's <code>chainLength</code>. A human reviewer
				should check: if the user missed Sunday (the day before), should this chain actually be broken?
			</>
		),
		type: "critique",
	},
	{
		lineRange: [8, 17],
		title: "Reverse Loop Efficiency",
		content: (
			<>
				The AI uses a reverse <code>for</code> loop starting at index 6. This is an efficient way to find the most recent day, but using a constant like{" "}
				<code>DAYS_IN_WEEK - 1</code> instead of '6' would be more readable and may align better with project standards.
			</>
		),
		type: "style",
	},
];

const codeLines = [
	"// Check for the continuous chain from Monday that connects to previous week.",
	"if (completedDays[0] && streakAtStartOfWeek > 0) {",
	"  let chainLength = 0;",
	"  while (chainLength < 7 && completedDays[chainLength]) {",
	"    chainLength++;",
	"  }",
	"  currentStreak = streakAtStartOfWeek + chainLength;",
	"} else {",
	"  // No connection to previous week, find the latest continuous chain in the current week.",
	"  let latestIdx = -1;",
	"  for (let i = 6; i >= 0; i--) {",
	"    if (completedDays[i]) {",
	"      latestIdx = i;",
	"      break;",
	"    }",
	"  }",
	"}",
];

export const AnnotatedCodeTour: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const step = steps[currentStep];

	const getStepColors = (type: TourStep["type"]) => {
		switch (type) {
			case "critique":
				return { border: "border-amber-500", text: "text-amber-600" };
			case "logic":
				return { border: "border-rose-500", text: "text-rose-600" };
			case "style":
				return { border: "border-teal-500", text: "text-teal-600" };
			default:
				return { border: "border-stone-400", text: "text-stone-500" };
		}
	};

	const { text: stepText } = getStepColors(step.type);

	return (
		<div className="my-8 grid grid-cols-1 lg:grid-cols-5 gap-0 border border-stone-200 rounded-xl overflow-hidden shadow-sm bg-white">
			{/* Code Area */}
			<div className="lg:col-span-3 p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
				{codeLines.map((line, idx) => {
					const lineNum = idx + 1;
					const isHighlighted = lineNum >= step.lineRange[0] && lineNum <= step.lineRange[1];
					return (
						<div
							key={idx}
							className={`flex transition-all duration-300 ${isHighlighted ? `opacity-100 ${stepText} font-medium` : "opacity-25 text-stone-800"}`}
						>
							<span className="w-8 shrink-0 text-stone-400 select-none font-normal">{lineNum}</span>
							<span className="whitespace-pre">{line}</span>
						</div>
					);
				})}
			</div>

			{/* Annotation Area */}
			<div className="lg:col-span-2 bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 p-6 flex flex-col justify-between">
				{/* Every step's annotation is stacked in one grid cell so the panel (and the nav buttons below it) never move */}
				<div className="grid">
					{steps.map((s, idx) => {
						const isActive = idx === currentStep;
						const { border, text } = getStepColors(s.type);
						return (
							<div
								key={idx}
								aria-hidden={!isActive}
								className={`col-start-1 row-start-1 ${isActive ? "animate-in fade-in slide-in-from-right-4 duration-500" : "invisible"}`}
							>
								<div className={`text-[10px] uppercase tracking-widest font-bold mb-2 border-b pb-1 inline-block ${border} ${text}`}>{s.type}</div>
								<h4 className="text-stone-900 font-bold mb-3">{s.title}</h4>
								<p className="text-sm text-stone-600 leading-relaxed">{s.content}</p>
							</div>
						);
					})}
				</div>

				<div className="mt-8 flex items-center justify-between">
					<div className="flex gap-1">
						{steps.map((_, idx) => (
							<div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentStep ? "bg-teal-500" : "bg-stone-200"}`} />
						))}
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
							disabled={currentStep === 0}
							className="p-2 text-stone-400 hover:text-stone-800 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>
						<button
							onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
							disabled={currentStep === steps.length - 1}
							className="p-2 text-stone-400 hover:text-stone-800 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
