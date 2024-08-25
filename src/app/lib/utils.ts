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

export function ShuffledDeck(deck: Card[]): Card[] {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

export function CreateDeck(): Card[] {
	const deck: Card[] = [];
	const suits: Suit[] = [Suit.spades, Suit.hearts, Suit.clubs, Suit.diamonds];
	for (let rank = 1; rank <= 13; rank++) {
		suits.forEach(suit => {
			deck.push({
				rank: rank,
				suit: suit,
				id: `${rank}${suit}`
			});
		});
	}
	return deck;
}

export function SuitToSuitString(suit: Suit): string {
	switch (suit) {
		case Suit.clubs:
			return "c";
		case Suit.hearts:
			return "h";
		case Suit.diamonds:
			return "d";
		case Suit.spades:
			return "s";
		default:
			return "";
	}
}
