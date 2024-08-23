export type Card = {
	suit: Suit,
	rank: number,
	id: string
}

export enum Suit {
	spade = "s",
	heart = "h",
	clover = "c",
	diamond = "d"
}