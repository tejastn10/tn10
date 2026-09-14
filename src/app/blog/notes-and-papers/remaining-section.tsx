"use client";

import { type ChangeEvent, type FC, type MouseEvent, useMemo, useState } from "react";

import { BlurFade } from "@/components/animated/BlurFade";
import { Input } from "@/components/ui/Input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/Pagination";
import { POSTS_PER_PAGE } from "@/constants/blog";
import { BLUR_FADE_DELAY } from "@/constants/ui";
import { NoteCard } from "@/containers/NoteCard";

import type { Post } from "@/data/blog";

type NotesRemainingSectionProps = {
	remaining: Post[];
};

const NotesRemainingSection: FC<NotesRemainingSectionProps> = ({ remaining }) => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const filtered = useMemo(
		() =>
			remaining.filter((post) => post.metadata.title.toLowerCase().includes(search.toLowerCase())),
		[remaining, search]
	);

	const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
	const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

	const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value);
		setPage(1);
	};

	const handlePageChange = ({
		e,
		newPage,
	}: {
		e: MouseEvent<HTMLAnchorElement>;
		newPage: number;
	}): void => {
		e.preventDefault();
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	return (
		<>
			<BlurFade delay={BLUR_FADE_DELAY * 8} className="border-t border-border pt-8 mt-8 block">
				<span className="section-label">[ All ]</span>
				<h2 className="font-bold text-3xl mb-8 tracking-tighter">All Notes & Papers</h2>
			</BlurFade>

			<BlurFade delay={BLUR_FADE_DELAY * 10} className="flex w-full items-center mb-8 gap-2">
				<Input
					type="text"
					placeholder="Search notes & papers..."
					value={search}
					onChange={handleOnSearchChange}
				/>
			</BlurFade>

			<BlurFade delay={BLUR_FADE_DELAY * 12}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{paginated.length > 0 ? (
						paginated.map((post, id) => (
							<BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
								<NoteCard
									slug={post.slug}
									title={post.metadata.title}
									description={post.metadata.description}
									type={post.slug.startsWith("papers/") ? "Paper" : "Note"}
									author={post.metadata.author}
									readingStatus={post.metadata.readingStatus}
								/>
							</BlurFade>
						))
					) : (
						<BlurFade delay={BLUR_FADE_DELAY * 12} className="col-span-1 md:col-span-2">
							<p className="text-muted-foreground text-center py-8">
								No notes or papers found. Check back later!
							</p>
						</BlurFade>
					)}
				</div>
			</BlurFade>

			{totalPages > 1 && (
				<BlurFade delay={BLUR_FADE_DELAY * 14} className="pb-12 md:pb-0">
					<Pagination className="mt-6">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={(e) => handlePageChange({ e, newPage: page - 1 })}
								/>
							</PaginationItem>
							{Array.from({ length: totalPages }, (_, i) => {
								const pageNumber = i + 1;
								return (
									<PaginationItem key={`page-${pageNumber}`}>
										<PaginationLink
											href="#"
											isActive={page === pageNumber}
											onClick={(e) => handlePageChange({ e, newPage: pageNumber })}
										>
											{pageNumber}
										</PaginationLink>
									</PaginationItem>
								);
							})}
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={(e) => handlePageChange({ e, newPage: page + 1 })}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</BlurFade>
			)}
		</>
	);
};

export { NotesRemainingSection };
