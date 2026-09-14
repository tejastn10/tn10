import Link from "next/link";
import type { JSX } from "react";
import { BentoCard, type BentoCardProps, BentoGrid } from "@/components/animated/BentoGrid";
import { BlurFade } from "@/components/animated/BlurFade";
import { BoxReveal } from "@/components/animated/BoxReveal";

import { getLogo, Icons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { BLUR_FADE_DELAY, BOX_REVEAL_DURATION } from "@/constants/ui";

import { POST_SLICE_NUMBER } from "@/constants/values";
import { NoteCard } from "@/containers/NoteCard";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/utils/date";
import { RemainingSection } from "./remaining-section";

const NOTES_PREVIEW_COUNT = 2;

export const metadata = {
	title: "Blog",
	description:
		"Welcome to my blog! Here, you will find my thoughts on software development, life, and anything else that comes to mind.",
};

const isNoteOrPaper = (slug: string): boolean =>
	slug.startsWith("notes/") || slug.startsWith("papers/");

const BlogPage = async (): Promise<JSX.Element> => {
	const allPosts = await getBlogPosts();
	const posts = allPosts.filter((post) => !isNoteOrPaper(post.slug));
	const notesAndPapers = allPosts
		.filter((post) => isNoteOrPaper(post.slug))
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		);

	const recentPosts: BentoCardProps[] = posts
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, POST_SLICE_NUMBER)
		.map((post, index) => ({
			name: post.metadata.about,
			className:
				index % 4 === 0 || index % 4 === 3
					? "col-span-3 lg:col-span-2"
					: "col-span-3 lg:col-span-1",
			Icon: getLogo(post.metadata.about),
			description: post.metadata.title,
			subDescription: formatDate(post.metadata.publishedAt, true),
			href: `/blog/${post.slug}`,
			cta: "Read",
		}));

	const remainingPosts = posts.slice(POST_SLICE_NUMBER);

	return (
		<section>
			<BlurFade delay={BLUR_FADE_DELAY}>
				<BoxReveal duration={BOX_REVEAL_DURATION}>
					<h1 className="font-bold text-6xl mb-4 tracking-tighter">{metadata.title}</h1>
				</BoxReveal>
				<BoxReveal duration={BOX_REVEAL_DURATION * 1.2}>
					<h3 className="text-sm text-muted-foreground pb-6">{metadata.description}</h3>
				</BoxReveal>
			</BlurFade>

			<BlurFade delay={BLUR_FADE_DELAY * 2}>
				<span className="section-label">[ Recent ]</span>
				<h2 className="font-bold text-3xl mb-4 tracking-tighter">Recent Posts</h2>
			</BlurFade>

			<BlurFade delay={BLUR_FADE_DELAY * 4}>
				<BentoGrid className="auto-rows-[14rem]">
					{recentPosts.map((post) => (
						<BentoCard key={post.description} {...post} />
					))}
				</BentoGrid>
			</BlurFade>

			{notesAndPapers.length > 0 && (
				<BlurFade delay={BLUR_FADE_DELAY * 6} className="border-t border-border pt-8 mt-8 block">
					<div className="flex items-end justify-between mb-8 gap-4">
						<div>
							<span className="section-label">[ Notes & Papers ]</span>
							<h2 className="font-bold text-3xl tracking-tighter">Book Notes & Research Papers</h2>
						</div>
						<Button variant="outline" size="sm" asChild className="shrink-0 group/cta">
							<Link href="/blog/notes-and-papers">
								View All
								<span className="transition-transform duration-200 group-hover/cta:translate-x-1 inline-block">
									{Icons.chevron()}
								</span>
							</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{notesAndPapers.slice(0, NOTES_PREVIEW_COUNT).map((post, index) => (
							<BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 7 + index * 0.05}>
								<NoteCard
									slug={post.slug}
									title={post.metadata.title}
									description={post.metadata.description}
									type={post.slug.startsWith("papers/") ? "Paper" : "Note"}
									author={post.metadata.author}
									readingStatus={post.metadata.readingStatus}
								/>
							</BlurFade>
						))}
					</div>
				</BlurFade>
			)}

			<RemainingSection remaining={remainingPosts} />
		</section>
	);
};

export default BlogPage;
