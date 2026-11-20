const phases = [
	{
		icon: "◎",
		label: "Introduction",
		desc: "Context and expectations",
		href: "/intro/welcome",
		color: "bg-orange-50 border-orange-200 text-orange-600",
		hoverColor: "hover:border-orange-300 hover:bg-orange-100/60",
	},
	{
		icon: "◉",
		label: "Fundamentals",
		desc: "How LLMs work and how to prompt them",
		href: "/fundamentals/what-is-an-llm",
		color: "bg-orange-50 border-orange-200 text-orange-600",
		hoverColor: "hover:border-orange-300 hover:bg-orange-100/60",
	},
	{
		icon: "✎",
		label: "Requirements",
		desc: "Gathering and writing requirements",
		href: "/requirements-gathering/linking-your-tools",
		color: "bg-violet-50 border-violet-200 text-violet-600",
		hoverColor: "hover:border-violet-300 hover:bg-violet-100/60",
	},
	{
		icon: "⊞",
		label: "Research",
		desc: "Competitive analysis with AI",
		href: "/competitive-research/setting-up-your-research",
		color: "bg-violet-50 border-violet-200 text-violet-600",
		hoverColor: "hover:border-violet-300 hover:bg-violet-100/60",
	},
	{
		icon: "⟐",
		label: "Task Breakdowns",
		desc: "From features to scoped tasks",
		href: "/task-breakdowns/agents-md",
		color: "bg-orange-50 border-orange-200 text-orange-600",
		hoverColor: "hover:border-orange-300 hover:bg-orange-100/60",
	},
	{
		icon: "◇",
		label: "Development",
		desc: "Writing and reviewing code with AI",
		href: "/development/documentation",
		color: "bg-teal-50 border-teal-200 text-teal-600",
		hoverColor: "hover:border-teal-300 hover:bg-teal-100/60",
	},
	{
		icon: "◇",
		label: "Testing",
		desc: "Better tests, faster",
		href: "/testing/ai-test-plan",
		color: "bg-teal-50 border-teal-200 text-teal-600",
		hoverColor: "hover:border-teal-300 hover:bg-teal-100/60",
	},
	{
		icon: "↳",
		label: "Practical Exercise",
		desc: "Apply it all hands-on",
		href: "/practical-exercise/get-started",
		color: "bg-orange-50 border-orange-200 text-orange-600",
		hoverColor: "hover:border-orange-300 hover:bg-orange-100/60",
	},
];

export function JourneyMap() {
	return (
		<div className="my-10">
			<h3 className="text-lg font-semibold text-stone-800 mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
				What you'll cover
			</h3>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{phases.map((phase, i) => (
					<a
						key={phase.label}
						href={phase.href}
						className={`group relative border rounded-lg px-3 py-3 transition-all duration-200 no-underline ${phase.color} ${phase.hoverColor}`}
					>
						<div className="text-xl mb-1.5 transition-transform duration-200 group-hover:scale-110 inline-block">{phase.icon}</div>
						<div className="text-sm font-semibold text-stone-800 leading-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
							{phase.label}
						</div>
						<div className="text-xs text-stone-500 mt-0.5 leading-snug">{phase.desc}</div>
						{i < phases.length - 1 && (
							<div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-stone-300 text-xs z-10 pointer-events-none">›</div>
						)}
					</a>
				))}
			</div>
		</div>
	);
}
