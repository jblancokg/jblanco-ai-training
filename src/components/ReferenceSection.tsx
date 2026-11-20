export function ReferenceSection() {
	return (
		<div className="my-8 space-y-8">
			<hr className="border-stone-200" />
			<div>
				<h3 className="text-lg font-semibold text-stone-800 mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
					Reference: UI Components
				</h3>
				<div className="mb-6">
					<h4 className="text-sm font-semibold text-stone-600 mb-2">Buttons</h4>
					<div className="flex flex-wrap gap-2">
						<button className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Primary</button>
						<button className="bg-white hover:bg-stone-50 text-stone-700 text-sm font-medium px-4 py-2 rounded-lg border border-stone-300 transition-colors">
							Secondary
						</button>
						<button className="text-orange-600 hover:text-orange-700 text-sm font-medium px-4 py-2 underline underline-offset-2 transition-colors">
							Link Style
						</button>
						<button className="bg-orange-50 text-orange-700 hover:bg-orange-100 text-sm font-medium px-4 py-2 rounded-lg border border-orange-200 transition-colors">
							Accent
						</button>
					</div>
				</div>
				<div className="mb-6">
					<h4 className="text-sm font-semibold text-stone-600 mb-2">Data Table</h4>
					<div className="border border-stone-200 rounded-lg overflow-hidden">
						<table className="w-full text-sm">
							<thead>
								<tr className="bg-stone-50 border-b border-stone-200">
									<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Model</th>
									<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Latency</th>
									<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Quality</th>
									<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Best For</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-stone-100">
								{[
									{
										model: "Opus",
										latency: "Higher",
										quality: "Exceptional",
										use: "Complex multi-step tasks",
									},
									{
										model: "Sonnet",
										latency: "Moderate",
										quality: "Very High",
										use: "Daily development work",
									},
									{
										model: "Haiku",
										latency: "Low",
										quality: "Good",
										use: "Quick lookups & simple edits",
									},
								].map((r, i) => (
									<tr key={i} className="hover:bg-orange-50/30 transition-colors">
										<td className="px-4 py-2.5 font-semibold text-stone-700">{r.model}</td>
										<td className="px-4 py-2.5 text-stone-500">{r.latency}</td>
										<td className="px-4 py-2.5 text-stone-700">{r.quality}</td>
										<td className="px-4 py-2.5 text-stone-500 italic">{r.use}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="bg-orange-50 border border-orange-200 rounded-lg px-5 py-4">
					<div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Note</div>
					<p className="text-sm text-orange-800 leading-relaxed">
						The sidebar layout keeps chapter navigation always visible, making it easy to jump between SDLC phases without losing your place.
					</p>
				</div>
			</div>
		</div>
	);
}
