import { Card, EvaluatedHand, Suit } from "./card";
import PokerHand from "poker-hand-evaluator";

/**
 * GetSuitUnicode
 * @param {Suit} suit - The suit
 * @return {string}  return the unicode representation of the suit
 */
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

/**
 * GetCardFace
 * @param {Card} card - The card
 * @return {{ src: string, alt: string}} returns the source of the image and the accompanying alternative text
 */
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

/**
 * ShuffledDeck
 * @param {Card[]} deck - The deck, consisting of an array of Cards
 * @return {Card[]} returns the shuffled deck
 */
export function ShuffledDeck(deck: Card[]): Card[] {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

/**
 * CreateDeck
 * @return {Card[]} returns a deck of 52 cards, ordered by suit (spades, hearts, clubs, diamons) and by rank from 2 to Ace
 */
export function CreateDeck(): Card[] {
	const deck: Card[] = [];
	const suits: Suit[] = [Suit.spades, Suit.hearts, Suit.clubs, Suit.diamonds];
	for (let rank = 2; rank <= 14; rank++) {
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

/**
 * RankNumberToRankString
 * @param {number} rank - The rank of the card (0-14)
 * @param {boolean} forEval - Set to true if result is used by poker-hand-evaluator
 * @return {string} returns a string representation of the card rank
 */
export function RankNumberToRankString(rank: number, forEval: boolean): string {
	if (rank < 10 || (rank == 10 && !forEval)) return `${rank}`;
	switch (rank) {
		case 10:
			return "T";
		case 11:
			return "J";
		case 12:
			return "Q";
		case 13:
			return "K";
		case 14:
			return "A";
		default:
			return "";
	}
}

/**
 * RankNumberToRankString
 * @param {Card[]} hand - An array of cards, currently supported hand size of 5 cards
 * @return {EvaluatedHand | null} returns the evaluated result of the hand, or null if the hand size is invalid
 */
export function EvaluateHand(hand: Card[]): EvaluatedHand | null {
	if (hand.length != 5) return null;

	const pokerHand = new PokerHand(hand.reduce((total, curr) => {
		return `${total} ${RankNumberToRankString(curr.rank, true)}${(curr.suit.toString()[0].toUpperCase())}`
	}, ""));

	const value = pokerHand.getScore() * -1;
	const result = pokerHand.getRank().replace(/_/g, " ");

	return {
		value: value,
		result: result
	}
}