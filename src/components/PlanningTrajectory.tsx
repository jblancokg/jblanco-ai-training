import type React from "react";
import { useEffect, useState } from "react";
import { TypeWriter } from "./TypeWriter";

interface PlanningTrajectoryProps {
	prompt: string;
	response: string;
	critique: string;
	planQuestions: {
		question: string;
		answerExample: string;
	}[];
}

// Bubbles render from the start (invisible) so the conversation reserves its full height
// before it plays. The entrance animation class is only added when the bubble is revealed.
function UserBubble({ text, visible }: { text: string; visible: boolean }) {
	return (
		<div aria-hidden={!visible} className={`flex justify-end ${visible ? "animate-[slideInRight_0.3s_ease-out]" : "invisible"}`}>
			<div className="flex items-end gap-2 max-w-[90%]">
				<div className="bg-violet-500 text-white text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-br-sm shadow-sm">{text}</div>
				<div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 font-semibold flex items-center justify-center shrink-0 text-[11px] mb-0.5">U</div>
			</div>
		</div>
	);
}

function AiBubble({ children, visible }: { children: React.ReactNode; visible: boolean }) {
	return (
		<div aria-hidden={!visible} className={`flex justify-start ${visible ? "animate-[fadeIn_0.25s_ease-out]" : "invisible"}`}>
			<div className="flex items-end gap-2 max-w-[90%]">
				<div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center shrink-0 text-[10px] text-white mb-0.5 font-bold">AI</div>
				<div className="bg-white border border-stone-200 text-[13px] leading-relaxed text-stone-700 px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
					{children}
				</div>
			</div>
		</div>
	);
}

export default function PlanningTrajectory({ prompt, response, critique, planQuestions }: PlanningTrajectoryProps) {
	const [activeMode, setActiveMode] = useState<"agent" | "plan" | null>(null);
	const [planStep, setPlanStep] = useState(0);

	useEffect(() => {
		if (activeMode !== "plan") return;
		if (planStep === 0) {
			const t = setTimeout(() => setPlanStep(1), 300); // initial delay
			return () => clearTimeout(t);
		}
		// User message just appeared
		if (planStep % 2 !== 0) {
			const t = setTimeout(() => {
				setPlanStep((p) => p + 1);
			}, 1200); // wait before AI replies
			return () => clearTimeout(t);
		}
	}, [activeMode, planStep]);

	const selectMode = (mode: "agent" | "plan") => {
		setActiveMode(mode);
		setPlanStep(0);
	};

	const handleAiTypingDone = () => {
		if (planStep < planQuestions.length * 2) {
			setTimeout(() => {
				setPlanStep((p) => p + 1);
			}, 1500); // wait after AI replies
			// This timeout doesn't need a cleanup function in this implementation
			// because a re-render won't happen until it's done, and if the
			// component unmounts, all timeouts are cleared anyway.
		}
	};

	return (
		<div className="my-8 border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
			{/* 1. The Prompt (Always Visible) */}
			<div className="bg-stone-50 border-b border-stone-200 p-5">
				<div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">The Prompt</div>
				<div className="font-mono text-sm text-stone-800 bg-white border border-stone-200 rounded-lg p-3 shadow-sm">{prompt}</div>
			</div>

			{/* 2. The Choice (Mode Selector) */}
			<div className="grid grid-cols-2 border-b border-stone-200 divide-x divide-stone-200">
				<button
					onClick={() => selectMode("agent")}
					className={`p-4 text-left transition-colors relative group ${activeMode === "agent" ? "bg-red-50/50" : "bg-white hover:bg-stone-50"}`}
				>
					<div className="flex items-center gap-3 mb-1">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
								activeMode === "agent" ? "bg-red-100 text-red-600" : "bg-stone-100 text-stone-400 group-hover:bg-red-50 group-hover:text-red-400"
							}`}
						>
							A
						</div>
						<span
							className={`text-sm font-bold uppercase tracking-wider ${activeMode === "agent" ? "text-red-700" : "text-stone-500 group-hover:text-stone-700"}`}
						>
							Agent Mode
						</span>
					</div>
					<p className="text-xs text-stone-500 pl-11 m-0">The "Eager Developer": Immediate coding without questions.</p>
					{activeMode === "agent" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />}
				</button>

				<button
					onClick={() => selectMode("plan")}
					className={`p-4 text-left transition-colors relative group ${activeMode === "plan" ? "bg-violet-50/50" : "bg-white hover:bg-stone-50"}`}
				>
					<div className="flex items-center gap-3 mb-1">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
								activeMode === "plan" ? "bg-violet-100 text-violet-600" : "bg-stone-100 text-stone-400 group-hover:bg-violet-50 group-hover:text-violet-400"
							}`}
						>
							B
						</div>
						<span
							className={`text-sm font-bold uppercase tracking-wider ${
								activeMode === "plan" ? "text-violet-700" : "text-stone-500 group-hover:text-stone-700"
							}`}
						>
							Plan Mode
						</span>
					</div>
					<p className="text-xs text-stone-500 pl-11 m-0">The "Architect": Planning and questions first.</p>
					{activeMode === "plan" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500" />}
				</button>
			</div>

			{/* 3. The Result (Conditional Display) */}
			<div className="bg-white min-h-[300px]">
				{!activeMode && (
					<div className="p-10 text-center flex flex-col items-center justify-center h-full text-stone-400 pt-20">
						<svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
							/>
						</svg>
						<p className="text-sm">Select a mode above to see the trajectory.</p>
					</div>
				)}

				{activeMode === "agent" && (
					<div className="p-6 bg-red-50/10 animate-in fade-in slide-in-from-top-2 duration-300">
						<div className="flex items-center justify-between mb-4">
							<h4 className="text-sm font-bold text-red-700 uppercase tracking-wider m-0">Result: The Naive Implementation</h4>
						</div>

						<div className="space-y-6">
							{/* The Code */}
							<div>
								<div className="text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">AI Output</div>
								<div className="bg-stone-900 rounded-lg p-4 overflow-x-auto border border-stone-800 shadow-sm relative">
									<div className="absolute top-0 right-0 p-2 opacity-50">
										<span className="text-[10px] font-mono text-stone-500">typescript</span>
									</div>
									<pre className="text-xs font-mono text-red-50 leading-relaxed whitespace-pre-wrap">{response}</pre>
								</div>
							</div>

							{/* The Critique */}
							<div className="bg-red-50 border border-red-200 rounded-lg p-5 shadow-sm relative">
								<div className="absolute -top-3 left-4 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide flex items-center gap-1">
									<span className="text-lg leading-none">⚠</span> Critique
								</div>
								<p className="text-sm text-red-800 leading-relaxed m-0 mt-1">{critique}</p>
							</div>
						</div>
					</div>
				)}

				{activeMode === "plan" && (
					<div className="p-6 bg-violet-50/10 animate-in fade-in slide-in-from-top-2 duration-300">
						<div className="flex items-center justify-between mb-4">
							<h4 className="text-sm font-bold text-violet-700 uppercase tracking-wider m-0">Result: The Strategic Approach</h4>
						</div>

						<div className="space-y-6">
							{/* The Chat Interface */}
							<div>
								<div className="text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">Sample Conversation Flow</div>
								<div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
									{planQuestions.map((q, i) => {
										const userStep = i * 2 + 1;
										const aiStep = i * 2 + 2;
										return (
											<div key={i} className="flex flex-col gap-3">
												<UserBubble text={q.question} visible={planStep >= userStep} />
												<AiBubble visible={planStep >= aiStep}>
													{planStep === aiStep ? <TypeWriter text={q.answerExample} speed={20} onDone={handleAiTypingDone} /> : q.answerExample}
												</AiBubble>
											</div>
										);
									})}
								</div>
							</div>

							{/* The Outcome */}
							<div className="bg-violet-50 border border-violet-200 rounded-lg p-5 shadow-sm flex gap-4 items-center">
								<div className="shrink-0 w-10 h-10 rounded-full bg-white border border-violet-200 text-violet-600 flex items-center justify-center">
									<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div>
									<div className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-0.5">Outcome</div>
									<p className="text-sm text-violet-800 m-0 leading-snug">A unified, simpler architecture with predictable behavior and fewer bugs.</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<style>{`
				@keyframes slideInRight {
					from { opacity: 0; transform: translateX(20px); }
					to   { opacity: 1; transform: translateX(0); }
				}
				@keyframes fadeIn {
					from { opacity: 0; }
					to   { opacity: 1; }
				}
			`}</style>
		</div>
	);
}
