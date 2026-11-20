import { useState } from "react";
import { CHAPTERS, type Chapter, getUrlForNavItem, TRACK_META, type Track } from "../data/chapters";

function getActiveFromUrl(pathname: string): { chapterId: string; subChapterId?: string } {
	const parts = pathname.split("/").filter(Boolean);
	if (parts.length >= 2) {
		return { chapterId: parts[0], subChapterId: parts[1] };
	}
	if (parts.length === 1) {
		return { chapterId: parts[0] };
	}
	return { chapterId: "intro", subChapterId: "welcome" };
}

function getProgressIndex(chapterId: string, subChapterId?: string): number {
	let idx = 0;
	for (const ch of CHAPTERS) {
		if (ch.id === chapterId) {
			if (ch.subChapters && subChapterId) {
				const subIdx = ch.subChapters.findIndex((s) => s.id === subChapterId);
				return idx + (subIdx >= 0 ? subIdx + 1 : 1);
			}
			return idx + 1;
		}
		idx += ch.subChapters ? ch.subChapters.length : 1;
	}
	return idx;
}

function getTotalPages(): number {
	return CHAPTERS.reduce((sum, ch) => sum + (ch.subChapters ? ch.subChapters.length : 1), 0);
}

export function Sidebar() {
	const active = getActiveFromUrl(typeof window !== "undefined" ? window.location.pathname : "/");

	const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
		const init: Record<string, boolean> = {};
		init[active.chapterId] = true;
		return init;
	});

	const toggleExpand = (chapterId: string) => {
		setExpanded((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
	};

	const progress = getProgressIndex(active.chapterId, active.subChapterId);
	const total = getTotalPages();

	const groups: { label: string; trackKey: Track; chapters: Chapter[] }[] = [];
	const trackOrder: { track: Track; label: string }[] = [
		{ track: "both", label: "Cross-Functional" },
		{ track: "strategy", label: "Strategy Track" },
		{ track: "dev", label: "Developer Track" },
	];
	for (const { track, label } of trackOrder) {
		const chs = CHAPTERS.filter((c) => c.track === track);
		if (chs.length > 0) {
			groups.push({ label, trackKey: track, chapters: chs });
		}
	}

	const renderChapter = (chapter: Chapter) => {
		const meta = TRACK_META[chapter.track];
		const isActiveChapter = chapter.id === active.chapterId;
		const hasSubs = chapter.subChapters && chapter.subChapters.length > 0;
		const isExpanded = expanded[chapter.id];

		// URL for the chapter link
		const chapterUrl = hasSubs
			? getUrlForNavItem({
					chapterId: chapter.id,
					subChapterId: chapter.subChapters![0].id,
					label: "",
				})
			: getUrlForNavItem({ chapterId: chapter.id, label: "" });

		return (
			<div key={chapter.id}>
				{hasSubs ? (
					<button
						onClick={() => {
							toggleExpand(chapter.id);
							if (!isActiveChapter) {
								setExpanded((prev) => ({ ...prev, [chapter.id]: true }));
							}
						}}
						className={`
              w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-r-lg border-l-[3px] transition-all text-[13px]
              ${
								isActiveChapter
									? `border-l-transparent ${meta.color} font-semibold hover:bg-stone-50`
									: `border-l-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50`
							}
            `}
						style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
					>
						<span className="text-base opacity-60">{chapter.icon}</span>
						<a href={chapterUrl} className="flex-1" onClick={(e) => e.stopPropagation()}>
							{chapter.label}
						</a>
						<span className={`text-[10px] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}>&#9654;</span>
					</button>
				) : (
					<a
						href={chapterUrl}
						className={`
              w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-r-lg border-l-[3px] transition-all text-[13px]
              ${
								isActiveChapter && !active.subChapterId
									? `${meta.stripe} ${meta.bg} ${meta.color} font-semibold`
									: `border-l-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50`
							}
            `}
						style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
					>
						<span className="text-base opacity-60">{chapter.icon}</span>
						<span className="flex-1">{chapter.label}</span>
						{isActiveChapter && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-60" />}
					</a>
				)}

				{/* Sub-chapters */}
				{hasSubs && isExpanded && (
					<div className="ml-7 mt-0.5 mb-1 space-y-0.5">
						{chapter.subChapters!.map((sub) => {
							const isActiveSub = isActiveChapter && active.subChapterId === sub.id;
							const subUrl = getUrlForNavItem({
								chapterId: chapter.id,
								subChapterId: sub.id,
								label: "",
							});
							return (
								<a
									key={sub.id}
									href={subUrl}
									className={`
                    block w-full text-left px-3 py-1.5 rounded-r-lg border-l-[3px] transition-all text-[12px]
                    ${
											isActiveSub
												? `${meta.stripe} ${meta.bg} ${meta.color} font-semibold`
												: `border-l-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50`
										}
                  `}
									style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
								>
									{sub.label}
								</a>
							);
						})}
					</div>
				)}
			</div>
		);
	};

	return (
		<aside className="w-64 shrink-0 bg-white border-r border-stone-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
			{/* Logo area */}
			<div className="px-5 pt-5 pb-4 border-b border-stone-100">
				<div className="text-lg font-bold text-stone-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
					AI Training Guide
				</div>
				<div className="text-[11px] text-stone-400 mt-0.5">SDLC with AI Assistants</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 py-4 px-2">
				{groups.map((group) => {
					const meta = TRACK_META[group.trackKey];
					return (
						<div className="mb-5" key={group.label + group.trackKey}>
							<div className={`text-[10px] font-bold uppercase tracking-[0.15em] ${meta.color} mb-2 px-3`}>{group.label}</div>
							<div className="space-y-0.5">{group.chapters.map(renderChapter)}</div>
						</div>
					);
				})}
			</nav>

			{/* Progress footer */}
			<div className="px-5 py-4 border-t border-stone-100">
				<div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
					<span>Progress</span>
					<span className="font-mono">
						{progress}/{total}
					</span>
				</div>
				<div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
					<div className="h-full bg-orange-400 rounded-full transition-all duration-500" style={{ width: `${(progress / total) * 100}%` }} />
				</div>
			</div>
		</aside>
	);
}
