import { NextResponse } from "next/server";
import * as PokerEvaluator from 'poker-evaluator-ts';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const handParam = searchParams.get("hand");
	const hand = handParam?.split(",") ?? [];
	return NextResponse.json({ content: hand });

	return NextResponse.json({ content: PokerEvaluator.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h']) });
}

