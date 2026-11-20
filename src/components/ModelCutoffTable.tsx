const models = [
	{
		provider: "Anthropic",
		model: "Claude Opus 4.8",
		cutoff: "Jan 2026",
		training: "Jan 2026",
	},
	{
		provider: "Anthropic",
		model: "Claude Sonnet 5",
		cutoff: "Jan 2026",
		training: "Jan 2026",
	},
	{
		provider: "Anthropic",
		model: "Claude Fable 5",
		cutoff: "Jan 2026",
		training: "Jan 2026",
	},
	{
		provider: "OpenAI",
		model: "GPT-5.6",
		cutoff: "~May 2026 †",
		training: "—",
	},
	{
		provider: "Google",
		model: "Gemini 3.5 Pro",
		cutoff: "~Mar 2026 †",
		training: "—",
	},
	{
		provider: "xAI",
		model: "Grok 4.5",
		cutoff: "Not disclosed †",
		training: "—",
	},
	{
		provider: "Cursor",
		model: "Composer 2.5 *",
		cutoff: "Not disclosed *",
		training: "—",
	},
];

const sources = [
	{
		label: "Anthropic Models Overview",
		url: "https://platform.claude.com/docs/en/about-claude/models/overview",
	},
	{
		label: "LLM Knowledge Cutoff Dates",
		url: "https://www.allmo.ai/articles/list-of-large-language-model-cut-off-dates",
	},
	{
		label: "Google Gemini Models",
		url: "https://ai.google.dev/gemini-api/docs/models",
	},
];

export default function ModelCutoffTable() {
	return (
		<div className="my-8">
			<h4 className="text-base font-semibold text-stone-800 mb-3" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
				Model Knowledge Cutoff Dates
			</h4>
			<div className="border border-stone-200 rounded-lg overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-stone-50 border-b border-stone-200">
							<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Provider</th>
							<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Model</th>
							<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Knowledge Cutoff</th>
							<th className="text-left px-4 py-2.5 text-stone-500 font-semibold text-xs">Training Data Cutoff</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-stone-100">
						{models.map((r, i) => (
							<tr key={i} className="hover:bg-orange-50/30 transition-colors">
								<td className="px-4 py-2.5 text-stone-500">{r.provider}</td>
								<td className="px-4 py-2.5 font-semibold text-stone-700">{r.model}</td>
								<td className="px-4 py-2.5 text-stone-700">{r.cutoff}</td>
								<td className="px-4 py-2.5 text-stone-500">{r.training}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="text-xs text-stone-400 mt-2">
				† Unofficial community estimate. These models are recent enough that the provider has not published an official knowledge cutoff. Grok 4.5's predecessor
				Grok 4.3 had a December 2025 cutoff.
			</p>
			<p className="text-xs text-stone-400 mt-1">
				* Cursor has not disclosed Composer 2.5's base model or training cutoff. It is widely believed to be post-trained from an open-weight GLM base.
			</p>
			<p className="text-xs text-stone-400 mt-1">
				As of July 2026. Anthropic figures show the reliable knowledge cutoff. Sources:{" "}
				{sources.map((s, i) => (
					<span key={i}>
						{i > 0 && ", "}
						<a href={s.url} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-700 underline">
							{s.label}
						</a>
					</span>
				))}
			</p>
		</div>
	);
}
