import { useEffect, useState } from "react";

// The full text renders invisibly in the same grid cell as the typed text, so the
// container is sized for the final text from the first frame and never grows.
export function TypeWriter({ text, speed = 20, onDone }: { text: string; speed?: number; onDone?: () => void }) {
	const [displayed, setDisplayed] = useState("");
	const [prevText, setPrevText] = useState(text);
	if (prevText !== text) {
		setPrevText(text);
		setDisplayed("");
	}
	const done = displayed === text;
	useEffect(() => {
		if (done) return;
		const t = setTimeout(() => {
			const next = text.slice(0, displayed.length + 1);
			setDisplayed(next);
			if (next === text) onDone?.();
		}, speed);
		return () => clearTimeout(t);
	}, [done, displayed, text, speed, onDone]);
	return (
		<span className="grid">
			<span aria-hidden="true" className="invisible col-start-1 row-start-1">
				{text}|
			</span>
			<span className="col-start-1 row-start-1">
				{displayed}
				{!done && <span className="animate-pulse text-orange-400">|</span>}
			</span>
		</span>
	);
}
