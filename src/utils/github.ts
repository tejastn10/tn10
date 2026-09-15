import { LEVEL_COUNT } from "@/constants/github";
import type { Contribution, ContributionData } from "@/data/github";

const fetchContributions = async (username: string, year: number): Promise<ContributionData> => {
	const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
	if (!res.ok) throw new Error("fetch failed");
	return res.json() as Promise<ContributionData>;
};

const groupIntoWeeks = (contributions: Contribution[]): Contribution[][] => {
	const result: Contribution[][] = [];
	for (let i = 0; i < contributions.length; i += 7) {
		result.push(contributions.slice(i, i + 7));
	}
	return result;
};

// GitHub's own API only buckets a day into 5 levels (0-4), so a 46-contribution day and a
// 15-contribution day both render as "level 4" and look identical. Rank-based bucketing (deciles,
// quartiles, etc.) doesn't fix this either — with only a handful of genuinely high-activity days
// in a year, the top bucket is still open-ended and swallows them all together. Instead, scale
// each day's count linearly against the year's own busiest day, so the single highest day always
// claims the top level and everything else is sized proportionally beneath it.
const applyRelativeLevels = (data: ContributionData): ContributionData => {
	const maxCount = Math.max(0, ...data.contributions.map((c) => c.count));
	if (maxCount === 0) return data;

	const bucketSize = maxCount / LEVEL_COUNT;

	const levelFor = (count: number): Contribution["level"] => {
		if (count === 0) return 0;
		return Math.min(LEVEL_COUNT, Math.ceil(count / bucketSize)) as Contribution["level"];
	};

	return {
		...data,
		contributions: data.contributions.map((c) => ({ ...c, level: levelFor(c.count) })),
	};
};

export { applyRelativeLevels, fetchContributions, groupIntoWeeks };
