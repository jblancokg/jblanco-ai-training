import clipboardCopy from "clipboard-copy";
import { useCallback, useState } from "react";

interface PromptExample {
	id: string;
	title: string;
	description: string;
	command: string;
}

interface PromptExamplesProps {
	prompts: PromptExample[];
}

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

export default function PromptExamples({ prompts }: PromptExamplesProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="my-6 border border-stone-200 rounded-lg overflow-hidden">
			<div className="flex bg-stone-50 border-b border-stone-200">
				{prompts.map((prompt, index) => (
					<button
						key={prompt.id}
						onClick={() => setActiveIndex(index)}
						className={`flex-1 text-center py-2 text-sm font-medium border-b-2 transition-colors ${
							index === activeIndex ? "bg-white text-stone-800 border-orange-500" : "text-stone-500 hover:text-stone-700 bg-stone-50 border-transparent"
						}`}
					>
						{prompt.title}
					</button>
				))}
			</div>
			{/* Every tab panel is stacked in one grid cell so switching tabs never changes the height */}
			<div className="p-4 bg-white grid">
				{prompts.map((prompt, index) => (
					<div key={prompt.id} aria-hidden={index !== activeIndex} className={`col-start-1 row-start-1 ${index === activeIndex ? "" : "invisible"}`}>
						<p className="text-sm text-stone-600 mb-3">{prompt.description}</p>
						<div className="bg-stone-800 rounded-lg p-3 relative">
							<pre className="font-mono text-xs text-stone-100 whitespace-pre-wrap">{prompt.command}</pre>
							<div className="absolute top-2 right-2">
								<CopyButton text={prompt.command} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
