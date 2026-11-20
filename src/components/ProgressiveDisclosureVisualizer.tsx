import { useState } from "react";

interface Skill {
	name: string;
	description: string;
	tokens: number;
}

interface RefFile {
	name: string;
	tokens: number;
}

const SKILLS: Skill[] = [
	{ name: "ticket-writing", description: "Create well-structured Jira tickets", tokens: 18 },
	{ name: "code-review", description: "Review pull requests for quality and style", tokens: 16 },
	{
		name: "requirements-gathering",
		description: "Gather and document feature requirements",
		tokens: 20,
	},
	{
		name: "competitive-research",
		description: "Research and compare competitor products",
		tokens: 19,
	},
	{ name: "test-planning", description: "Plan test coverage for new features", tokens: 17 },
];

const ACTIVE_SKILL = SKILLS[0]; // ticket-writing
const SKILL_MD_TOKENS = 320;

const REFERENCE_FILES: RefFile[] = [
	{ name: "references/jira-template.md", tokens: 180 },
	{ name: "references/golden-master-ticket.md", tokens: 240 },
	{ name: "assets/acceptance-criteria-checklist.md", tokens: 95 },
];

const CONTEXT_LIMIT = 200000;

type Phase = 1 | 2 | 3;

export function ProgressiveDisclosureVisualizer() {
	const [phase, setPhase] = useState<Phase>(1);
	const [loadedRefs, setLoadedRefs] = useState<number>(0);
	const [animating, setAnimating] = useState(false);

	// Calculate tokens for current state
	const discoveryTokens = SKILLS.reduce((sum, s) => sum + s.tokens, 0);
	const skillMdTokens = phase >= 2 ? SKILL_MD_TOKENS : 0;
	const refTokens = phase >= 3 ? REFERENCE_FILES.slice(0, loadedRefs).reduce((sum, f) => sum + f.tokens, 0) : 0;
	const totalTokens = discoveryTokens + skillMdTokens + refTokens;
	const fillPercent = (totalTokens / CONTEXT_LIMIT) * 100;

	function advancePhase() {
		if (animating) return;
		if (phase === 1) {
			setAnimating(true);
			setPhase(2);
			setTimeout(() => setAnimating(false), 600);
		} else if (phase === 2) {
			setAnimating(true);
			setPhase(3);
			setLoadedRefs(0);
			setTimeout(() => setAnimating(false), 600);
		} else if (phase === 3 && loadedRefs < REFERENCE_FILES.length) {
			setAnimating(true);
			setLoadedRefs((n) => n + 1);
			setTimeout(() => setAnimating(false), 400);
		}
	}

	function reset() {
		setPhase(1);
		setLoadedRefs(0);
		setAnimating(false);
	}

	const isComplete = phase === 3 && loadedRefs === REFERENCE_FILES.length;

	const buttonLabel =
		phase === 1
			? 'User asks: "Create a Jira ticket for this feature"'
			: phase === 2
				? "Skill needs reference files..."
				: loadedRefs < REFERENCE_FILES.length
					? `Load ${REFERENCE_FILES[loadedRefs].name}`
					: "";

	return (
		<div className="my-10">
			<div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
				{/* Header */}
				<div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex items-center justify-between">
					<div>
						<div className="text-sm font-semibold text-stone-800">Progressive Disclosure in Action</div>
						<div className="text-xs text-stone-500 mt-0.5">Watch how skills load only what they need, when they need it</div>
					</div>
					<button type="button" onClick={reset} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
						Reset
					</button>
				</div>

				{/* Token bar */}
				<div className="px-5 pt-4 pb-2">
					<div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
						<span>
							{totalTokens.toLocaleString()} / {(CONTEXT_LIMIT / 1000).toFixed(0)}k tokens used
						</span>
						<span className="text-green-600 font-medium">{fillPercent < 0.01 ? "<0.01" : fillPercent.toFixed(2)}% of context</span>
					</div>
					<div className="h-3 bg-stone-100 rounded-full overflow-hidden relative">
						<div
							className="absolute inset-y-0 left-0 bg-green-400 rounded-full transition-all duration-500"
							style={{ width: `${Math.max(fillPercent, 0.3)}%` }}
						/>
					</div>
				</div>

				{/* Phase indicators */}
				<div className="px-5 py-3 flex gap-2">
					{[1, 2, 3].map((p) => (
						<div
							key={p}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
								phase === p
									? "bg-violet-100 text-violet-700 border border-violet-300"
									: phase > p
										? "bg-green-50 text-green-600 border border-green-200"
										: "bg-stone-50 text-stone-400 border border-stone-200"
							}`}
						>
							{phase > p ? (
								<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<title>Complete</title>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : null}
							{p === 1 ? "Discovery" : p === 2 ? "Activation" : "Execution"}
						</div>
					))}
				</div>

				{/* Content */}
				<div className="px-5 pb-3">
					{/* Phase 1: Discovery - skill list */}
					<div className="mb-3">
						<div className="text-xs font-semibold text-stone-500 mb-2">Available Skills ({discoveryTokens} tokens)</div>
						<div className="flex flex-wrap gap-2">
							{SKILLS.map((skill) => (
								<div
									key={skill.name}
									className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all duration-300 ${
										phase >= 2 && skill.name === ACTIVE_SKILL.name
											? "border-violet-300 bg-violet-50 text-violet-700"
											: "border-stone-200 bg-stone-50 text-stone-500"
									}`}
								>
									<span className="font-medium">{skill.name}</span>
									<span className="text-stone-400 ml-1">({skill.tokens}t)</span>
								</div>
							))}
						</div>
					</div>

					{/* Phase 2: SKILL.md loaded */}
					{phase >= 2 && (
						<div className={`mb-3 transition-all duration-500 ${phase === 2 && animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
							<div className="text-xs font-semibold text-violet-600 mb-2">Loaded: ticket-writing/SKILL.md ({SKILL_MD_TOKENS} tokens)</div>
							<div className="border border-violet-200 bg-violet-50/50 rounded-lg px-4 py-3 font-mono text-xs text-stone-600 leading-relaxed">
								<div className="text-violet-700 font-semibold mb-1"># ticket-writing</div>
								<div className="text-stone-400 mb-2">Create well-structured Jira tickets from feature descriptions.</div>
								<div className="text-stone-500">
									## Instructions{"\n"}
									1. Extract the core user need from the conversation{"\n"}
									2. Load the Jira template from references/{"\n"}
									3. Fill each section following the golden master example{"\n"}
									4. Ensure acceptance criteria are specific and testable{"\n"}
									...
								</div>
							</div>
						</div>
					)}

					{/* Phase 3: Reference files */}
					{phase >= 3 && (
						<div>
							<div className="text-xs font-semibold text-stone-500 mb-2">Reference Files (loaded on demand)</div>
							<div className="space-y-2">
								{REFERENCE_FILES.map((file, i) => {
									const loaded = i < loadedRefs;
									return (
										<div
											key={file.name}
											className={`border rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
												loaded ? "border-green-200 bg-green-50/50 text-green-700" : "border-dashed border-stone-200 text-stone-400"
											}`}
										>
											<span className="font-mono">{file.name}</span>
											<span className="ml-2">{loaded ? `${file.tokens} tokens loaded` : "waiting..."}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				{/* Action button */}
				<div className="px-5 pb-4 pt-1">
					{!isComplete ? (
						<button
							type="button"
							onClick={advancePhase}
							disabled={animating}
							className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
								animating ? "bg-stone-100 text-stone-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"
							}`}
						>
							{buttonLabel}
						</button>
					) : (
						<div className="text-center py-2.5">
							<p className="text-sm text-stone-500">
								Total loaded: {totalTokens.toLocaleString()} tokens — just {fillPercent.toFixed(2)}% of the context window. Everything else stays available for
								your actual conversation.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
