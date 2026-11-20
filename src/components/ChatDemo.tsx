import { useState } from "react";
import { TypeWriter } from "./TypeWriter";

const CHAT_MSGS = [
	{ role: "user" as const, text: "Can you add form validation to the signup page?" },
	{
		role: "ai" as const,
		text: "I'll review the current form implementation and add validation that matches your backend rules. Let me inspect the relevant files.",
	},
	{
		role: "tool" as const,
		text: "Read: src/pages/Signup.tsx — uses react-hook-form, no validation\nRead: api/validators/user.ts — zod schema with email regex",
	},
	{
		role: "ai" as const,
		text: "Added a zod schema to Signup.tsx that mirrors the backend validation: email format, 8+ char password with uppercase and digit, and matching confirmation. All 14 existing tests pass.",
	},
];

const CODE_BLOCK = `import { z } from 'zod'

const signupSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Include an uppercase letter')
    .regex(/[0-9]/, 'Include a number'),
  confirmPassword: z.string()
}).refine(
  data => data.password === data.confirmPassword,
  { message: "Passwords don't match", path: ['confirmPassword'] }
)`;

export function ChatDemo() {
	const [visible, setVisible] = useState(0);
	const [started, setStarted] = useState(false);
	const [showCode, setShowCode] = useState(false);

	const advance = () => {
		setVisible((prev) => {
			const next = prev + 1;
			if (next >= CHAT_MSGS.length) setTimeout(() => setShowCode(true), 200);
			return Math.min(next, CHAT_MSGS.length);
		});
	};

	return (
		<div className="my-8">
			<div className="flex items-baseline gap-3 mb-4">
				<h3 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
					Interactive Example
				</h3>
				<span className="text-xs text-stone-400 italic">Simulated chat session</span>
				{!started && (
					<button
						onClick={() => {
							setStarted(true);
							setVisible(1);
						}}
						className="ml-auto text-sm text-orange-600 hover:text-orange-700 underline underline-offset-2 transition-colors"
					>
						Begin demo
					</button>
				)}
			</div>

			<div className="border-l-2 border-stone-200 pl-6 space-y-4">
				{CHAT_MSGS.slice(0, visible).map((msg, i) => {
					const isLast = i === visible - 1;
					const labelMap = { user: "💬 Developer", ai: "🤖 AI Agent", tool: "🔧 Tool Output" };
					const bgMap = {
						user: "bg-orange-50 border-orange-200",
						ai: "bg-white border-stone-200",
						tool: "bg-stone-50 border-stone-200",
					};
					return (
						<div key={i} className="animate-doc-fade">
							<div className="text-[11px] font-semibold text-stone-500 mb-1.5 tracking-wide">{labelMap[msg.role]}</div>
							<div className={`${bgMap[msg.role]} border rounded-lg px-4 py-3 text-sm leading-relaxed text-stone-700 whitespace-pre-wrap`}>
								{isLast && msg.role === "ai" ? <TypeWriter text={msg.text} onDone={advance} /> : msg.text}
							</div>
						</div>
					);
				})}
				{visible > 0 && visible < CHAT_MSGS.length && CHAT_MSGS[visible - 1]?.role !== "ai" && (
					<button onClick={advance} className="text-sm text-stone-400 hover:text-orange-600 transition-colors italic">
						next step →
					</button>
				)}
			</div>

			{showCode && (
				<div className="mt-6 border border-stone-200 rounded-lg overflow-hidden animate-doc-fade">
					<div className="bg-stone-100 px-4 py-2 border-b border-stone-200 flex items-center justify-between">
						<span className="text-xs font-mono text-stone-500">Generated: signupSchema.ts</span>
						<span className="text-[10px] text-stone-400">TypeScript</span>
					</div>
					<pre className="bg-stone-50 p-4 text-[13px] leading-relaxed text-stone-700 font-mono overflow-x-auto whitespace-pre">{CODE_BLOCK}</pre>
				</div>
			)}
		</div>
	);
}
