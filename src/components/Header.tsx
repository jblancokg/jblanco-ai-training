import { Link } from "@tanstack/react-router";
import { Sun, Moon, Zap } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function Header() {
	const { isDark, toggle } = useDarkMode();

	return (
		<header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<div className="flex items-center gap-8">
					<Link to="/" className="flex items-center gap-2.5 group">
						{/* Warm gradient icon container */}
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-terracotta to-coral flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
							<Zap className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-lg tracking-tight">Dash</span>
					</Link>
					<nav className="hidden sm:flex items-center gap-1">
						<NavLink to="/" exact>Overview</NavLink>
						<NavLink to="/todos">Todos</NavLink>
						<NavLink to="/important-dates">Dates</NavLink>
					</nav>
				</div>
				<button
					onClick={toggle}
					aria-label="Toggle dark mode"
					className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 cursor-pointer"
				>
					{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
				</button>
			</div>
		</header>
	);
}

/**
 * Nav link with an active underline indicator instead of background fill.
 * Feels more editorial than the standard shadcn button approach.
 */
function NavLink({ to, exact, children }: { to: string; exact?: boolean; children: React.ReactNode }) {
	return (
		<Link to={to} activeOptions={exact ? { exact: true } : undefined}>
			{({ isActive }) => (
				<span
					className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
						isActive
							? "text-foreground"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					{children}
					{isActive && (
						<span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
					)}
				</span>
			)}
		</Link>
	);
}
