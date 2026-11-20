import { useEffect, useState } from "react";

const STEPS = [
	{
		label: "Context",
		description: "AI runs git log and git diff for context.",
		terminal: [
			{ type: "command", text: "git log -n 2 --pretty=format:'%s'" },
			{ type: "output", text: "feat: add habit tracking logic" },
			{ type: "output", text: "docs: update README with usage" },
			{ type: "command", text: "git diff origin/main...HEAD" },
		],
	},
	{
		label: "Draft",
		description: "AI generates the Markdown description based off your changes and commit messages.",
		terminal: [
			{ type: "comment", text: "# Generating PR description..." },
			{ type: "output", text: "Title: feat: implement habit tracking" },
			{ type: "output", text: "Body: This PR adds the core logic for..." },
		],
	},
	{
		label: "Action",
		description: "AI executes gh pr create.",
		terminal: [
			{
				type: "command",
				text: 'gh pr create --title "feat: implement habit tracking" --body "..."',
			},
			{ type: "comment", text: "# Submitting to GitHub..." },
		],
	},
	{
		label: "Outcome",
		description: "The terminal returns a URL to the PR.",
		terminal: [
			{ type: "success", text: "✓ Pull request created successfully!" },
			{ type: "link", text: "https://github.com/user/repo/pull/1" },
		],
	},
];

const STEP_DELAY = 2500;

export function GhCommandTrace() {
	const [activeStep, setActiveStep] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setActiveStep((s) => (s + 1) % STEPS.length);
		}, STEP_DELAY);

		return () => clearTimeout(timer);
	}, [activeStep]);

	return (
		<div className="my-8 space-y-4">
			<div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
				{/* Visual Flow Header */}
				<div className="bg-stone-50 border-b border-stone-200 px-5 py-4">
					<div className="flex items-center justify-between w-full">
						{STEPS.map((step, i) => {
							const isActive = i === activeStep;
							const isPast = i < activeStep;

							return (
								<div key={i} className="flex flex-1 last:flex-none items-center">
									<div className="flex flex-col items-center gap-1 shrink-0">
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
												isActive ? "bg-violet-600 text-white shadow-md scale-110" : isPast ? "bg-violet-100 text-violet-700" : "bg-stone-100 text-stone-400"
											}`}
										>
											{isPast ? (
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
												</svg>
											) : (
												i + 1
											)}
										</div>
										<span
											className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
												isActive ? "text-violet-600" : "text-stone-400"
											}`}
										>
											{step.label}
										</span>
									</div>
									{i < STEPS.length - 1 && <div className={`h-px flex-1 mx-4 transition-colors duration-500 ${isPast ? "bg-violet-300" : "bg-stone-200"}`} />}
								</div>
							);
						})}
					</div>
				</div>

				{/* Terminal Content */}
				<div className="p-0">
					<div className="bg-stone-900 font-mono text-xs leading-relaxed">
						{/* Terminal Header */}
						<div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-800 bg-stone-800/50">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
							<div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
							<div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
							<span className="ml-2 text-stone-500 text-[10px] uppercase tracking-widest font-bold">AI Trace — {STEPS[activeStep].label}</span>
						</div>

						{/* Terminal Lines: every step is stacked in one grid cell so the terminal is always as tall as the longest step */}
						<div className="p-4 grid">
							{STEPS.map((step, s) => {
								const isActive = s === activeStep;
								return (
									<div key={s} aria-hidden={!isActive} className={`col-start-1 row-start-1 space-y-1.5 ${isActive ? "" : "invisible"}`}>
										{step.terminal.map((line, i) => (
											<div
												key={i}
												className={isActive ? "animate-[fadeIn_0.3s_ease-out_forwards] opacity-0" : ""}
												style={isActive ? { animationDelay: `${i * 0.2}s` } : undefined}
											>
												{line.type === "command" && (
													<div className="flex gap-2">
														<span className="text-violet-400">$</span>
														<span className="text-stone-100">{line.text}</span>
													</div>
												)}
												{line.type === "output" && <div className="text-stone-400 pl-4">{line.text}</div>}
												{line.type === "comment" && <div className="text-stone-500 italic">{line.text}</div>}
												{line.type === "success" && <div className="text-green-400 font-bold">{line.text}</div>}
												{line.type === "link" && <div className="text-blue-400 underline decoration-blue-400/30">{line.text}</div>}
											</div>
										))}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Description: stacked the same way so its height doesn't depend on the active step's text length */}
			<div className="grid bg-violet-50/50 border border-violet-100 rounded-lg p-3 text-sm text-stone-600 animate-pulse-slow">
				{STEPS.map((step, s) => (
					<div key={s} aria-hidden={s !== activeStep} className={`col-start-1 row-start-1 ${s === activeStep ? "" : "invisible"}`}>
						<span className="font-bold text-violet-700 mr-2">Step {s + 1}:</span>
						{step.description}
					</div>
				))}
			</div>

			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; transform: translateY(4px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-pulse-slow {
					animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
				}
				@keyframes pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.8; }
				}
			`}</style>
		</div>
	);
}
