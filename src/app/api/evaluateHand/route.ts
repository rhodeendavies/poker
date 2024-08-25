import { Card, Suit } from '@/app/lib/card';
import { RankNumberToRankString } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { evalHand } from 'poker-evaluator';

export async function POST(request: NextRequest) {
	const hand: Card[] = await request.json();
	const handString = hand.map(x => `${RankNumberToRankString(x.rank, true)}${SuitToSuitString(x.suit)}`);
	return NextResponse.json({ content: evalHand(handString) });
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
