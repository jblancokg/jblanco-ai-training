import { useState } from "react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Message {
	role: "system" | "user" | "assistant";
	content: string;
	tokens: number;
}

const CONVERSATION: Message[] = [
	{
		role: "system",
		content:
			"You are a senior developer helping with a React migration project. Always consider backwards compatibility. Use TypeScript. Follow the existing naming conventions in the codebase.",
		tokens: 42,
	},
	{
		role: "user",
		content:
			"We're migrating from class components to hooks. Start with the UserProfile component in src/components/UserProfile.tsx. It uses setState and componentDidMount.",
		tokens: 38,
	},
	{
		role: "assistant",
		content:
			"I'll convert UserProfile to a functional component with hooks. I'll replace setState with useState, componentDidMount with useEffect, and keep the same prop interface for backwards compatibility.",
		tokens: 44,
	},
	{
		role: "user",
		content:
			"Good. Now also convert the UserSettings component. It shares state with UserProfile via a context provider defined in src/context/UserContext.tsx.",
		tokens: 36,
	},
	{
		role: "assistant",
		content:
			"I'll update UserSettings to use useContext for the shared state. I'll keep the UserContext provider interface unchanged so other consumers aren't affected. Here's the refactored component...",
		tokens: 48,
	},
	{
		role: "user",
		content: "The tests in UserProfile.test.tsx are failing after the conversion. The enzyme shallow render isn't working with hooks. What should I do?",
		tokens: 34,
	},
	{
		role: "assistant",
		content:
			"Enzyme has limited hooks support. I'd recommend migrating the tests to React Testing Library — it works with hooks natively and tests behavior rather than implementation. Here's how to convert the existing tests...",
		tokens: 52,
	},
	{
		role: "user",
		content: "We also need to handle the AuthGuard HOC that wraps several components. Can we convert that to a hook pattern too?",
		tokens: 30,
	},
	{
		role: "assistant",
		content:
			"Yes — create a useAuth hook that returns the auth state and a withAuth wrapper for gradual migration. Components already converted can use the hook directly, while unconverted ones keep using the HOC.",
		tokens: 46,
	},
	{
		role: "user",
		content:
			"One more thing — the Dashboard component uses multiple lifecycle methods: componentDidMount, componentDidUpdate, and componentWillUnmount. How should I structure the useEffect calls?",
		tokens: 40,
	},
	{
		role: "assistant",
		content:
			"Split them into separate useEffect hooks by concern, not by lifecycle. One for data fetching (replaces didMount), one for the subscription cleanup (replaces willUnmount), and one for the filter sync (replaces didUpdate with a dependency array).",
		tokens: 54,
	},
	{
		role: "user",
		content: "Now let's go back to the UserProfile component. Can you remind me what changes we made?",
		tokens: 22,
	},
];

const CONTEXT_LIMIT = 250;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeWindowState(messageCount: number) {
	const messages = CONVERSATION.slice(0, messageCount);
	const totalTokens = messages.reduce((sum, m) => sum + m.tokens, 0);
	const overLimit = totalTokens > CONTEXT_LIMIT;

	if (!overLimit) {
		return {
			visible: messages.map((m, i) => ({ ...m, compacted: false, originalIndex: i })),
			compacted: [] as { role: string; originalIndex: number }[],
			totalTokens,
			overLimit: false,
			compactedTokensSaved: 0,
		};
	}

	// Compact oldest non-system messages until we fit
	const kept = [...messages];
	const compactedIndices: number[] = [];
	let currentTokens = totalTokens;

	for (let i = 1; i < kept.length - 4; i++) {
		// keep system + last 4 messages
		if (currentTokens <= CONTEXT_LIMIT) break;
		currentTokens -= kept[i].tokens;
		currentTokens += 8; // compacted summary uses ~8 tokens
		compactedIndices.push(i);
	}

	const visible = kept.map((m, i) => ({
		...m,
		compacted: compactedIndices.includes(i),
		originalIndex: i,
	}));

	const saved = compactedIndices.reduce((sum, i) => sum + messages[i].tokens - 8, 0);

	return {
		visible,
		compacted: compactedIndices.map((i) => ({
			role: messages[i].role,
			originalIndex: i,
		})),
		totalTokens: totalTokens - saved,
		overLimit: true,
		compactedTokensSaved: saved,
	};
}

// ─── Role styling ─────────────────────────────────────────────────────────────

const roleBg: Record<string, string> = {
	system: "bg-violet-50 border-violet-200",
	user: "bg-stone-50 border-stone-200",
	assistant: "bg-orange-50 border-orange-200",
};

const roleLabel: Record<string, string> = {
	system: "System Prompt",
	user: "You",
	assistant: "AI",
};

const roleLabelColor: Record<string, string> = {
	system: "text-violet-600",
	user: "text-stone-600",
	assistant: "text-orange-600",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ContextWindowDemo() {
	const [messageCount, setMessageCount] = useState(3);

	const state = computeWindowState(messageCount);
	const fullTokens = CONVERSATION.slice(0, messageCount).reduce((s, m) => s + m.tokens, 0);
	const fillPercent = Math.min(100, (state.totalTokens / CONTEXT_LIMIT) * 100);
	const rawFillPercent = Math.min(100, (fullTokens / CONTEXT_LIMIT) * 100);

	return (
		<div className="my-10">
			<div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
				{/* Header */}
				<div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex items-center justify-between">
					<div>
						<div className="text-sm font-semibold text-stone-800">Context Window Simulator</div>
						<div className="text-xs text-stone-500 mt-0.5">See how conversations fill and overflow the context window</div>
					</div>
					<button type="button" onClick={() => setMessageCount(3)} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
						Reset
					</button>
				</div>

				{/* Token bar */}
				<div className="px-5 pt-4 pb-2">
					<div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
						<span>
							{state.totalTokens} / {CONTEXT_LIMIT} tokens used
							{state.overLimit && <span className="text-amber-600 ml-2">({state.compactedTokensSaved} tokens freed by compaction)</span>}
						</span>
						<span>{messageCount} messages</span>
					</div>
					<div className="h-3 bg-stone-100 rounded-full overflow-hidden relative">
						{/* Raw fill (what it would be without compaction) */}
						{state.overLimit && (
							<div className="absolute inset-y-0 left-0 bg-red-200 rounded-full transition-all duration-500" style={{ width: `${rawFillPercent}%` }} />
						)}
						{/* Actual fill */}
						<div
							className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
								state.overLimit ? "bg-amber-400" : fillPercent > 75 ? "bg-orange-400" : "bg-green-400"
							}`}
							style={{ width: `${fillPercent}%` }}
						/>
					</div>
					{state.overLimit && (
						<div className="flex items-center gap-4 mt-1.5 text-xs">
							<span className="flex items-center gap-1">
								<span className="w-2.5 h-2.5 rounded-sm bg-red-200 inline-block" /> Would need ({fullTokens} tokens)
							</span>
							<span className="flex items-center gap-1">
								<span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> After compaction
							</span>
						</div>
					)}
				</div>

				{/* Messages */}
				<div className="px-5 pb-3 space-y-2 max-h-80 overflow-y-auto">
					{state.visible.map((msg, i) => {
						if (msg.compacted) {
							// Find consecutive compacted messages
							const prevCompacted = i > 0 && state.visible[i - 1]?.compacted;
							if (prevCompacted) return null;

							// Count how many consecutive compacted messages
							let count = 0;
							for (let j = i; j < state.visible.length && state.visible[j].compacted; j++) {
								count++;
							}

							return (
								<div
									key={`compacted-${msg.originalIndex}`}
									className="flex items-center gap-2 py-2 px-3 bg-stone-100 rounded-lg border border-dashed border-stone-300 transition-all duration-500"
								>
									<div className="w-5 h-5 rounded bg-stone-300 flex items-center justify-center">
										<svg className="w-3 h-3 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<title>Compressed</title>
											<path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
										</svg>
									</div>
									<span className="text-xs text-stone-500 italic">{count} earlier messages compacted into brief summaries — details lost</span>
								</div>
							);
						}

						return (
							<div key={msg.originalIndex} className={`border rounded-lg px-3 py-2 transition-all duration-500 ${roleBg[msg.role]}`}>
								<div className="flex items-center justify-between mb-0.5">
									<span className={`text-xs font-semibold ${roleLabelColor[msg.role]}`}>{roleLabel[msg.role]}</span>
									<span className="text-xs text-stone-400">{msg.tokens} tokens</span>
								</div>
								<p className="text-xs text-stone-600 leading-relaxed">{msg.content}</p>
							</div>
						);
					})}
				</div>

				{/* Add message button */}
				<div className="px-5 pb-4 pt-1">
					{messageCount < CONVERSATION.length ? (
						<button
							type="button"
							onClick={() => setMessageCount((c) => Math.min(c + 1, CONVERSATION.length))}
							className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
						>
							Send next message →
						</button>
					) : (
						<div className="text-center py-2.5">
							<p className="text-sm text-stone-500">
								The last question asks about UserProfile — but those early messages have been compacted. The AI no longer has the full details.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Caption */}
			{state.overLimit && (
				<div className="mt-3 px-1">
					<p className="text-xs text-stone-400 leading-relaxed">
						Notice how earlier messages are compressed into short summaries to make room. The model can no longer see the original details of those messages —
						it only has a brief summary. This is why long conversations lose fidelity over time.
					</p>
				</div>
			)}
		</div>
	);
}
