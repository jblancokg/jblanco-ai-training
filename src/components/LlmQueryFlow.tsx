import { useEffect, useRef, useState } from "react";
import { TypeWriter } from "./TypeWriter";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Phase =
	| "idle"
	| "sending1"
	| "booting1"
	| "streaming1"
	| "forgetting1"
	| "idle2"
	| "sending2"
	| "booting2"
	| "payload2"
	| "streaming2"
	| "forgetting2"
	| "done";

const PHASE_ORDER: Phase[] = [
	"idle",
	"sending1",
	"booting1",
	"streaming1",
	"forgetting1",
	"idle2",
	"sending2",
	"booting2",
	"payload2",
	"streaming2",
	"forgetting2",
	"done",
];

function phaseIndex(p: Phase) {
	return PHASE_ORDER.indexOf(p);
}

const Q1 = "What is the capital of France?";
const A1 = "Paris is the capital of France. It has been the country's political and cultural centre for centuries.";
const Q2 = "What about its population?";
const A2 = "The city of Paris has a population of roughly 2.1 million, while the greater metropolitan area is home to over 12 million people.";

const SYSTEM_PROMPT = `You are a helpful assistant. Answer questions clearly and concisely. Do not make up information you're not confident about.`;

// ─── Annotations ──────────────────────────────────────────────────────────────

interface Annotation {
	title: string;
	body: string;
	subNote?: string;
}

function getAnnotation(phase: Phase): Annotation | null {
	switch (phase) {
		case "sending1":
			return {
				title: "You type a question",
				body: "Your message is the only input. There's no hidden context, no profile — just the words you typed.",
			};
		case "booting1":
			return {
				title: "A fresh instance starts",
				body: "Every request spins up a brand-new model instance. It has zero memory of any previous conversation.",
				subNote: "Your text is sent as plain tokens — no database query, no search engine.",
			};
		case "streaming1":
			return {
				title: "Words stream back one at a time",
				body: "The model generates one token at a time, predicting each next word from patterns. Nothing is looked up.",
			};
		case "forgetting1":
			return {
				title: "Everything is forgotten",
				body: "The instant the response is complete, the instance is discarded. Nothing is stored or saved.",
			};
		case "idle2":
			return {
				title: "Ready for the follow-up",
				body: 'You type a second question. But remember — the model has already forgotten everything. So how does it know what "its" refers to?',
			};
		case "sending2":
			return {
				title: "The tool re-sends everything",
				body: "Your chat application silently re-sends the entire conversation — including a hidden system prompt you never see.",
			};
		case "booting2":
			return {
				title: "A brand new instance again",
				body: "Another fresh instance with zero memory. It's not the same one as before — it's completely new.",
			};
		case "payload2":
			return {
				title: "The full payload",
				body: "The model receives the system prompt, your first question, its own previous answer, and your new question — all at once, as if reading it for the first time.",
			};
		case "streaming2":
			return {
				title: "It generates a new response",
				body: "Because it can read the whole conversation, it knows \"its\" refers to France. But it's not remembering — it's pattern-matching the re-sent text.",
			};
		case "forgetting2":
			return {
				title: "Forgotten again",
				body: "Same as before. The instance is discarded. If you send a third message, the entire conversation gets re-sent once more.",
			};
		default:
			return null;
	}
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChatHeader({ phase }: { phase: Phase }) {
	const isBooting = phase === "booting1" || phase === "booting2";
	const isActive = phase === "streaming1" || phase === "streaming2" || phase === "payload2";
	const isForgetting = phase === "forgetting1" || phase === "forgetting2";

	const sessionLabel = isBooting || isActive ? "session #new" : "no session";

	return (
		<div className="flex items-center gap-2.5 px-4 py-3 border-b border-stone-200 bg-stone-50 rounded-t-2xl">
			<div className="relative flex items-center justify-center w-7 h-7">
				<div
					className={[
						"w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500",
						isBooting
							? "border-orange-400 bg-orange-50"
							: isActive
								? "border-green-400 bg-green-50"
								: isForgetting
									? "border-stone-300 bg-stone-100"
									: "border-stone-300 bg-stone-100",
					].join(" ")}
				>
					{isBooting ? (
						<svg className="w-3.5 h-3.5 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
						</svg>
					) : isActive ? (
						<div className="w-2 h-2 rounded-full bg-green-500" />
					) : isForgetting ? (
						<div className="w-2 h-2 rounded-full bg-stone-400" />
					) : (
						<div className="w-2 h-2 rounded-full bg-stone-300" />
					)}
				</div>
			</div>

			<div className="flex flex-col min-w-0">
				<span className="text-[13px] font-semibold text-stone-800 leading-tight">AI Assistant</span>
				<span
					className={[
						"text-[11px] leading-tight transition-colors duration-500",
						isBooting ? "text-orange-500" : isActive ? "text-green-600" : isForgetting ? "text-stone-400" : "text-stone-400",
					].join(" ")}
				>
					{isBooting ? "Starting new instance…" : isActive ? "Instance active" : isForgetting ? "Instance closing" : "No active instance"}
				</span>
			</div>

			<div className="ml-auto">
				<span
					className={[
						"text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-500",
						isBooting || isActive ? "border-orange-200 bg-orange-50 text-orange-600" : "border-stone-200 bg-white text-stone-400",
					].join(" ")}
				>
					{sessionLabel}
				</span>
			</div>
		</div>
	);
}

// ─── Payload Viewer ───────────────────────────────────────────────────────────

function PayloadViewer({ visible }: { visible: boolean }) {
	return (
		<div
			className={[
				"mx-4 mb-3 rounded-xl border overflow-hidden transition-all duration-500",
				visible ? "border-violet-300 bg-violet-50/80 opacity-100 max-h-[500px]" : "border-transparent bg-transparent opacity-0 max-h-0",
			].join(" ")}
		>
			{visible && (
				<div className="px-3 py-2.5 space-y-2">
					<div className="flex items-center gap-1.5 mb-2">
						<svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">What the model actually receives</span>
					</div>

					{/* System prompt */}
					<div className="rounded-lg bg-violet-100/60 border border-violet-200 px-2.5 py-2">
						<div className="text-[9px] font-bold uppercase tracking-wider text-violet-400 mb-1">System Prompt (hidden from you)</div>
						<p className="text-[11px] text-violet-700 leading-snug font-mono">{SYSTEM_PROMPT}</p>
					</div>

					{/* Conversation history */}
					<div className="rounded-lg bg-white/60 border border-violet-200 px-2.5 py-2 space-y-1.5">
						<div className="text-[9px] font-bold uppercase tracking-wider text-violet-400 mb-1">Conversation (re-sent in full)</div>
						<div className="flex gap-1.5 items-start">
							<span className="text-[9px] font-bold text-orange-500 uppercase shrink-0 mt-px">You:</span>
							<span className="text-[11px] text-stone-600 font-mono leading-snug">{Q1}</span>
						</div>
						<div className="flex gap-1.5 items-start">
							<span className="text-[9px] font-bold text-stone-500 uppercase shrink-0 mt-px">AI:</span>
							<span className="text-[11px] text-stone-600 font-mono leading-snug">{A1}</span>
						</div>
						<div className="flex gap-1.5 items-start">
							<span className="text-[9px] font-bold text-orange-500 uppercase shrink-0 mt-px">You:</span>
							<span className="text-[11px] text-stone-600 font-mono leading-snug">{Q2}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

// ─── Message Area ─────────────────────────────────────────────────────────────

interface MessageAreaProps {
	phase: Phase;
	overlayVisible: boolean;
	overlayLabel: string;
	onStream1Done: () => void;
	onStream2Done: () => void;
}

function MessageArea({ phase, overlayVisible, overlayLabel, onStream1Done, onStream2Done }: MessageAreaProps) {
	const pi = phaseIndex(phase);
	const showQ1 = pi >= phaseIndex("sending1");
	const showBooting1 = phase === "booting1";
	const showA1 = pi >= phaseIndex("streaming1") && pi <= phaseIndex("idle2");
	// In round 2, show the full round-1 conversation as context
	const showRound1Replay = pi >= phaseIndex("sending2");
	const showQ2 = pi >= phaseIndex("sending2");
	const showBooting2 = phase === "booting2" || phase === "payload2";
	const showPayload = phase === "payload2";
	const showA2 = pi >= phaseIndex("streaming2");

	// The chat window has a fixed height; keep the newest message in view as content grows
	const scrollRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const scroller = scrollRef.current;
		const content = contentRef.current;
		if (!scroller || !content) return;
		const observer = new ResizeObserver(() => {
			scroller.scrollTop = scroller.scrollHeight;
		});
		observer.observe(content);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="relative flex-1 overflow-hidden">
			<div ref={scrollRef} className="h-full overflow-y-auto">
				<div ref={contentRef} className="min-h-full px-4 py-4 flex flex-col gap-3">
					{/* Empty state */}
					{!showQ1 && !showRound1Replay && (
						<div className="flex-1 flex items-center justify-center">
							<p className="text-[12px] text-stone-300 italic select-none">No messages yet</p>
						</div>
					)}

					{/* ── Round 1 messages ── */}
					{showQ1 && !showRound1Replay && <UserBubble text={Q1} />}

					{showBooting1 && <BouncingDots />}

					{showA1 && <AiBubble>{phase === "streaming1" ? <TypeWriter key="a1" text={A1} speed={28} onDone={onStream1Done} /> : A1}</AiBubble>}

					{/* ── Round 2 messages ── */}
					{showRound1Replay && (
						<>
							{/* Replayed round-1 conversation (slightly muted) */}
							<div className="opacity-70">
								<UserBubble text={Q1} />
							</div>
							<div className="opacity-70">
								<AiBubble>{A1}</AiBubble>
							</div>

							{/* New question */}
							{showQ2 && <UserBubble text={Q2} />}
						</>
					)}

					{showBooting2 && !showPayload && <BouncingDots />}

					{/* Payload viewer inline */}
					<PayloadViewer visible={showPayload} />

					{showA2 && <AiBubble>{phase === "streaming2" ? <TypeWriter key="a2" text={A2} speed={28} onDone={onStream2Done} /> : A2}</AiBubble>}
				</div>
			</div>

			{/* Memory-cleared overlay */}
			<div
				className={[
					"absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-700",
					overlayVisible ? "opacity-100 backdrop-blur-sm bg-stone-900/60" : "opacity-0 pointer-events-none bg-stone-900/0",
				].join(" ")}
			>
				<div className={["flex flex-col items-center gap-2 transition-transform duration-700", overlayVisible ? "translate-y-0" : "translate-y-4"].join(" ")}>
					<div className="w-10 h-10 rounded-full bg-stone-700/80 border border-stone-500 flex items-center justify-center">
						<svg className="w-5 h-5 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25v4.5m4-4.5v4.5M4.875 7.5h14.25M9 7.5V4.875c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V7.5"
							/>
						</svg>
					</div>
					<p className="text-white text-sm font-semibold tracking-wide">{overlayLabel}</p>
					<p className="text-stone-400 text-[11px] text-center max-w-[180px] leading-snug">Instance closed. Nothing was saved.</p>
				</div>
			</div>
		</div>
	);
}

function UserBubble({ text }: { text: string }) {
	return (
		<div className="flex justify-end animate-[slideInRight_0.3s_ease-out]">
			<div className="flex items-end gap-2 max-w-[80%]">
				<div className="bg-orange-500 text-white text-[13px] leading-snug px-3.5 py-2.5 rounded-2xl rounded-br-sm shadow-sm">{text}</div>
				<div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center shrink-0 text-[11px] mb-0.5">U</div>
			</div>
		</div>
	);
}

function AiBubble({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-start animate-[fadeIn_0.25s_ease-out]">
			<div className="flex items-end gap-2 max-w-[80%]">
				<div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center shrink-0 text-[10px] text-white mb-0.5">AI</div>
				<div className="bg-white border border-stone-200 text-[13px] leading-relaxed text-stone-700 px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
					{children}
				</div>
			</div>
		</div>
	);
}

function BouncingDots() {
	return (
		<div className="flex justify-start animate-[fadeIn_0.25s_ease-out]">
			<div className="flex items-end gap-2 max-w-[80%]">
				<div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center shrink-0 text-[10px] text-white mb-0.5">AI</div>
				<div className="bg-white border border-stone-200 text-[13px] px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
					<span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
					<span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
					<span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
				</div>
			</div>
		</div>
	);
}

// ─── Chat Input ───────────────────────────────────────────────────────────────

interface ChatInputProps {
	phase: Phase;
	inputText: string;
	canSend: boolean;
	onSend: () => void;
}

function ChatInput({ phase, inputText, canSend, onSend }: ChatInputProps) {
	const showCursor = phase === "idle" || phase === "idle2";

	return (
		<div className="px-3 py-3 border-t border-stone-200 bg-stone-50/80 rounded-b-2xl">
			<div className="flex items-center gap-2">
				<div
					className={[
						"flex-1 flex items-center px-3 py-2 rounded-xl border text-[13px] transition-all duration-300",
						canSend ? "border-stone-300 bg-white text-stone-700" : "border-stone-200 bg-stone-100 text-stone-400",
					].join(" ")}
				>
					<span className={canSend ? "" : "opacity-50"}>{inputText}</span>
					{showCursor && <span className="ml-0.5 animate-pulse text-orange-400 font-thin">|</span>}
				</div>
				<button
					onClick={canSend ? onSend : undefined}
					className={[
						"flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-all duration-200",
						canSend
							? "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-sm cursor-pointer"
							: "bg-stone-200 text-stone-400 cursor-not-allowed",
					].join(" ")}
					aria-label="Send message"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

// ─── Annotation Panel ─────────────────────────────────────────────────────────

// One panel is rendered per phase and all of them share a grid cell (see LlmQueryFlow),
// so the column is always as tall as the longest annotation.
function AnnotationPanel({ phase, active }: { phase: Phase; active: boolean }) {
	const annotation = getAnnotation(phase);
	const pi = phaseIndex(phase);
	const isRound2 = pi >= phaseIndex("idle2");

	// Show round indicator
	const roundLabel = isRound2 ? "Follow-up Message" : "First Message";
	const stepInRound = isRound2 ? pi - phaseIndex("idle2") + 1 : pi;

	if (!annotation) {
		return null;
	}

	return (
		<div aria-hidden={!active} className={`col-start-1 row-start-1 ${active ? "animate-[fadeIn_0.3s_ease-out]" : "invisible"}`}>
			{/* Round indicator */}
			<div className="flex items-center gap-2 mb-2">
				<span
					className={[
						"text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
						isRound2 ? "bg-violet-100 text-violet-600" : "bg-orange-100 text-orange-600",
					].join(" ")}
				>
					{roundLabel}
				</span>
				<span className="text-[10px] text-stone-400">Step {stepInRound}</span>
			</div>

			<div className="rounded-xl border border-orange-300 bg-orange-50 shadow-sm px-4 py-3">
				<p className="text-[13px] font-semibold text-stone-900 leading-tight">{annotation.title}</p>
				<p className="text-[12px] text-stone-600 leading-snug mt-1.5">{annotation.body}</p>
				{annotation.subNote && <p className="text-[11px] leading-snug mt-2 text-orange-600 italic border-t border-orange-100 pt-2">{annotation.subNote}</p>}
			</div>
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LlmQueryFlow() {
	const [phase, setPhase] = useState<Phase>("idle");
	const [overlayVisible, setOverlayVisible] = useState(false);
	const overlayLabel = phase === "forgetting2" || phase === "done" ? "Memory cleared — again" : "Memory cleared";
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTimer = () => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};

	useEffect(() => {
		switch (phase) {
			case "sending1":
				timerRef.current = setTimeout(() => setPhase("booting1"), 1400);
				break;
			case "booting1":
				timerRef.current = setTimeout(() => setPhase("streaming1"), 3600);
				break;
			case "forgetting1": {
				timerRef.current = setTimeout(() => setOverlayVisible(true), 200);
				const done1 = setTimeout(() => {
					setOverlayVisible(false);
					setPhase("idle2");
				}, 4800);
				return () => {
					clearTimer();
					clearTimeout(done1);
				};
			}
			case "sending2":
				timerRef.current = setTimeout(() => setPhase("booting2"), 1400);
				break;
			case "booting2":
				timerRef.current = setTimeout(() => setPhase("payload2"), 3200);
				break;
			case "payload2":
				timerRef.current = setTimeout(() => setPhase("streaming2"), 7000);
				break;
			case "forgetting2": {
				timerRef.current = setTimeout(() => setOverlayVisible(true), 200);
				const done2 = setTimeout(() => setPhase("done"), 4800);
				return () => {
					clearTimer();
					clearTimeout(done2);
				};
			}
		}
		return () => clearTimer();
	}, [phase]);

	const handleSend1 = () => {
		setOverlayVisible(false);
		setPhase("sending1");
	};

	const handleSend2 = () => {
		setOverlayVisible(false);
		setPhase("sending2");
	};

	const handleStream1Done = () => {
		timerRef.current = setTimeout(() => setPhase("forgetting1"), 1800);
	};

	const handleStream2Done = () => {
		timerRef.current = setTimeout(() => setPhase("forgetting2"), 1800);
	};

	const handleReset = () => {
		clearTimer();
		setOverlayVisible(false);
		setPhase("idle");
	};

	// Determine what text to show in input and whether send is enabled
	const pi = phaseIndex(phase);
	const isRound1 = pi <= phaseIndex("forgetting1");
	const canSend = phase === "idle" || phase === "idle2";
	const inputText = isRound1 || phase === "idle" ? Q1 : Q2;

	return (
		<div className="my-8">
			<h3 className="text-xl font-semibold text-stone-800 mt-10 mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
				What Happens When You Ask a Question
			</h3>
			<p className="text-sm text-stone-500 mb-6">
				Click Send to watch a single request travel through the model — then see what happens when you send a follow-up.
			</p>

			<div className="flex flex-col lg:flex-row gap-4 items-start">
				{/* Chat window */}
				<div className="w-full lg:w-[400px] shrink-0 rounded-2xl border border-stone-200 shadow-md overflow-hidden flex flex-col bg-white">
					<ChatHeader phase={phase} />

					<div className="flex flex-col h-[440px]">
						<MessageArea
							phase={phase}
							overlayVisible={overlayVisible}
							overlayLabel={overlayLabel}
							onStream1Done={handleStream1Done}
							onStream2Done={handleStream2Done}
						/>
					</div>

					<ChatInput phase={phase} inputText={inputText} canSend={canSend} onSend={canSend && phase === "idle" ? handleSend1 : handleSend2} />
				</div>

				{/* Right column: annotations + controls */}
				<div className="flex-1 w-full grid">
					{PHASE_ORDER.map((p) => (
						<AnnotationPanel key={p} phase={p} active={p === phase} />
					))}

					{phase === "done" && (
						<div className="col-start-1 row-start-1 self-start flex items-center gap-3 pt-1 animate-[fadeIn_0.4s_ease-out]">
							<button
								onClick={handleReset}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 active:bg-black text-white text-sm font-semibold transition-colors duration-150 shadow-sm"
							>
								<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								Start over
							</button>
							<span className="text-[12px] text-stone-400 italic">A third message would re-send everything again.</span>
						</div>
					)}
				</div>
			</div>

			<p className="mt-6 text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
				Every conversation starts from scratch. The model has no memory between sessions — your chat tool re-sends the full conversation each time to create the
				illusion of continuity. The system prompt, which shapes the AI's behavior, is always hidden from you.
			</p>

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
