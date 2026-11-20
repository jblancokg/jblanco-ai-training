import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CATEGORY_STYLES = {
	requirements: {
		label: "Req.",
		fill: "#bbf7d0",
		stroke: "#16a34a",
	},
	coding: {
		label: "Code",
		fill: "#bfdbfe",
		stroke: "#2563eb",
	},
	documentation: {
		label: "Docs",
		fill: "#fde68a",
		stroke: "#d97706",
	},
	review: {
		label: "Review\nTest",
		fill: "#fecaca",
		stroke: "#ef4444",
	},
} as const;

const charts = [
	{
		title: "Traditional development",
		subtitle: "Most effort is spent directly writing code.",
		total: "More total effort overall",
		data: [
			{ key: "requirements", value: 5 },
			{ key: "coding", value: 70 },
			{ key: "documentation", value: 10 },
			{ key: "review", value: 15 },
		],
	},
	{
		title: "AI-assisted development",
		subtitle: "The cycle is faster overall, but review and direction take a bigger share.",
		total: "Less total effort overall",
		data: [
			{ key: "requirements", value: 12 },
			{ key: "coding", value: 25 },
			{ key: "documentation", value: 12 },
			{ key: "review", value: 20 },
		],
	},
] as const;

function TooltipCard({ active, payload }: { active?: boolean; payload?: Array<{ payload?: { key: keyof typeof CATEGORY_STYLES; value: number } }> }) {
	if (!active || !payload?.length) return null;

	const point = payload[0]?.payload;
	if (!point) return null;

	const style = CATEGORY_STYLES[point.key];

	return (
		<div className="rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-sm">
			<div className="text-xs font-semibold text-stone-800">{style.label}</div>
			<div className="text-xs text-stone-500 mt-1">{point.value} time units</div>
		</div>
	);
}

export function TimeAllocationShift() {
	return (
		<div className="my-10">
			<div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
				<div className="mb-5">
					<div className="text-sm font-semibold text-stone-800">Time Allocation Shift</div>
					<p className="text-xs text-stone-500 mt-1 mb-0 leading-relaxed">
						Illustrative rather than literal. The point is that AI reduces raw coding time while increasing the share of work spent on context, review, and
						validation.
					</p>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
					{charts.map((chart) => (
						<div key={chart.title} className="rounded-lg border border-stone-200 bg-stone-50/30 px-4 py-4 sm:px-5">
							<div className="mb-2">
								<h4 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
									{chart.title}
								</h4>
							</div>

							<div className="h-72 rounded-md bg-white px-2 pt-3">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={chart.data} margin={{ top: 8, right: 12, left: -18, bottom: 24 }}>
										<CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e7e5e4" />
										<XAxis
											dataKey="key"
											axisLine={false}
											tickLine={false}
											interval={0}
											height={40}
											tick={(props) => {
												const { x, y, payload } = props as unknown as {
													x: number;
													y: number;
													payload: { value: keyof typeof CATEGORY_STYLES };
												};
												const lines = CATEGORY_STYLES[payload.value].label.split("\n");
												return (
													<text x={x} y={y} textAnchor="middle" fill="#57534e" fontSize={12}>
														{lines.map((line, i) => (
															<tspan x={x} dy={i === 0 ? 12 : 14} key={line}>
																{line}
															</tspan>
														))}
													</text>
												);
											}}
										/>
										<YAxis
											axisLine={false}
											tickLine={false}
											tick={{ fill: "#78716c", fontSize: 12 }}
											domain={[0, 100]}
											label={{
												value: "time units",
												angle: -90,
												position: "insideLeft",
												offset: 24,
												style: { fill: "#a8a29e", fontSize: 11 },
											}}
											width={50}
										/>
										<Tooltip content={<TooltipCard />} cursor={{ fill: "#f5f5f4" }} />
										<Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={52}>
											{chart.data.map((entry) => {
												const style = CATEGORY_STYLES[entry.key];

												return <Cell key={`${chart.title}-${entry.key}`} fill={style.fill} stroke={style.stroke} strokeWidth={1} />;
											})}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</div>

							<p className="text-sm text-stone-500 mt-3 mb-0 leading-relaxed">{chart.subtitle}</p>
							<p className="text-xs text-stone-400 mt-1 mb-0">{chart.total}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
