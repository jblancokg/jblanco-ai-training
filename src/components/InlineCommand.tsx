import clipboardCopy from "clipboard-copy";
import { useCallback, useState } from "react";

interface InlineCommandProps {
	command: string;
}

export default function InlineCommand({ command }: InlineCommandProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		clipboardCopy(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [command]);

	return (
		<span className="group/cmd relative inline-flex items-center">
			<code className="bg-stone-800 text-amber-300 rounded px-1.5 py-0.5 text-xs font-mono border border-stone-700/50">{command}</code>
			<button
				type="button"
				onClick={handleCopy}
				className={[
					"inline-flex items-center justify-center w-5 h-5 ml-0.5 rounded cursor-pointer",
					"transition-all duration-150 motion-safe:transition-all",
					"opacity-0 group-hover/cmd:opacity-100 focus:opacity-100",
					"scale-90 group-hover/cmd:scale-100 focus:scale-100",
					copied ? "bg-green-900/50 text-green-400" : "bg-stone-700/80 hover:bg-stone-600 text-stone-300 hover:text-stone-100 active:scale-90",
				].join(" ")}
				aria-label={`Copy "${command}" to clipboard`}
			>
				{copied ? (
					<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" style={{ strokeDasharray: 24, strokeDashoffset: 0 }}>
							<animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.3s" fill="freeze" calcMode="spline" keySplines="0.25 1 0.5 1" />
						</path>
					</svg>
				) : (
					<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				)}
			</button>
		</span>
	);
}
