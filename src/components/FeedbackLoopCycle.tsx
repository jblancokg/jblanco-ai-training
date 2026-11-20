import { useEffect, useState } from "react";

const STEPS = ["Prompt", "AI codes", "Not right", "Fix it", "Still wrong", "Fix the fix"];
const LOOP_START = 2; // after last step, jump back to "Not right"

const STEP_DELAY = 1200;

export function FeedbackLoopCycle() {
	const [activeStep, setActiveStep] = useState(0);
	const [cycle, setCycle] = useState(1);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (activeStep >= STEPS.length - 1) {
				// Loop back to "Not right"
				setActiveStep(LOOP_START);
				setCycle((c) => c + 1);
			} else {
				setActiveStep((s) => s + 1);
			}
		}, STEP_DELAY);

		return () => clearTimeout(timer);
	}, [activeStep, cycle]);

	const pollution = Math.min(100, Math.round((cycle / 8) * 100));

	return (
		<div className="my-8">
			<div className="rounded-xl border border-amber-200 bg-amber-50/40 px-5 py-5">
				{/* Header row */}
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-base font-semibold text-amber-800 m-0" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
						The Fix Loop
					</h4>
					<span className="text-xs font-mono text-amber-500 tabular-nums">cycle {cycle}</span>
				</div>

				{/* Step ring */}
				<div className="flex items-center gap-1.5 flex-wrap">
					{STEPS.map((label, i) => {
						const isActive = i === activeStep;
						const isPast = i < activeStep;

						return (
							<div key={i} className="flex items-center gap-1.5">
								<div
									className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors duration-300 whitespace-nowrap ${
										isActive
											? "bg-amber-500 border-amber-500 text-white shadow-sm"
											: isPast
												? "bg-amber-200 border-amber-200 text-amber-700"
												: "bg-white/70 border-stone-200 text-stone-400"
									}`}
								>
									{label}
								</div>
								{i < STEPS.length - 1 && (
									<svg
										className={`w-3 h-3 shrink-0 transition-colors duration-300 ${isPast || isActive ? "text-amber-400" : "text-stone-200"}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										strokeWidth={2.5}
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
									</svg>
								)}
							</div>
						);
					})}

					{/* Loop-back arrow to "Not right" */}
					<svg
						className={`w-4 h-4 ml-1 shrink-0 transition-all duration-300 ${activeStep === STEPS.length - 1 ? "text-amber-500" : "text-amber-300"}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
					</svg>
				</div>

				{/* Pollution bar */}
				<div className="mt-4">
					<div className="flex justify-between items-baseline mb-1">
						<span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">Context pollution</span>
						<span className="text-[11px] font-mono text-amber-500">{pollution}%</span>
					</div>
					<div className="h-1.5 rounded-full bg-amber-100">
						<div className="h-1.5 rounded-full bg-amber-400 transition-all duration-500 ease-out" style={{ width: `${pollution}%` }} />
					</div>
				</div>
			</div>
		</div>
	);
}
