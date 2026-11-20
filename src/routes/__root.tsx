import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createRootRoute({
	component: function RootLayout() {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="max-w-6xl mx-auto px-6 py-8">
					<Outlet />
				</main>
			</div>
		);
	},
});
