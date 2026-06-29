"use client";

import { Button } from "@/components/ui/button";
import { FloatingPaths } from "@/components/ui/floating-paths";
import { ChevronLeftIcon } from "lucide-react";

export function AuthLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
			<div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

				<div className="z-10 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-xl">
							&ldquo;This Platform has helped me to save time and serve my
							clients faster than ever before.&rdquo;
						</p>
						<footer className="font-mono font-semibold text-sm">
							~ Ali Hassan
						</footer>
					</blockquote>
				</div>
				<div className="absolute inset-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>
			<div className="relative flex min-h-screen flex-col justify-center px-8">
				<Button asChild className="absolute top-7 left-5" variant="ghost">
					<a href="#">
						<ChevronLeftIcon data-icon="inline-start" />
						Home
					</a>
				</Button>

				<div className="mx-auto pt-14 pb-6 sm:w-sm">
					{ children }
				</div>
			</div>
		</main>
	);
}
