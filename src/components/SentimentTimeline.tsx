import { useRef, useState } from "react";

type Milestone = {
	year: number;
	quarter: number;
	label: string;
	date: string;
};

type Tool = {
	name: string;
	color: string;
	points: { year: number; quarter: number; sentiment: number }[];
	milestones: Milestone[];
	note?: string;
};

const codingTools: Tool[] = [
	{
		name: "GitHub Copilot",
		color: "#6e40c9",
		points: [
			{ year: 2022, quarter: 1, sentiment: 75 },
			{ year: 2022, quarter: 3, sentiment: 88 },
			{ year: 2023, quarter: 1, sentiment: 90 },
			{ year: 2023, quarter: 3, sentiment: 85 },
			{ year: 2024, quarter: 1, sentiment: 75 },
			{ year: 2024, quarter: 3, sentiment: 65 },
			{ year: 2025, quarter: 1, sentiment: 58 },
			{ year: 2025, quarter: 3, sentiment: 55 },
			{ year: 2026, quarter: 1, sentiment: 50 },
			{ year: 2026, quarter: 3, sentiment: 48 },
		],
		milestones: [
			{ year: 2022, quarter: 2, date: "Jun 2022", label: "GA launch for individual devs" },
			{ year: 2023, quarter: 1, date: "Feb 2023", label: "Copilot for Business" },
			{ year: 2023, quarter: 4, date: "Nov 2023", label: "Copilot Chat (GPT-4)" },
			{ year: 2024, quarter: 4, date: "Oct 2024", label: "Multi-model support (Claude, Gemini)" },
			{ year: 2025, quarter: 1, date: "Feb 2025", label: "Agent mode" },
			{ year: 2025, quarter: 2, date: "May 2025", label: "Coding agent (autonomous PRs)" },
			{ year: 2026, quarter: 1, date: "Feb 2026", label: "Code review, hooks" },
		],
		note: "First to market with a massive lead. Slow to innovate on agentic features while competitors shipped faster.",
	},
	{
		name: "Cursor",
		color: "#0ea5e9",
		points: [
			{ year: 2023, quarter: 3, sentiment: 20 },
			{ year: 2024, quarter: 1, sentiment: 40 },
			{ year: 2024, quarter: 3, sentiment: 65 },
			{ year: 2025, quarter: 1, sentiment: 80 },
			{ year: 2025, quarter: 3, sentiment: 85 },
			{ year: 2026, quarter: 1, sentiment: 82 },
			{ year: 2026, quarter: 3, sentiment: 84 },
		],
		milestones: [
			{ year: 2023, quarter: 3, date: "Aug 2023", label: "Public launch" },
			{ year: 2024, quarter: 2, date: "May 2024", label: "Composer (multi-file editing)" },
			{ year: 2025, quarter: 2, date: "Apr 2025", label: "Background agents" },
			{
				year: 2025,
				quarter: 4,
				date: "Oct 2025",
				label: "Cursor 2.0: own model, 8 parallel agents",
			},
			{ year: 2026, quarter: 1, date: "Jan 2026", label: "Linear integration, hooks, team rules" },
			{ year: 2026, quarter: 2, date: "Apr 2026", label: "Cursor 3.0: Agents window, Composer 2.5" },
		],
		note: "Grew 6,400% YoY. Composer was the inflection point; background agents cemented the lead among power users.",
	},
	{
		name: "Claude Code",
		color: "#d97706",
		points: [
			{ year: 2025, quarter: 1, sentiment: 30 },
			{ year: 2025, quarter: 3, sentiment: 65 },
			{ year: 2026, quarter: 1, sentiment: 85 },
			{ year: 2026, quarter: 3, sentiment: 90 },
		],
		milestones: [
			{ year: 2025, quarter: 2, date: "May 2025", label: "Public launch" },
			{
				year: 2025,
				quarter: 4,
				date: "Dec 2025",
				label: "Sub-agents, plan mode, CLAUDE.md, skills",
			},
			{ year: 2026, quarter: 1, date: "Feb 2026", label: "Agent teams, fast mode, Opus 4.6" },
			{ year: 2026, quarter: 3, date: "Jun 2026", label: "Dynamic workflows, Opus 4.8" },
		],
		note: "Late but steep climb. Terminal-native approach and deep reasoning resonated with senior devs.",
	},
	{
		name: "Windsurf",
		color: "#10b981",
		points: [
			{ year: 2024, quarter: 3, sentiment: 25 },
			{ year: 2025, quarter: 1, sentiment: 45 },
			{ year: 2025, quarter: 3, sentiment: 50 },
			{ year: 2026, quarter: 1, sentiment: 40 },
			{ year: 2026, quarter: 3, sentiment: 36 },
		],
		milestones: [
			{ year: 2024, quarter: 3, date: "Sep 2024", label: "Launch (Codeium rebrand)" },
			{ year: 2025, quarter: 1, date: "Jan 2025", label: "Cascade agent flows" },
		],
		note: "Briefly competitive but lost ground as Cursor and Claude Code pulled ahead.",
	},
];

const chatTools: Tool[] = [
	{
		name: "ChatGPT",
		color: "#10a37f",
		points: [
			{ year: 2023, quarter: 1, sentiment: 92 },
			{ year: 2023, quarter: 3, sentiment: 88 },
			{ year: 2024, quarter: 1, sentiment: 82 },
			{ year: 2024, quarter: 3, sentiment: 75 },
			{ year: 2025, quarter: 1, sentiment: 70 },
			{ year: 2025, quarter: 3, sentiment: 68 },
			{ year: 2026, quarter: 1, sentiment: 65 },
			{ year: 2026, quarter: 3, sentiment: 63 },
		],
		milestones: [
			{ year: 2023, quarter: 1, date: "Mar 2023", label: "GPT-4 launch" },
			{ year: 2023, quarter: 2, date: "May 2023", label: "Plugins, Code Interpreter, browsing" },
			{ year: 2023, quarter: 4, date: "Nov 2023", label: "Custom GPTs, GPT-4 Turbo (128k)" },
			{ year: 2024, quarter: 2, date: "May 2024", label: "GPT-4o (multimodal)" },
			{ year: 2024, quarter: 3, date: "Sep 2024", label: "o1 reasoning model" },
			{ year: 2025, quarter: 1, date: "Feb 2025", label: "Deep Research, o3" },
			{ year: 2026, quarter: 3, date: "Jun 2026", label: "GPT-5.5 / GPT-5.6" },
		],
		note: "Still ~81% of global AI chat usage but developer satisfaction steadily declining. Shipped a lot but nothing that recaptured the GPT-4 moment.",
	},
	{
		name: "Claude",
		color: "#d97706",
		points: [
			{ year: 2023, quarter: 3, sentiment: 30 },
			{ year: 2024, quarter: 1, sentiment: 50 },
			{ year: 2024, quarter: 3, sentiment: 68 },
			{ year: 2025, quarter: 1, sentiment: 78 },
			{ year: 2025, quarter: 3, sentiment: 85 },
			{ year: 2026, quarter: 1, sentiment: 88 },
			{ year: 2026, quarter: 3, sentiment: 90 },
		],
		milestones: [
			{ year: 2023, quarter: 3, date: "Jul 2023", label: "Claude 2 (first public release)" },
			{ year: 2024, quarter: 1, date: "Mar 2024", label: "Claude 3 family (Opus, Sonnet, Haiku)" },
			{ year: 2024, quarter: 2, date: "Jun 2024", label: "3.5 Sonnet + Artifacts" },
			{ year: 2024, quarter: 4, date: "Oct 2024", label: "Computer use" },
			{ year: 2025, quarter: 2, date: "May 2025", label: "Claude 4 (Opus + Sonnet), Projects" },
			{ year: 2026, quarter: 1, date: "Feb 2026", label: "Opus 4.6, Sonnet 4.6" },
			{ year: 2026, quarter: 3, date: "Jun 2026", label: "Fable 5, Opus 4.8, Sonnet 5" },
		],
		note: "92% user satisfaction. Enterprise share: 18% (2024) to 29% (2025). Each model release moved the needle.",
	},
	{
		name: "Gemini",
		color: "#4285f4",
		points: [
			{ year: 2023, quarter: 2, sentiment: 30 },
			{ year: 2023, quarter: 4, sentiment: 35 },
			{ year: 2024, quarter: 1, sentiment: 38 },
			{ year: 2024, quarter: 3, sentiment: 45 },
			{ year: 2025, quarter: 1, sentiment: 55 },
			{ year: 2025, quarter: 3, sentiment: 60 },
			{ year: 2026, quarter: 1, sentiment: 62 },
			{ year: 2026, quarter: 3, sentiment: 66 },
		],
		milestones: [
			{ year: 2023, quarter: 2, date: "May 2023", label: "Bard launch (PaLM 2)" },
			{ year: 2024, quarter: 1, date: "Feb 2024", label: "Bard rebranded to Gemini" },
			{ year: 2024, quarter: 1, date: "Feb 2024", label: "1.5 Pro (1M token context)" },
			{ year: 2025, quarter: 1, date: "Mar 2025", label: "2.5 Pro (2M tokens)" },
			{ year: 2025, quarter: 2, date: "Jun 2025", label: "Gemini CLI" },
			{ year: 2025, quarter: 4, date: "Nov 2025", label: "Gemini 3" },
			{ year: 2026, quarter: 2, date: "May 2026", label: "Gemini 3.1 Pro, then 3.5" },
		],
		note: "Pro subs growing ~300% YoY. The 1M+ context window is genuinely differentiated. Slow start but steady climb.",
	},
];

// Chart config
const MIN_YEAR = 2022;
const MAX_YEAR = 2026.75;
const CHART_W = 700;
const CHART_H = 280;
const PAD = { top: 20, right: 20, bottom: 40, left: 10 };

function toX(year: number, quarter: number) {
	const t = year + (quarter - 1) / 4;
	return PAD.left + ((t - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * (CHART_W - PAD.left - PAD.right);
}

function toY(sentiment: number) {
	return PAD.top + ((100 - sentiment) / 100) * (CHART_H - PAD.top - PAD.bottom);
}

function interpolateY(points: Tool["points"], year: number, quarter: number): number {
	const t = year + (quarter - 1) / 4;
	for (let i = 0; i < points.length - 1; i++) {
		const t0 = points[i].year + (points[i].quarter - 1) / 4;
		const t1 = points[i + 1].year + (points[i + 1].quarter - 1) / 4;
		if (t >= t0 && t <= t1) {
			const ratio = (t - t0) / (t1 - t0);
			return points[i].sentiment + ratio * (points[i + 1].sentiment - points[i].sentiment);
		}
	}
	// If at the exact start or end point
	const first = points[0];
	const last = points[points.length - 1];
	const tFirst = first.year + (first.quarter - 1) / 4;
	const tLast = last.year + (last.quarter - 1) / 4;
	if (t <= tFirst) return first.sentiment;
	if (t >= tLast) return last.sentiment;
	return 50;
}

function buildPath(points: Tool["points"]) {
	if (points.length < 2) return "";
	const coords = points.map((p) => [toX(p.year, p.quarter), toY(p.sentiment)] as const);

	let d = `M${coords[0][0]},${coords[0][1]}`;
	for (let i = 1; i < coords.length; i++) {
		const [x0, y0] = coords[i - 1];
		const [x1, y1] = coords[i];
		const cx = (x0 + x1) / 2;
		d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
	}
	return d;
}

const years = [2022, 2023, 2024, 2025, 2026];

type TooltipData = {
	x: number;
	y: number;
	svgWidth: number;
	svgHeight: number;
	label: string;
	date: string;
	toolName: string;
	color: string;
};

function Tooltip({ data }: { data: TooltipData }) {
	const scaleX = data.svgWidth / CHART_W;
	const scaleY = data.svgHeight / CHART_H;
	const pixelX = data.x * scaleX;
	const pixelY = data.y * scaleY;

	const flipLeft = pixelX > data.svgWidth * 0.65;

	return (
		<div
			className="absolute pointer-events-none z-10 max-w-[200px]"
			style={{
				left: flipLeft ? undefined : `${pixelX + 8}px`,
				right: flipLeft ? `${data.svgWidth - pixelX + 8}px` : undefined,
				top: `${pixelY - 12}px`,
			}}
		>
			<div className="rounded px-2 py-1.5 text-[11px] leading-tight text-white shadow-lg" style={{ backgroundColor: data.color }}>
				<div className="font-semibold">
					{data.toolName} <span className="font-normal opacity-75">· {data.date}</span>
				</div>
				<div className="opacity-90 mt-0.5">{data.label}</div>
			</div>
		</div>
	);
}

function Chart({ tools, title }: { tools: Tool[]; title: string }) {
	const [hoveredTool, setHoveredTool] = useState<string | null>(null);
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const activeTool = hoveredTool ? tools.find((t) => t.name === hoveredTool) : null;

	return (
		<div>
			<h4 className="text-sm font-semibold text-stone-700 mb-3">{title}</h4>
			<div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
				{tools.map((tool) => (
					<button
						key={tool.name}
						type="button"
						className={`flex items-center gap-1.5 text-xs transition-opacity ${hoveredTool && hoveredTool !== tool.name ? "opacity-30" : "opacity-100"}`}
						onMouseEnter={() => setHoveredTool(tool.name)}
						onMouseLeave={() => setHoveredTool(null)}
					>
						<span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
						<span className="text-stone-600">{tool.name}</span>
					</button>
				))}
			</div>

			<div className="relative">
				<svg
					ref={svgRef}
					viewBox={`0 0 ${CHART_W} ${CHART_H}`}
					className="w-full"
					onMouseLeave={() => {
						setHoveredTool(null);
						setTooltip(null);
					}}
				>
					{/* grid lines */}
					{[0, 25, 50, 75, 100].map((v) => (
						<line
							key={v}
							x1={PAD.left}
							x2={CHART_W - PAD.right}
							y1={toY(v)}
							y2={toY(v)}
							stroke="#e7e5e4"
							strokeWidth={v === 0 ? 1 : 0.5}
							strokeDasharray={v === 0 ? undefined : "4 4"}
						/>
					))}

					{/* year labels */}
					{years.map((y) => (
						<g key={y}>
							<line x1={toX(y, 1)} x2={toX(y, 1)} y1={PAD.top} y2={CHART_H - PAD.bottom + 6} stroke="#d6d3d1" strokeWidth={0.5} />
							<text x={toX(y, 1)} y={CHART_H - PAD.bottom + 22} textAnchor="middle" className="text-[11px] fill-stone-400">
								{y}
							</text>
						</g>
					))}

					{/* y-axis labels */}
					<text x={PAD.left + 2} y={toY(100) - 4} className="text-[9px] fill-stone-400">
						High
					</text>
					<text x={PAD.left + 2} y={toY(0) + 10} className="text-[9px] fill-stone-400">
						Low
					</text>

					{/* sentiment lines */}
					{tools.map((tool) => (
						<path
							key={tool.name}
							d={buildPath(tool.points)}
							fill="none"
							stroke={tool.color}
							strokeWidth={hoveredTool === tool.name ? 3 : 2}
							strokeLinecap="round"
							opacity={hoveredTool && hoveredTool !== tool.name ? 0.12 : 1}
							className="transition-all duration-200"
							onMouseEnter={() => {
								setHoveredTool(tool.name);
								setTooltip(null);
							}}
						/>
					))}

					{/* data point dots */}
					{tools.map((tool) =>
						tool.points.map((p, i) => (
							<circle
								key={`${tool.name}-pt-${i}`}
								cx={toX(p.year, p.quarter)}
								cy={toY(p.sentiment)}
								r={hoveredTool === tool.name ? 3.5 : 2}
								fill={tool.color}
								opacity={hoveredTool && hoveredTool !== tool.name ? 0.12 : 1}
								className="transition-all duration-200"
								onMouseEnter={() => {
									setHoveredTool(tool.name);
									setTooltip(null);
								}}
							/>
						)),
					)}

					{/* milestone diamonds */}
					{tools.map((tool) =>
						tool.milestones.map((m, i) => {
							const mx = toX(m.year, m.quarter);
							const my = toY(interpolateY(tool.points, m.year, m.quarter));
							const isActive = !hoveredTool || hoveredTool === tool.name;
							const isThisTooltip = tooltip?.toolName === tool.name && tooltip?.label === m.label;

							return (
								<g
									key={`${tool.name}-ms-${i}`}
									opacity={isActive ? 1 : 0.08}
									className="transition-opacity duration-200 cursor-pointer"
									onMouseEnter={() => {
										setHoveredTool(tool.name);
										const svgRect = svgRef.current?.getBoundingClientRect();
										if (!svgRect) return;
										setTooltip({
											x: mx,
											y: my,
											svgWidth: svgRect.width,
											svgHeight: svgRect.height,
											label: m.label,
											date: m.date,
											toolName: tool.name,
											color: tool.color,
										});
									}}
									onMouseLeave={() => setTooltip(null)}
								>
									{/* larger invisible hit area */}
									<circle cx={mx} cy={my} r={10} fill="transparent" />
									{/* diamond marker */}
									<rect
										x={mx - 4}
										y={my - 4}
										width={8}
										height={8}
										rx={1}
										fill="white"
										stroke={tool.color}
										strokeWidth={isThisTooltip ? 2.5 : 1.5}
										transform={`rotate(45 ${mx} ${my})`}
									/>
								</g>
							);
						}),
					)}
				</svg>

				{tooltip && <Tooltip data={tooltip} />}
			</div>

			{/* hover note */}
			<div className="h-10 mt-2">{activeTool?.note && !tooltip && <p className="text-xs text-stone-500 italic leading-relaxed">{activeTool.note}</p>}</div>
		</div>
	);
}

const sources = [
	{
		label: "Stack Overflow 2025 Developer Survey",
		url: "https://survey.stackoverflow.co/2025/ai",
		detail: "84% use AI tools; positive sentiment dropped from 70%+ to 60%; 46% distrust accuracy",
	},
	{
		label: "JetBrains State of Developer Ecosystem 2025",
		url: "https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/",
		detail: "85% use AI regularly; ChatGPT (41%) and Copilot (30%) most used; 90% save 1+ hr/week",
	},
	{
		label: "Pragmatic Engineer 2025 Survey",
		url: "https://newsletter.pragmaticengineer.com/p/the-pragmatic-engineer-2025-survey",
		detail: "Copilot and ChatGPT usage dropping; Cursor and Claude surging; Cursor in top 5 editors",
	},
	{
		label: "Harness State of Software Delivery 2025",
		url: "https://www.harness.io/state-of-software-delivery",
		detail: "67% spend more time debugging AI code; 68% more time on AI security vulnerabilities",
	},
	{
		label: "Cursor at $100M ARR (Sacra)",
		url: "https://sacra.com/research/cursor-at-100m-arr/",
		detail: "6,400% YoY growth to $65M ARR by late 2024; $1B annualized revenue within 24 months",
	},
	{
		label: "Stack Overflow: Trust in AI at All-Time Low",
		url: "https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/",
		detail: "Only 3% highly trust AI output; 66% frustrated by solutions that are almost right",
	},
	{
		label: "GitHub Copilot crosses 20M users (TechCrunch)",
		url: "https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/",
		detail: "20M all-time users; ~$400M ARR; 42% market share but eroding",
	},
	{
		label: "a16z State of Consumer AI 2025",
		url: "https://a16z.com/state-of-consumer-ai-2025-product-hits-misses-and-whats-next/",
		detail: "ChatGPT ~81% of global AI chatbot usage; Claude fastest quarterly growth among challengers",
	},
];

// Feature race data: null = not available, string = date added
type FeatureRow = {
	feature: string;
	entries: Record<string, string | null>;
	annotation?: string;
};

const codingFeatures: FeatureRow[] = [
	{
		feature: "Inline code completion",
		entries: {
			"GitHub Copilot": "Jun 2022",
			Cursor: "Mar 2023",
			"Claude Code": null,
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Chat interface",
		entries: {
			"GitHub Copilot": "Dec 2023",
			Cursor: "Mar 2023",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Codebase-aware context",
		entries: {
			"GitHub Copilot": "Dec 2023",
			Cursor: "Mar 2023",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Multi-file editing",
		entries: {
			"GitHub Copilot": "Oct 2024",
			Cursor: "Jul 2024",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Multi-model support",
		entries: {
			"GitHub Copilot": "Oct 2024",
			Cursor: "Mar 2023",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Agent mode",
		entries: {
			"GitHub Copilot": "Feb 2025",
			Cursor: "Nov 2024",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Custom rules / instructions",
		entries: {
			"GitHub Copilot": "Feb 2025",
			Cursor: "Nov 2024",
			"Claude Code": "Feb 2025",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "MCP server support",
		entries: {
			"GitHub Copilot": "Feb 2025",
			Cursor: "Jun 2025",
			"Claude Code": "Nov 2024",
			Windsurf: "Nov 2024",
		},
	},
	{
		feature: "Background / async agents",
		entries: {
			"GitHub Copilot": "May 2025",
			Cursor: "May 2025",
			"Claude Code": "Dec 2025",
			Windsurf: null,
		},
	},
	{
		feature: "Git-aware workflows",
		entries: {
			"GitHub Copilot": "May 2025",
			Cursor: "Oct 2025",
			"Claude Code": "Feb 2025",
			Windsurf: null,
		},
	},
	{
		feature: "Computer use / browser control",
		entries: {
			"GitHub Copilot": "Jul 2025",
			Cursor: "Sep 2025",
			"Claude Code": "Aug 2025",
			Windsurf: "Jun 2025",
		},
	},
	{
		feature: "Sub-agents / parallel agents",
		entries: {
			"GitHub Copilot": "Jan 2026",
			Cursor: "Oct 2025",
			"Claude Code": "Jul 2025",
			Windsurf: "Dec 2025",
		},
	},
	{
		feature: "Hooks / lifecycle events",
		entries: {
			"GitHub Copilot": "Feb 2026",
			Cursor: "Sep 2025",
			"Claude Code": "Jan 2026",
			Windsurf: "Nov 2025",
		},
	},
	{
		feature: "Skills / custom commands",
		entries: {
			"GitHub Copilot": "Dec 2025",
			Cursor: "Sep 2025",
			"Claude Code": "Oct 2025",
			Windsurf: "Jan 2026",
		},
		annotation:
			'Claude Code invented the "skills" pattern (SKILL.md with metadata, scripts, and dynamic loading). Cursor initially shipped simpler custom commands (.cursor/commands/*.md) and later adopted the skills model.',
	},
	{
		feature: "Plugin / extension marketplace",
		entries: {
			"GitHub Copilot": "Feb 2025",
			Cursor: "Feb 2026",
			"Claude Code": "Oct 2025",
			Windsurf: null,
		},
	},
	{
		feature: "Dedicated debug mode",
		entries: {
			"GitHub Copilot": null,
			Cursor: "Dec 2025",
			"Claude Code": null,
			Windsurf: null,
		},
		annotation:
			"Cursor 2.2 shipped a dedicated Debug Mode that instruments code with runtime logs to find root causes. The others handle debugging through general chat rather than a distinct mode.",
	},
	{
		feature: "Dynamic workflows / orchestration",
		entries: {
			"GitHub Copilot": null,
			Cursor: null,
			"Claude Code": "Jun 2026",
			Windsurf: null,
		},
		annotation:
			"Claude Code's dynamic workflows let the agent write a script that spawns and coordinates many sub-agents deterministically. No direct equivalent has shipped in the others yet.",
	},
];

const chatFeatures: FeatureRow[] = [
	{
		feature: "Web browsing / search",
		entries: { ChatGPT: "May 2023", Claude: "Mar 2025", Gemini: "May 2023" },
	},
	{
		feature: "Code execution",
		entries: { ChatGPT: "May 2023", Claude: "Feb 2025", Gemini: "Dec 2024" },
	},
	{
		feature: "File upload & analysis",
		entries: { ChatGPT: "May 2023", Claude: "Mar 2024", Gemini: "Feb 2024" },
	},
	{
		feature: "Voice interaction",
		entries: { ChatGPT: "Sep 2023", Claude: "May 2025", Gemini: "Aug 2024" },
	},
	{
		feature: "Image generation",
		entries: { ChatGPT: "Oct 2023", Claude: null, Gemini: "Feb 2024" },
	},
	{
		feature: "Custom GPTs / Gems",
		entries: { ChatGPT: "Nov 2023", Claude: null, Gemini: "Aug 2024" },
	},
	{
		feature: "Artifacts / canvas",
		entries: { ChatGPT: "Oct 2024", Claude: "Jun 2024", Gemini: "Mar 2025" },
	},
	{
		feature: "Reasoning models",
		entries: { ChatGPT: "Sep 2024", Claude: "May 2025", Gemini: "Dec 2024" },
	},
	{
		feature: "Computer use / agent actions",
		entries: { ChatGPT: "Jul 2025", Claude: "Oct 2024", Gemini: "Oct 2025" },
	},
	{
		feature: "Projects / persistent memory",
		entries: { ChatGPT: "Dec 2024", Claude: "Nov 2024", Gemini: "Nov 2025" },
	},
	{
		feature: "MCP support",
		entries: { ChatGPT: "Sep 2025", Claude: "Nov 2024", Gemini: "Mar 2025" },
	},
	{
		feature: "Deep research mode",
		entries: { ChatGPT: "Feb 2025", Claude: "May 2025", Gemini: "Dec 2024" },
	},
	{
		feature: "Multiplayer / team agent",
		entries: { ChatGPT: "Nov 2025", Claude: "Oct 2025", Gemini: null },
		annotation:
			"A shared agent a whole team talks to. Claude's entry dates to Claude in Slack (Oct 2025), later succeeded by Claude Tag (Jun 2026); Cowork itself is single-user and appears under autonomous work agent.",
	},
	{
		feature: "Agentic coding CLI",
		entries: { ChatGPT: "Apr 2025", Claude: "Feb 2025", Gemini: "Jun 2025" },
		annotation: "Each lab shipped a terminal-native coding agent: Claude Code (Feb 2025), OpenAI Codex CLI (Apr 2025), and Gemini CLI (Jun 2025).",
	},
	{
		feature: "Scheduled / recurring tasks",
		entries: { ChatGPT: "Jan 2025", Claude: "Jul 2026", Gemini: "Jun 2025" },
		annotation: "ChatGPT Tasks (Jan 2025), Gemini Scheduled Actions (Jun 2025), and Claude scheduled tasks via the Cowork mobile and web expansion (Jul 2026).",
	},
	{
		feature: "Autonomous work agent",
		entries: { ChatGPT: "Jul 2026", Claude: "Jan 2026", Gemini: null },
		annotation:
			"Agent workspaces that run multi-step tasks for hours and group work into projects: Claude Cowork (preview Jan 2026, GA Apr 2026) and OpenAI ChatGPT Work (Jul 2026).",
	},
];

function parseDate(d: string): number {
	return new Date(d).getTime();
}

function findFirstDate(entries: Record<string, string | null>): string | null {
	let earliest: string | null = null;
	let earliestTime = Number.POSITIVE_INFINITY;
	for (const [, val] of Object.entries(entries)) {
		if (!val) continue;
		const t = parseDate(val);
		if (t < earliestTime) {
			earliestTime = t;
			earliest = val;
		}
	}
	return earliest;
}

function sortByFirstOccurrence(features: FeatureRow[]): FeatureRow[] {
	return [...features].sort((a, b) => {
		const aFirst = findFirstDate(a.entries);
		const bFirst = findFirstDate(b.entries);
		if (!aFirst && !bFirst) return 0;
		if (!aFirst) return 1;
		if (!bFirst) return -1;
		return parseDate(aFirst) - parseDate(bFirst);
	});
}

function FeatureRaceTable({ title, platforms, features, footnote }: { title: string; platforms: string[]; features: FeatureRow[]; footnote?: string }) {
	return (
		<div className="mt-10">
			<h4 className="text-sm font-semibold text-stone-700 mb-3">{title}</h4>
			<div className="overflow-x-auto -mx-1">
				<table className="w-full text-xs border-collapse">
					<thead>
						<tr>
							<th className="text-left py-2 px-2 font-semibold text-stone-500 border-b border-stone-200 whitespace-nowrap">Capability</th>
							{platforms.map((p) => (
								<th key={p} className="text-center py-2 px-2 font-semibold text-stone-500 border-b border-stone-200 whitespace-nowrap">
									{p}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortByFirstOccurrence(features).map((row) => {
							const first = findFirstDate(row.entries);
							return (
								<>
									<tr key={row.feature} className={row.annotation ? "" : "border-b border-stone-100 last:border-b-0"}>
										<td className="py-2 px-2 text-stone-700 whitespace-nowrap">{row.feature}</td>
										{platforms.map((p) => {
											const val = row.entries[p];
											const isFirst = val !== null && val === first;
											return (
												<td
													key={p}
													className={`py-2 px-2 text-center whitespace-nowrap ${
														val === null ? "text-stone-300" : isFirst ? "text-stone-900 font-bold" : "text-stone-500"
													}`}
												>
													{val === null ? "\u2014" : val}
												</td>
											);
										})}
									</tr>
									{row.annotation && (
										<tr key={`${row.feature}-note`} className="border-b border-stone-100">
											<td colSpan={platforms.length + 1} className="px-2 pb-2 pt-0">
												<p className="text-[10px] text-stone-400 italic leading-relaxed">{row.annotation}</p>
											</td>
										</tr>
									)}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
			<p className="text-[10px] text-stone-400 mt-2">
				<span className="font-bold text-stone-500">Bold</span> = first to market for that capability
			</p>
			{footnote && <p className="text-[10px] text-stone-400 mt-1">{footnote}</p>}
		</div>
	);
}

export function SentimentTimeline() {
	const [sourcesOpen, setSourcesOpen] = useState(false);

	return (
		<div className="space-y-10">
			<p className="text-xs text-stone-500">
				Hover over the <span className="inline-block w-2 h-2 border border-stone-400 rotate-45 relative -top-px" /> diamond markers to see major feature
				releases for each tool.
			</p>
			<Chart tools={codingTools} title="Coding Assistants" />
			<Chart tools={chatTools} title="General Chat / Research" />
			<p className="text-xs text-stone-400 leading-relaxed">
				Sentiment is an approximate composite based on developer surveys, community discussion trends, and adoption data. It reflects general developer
				perception, not a single metric. Your mileage may vary.
			</p>

			<FeatureRaceTable
				title="Coding Tools: Feature Race"
				platforms={["GitHub Copilot", "Cursor", "Claude Code", "Windsurf"]}
				features={codingFeatures}
				footnote="Windsurf was renamed Devin Desktop by Cognition in June 2026; it is listed here under its original name for historical continuity."
			/>

			<FeatureRaceTable title="Chat / Research Tools: Feature Race" platforms={["ChatGPT", "Claude", "Gemini"]} features={chatFeatures} />

			<div className="border-t border-stone-200 pt-4">
				<button
					type="button"
					onClick={() => setSourcesOpen(!sourcesOpen)}
					className="text-xs font-semibold text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1"
				>
					<span className={`inline-block transition-transform ${sourcesOpen ? "rotate-90" : ""}`}>&#9654;</span>
					Sources ({sources.length})
				</button>
				{sourcesOpen && (
					<ul className="mt-3 space-y-2.5">
						{sources.map((s) => (
							<li key={s.url} className="text-xs leading-relaxed">
								<a href={s.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">
									{s.label}
								</a>
								<span className="text-stone-400 ml-1.5">{s.detail}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
