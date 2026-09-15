type Contribution = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

type ContributionData = {
	contributions: Contribution[];
	total: Record<string, number>;
};

export type { Contribution, ContributionData };
