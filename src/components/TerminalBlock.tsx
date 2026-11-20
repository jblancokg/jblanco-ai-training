import clipboardCopy from "clipboard-copy";
import { useCallback, useState } from "react";

export type TerminalLineEntry = { type: "command"; command: string; display?: string } | { type: "comment"; text: string };

interface TerminalBlockProps {
	title?: string;
	lines: TerminalLineEntry[];
}

function CopyIcon({ className }: { className?: string }) {
	return (
		<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
			/>
		</svg>
	);
}

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" style={{ strokeDasharray: 24, strokeDashoffset: 0 }}>
				<animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.3s" fill="freeze" calcMode="spline" keySplines="0.25 1 0.5 1" />
			</path>
		</svg>
	);
}

function CommandLine({ command, display }: { command: string; display?: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		clipboardCopy(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [command]);

	return (
		<div className="group/line flex items-center gap-2 rounded px-1 -mx-1 hover:bg-white/5 transition-colors duration-100">
			<span className="flex-1 min-w-0">{display ?? command}</span>
			<button
				type="button"
				onClick={handleCopy}
				className={[
					"shrink-0 inline-flex items-center justify-center w-5 h-5 rounded cursor-pointer",
					"transition-all duration-150 motion-safe:transition-all",
					"opacity-0 group-hover/line:opacity-100 focus:opacity-100",
					"scale-90 group-hover/line:scale-100 focus:scale-100",
					copied ? "text-green-400" : "text-stone-500 hover:text-stone-300 active:scale-90",
				].join(" ")}
				aria-label={`Copy "${command}" to clipboard`}
			>
				{copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
			</button>
		</div>
	);
}

export default function TerminalBlock({ title, lines }: TerminalBlockProps) {
	return (
		<div className="rounded-lg overflow-hidden border border-stone-700/50 shadow-sm">
			{/* Terminal header */}
			<div className="flex items-center bg-stone-800 px-4 py-2 border-b border-stone-700/50">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
					</div>
					{title && <span className="text-[11px] text-stone-400 font-mono tracking-wide">{title}</span>}
				</div>
			</div>
			{/* Terminal body */}
			<div className="bg-stone-900 px-4 py-3 font-mono text-xs leading-relaxed text-stone-100 space-y-0.5">
				{lines.map((line, i) =>
					line.type === "comment" ? (
						<div key={i} className="text-stone-500">
							{line.text}
						</div>
					) : (
						<CommandLine key={i} command={line.command} display={line.display} />
					),
				)}
			</div>
		</div>
	);
}
