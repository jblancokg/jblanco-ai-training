import type { ReactNode } from "react";
import { CHAPTERS, getNavigableItems, getUrlForNavItem, TRACK_META } from "../data/chapters";

type Props = {
	chapterId: string;
	subChapterId?: string;
	children: ReactNode;
};

export function PageShell({ chapterId, subChapterId, children }: Props) {
	const chapter = CHAPTERS.find((c) => c.id === chapterId);
	const trackMeta = chapter ? TRACK_META[chapter.track] : TRACK_META.both;

	// Display label
	let displayLabel = chapter?.label ?? "";
	if (subChapterId && chapter?.subChapters) {
		const sub = chapter.subChapters.find((s) => s.id === subChapterId);
		if (sub) displayLabel = sub.label;
	}

	// Chapter number
	const chapterIdx = CHAPTERS.findIndex((c) => c.id === chapterId);
	let chapterNum = `${chapterIdx + 1}`;
	if (subChapterId && chapter?.subChapters) {
		const subIdx = chapter.subChapters.findIndex((s) => s.id === subChapterId);
		chapterNum = `${chapterIdx + 1}.${subIdx + 1}`;
	}

	// Subtitle
	const subtitle =
		chapterId === "intro"
			? "A practical guide to using AI throughout your software development workflow."
			: `How AI tools integrate into the ${displayLabel.toLowerCase()} phase of your development workflow.`;

	// Prev/next
	const navItems = getNavigableItems();
	const currentIdx = navItems.findIndex((item) => item.chapterId === chapterId && item.subChapterId === subChapterId);
	const prev = currentIdx > 0 ? navItems[currentIdx - 1] : null;
	const next = currentIdx < navItems.length - 1 ? navItems[currentIdx + 1] : null;

	return (
		<main className="flex-1 min-h-screen">
			{/* Breadcrumb header */}
			<div className="sticky top-0 z-10 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-stone-100 px-10 py-3">
				<div className="flex items-center gap-2 text-xs text-stone-400">
					<span>AI Training Guide</span>
					<span>/</span>
					<span className={trackMeta.color}>{trackMeta.label}</span>
					{subChapterId && chapter && (
						<>
							<span>/</span>
							<span className="text-stone-500">{chapter.label}</span>
						</>
					)}
					<span>/</span>
					<span className="text-stone-600">{displayLabel}</span>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-3xl px-10 py-10">
				<div className="mb-2 text-xs text-stone-400 font-mono">Chapter {chapterNum}</div>
				<h1 className="text-4xl font-bold text-stone-800 tracking-tight mb-3 leading-tight">{displayLabel}</h1>
				<p className="text-lg text-stone-500 leading-relaxed max-w-lg mb-2">{subtitle}</p>
				<hr className="border-stone-200 my-6" />

				{children}
			</div>

			{/* Bottom nav */}
			<div className="border-t border-stone-200 bg-white px-10 py-4 flex items-center justify-between max-w-3xl">
				{prev ? (
					<a href={getUrlForNavItem(prev)} className="text-sm text-stone-600 hover:text-orange-600 transition-colors">
						&larr; {prev.label}
					</a>
				) : (
					<span className="text-sm text-stone-300">&larr; Previous</span>
				)}
				{next ? (
					<a href={getUrlForNavItem(next)} className="text-sm bg-stone-800 text-white hover:bg-stone-700 px-4 py-2 rounded-lg transition-colors">
						{next.label} &rarr;
					</a>
				) : (
					<span className="text-sm text-stone-300">Next &rarr;</span>
				)}
			</div>
		</main>
	);
}
