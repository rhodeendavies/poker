export type Card = {
	suit: Suit,
	rank: number,
	id: string
}

export enum Suit {
	spades = "spades",
	hearts = "hearts",
	clubs = "clubs",
	diamonds = "diamonds"
}

export class EvaluatedHand {
	value: number = 0;
	result: string = "";
}