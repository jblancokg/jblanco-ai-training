export type Track = "strategy" | "dev" | "both";

export type SubChapter = {
	id: string;
	label: string;
	subtitle?: string;
};

export type Chapter = {
	id: string;
	label: string;
	subtitle?: string;
	icon: string;
	track: Track;
	subChapters?: SubChapter[];
};

export const TRACK_META: Record<
	Track,
	{
		label: string;
		color: string;
		bg: string;
		border: string;
		dot: string;
		stripe: string;
	}
> = {
	strategy: {
		label: "Strategy",
		color: "text-violet-600",
		bg: "bg-violet-50",
		border: "border-violet-200",
		dot: "bg-violet-400",
		stripe: "border-l-violet-400",
	},
	dev: {
		label: "Developer",
		color: "text-teal-600",
		bg: "bg-teal-50",
		border: "border-teal-200",
		dot: "bg-teal-400",
		stripe: "border-l-teal-400",
	},
	both: {
		label: "Both",
		color: "text-orange-600",
		bg: "bg-orange-50",
		border: "border-orange-200",
		dot: "bg-orange-400",
		stripe: "border-l-orange-400",
	},
};

export const CHAPTERS: Chapter[] = [
	{
		id: "intro",
		label: "Introduction",
		icon: "◎",
		track: "both",
		subChapters: [
			{
				id: "welcome",
				label: "Welcome",
				subtitle: "Your guide to AI across the software development lifecycle.",
			},
			{
				id: "roles-and-tools",
				label: "Roles & Tools",
				subtitle: "Which AI tools fit which roles on your team.",
			},
			{
				id: "current-state",
				label: "Current State of AI",
				subtitle: "What AI can and can't do today.",
			},
		],
	},
	{
		id: "fundamentals",
		label: "Fundamentals",
		icon: "◉",
		track: "both",
		subChapters: [
			{
				id: "what-is-an-llm",
				label: "What is an LLM",
				subtitle: "Large language models in plain English.",
			},
			{
				id: "how-they-function",
				label: "How They Function",
				subtitle: "What happens between your prompt and the response.",
			},
			{
				id: "thinking-of-the-ai",
				label: "Thinking of the AI",
				subtitle: "The right mental model for working with AI.",
			},
			{
				id: "context-windows",
				label: "Context Windows",
				subtitle: "How much AI can hold in its head at once.",
			},
			{
				id: "verbosity",
				label: "Verbosity",
				subtitle: "When to be detailed and when to keep it brief.",
			},
			{
				id: "markdown",
				label: "Markdown: The Language of AI",
				subtitle: "Structured formatting gets better results.",
			},
			{
				id: "html",
				label: "HTML: The Other Language of AI",
				subtitle: "Why AI output is increasingly HTML, not Markdown.",
			},
			{
				id: "prompt-engineering",
				label: "Prompt Engineering Basics",
				subtitle: "Techniques for prompts that actually work.",
			},
			{
				id: "model-selection",
				label: "Model Selection",
				subtitle: "Speed, cost, and capability trade-offs.",
			},
			{
				id: "hallucination",
				label: "Hallucination & Verification",
				subtitle: "When AI makes things up and how to catch it.",
			},
			{
				id: "ai-tool-config-files",
				label: "AI Tool Config Files",
				subtitle: "Where each AI coding tool stores its rules, agents, and settings.",
			},
			{
				id: "productive-waiting",
				label: "Productive Waiting",
				subtitle: "Use AI's work time to stay ahead.",
			},
			{
				id: "what-not-to-share",
				label: "What Not to Share With AI",
				subtitle: "Secrets, PII, and confidential data that should stay out of prompts.",
			},
		],
	},
	{
		id: "requirements-gathering",
		label: "Requirements Gathering",
		icon: "✎",
		track: "strategy",
		subChapters: [
			{
				id: "linking-your-tools",
				label: "Linking Your Tools",
				subtitle: "Connecting your existing tools to AI.",
			},
			{
				id: "documentation-first-development",
				label: "Documentation-First Development",
				subtitle: "Make your docs the source of truth the AI builds from.",
			},
			{
				id: "rubber-ducking",
				label: "AI Rubber Ducking",
				subtitle: "AI as a thinking partner for your ideas.",
			},
		],
	},
	{
		id: "competitive-research",
		label: "Competitive Research",
		subtitle: "Analyze competitors and spot opportunities with AI.",
		icon: "⊞",
		track: "strategy",
		subChapters: [
			{
				id: "setting-up-your-research",
				label: "Setting Up Your Research",
				subtitle: "Frame the question before you prompt.",
			},
			{
				id: "prompting-for-research",
				label: "Prompting for Research",
				subtitle: "Prompting techniques for competitive analysis.",
			},
			{
				id: "deep-research",
				label: "Deep Research",
				subtitle: "Let Claude run the multi-step research for you.",
			},
			{
				id: "citing-sources",
				label: "Citing Sources",
				subtitle: "Verify and attribute what AI tells you.",
			},
			{
				id: "limitations",
				label: "Limitations",
				subtitle: "What AI can't do here.",
			},
			{
				id: "structuring-your-output",
				label: "Structuring Your Output",
				subtitle: "From raw research to useful deliverables.",
			},
		],
	},
	{
		id: "requirements-writing",
		label: "Requirements Writing",
		icon: "☰",
		track: "strategy",
		subChapters: [
			{
				id: "templates",
				label: "Templates",
				subtitle: "Reusable structures for consistent requirements.",
			},
			{
				id: "skills",
				label: "Skills",
				subtitle: "Give AI the right expertise on demand.",
			},
		],
	},
	{
		id: "task-breakdowns",
		label: "Task Breakdowns",
		subtitle: "From big features to well-scoped tasks.",
		icon: "⟐",
		track: "both",
		subChapters: [
			{
				id: "the-xy-problem",
				label: "The XY Problem",
				subtitle: "Ask about the problem, not your attempted solution.",
			},
			{
				id: "agents-md",
				label: "AGENTS.md",
				subtitle: "Project context the AI reads before it works.",
			},
			{
				id: "including-context",
				label: "Including Context",
				subtitle: "Bridging requirements and code for better tasks.",
			},
			{
				id: "task-breakdown-skills",
				label: "Task Breakdown Skills",
				subtitle: "A reusable skill for turning requirements into tasks.",
			},
		],
	},
	{
		id: "development",
		label: "Development",
		subtitle: "Writing and refactoring code with AI.",
		icon: "◇",
		track: "dev",
		subChapters: [
			{
				id: "documentation",
				label: "Documentation",
				subtitle: "Good docs help AI and your teammates.",
			},
			{
				id: "agent-plan-ask",
				label: "Agent, Plan & Ask Modes",
				subtitle: "Pick the right interaction mode for the job.",
			},
			{
				id: "context-strategies",
				label: "Context Strategies",
				subtitle: "Manage what's in the window, manage the output.",
			},
			{
				id: "prompting-for-development",
				label: "Prompting for Development",
				subtitle: "Prompts that produce shippable code.",
			},
			{
				id: "choosing-libraries",
				label: "Choosing Libraries & Frameworks",
				subtitle: "Better library choices, smoother AI output.",
			},
			{
				id: "utilizing-git",
				label: "Utilizing Git",
				subtitle: "Version control as your AI safety net.",
			},
			{
				id: "time-allocation-changes",
				label: "Time Allocation Changes",
				subtitle: "Faster development, more time reviewing.",
			},
			{
				id: "code-review",
				label: "Code Review",
				subtitle: "From writing code to directing it.",
			},
			{
				id: "owning-the-code",
				label: "Owning the Code",
				subtitle: "AI wrote it. You own it.",
			},
			{
				id: "common-limitations",
				label: "Common Limitations",
				subtitle: "Where AI coding assistants still fall short.",
			},
			{
				id: "debugging",
				label: "Debugging with AI",
				subtitle: "Find and fix bugs faster with AI.",
			},
			{
				id: "cli-tools",
				label: "CLI Tools and AI",
				subtitle: "Extend AI with command-line tools.",
			},
			{
				id: "additional-features",
				label: "Additional Features",
				subtitle: "Hooks, sub-agents, and other tool features worth knowing.",
			},
		],
	},
	{
		id: "documentation",
		label: "Documentation",
		subtitle: "Docs that stay useful over time.",
		icon: "☰",
		track: "both",
		subChapters: [
			{
				id: "why-it-matters",
				label: "Why It Matters",
				subtitle: "Docs are now input to your best dev tool.",
			},
			{
				id: "where-to-document",
				label: "Where to Document",
				subtitle: "Put docs where humans and AI both find them.",
			},
			{
				id: "what-to-document",
				label: "What to Document",
				subtitle: "What to write down and what to skip.",
			},
			{
				id: "templates",
				label: "Templates",
				subtitle: "Standard structures for faster, lasting docs.",
			},
		],
	},
	{
		id: "testing",
		label: "Testing",
		subtitle: "Better tests, faster, with AI.",
		icon: "◇",
		track: "dev",
		subChapters: [
			{
				id: "ai-test-plan",
				label: "AI Test Plan",
				subtitle: "Generate test scenarios from your code before handoff.",
			},
			{
				id: "qa-team-usage",
				label: "QA Team Usage",
				subtitle: "AI-powered edge case discovery for QA teams.",
			},
			{
				id: "security-and-vulnerabilities",
				label: "Security & Vulnerabilities",
				subtitle: "AI takes the easy path. Keep security in focus.",
			},
		],
	},
	{
		id: "whats-next",
		label: "What's Next",
		subtitle: "Where AI-assisted development is heading.",
		icon: "⊹",
		track: "both",
	},
	{
		id: "feedback-loops",
		label: "Feedback Loops",
		subtitle: "Improve your AI workflows from real results.",
		icon: "⟳",
		track: "both",
	},
	{
		id: "practical-exercise",
		label: "Practical Exercise",
		subtitle: "Apply AI-development best practices by building out part of a dashboard app.",
		icon: "↳",
		track: "both",
		subChapters: [
			{
				id: "get-started",
				label: "Get Started",
				subtitle: "Get started with setting up the sample project.",
			},
			{
				id: "warm-up-task",
				label: "Warm Up Task",
				subtitle: "A warm up task to get familiar with the codebase.",
			},
			{
				id: "adding-a-skill",
				label: "Adding a Skill",
				subtitle: "Create a new skill.",
			},
			{
				id: "requirements-writing",
				label: "Requirements Writing",
				subtitle: "Exercise on creating a requirements page for a new feature.",
			},
			{
				id: "task-breakdown",
				label: "Task Breakdown",
				subtitle: "Create task breakdowns for new features.",
			},
			{
				id: "first-commit",
				label: "First Commit",
				subtitle: "Exercise on creating the first commit based on task breakdowns.",
			},
			{
				id: "validation-steps",
				label: "Validation Steps",
				subtitle: "Small chapter on using AI to validate tasks with acceptance criteria.",
			},
			{
				id: "pr-creation",
				label: "PR Creation",
				subtitle: "Using AI to improve git workflows.",
			},
			{
				id: "plan-mode",
				label: "Plan Mode",
				subtitle: "Using plan mode to implement complex features.",
			},
			{
				id: "git-safety-net",
				label: "Git Safety Net",
				subtitle: "How to use git as an AI safety net.",
			},
			{
				id: "convention-enforcement",
				label: "Convention Enforcement",
				subtitle: "Use golden masters to keep AI output consistent.",
			},
			{
				id: "code-review",
				label: "Code Review",
				subtitle: "Catch what the AI missed before you commit.",
			},
			{
				id: "documentation",
				label: "Documentation",
				subtitle: "Generate docs and keep AGENTS.md current.",
			},
		],
	},
	{
		id: "exploring-ai-capabilities",
		label: "Exploring AI Capabilities",
		subtitle: "Explore what an AI agent can do in a larger, multi-app codebase.",
		icon: "◈",
		track: "both",
		subChapters: [
			{
				id: "overview",
				label: "Overview",
				subtitle: "Get the Kaiju Mutual project and learn how the challenges work.",
			},
			{
				id: "project-setup",
				label: "1. Project Setup",
				subtitle: "Let the agent work out how to install and run an unfamiliar project.",
			},
			{
				id: "agent-file",
				label: "2. Agent File",
				subtitle: "Draft an AGENTS.md with the agent, then make it yours.",
			},
			{
				id: "design-from-screenshot",
				label: "3. Design from a Screenshot",
				subtitle: "Build a page section from nothing but a design screenshot.",
			},
			{
				id: "debug-from-email",
				label: "4. Debug from an Email",
				subtitle: "Find and fix a crash from a customer's photo of their screen.",
			},
			{
				id: "document-api",
				label: "5. Document a Vendor API",
				subtitle: "Work out how a vendor API really behaves, and document it.",
			},
			{
				id: "seed-data",
				label: "6. Sub-agents: Seed the Database",
				subtitle: "Split a long data task across sub-agents working in parallel.",
			},
			{
				id: "regex",
				label: "7. Reference Search",
				subtitle: "A regex with many edge cases, and the tests that prove it.",
			},
			{
				id: "file-bug-report",
				label: "8. File a Bug Report",
				subtitle: "Investigate a flaky vendor API and write it up for the vendor.",
			},
			{
				id: "online-research",
				label: "9. Online Research",
				subtitle: "Research a topic online and back every claim with a source.",
			},
			{
				id: "debug-from-log",
				label: "10. Debug from a Log File",
				subtitle: "Follow a customer's error through a day of production logs.",
			},
			{
				id: "screenshot-report",
				label: "11. Screenshot Report",
				subtitle: "Fix a bug from a terrible image and three words.",
			},
			{
				id: "sizzle-video",
				label: "12. Sizzle Video",
				subtitle: "Direct the agent to make a launch video from real app footage.",
			},
			{
				id: "legacy-refactor",
				label: "13. Legacy Refactor",
				subtitle: "Pin legacy code with tests, then rewrite it safely.",
			},
			{
				id: "feature-from-sketch",
				label: "14. Feature from a Sketch",
				subtitle: "Sketch a feature on paper and have the agent build it.",
			},
			{
				id: "feature-request",
				label: "15. Feature Request from the Boss",
				subtitle: "Turn a vague, rushed request into something buildable.",
			},
			{
				id: "convert-content",
				label: "16. Convert Content",
				subtitle: "Apply a messy document of content changes without guessing.",
			},
			{
				id: "accessibility-review",
				label: "17. Accessibility Review",
				subtitle: "Fan out cheap sub-agents to audit a whole app.",
			},
			{
				id: "hook-up-payments",
				label: "18. Hook up Payments",
				subtitle: "Learn an undocumented API by probing it, then build on it.",
			},
		],
	},
	{
		id: "final-thoughts",
		label: "Final Thoughts",
		subtitle: "The mindset to take into your day-to-day work.",
		icon: "◌",
		track: "both",
	},
	{
		id: "external-resources",
		label: "External Resources",
		subtitle: "Curated links to keep learning.",
		icon: "↗",
		track: "both",
	},
];

/** Flat list of all navigable items: { chapterId, subChapterId?, label } */
export type NavItem = {
	chapterId: string;
	subChapterId?: string;
	label: string;
};

export function getFlatNavItems(): NavItem[] {
	const items: NavItem[] = [];
	for (const ch of CHAPTERS) {
		if (ch.subChapters && ch.subChapters.length > 0) {
			items.push({ chapterId: ch.id, label: ch.label });
			for (const sub of ch.subChapters) {
				items.push({ chapterId: ch.id, subChapterId: sub.id, label: sub.label });
			}
		} else {
			items.push({ chapterId: ch.id, label: ch.label });
		}
	}
	return items;
}

/** Flat list of leaf pages only (subchapters for chapters-with-subs, chapter itself for leaf chapters) */
export function getNavigableItems(): NavItem[] {
	const items: NavItem[] = [];
	for (const ch of CHAPTERS) {
		if (ch.subChapters && ch.subChapters.length > 0) {
			for (const sub of ch.subChapters) {
				items.push({ chapterId: ch.id, subChapterId: sub.id, label: sub.label });
			}
		} else {
			items.push({ chapterId: ch.id, label: ch.label });
		}
	}
	return items;
}

/** Convert a NavItem to its URL path */
export function getUrlForNavItem(item: NavItem): string {
	if (item.subChapterId) {
		return `/${item.chapterId}/${item.subChapterId}`;
	}
	return `/${item.chapterId}`;
}

/** Get total count of navigable pages (chapters without subs count as 1, chapters with subs count their subs) */
export function getPageCount(): number {
	return CHAPTERS.reduce((sum, ch) => {
		if (ch.subChapters && ch.subChapters.length > 0) return sum + ch.subChapters.length;
		return sum + 1;
	}, 0);
}
