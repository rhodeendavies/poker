import { NextResponse } from "next/server";
import { Card, Suit } from "../../lib/card";

export async function GET(request: Request): Promise<NextResponse<
	{ content: Card[]; }>> {
	const { searchParams } = new URL(request.url);
	const handSizeParam = searchParams.get("handSize");
	const handSize = Number(handSizeParam);
	const deck = GetShuffledDeck();
	return NextResponse.json({ content: deck.slice(0, handSize) });
}

export function GetShuffledDeck(): Card[] {
	const deck = CreateDeck();
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

export function CreateDeck(): Card[] {
	const deck: Card[] = [];
	const suits: Suit[] = [Suit.spade, Suit.heart, Suit.clover, Suit.diamond];
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