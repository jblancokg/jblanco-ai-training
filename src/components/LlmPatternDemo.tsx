import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Question {
	label: string;
	response: string;
	/** ms between words — lower = faster */
	wordInterval: number;
}

const QUESTIONS: Question[] = [
	{
		label: "What is the capital of France?",
		response: "Paris is the capital of France.",
		wordInterval: 90,
	},
	{
		label: "Write a haiku about coding",
		response: "Bugs hide in the code / caffeine fuels the midnight hunt / tests finally pass",
		wordInterval: 160,
	},
	{
		label: "Explain recursion simply",
		response:
			"Recursion is when a function calls itself to solve a smaller version of the same problem, until it reaches a simple case it can answer directly.",
		wordInterval: 110,
	},
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single node in the static flow diagram on the left */
function FlowNode({ children, faded }: { children: React.ReactNode; faded?: boolean }) {
	return (
		<div className={`rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-center text-sm font-medium text-stone-500 ${faded ? "opacity-70" : ""}`}>
			{children}
		</div>
	);
}

/** Downward arrow used between flow nodes */
function FlowArrow() {
	return (
		<div className="flex justify-center py-0.5 text-stone-300 text-lg select-none" aria-hidden="true">
			↓
		</div>
	);
}

/** Database icon (SVG, no external deps) */
function DatabaseIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto mb-1 h-5 w-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
			<ellipse cx="12" cy="5" rx="9" ry="3" />
			<path d="M3 5v4c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
			<path d="M3 9v4c0 1.657 4.03 3 9 3s9-1.343 9-3V9" />
			<path d="M3 13v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4" />
		</svg>
	);
}

/** Static left-column "wrong mental model" diagram */
function WrongModelDiagram() {
	return (
		<div className="flex flex-col gap-0.5">
			<FlowNode>Question asked</FlowNode>
			<FlowArrow />
			<FlowNode>
				<DatabaseIcon />
				Database lookup
			</FlowNode>
			<FlowArrow />
			<FlowNode>Results retrieved</FlowNode>
			<FlowArrow />
			<FlowNode>Answer returned</FlowNode>
		</div>
	);
}

/** The animated pattern-cloud on the right */
function PatternCloud({ pulsing }: { pulsing: boolean }) {
	return (
		<div
			className={`rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200 px-4 py-3 text-center transition-all duration-300 ${
				pulsing ? "animate-pulse shadow-md shadow-orange-100" : "shadow-sm"
			}`}
		>
			<div className="text-lg mb-0.5" aria-hidden="true">
				{/* Simple wave-like decoration using unicode */}
				<span className="text-orange-300">〜</span>
				<span className="text-amber-400 mx-1">◈</span>
				<span className="text-orange-300">〜</span>
			</div>
			<p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Pattern Weights</p>
			<p className="text-xs text-orange-500 mt-0.5">billions of learned associations</p>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function LlmPatternDemo() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [displayedWords, setDisplayedWords] = useState<string[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [isPulsing, setIsPulsing] = useState(false);

	// Refs so interval callbacks always see fresh values
	const wordIndexRef = useRef(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	/** Start or restart animation for the given question index */
	function startAnimation(idx: number) {
		// Cancel any in-progress animation
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		const q = QUESTIONS[idx];
		const words = q.response.split(" ");
		wordIndexRef.current = 0;
		setDisplayedWords([]);
		setIsTyping(true);
		setIsPulsing(true);

		intervalRef.current = setInterval(() => {
			wordIndexRef.current += 1;
			const nextWords = words.slice(0, wordIndexRef.current);
			setDisplayedWords([...nextWords]);

			// Pulse the cloud briefly on each new word
			setIsPulsing(true);
			setTimeout(() => setIsPulsing(false), 200);

			if (wordIndexRef.current >= words.length) {
				clearInterval(intervalRef.current!);
				intervalRef.current = null;
				setIsTyping(false);
				setIsPulsing(false);
			}
		}, q.wordInterval);
	}

	function handleSelectQuestion(idx: number) {
		setSelectedIndex(idx);
		startAnimation(idx);
	}

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const selectedQuestion = selectedIndex !== null ? QUESTIONS[selectedIndex] : null;

	return (
		<>
			{/* Section heading */}
			<h3 className="text-xl font-semibold text-stone-800 mt-10 mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
				Pattern Matching, Not Searching
			</h3>

			{/* Question chips — sit above the right column on md+, centred on mobile */}
			<div className="mb-5 flex flex-wrap gap-2">
				<span className="text-sm text-stone-500 self-center mr-1 shrink-0">Try asking:</span>
				{QUESTIONS.map((q, i) => (
					<button
						key={q.label}
						type="button"
						onClick={() => handleSelectQuestion(i)}
						className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-150 cursor-pointer ${
							selectedIndex === i
								? "bg-orange-100 border-orange-300 text-orange-800"
								: "bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200 hover:border-stone-300"
						}`}
					>
						{q.label}
					</button>
				))}
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* LEFT — wrong mental model */}
				<div className="rounded-xl border border-stone-200 bg-stone-50 p-5 opacity-60">
					<div className="flex items-center gap-2 mb-4">
						<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs font-bold" aria-label="Incorrect">
							✕
						</span>
						<p className="text-xs font-semibold uppercase tracking-wide text-stone-400">What you might think happens</p>
					</div>
					<WrongModelDiagram />
					<p className="mt-4 text-center text-xs font-medium text-red-400 tracking-wide uppercase">Not how it works</p>
				</div>

				{/* RIGHT — actual model */}
				<div className="rounded-xl border border-orange-200 bg-white p-5 shadow-sm">
					<div className="flex items-center gap-2 mb-4">
						<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold" aria-label="Correct">
							✓
						</span>
						<p className="text-xs font-semibold uppercase tracking-wide text-stone-500">What actually happens</p>
					</div>

					{/* Right-side flow */}
					<div className="flex flex-col gap-0.5">
						{/* Question node */}
						<div className="grid rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-center text-sm font-medium text-orange-700">
							{/* Every label sits invisibly in the same cell, so the box is sized for the longest one */}
							{QUESTIONS.map((q) => (
								<span key={q.label} aria-hidden="true" className="invisible col-start-1 row-start-1 italic">
									&ldquo;{q.label}&rdquo;
								</span>
							))}
							{selectedQuestion ? (
								<span className="col-start-1 row-start-1 italic">&ldquo;{selectedQuestion.label}&rdquo;</span>
							) : (
								<span className="col-start-1 row-start-1 text-orange-400">Question asked</span>
							)}
						</div>

						<FlowArrow />

						{/* Pattern cloud */}
						<PatternCloud pulsing={isPulsing} />

						<FlowArrow />

						{/* Generated output */}
						<div className="grid rounded-lg border border-orange-200 bg-white px-3 py-2">
							{/* Every full response sits invisibly in the same cell, so streaming words never grow the box */}
							{QUESTIONS.map((q) => (
								<p key={q.label} aria-hidden="true" className="invisible col-start-1 row-start-1 text-sm leading-relaxed">
									{q.response} |
								</p>
							))}
							{selectedIndex === null ? (
								<p className="col-start-1 row-start-1 text-center text-xs text-stone-400 leading-relaxed pt-1">
									Select a question above to see words generated one at a time
								</p>
							) : (
								<p className="col-start-1 row-start-1 text-sm text-stone-700 leading-relaxed">
									{displayedWords.join(" ")}
									{isTyping && <span className="ml-0.5 inline-block animate-pulse text-orange-400">|</span>}
								</p>
							)}
						</div>
					</div>

					{/* Legend */}
					<p className="mt-3 text-xs text-stone-400 leading-snug">
						The model has no database. It generates each word by matching patterns learned during training — nothing is &ldquo;looked up.&rdquo;
					</p>
				</div>
			</div>
		</>
	);
}
