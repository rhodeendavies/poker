import { Card } from '@/app/lib/card';
import { EvaluateHand } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const hand: Card[] = await request.json();
	return NextResponse.json({ content: EvaluateHand(hand) });
}