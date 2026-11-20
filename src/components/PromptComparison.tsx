import clipboardCopy from "clipboard-copy";
import { useCallback, useState } from "react";

interface TooltipSegment {
	text: string;
	skill?: string;
	description?: string;
}

const prompt1Text = "The numbers in the clock widget aren't fitting, can you fix it?";

const prompt2Text =
	"The clock digits in @src/features/world-clock/WorldClockCard.tsx are overflowing their container to the right due to the font size. Please analyze the layout constraints and propose a responsive fix that keeps the text contained. Ask any questions you may have about the intended implementation and wait for my approval before modifying the file.";

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		clipboardCopy(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [text]);

	return (
		<button
			type="button"
			onClick={handleCopy}
			className={[
				"ml-auto inline-flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer",
				"transition-colors duration-150",
				copied ? "bg-green-100 text-green-700" : "bg-white/60 hover:bg-white text-stone-500 hover:text-stone-700",
			].join(" ")}
			aria-label="Copy prompt to clipboard"
		>
			{copied ? (
				<>
					<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
					Copied
				</>
			) : (
				<>
					<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
					Copy
				</>
			)}
		</button>
	);
}

const prompt2Segments: TooltipSegment[] = [
	{
		text: "The clock digits in ",
	},
	{
		text: "@src/features/world-clock/WorldClockCard.tsx",
		skill: "Reference Your Code",
		description: "Pointing to the exact file eliminates guesswork. The AI won't waste turns searching or hallucinate fixes in the wrong file.",
	},
	{
		text: " are overflowing their container to the right ",
	},
	{
		text: "due to the font size.",
		skill: "Share your knowledge",
		description:
			'You\'ve identified the root cause (font size), not just the symptom ("it looks broken"). This focuses the AI on the right area of the code and helps to imply how you want it fixed.',
	},
	{
		text: " Please ",
	},
	{
		text: "propose a fix",
		skill: "Set Clear Expectations",
		description:
			"Asking for a fix (not a blind fix) ensures the AI thinks through the problem before acting and lets you review a plan before it makes changes.",
	},
	{
		text: " that keeps the text contained. ",
	},
	{
		text: "If you have any questions or concerns, ask me first",
		skill: "Reduce Ambiguity",
		description: "This will help your AI not make assumptions when if can just ask you",
	},
];

function TooltipSpan({ segment }: { segment: TooltipSegment }) {
	const [show, setShow] = useState(false);

	if (!segment.skill) {
		return <span>{segment.text}</span>;
	}

	return (
		<span className="relative inline" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
			<span className="underline decoration-2 decoration-violet-400/70 underline-offset-2 cursor-help bg-violet-50 rounded-sm px-0.5">{segment.text}</span>
			{show && (
				<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50 pointer-events-none">
					<span className="block bg-stone-800 text-stone-100 text-xs rounded-lg px-3 py-2.5 shadow-lg leading-relaxed">
						<span className="block font-bold text-violet-300 mb-1">{segment.skill}</span>
						{segment.description}
					</span>
					<span className="block w-2 h-2 bg-stone-800 rotate-45 mx-auto -mt-1" />
				</span>
			)}
		</span>
	);
}

export default function PromptComparison() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
			{/* Prompt 1 */}
			<div className="border border-stone-200 rounded-lg">
				<div className="bg-stone-100 px-4 py-2 border-b border-stone-200 rounded-t-lg flex items-center gap-2">
					<span className="w-2 h-2 rounded-full bg-red-400" />
					<span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Prompt #1 — Passive</span>
					<CopyButton text={prompt1Text} />
				</div>
				<div className="px-4 py-4 bg-stone-50 rounded-b-lg">
					<p className="font-mono text-sm text-stone-700 leading-relaxed m-0">The numbers in the clock widget aren't fitting, can you fix it?</p>
				</div>
			</div>

			{/* Prompt 2 */}
			<div className="border border-violet-200 rounded-lg">
				<div className="bg-violet-50 px-4 py-2 border-b border-violet-200 rounded-t-lg flex items-center gap-2">
					<span className="w-2 h-2 rounded-full bg-violet-500" />
					<span className="text-xs font-bold text-violet-600 uppercase tracking-wider">Prompt #2 — Assertive</span>
					<CopyButton text={prompt2Text} />
				</div>
				<div className="px-4 py-4 bg-white rounded-b-lg">
					<p className="font-mono text-sm text-stone-700 leading-relaxed m-0">
						{prompt2Segments.map((segment, i) => (
							<TooltipSpan key={i} segment={segment} />
						))}
					</p>
				</div>
			</div>
		</div>
	);
}
