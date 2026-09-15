import Link from "next/link";
import type { FC } from "react";
import { Icons } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/Badge";
import { DATA } from "@/data/resume";

const WorkbenchShowcase: FC = () => {
	const { title, tagline, href, site, highlights, technologies } = DATA.workbench;

	return (
		<div className="border border-border bg-card p-8 space-y-6">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div className="space-y-2 max-w-xl">
					<div className="flex items-center gap-2.5">
						{Icons.gear({ className: "size-5" })}
						<h3 className="font-mono text-lg font-semibold tracking-wide">{title}</h3>
					</div>
					<p className="text-base text-muted-foreground leading-relaxed">{tagline}</p>
				</div>

				<div className="flex items-center gap-5 shrink-0">
					{site && (
						<Link
							href={site}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Workbench docs"
							title="Docs"
							className="animate-glow-icon text-foreground"
						>
							{Icons.reader({ className: "size-6" })}
						</Link>
					)}
					<Link
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Workbench repository"
						title="Repository"
						className="text-muted-foreground hover:text-foreground transition-colors duration-200"
					>
						{Icons.github({ className: "size-6" })}
					</Link>
				</div>
			</div>

			<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{highlights.map((highlight) => (
					<li
						key={highlight}
						className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
					>
						<span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
						{highlight}
					</li>
				))}
			</ul>

			<div className="flex flex-wrap gap-2 pt-1">
				{technologies.map((tech) => (
					<Badge key={tech} variant="outline" noHover className="font-mono text-xs">
						{tech}
					</Badge>
				))}
			</div>
		</div>
	);
};

export { WorkbenchShowcase };
