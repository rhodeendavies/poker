import { NextResponse } from "next/server";
import { Card, Suit } from "@/app/lib/card";
import { CreateDeck, ShuffledDeck } from "@/app/lib/utils";

let deck: Card[] = [];

export async function GET(request: Request) {
	if (request == null) return NextResponse.error();

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