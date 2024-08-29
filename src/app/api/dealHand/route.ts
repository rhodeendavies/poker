import { NextResponse } from "next/server";
import { Card, Suit } from "@/app/lib/card";
import { CreateDeck, ShuffledDeck } from "@/app/lib/utils";

let deck: Card[] = [];

export async function GET(request: Request) {
	if (request == null) return NextResponse.error();
	// get the hand size from the url parameters
	const { searchParams } = new URL(request.url);
	const handSizeParam = searchParams.get("handSize");
	const handSize = Number(handSizeParam);
	let hand: Card[] = [];
	// if the deck is empty or does not have enough cards for 1 hand
	if (deck.length == 0 || deck.length < handSize) {
		// create the deck and then shuffle it
		deck = CreateDeck();
		deck = ShuffledDeck(deck);
	}
	// take the first number of cards, equal to the hand size
	hand = deck.slice(0, handSize);
	deck = deck.slice(handSize);
	return NextResponse.json({ content: hand });
}