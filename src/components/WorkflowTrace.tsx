import { useEffect, useState } from "react";

const WORKFLOW = [
	{ actor: "user", text: 'User asks: "Add email validation to signup"' },
	{ actor: "agent", text: "Agent plans: read form → read backend rules → write matching schema" },
	{ actor: "tool", text: "Tool: Read src/pages/Signup.tsx → react-hook-form, no validation" },
	{ actor: "tool", text: "Tool: Read api/validators/user.ts → zod email regex found" },
	{ actor: "tool", text: "Tool: Grep for existing zod patterns → 3 schemas in codebase" },
	{ actor: "agent", text: "Agent writes: zod schema + form error integration" },
	{ actor: "tool", text: "Tool: Run tests → 14 passed, 0 failed" },
	{ actor: "agent", text: "Agent reports: validation complete, matching backend rules" },
];

export function WorkflowTrace() {
	const [idx, setIdx] = useState(-1);

	useEffect(() => {
		if (idx < 0 || idx >= WORKFLOW.length - 1) return;
		const t = setTimeout(() => setIdx((p) => p + 1), 800);
		return () => clearTimeout(t);
	}, [idx]);

	return (
		<div className="my-8">
			<div className="flex items-baseline gap-3 mb-4">
				<h3 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
					Agent Workflow Trace
				</h3>
				<span className="text-xs text-stone-400 italic">How the AI processes a request</span>
				{idx < 0 ? (
					<button onClick={() => setIdx(0)} className="ml-auto text-sm text-orange-600 hover:text-orange-700 underline underline-offset-2 transition-colors">
						Run trace
					</button>
				) : (
					<button onClick={() => setIdx(-1)} className="ml-auto text-sm text-stone-400 hover:text-stone-600 transition-colors">
						Reset
					</button>
				)}
			</div>
			<ol className="space-y-1.5 list-none">
				{WORKFLOW.map((step, i) => {
					const isVisible = i <= idx;
					const isIndented = step.actor === "tool";
					const marker = step.actor === "user" ? "→" : step.actor === "agent" ? "◆" : "·";
					const textColor = step.actor === "user" ? "text-orange-700" : step.actor === "agent" ? "text-stone-800" : "text-stone-500";
					return (
						<li
							key={i}
							className={`flex items-start gap-3 py-2 px-3 rounded transition-all duration-300 ${isVisible ? "opacity-100 bg-stone-50/50" : "opacity-15"} ${isIndented ? "ml-8" : ""}`}
						>
							<span className={`shrink-0 w-5 text-center font-mono text-xs mt-0.5 ${isVisible ? textColor : "text-stone-300"}`}>{marker}</span>
							<span className={`text-sm leading-relaxed ${isVisible ? textColor : "text-stone-300"}`}>{step.text}</span>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
