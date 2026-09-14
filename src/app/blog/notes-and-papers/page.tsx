import type { JSX } from "react";
import { BentoCard, type BentoCardProps, BentoGrid } from "@/components/animated/BentoGrid";
import { BlurFade } from "@/components/animated/BlurFade";
import { BoxReveal } from "@/components/animated/BoxReveal";

import { getLogo } from "@/components/icons/Icons";
import { BLUR_FADE_DELAY, BOX_REVEAL_DURATION } from "@/constants/ui";

import { POST_SLICE_NUMBER } from "@/constants/values";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/utils/date";
import { NotesRemainingSection } from "./remaining-section";

export const metadata = {
	title: "Notes & Papers",
	description:
		"Working notes on technical books and research papers I'm reading — O'Reilly-style deep dives and paper summaries, updated as I go.",
};

const isNoteOrPaper = (slug: string): boolean =>
	slug.startsWith("notes/") || slug.startsWith("papers/");

const NotesAndPapersPage = async (): Promise<JSX.Element> => {
	const allPosts = await getBlogPosts();
	const posts = allPosts
		.filter((post) => isNoteOrPaper(post.slug))
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
		);

	const featuredPosts: BentoCardProps[] = posts.slice(0, POST_SLICE_NUMBER).map((post, index) => ({
		name: post.slug.startsWith("papers/") ? "Paper" : "Note",
		className:
			index % 4 === 0 || index % 4 === 3 ? "col-span-3 lg:col-span-2" : "col-span-3 lg:col-span-1",
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
				<span className="section-label">[ Featured ]</span>
				<h2 className="font-bold text-3xl mb-4 tracking-tighter">Featured</h2>
			</BlurFade>

			{featuredPosts.length > 0 ? (
				<BlurFade delay={BLUR_FADE_DELAY * 4}>
					<BentoGrid className="auto-rows-[14rem]">
						{featuredPosts.map((post) => (
							<BentoCard key={post.description} {...post} />
						))}
					</BentoGrid>
				</BlurFade>
			) : (
				<BlurFade delay={BLUR_FADE_DELAY * 4}>
					<p className="text-muted-foreground text-center py-8">
						No notes or papers yet. Check back later!
					</p>
				</BlurFade>
			)}

			<NotesRemainingSection remaining={remainingPosts} />
		</section>
	);
};

export default NotesAndPapersPage;
