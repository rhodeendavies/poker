import { NextResponse } from "next/server";
import { Card, Suit } from "../../lib/card";

let deck: Card[] = [];

export async function GET(request: Request): Promise<NextResponse<
	{ content: Card[]; }>> {
	const { searchParams } = new URL(request.url);
	const handSizeParam = searchParams.get("handSize");
	const handSize = Number(handSizeParam);
	let hand: Card[] = [];
	if (deck.length == 0 || deck.length < handSize) {
		deck = CreateDeck();
		deck = ShuffledDeck(deck);
	}
	hand = deck.slice(0, handSize);
	deck = deck.slice(handSize);
	return NextResponse.json({ content: hand });
}

function ShuffledDeck(deck: Card[]): Card[] {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

function CreateDeck(): Card[] {
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