export function RankNumberToRankString(rank: number): string {
	if (rank < 11) return `${rank}`;
	switch (rank) {
		case 11:
			return "J";
		case 12:
			return "Q";
		case 13:
			return "K";
		default:
			return "";
	}
}