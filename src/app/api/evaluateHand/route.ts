import { Card, Suit } from '@/app/lib/card';
import { RankNumberToRankString, SuitToSuitString } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { evalHand } from 'poker-evaluator';

export async function POST(request: NextRequest) {
	const hand: Card[] = await request.json();
	const handString = hand.map(x => `${RankNumberToRankString(x.rank, true)}${SuitToSuitString(x.suit)}`);
	return NextResponse.json({
		content: evalHand(handString),
		headers: {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": ["POST"]
			},
		},
	});
}