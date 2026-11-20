export default function XYProblemDiagram() {
	return (
		<div className="my-8 select-none">
			{/* Desktop layout */}
			<div className="hidden md:block">
				<svg
					viewBox="0 0 600 340"
					className="w-full max-w-2xl mx-auto"
					aria-label="Diagram showing two paths from a problem: the XY path gets stuck in a loop of assumed solutions, while the direct path describes the real problem and reaches a solution quickly."
				>
					{/* Start node */}
					<rect x="230" y="10" width="140" height="40" rx="8" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />
					<text x="300" y="35" textAnchor="middle" className="text-xs font-medium" fill="#44403c">
						You have Problem X
					</text>

					{/* Branching arrows */}
					<path d="M270 50 L170 80" fill="none" stroke="#d6d3d1" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
					<path d="M330 50 L430 80" fill="none" stroke="#d6d3d1" strokeWidth="1.5" markerEnd="url(#arrowGray)" />

					{/* === Y PATH (left) === */}
					<text x="150" y="75" textAnchor="middle" className="text-[10px] font-bold uppercase" fill="#f87171" letterSpacing="0.05em">
						The XY Path
					</text>

					<rect x="80" y="85" width="140" height="40" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
					<text x="150" y="105" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						You assume
					</text>
					<text x="150" y="118" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						Solution Y will work
					</text>

					<path d="M150 125 L150 145" fill="none" stroke="#fca5a5" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

					<rect x="80" y="148" width="140" height="40" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
					<text x="150" y="168" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						Focus all effort
					</text>
					<text x="150" y="181" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						on making Y work
					</text>

					<path d="M150 188 L150 208" fill="none" stroke="#fca5a5" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

					<rect x="80" y="211" width="140" height="40" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
					<text x="150" y="231" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						Get stuck or realize
					</text>
					<text x="150" y="244" textAnchor="middle" className="text-[11px]" fill="#b91c1c">
						Y doesn't solve X
					</text>

					<path d="M150 251 L150 271" fill="none" stroke="#fca5a5" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

					<rect x="80" y="274" width="140" height="40" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
					<text x="150" y="294" textAnchor="middle" className="text-[11px] font-medium" fill="#b91c1c">
						Iterate on
					</text>
					<text x="150" y="307" textAnchor="middle" className="text-[11px] font-medium" fill="#b91c1c">
						Y solution...
					</text>

					{/* Loop arrow back up */}
					<path d="M80 294 Q30 294 30 200 Q30 105 80 105" fill="none" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowRed)" />
					<text x="18" y="196" textAnchor="middle" className="text-[9px] italic" fill="#f87171" transform="rotate(-90, 18, 196)">
						repeat
					</text>

					{/* === X PATH (right) === */}
					<text x="450" y="75" textAnchor="middle" className="text-[10px] font-bold uppercase" fill="#34d399" letterSpacing="0.05em">
						The Direct Path
					</text>

					<rect x="380" y="85" width="140" height="40" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
					<text x="450" y="105" textAnchor="middle" className="text-[11px]" fill="#047857">
						Describe the actual
					</text>
					<text x="450" y="118" textAnchor="middle" className="text-[11px]" fill="#047857">
						problem (X)
					</text>

					<path d="M450 125 L450 145" fill="none" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />

					<rect x="380" y="148" width="140" height="40" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
					<text x="450" y="168" textAnchor="middle" className="text-[11px]" fill="#047857">
						Explore solutions
					</text>
					<text x="450" y="181" textAnchor="middle" className="text-[11px]" fill="#047857">
						that fit the problem
					</text>

					<path d="M450 188 L450 208" fill="none" stroke="#6ee7b7" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />

					<rect x="380" y="211" width="140" height="44" rx="8" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="2" />
					<text x="450" y="238" textAnchor="middle" className="text-[12px] font-bold" fill="#047857">
						Problem solved
					</text>

					{/* Arrow markers */}
					<defs>
						<marker id="arrowGray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M0 0 L10 5 L0 10 z" fill="#d6d3d1" />
						</marker>
						<marker id="arrowRed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M0 0 L10 5 L0 10 z" fill="#fca5a5" />
						</marker>
						<marker id="arrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M0 0 L10 5 L0 10 z" fill="#6ee7b7" />
						</marker>
					</defs>
				</svg>
			</div>

			{/* Mobile layout */}
			<div className="md:hidden flex flex-col items-center gap-6">
				{/* Start */}
				<div className="bg-stone-100 border border-stone-300 rounded-lg px-4 py-2 text-xs font-medium text-stone-700 text-center">You have Problem X</div>

				<div className="flex flex-col gap-8 w-full">
					{/* Y Path */}
					<div className="flex flex-col items-center gap-2">
						<span className="text-[10px] font-bold uppercase tracking-wider text-red-400">The XY Path</span>
						<div className="relative flex flex-col items-center gap-2">
							<Step color="red" text="You assume Solution Y will work" />
							<ArrowDown color="red" />
							<Step color="red" text="Focus all effort on making Y work" />
							<ArrowDown color="red" />
							<Step color="red" text="Get stuck or realize Y doesn't solve X" />
							<ArrowDown color="red" />
							<Step color="red" text="Iterate on Y solution..." bold />
							{/* Loop indicator */}
							<div className="flex items-center gap-1 mt-1">
								<svg viewBox="0 0 20 20" className="w-4 h-4 text-red-300" aria-hidden="true">
									<path d="M10 2a8 8 0 11-5.3 14l1.4-1.4A6 6 0 1010 4v3L5 4l5-3v1z" fill="currentColor" />
								</svg>
								<span className="text-[10px] italic text-red-400">repeat</span>
							</div>
						</div>
					</div>

					{/* X Path */}
					<div className="flex flex-col items-center gap-2">
						<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">The Direct Path</span>
						<Step color="green" text="Describe the actual problem (X)" />
						<ArrowDown color="green" />
						<Step color="green" text="Explore solutions that fit the problem" />
						<ArrowDown color="green" />
						<div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg px-4 py-2 text-xs font-bold text-emerald-700 text-center w-44">
							Problem solved
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Step({ color, text, bold }: { color: "red" | "green"; text: string; bold?: boolean }) {
	const styles = {
		red: "bg-red-50 border-red-200 text-red-700",
		green: "bg-emerald-50 border-emerald-200 text-emerald-700",
	};
	return <div className={`${styles[color]} border rounded-lg px-3 py-2 text-xs text-center w-44 ${bold ? "font-bold" : "font-medium"}`}>{text}</div>;
}

function ArrowDown({ color }: { color: "red" | "green" }) {
	const fill = color === "red" ? "#fca5a5" : "#6ee7b7";
	return (
		<svg viewBox="0 0 12 20" className="w-3 h-4 shrink-0" aria-hidden="true">
			<path d="M6 0v16m0 0l-4-4m4 4l4-4" fill="none" stroke={fill} strokeWidth="1.5" />
		</svg>
	);
}
