import { Card, Suit } from "./card";

export function GetSuitUnicode(suit: Suit): string {
	switch (suit) {
		case Suit.clubs:
			return "\u2663";
		case Suit.hearts:
			return "\u2665";
		case Suit.diamonds:
			return "\u2666";
		case Suit.spades:
			return "\u2660";
		default:
			return "";
	}
}

export function RankNumberToRankString(rank: number, forPokerEval: boolean): string {
	if (rank > 1 && rank < 10) return `${rank}`;
	switch (rank) {
		case 1:
			return "A";
		case 10:
			return forPokerEval ? "T" : "10";
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

export function GetCardFace(card: Card): { src: string, alt: string } {
	let src = "";
	let alt = "";
	switch (card.suit) {
		case Suit.spades:
			switch (card.rank) {
				case 11:
					src = "/JackSpades.svg";
					alt = "Jack of Spades";
					break;
				case 12:
					src = "/QueenSpades.svg";
					alt = "Queen of Spades";
					break;
				case 13:
					src = "/KingSpades.svg";
					alt = "King of Spades";
					break;
				default:
					break;
			}
			break;
		case Suit.hearts:
			switch (card.rank) {
				case 11:
					src = "/JackHearts.svg";
					alt = "Jack of Hearts";
					break;
				case 12:
					src = "/QueenHearts.svg";
					alt = "Queen of Hearts";
					break;
				case 13:
					src = "/KingHearts.svg";
					alt = "King of Hearts";
					break;
				default:
					break;
			}
			break;
		case Suit.clubs:
			switch (card.rank) {
				case 11:
					src = "/JackClubs.svg";
					alt = "Jack of Clubs";
					break;
				case 12:
					src = "/QueenClubs.svg";
					alt = "Queen of Clubs";
					break;
				case 13:
					src = "/KingClubs.svg";
					alt = "King of Clubs";
					break;
				default:
					break;
			}
			break;
		case Suit.diamonds:
			switch (card.rank) {
				case 11:
					src = "/JackDiamonds.svg";
					alt = "Jack of Diamonds";
					break;
				case 12:
					src = "/QueenDiamonds.svg";
					alt = "Queen of Diamonds";
					break;
				case 13:
					src = "/KingDiamonds.svg";
					alt = "King of Diamonds";
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}

	return { src: src, alt: alt }
}