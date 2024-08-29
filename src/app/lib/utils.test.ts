import { Suit } from "./card";
import { CreateDeck, EvaluateHand, GetCardFace, GetSuitUnicode, RankNumberToRankString, ShuffledDeck } from "./utils";

describe("GetSuitUnicode", () => {
	test.each(
		[
			[Suit.clubs, "\u2663"],
			[Suit.hearts, "\u2665"],
			[Suit.diamonds, "\u2666"],
			[Suit.spades, "\u2660"]
		]
	)("returns the correct unicode for %i", (suit, expected) => {
		expect(GetSuitUnicode(suit)).toBe(expected)
	});
});

describe("RankNumberToRankString", () => {
	test.each(
		[
			[14, "A"],
			[2, "2"],
			[3, "3"],
			[10, "10"],
			[11, "J"],
			[12, "Q"],
			[13, "K"],
		]
	)("returns the correct rank string for %i for the frontend", (rank, expected) => {
		expect(RankNumberToRankString(rank, false)).toBe(expected)
	});

	test.each(
		[
			[14, "A"],
			[2, "2"],
			[3, "3"],
			[10, "T"],
			[11, "J"],
			[12, "Q"],
			[13, "K"],
		]
	)("returns the correct rank string for %i for the eval function", (rank, expected) => {
		expect(RankNumberToRankString(rank, true)).toBe(expected)
	});
});


describe("GetCardFace", () => {
	test.each(
		[
			[{
				suit: Suit.clubs,
				rank: 11,
				id: "11C"
			}, {
				src: "/JackClubs.svg",
				alt: "Jack of Clubs"
			}], [{
				suit: Suit.hearts,
				rank: 11,
				id: "11H"
			}, {
				src: "/JackHearts.svg",
				alt: "Jack of Hearts"
			}], [{
				suit: Suit.diamonds,
				rank: 11,
				id: "11D"
			}, {
				src: "/JackDiamonds.svg",
				alt: "Jack of Diamonds"
			}], [{
				suit: Suit.spades,
				rank: 11,
				id: "11S"
			}, {
				src: "/JackSpades.svg",
				alt: "Jack of Spades"
			}], [{
				suit: Suit.clubs,
				rank: 12,
				id: "12C"
			}, {
				src: "/QueenClubs.svg",
				alt: "Queen of Clubs"
			}], [{
				suit: Suit.hearts,
				rank: 12,
				id: "12H"
			}, {
				src: "/QueenHearts.svg",
				alt: "Queen of Hearts"
			}], [{
				suit: Suit.diamonds,
				rank: 12,
				id: "12D"
			}, {
				src: "/QueenDiamonds.svg",
				alt: "Queen of Diamonds"
			}], [{
				suit: Suit.spades,
				rank: 12,
				id: "12S"
			}, {
				src: "/QueenSpades.svg",
				alt: "Queen of Spades"
			}], [{
				suit: Suit.clubs,
				rank: 13,
				id: "13C"
			}, {
				src: "/KingClubs.svg",
				alt: "King of Clubs"
			}], [{
				suit: Suit.hearts,
				rank: 13,
				id: "13H"
			}, {
				src: "/KingHearts.svg",
				alt: "King of Hearts"
			}], [{
				suit: Suit.diamonds,
				rank: 13,
				id: "13D"
			}, {
				src: "/KingDiamonds.svg",
				alt: "King of Diamonds"
			}], [{
				suit: Suit.spades,
				rank: 13,
				id: "13S"
			}, {
				src: "/KingSpades.svg",
				alt: "King of Spades"
			}], [{
				suit: Suit.clubs,
				rank: 1,
				id: "1C"
			}, {
				src: "",
				alt: ""
			}], [{
				suit: Suit.hearts,
				rank: 1,
				id: "1H"
			}, {
				src: "",
				alt: ""
			}], [{
				suit: Suit.diamonds,
				rank: 1,
				id: "1D"
			}, {
				src: "",
				alt: ""
			}], [{
				suit: Suit.spades,
				rank: 1,
				id: "1S"
			}, {
				src: "",
				alt: ""
			}]
		]
	)("returns the correct image for %i", (card, expected) => {
		expect(GetCardFace(card)).toStrictEqual(expected)
	})
});

describe("ShuffledDeck function", () => {
	it("should shuffle the deck", () => {
		// arrange
		const originalDeck = CreateDeck();

		// act
		const shuffledDeck = ShuffledDeck([...originalDeck]);

		// assert
		expect(shuffledDeck).toHaveLength(originalDeck.length);
		expect(shuffledDeck).not.toEqual(originalDeck);
	});
});

describe("CreateDeck function", () => {
	it("should create a deck of 52 cards", () => {
		// act
		const deck = CreateDeck();

		// assert
		expect(deck).toHaveLength(52);
	});

	it("should have 13 cards of each suit", () => {
		const suitsCount = {
			[Suit.spades]: 0,
			[Suit.hearts]: 0,
			[Suit.clubs]: 0,
			[Suit.diamonds]: 0,
		};

		// act
		const deck = CreateDeck();
		deck.forEach(card => suitsCount[card.suit]++);

		// assert
		Object.values(suitsCount).forEach(count => {
			expect(count).toBe(13);
		});
	});
});

describe("EvaluateHand", () => {
	test.each(
		[
			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 13, suit: Suit.hearts, id: '13h' },
				{ rank: 10, suit: Suit.diamonds, id: '10d' },
				{ rank: 5, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "HIGH CARD",
				value: -6280
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 14, suit: Suit.hearts, id: '13h' },
				{ rank: 10, suit: Suit.diamonds, id: '10d' },
				{ rank: 5, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "ONE PAIR",
				value: -3476
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 14, suit: Suit.hearts, id: '13h' },
				{ rank: 10, suit: Suit.diamonds, id: '10d' },
				{ rank: 10, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "TWO PAIRS",
				value: -2506
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 14, suit: Suit.hearts, id: '13h' },
				{ rank: 14, suit: Suit.diamonds, id: '10d' },
				{ rank: 5, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "THREE OF A KIND",
				value: -1662
			}],

			[[
				{ rank: 3, suit: Suit.spades, id: '1s' },
				{ rank: 4, suit: Suit.hearts, id: '13h' },
				{ rank: 5, suit: Suit.diamonds, id: '10d' },
				{ rank: 6, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "STRAIGHT",
				value: -1607
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 12, suit: Suit.spades, id: '13h' },
				{ rank: 10, suit: Suit.spades, id: '10d' },
				{ rank: 5, suit: Suit.spades, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "FLUSH",
				value: -537
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 14, suit: Suit.hearts, id: '13h' },
				{ rank: 10, suit: Suit.diamonds, id: '10d' },
				{ rank: 10, suit: Suit.clubs, id: '5c' },
				{ rank: 10, suit: Suit.spades, id: '7s' },
			], {
				result: "FULL HOUSE",
				value: -215
			}],

			[[
				{ rank: 14, suit: Suit.spades, id: '1s' },
				{ rank: 14, suit: Suit.hearts, id: '13h' },
				{ rank: 14, suit: Suit.diamonds, id: '10d' },
				{ rank: 14, suit: Suit.clubs, id: '5c' },
				{ rank: 7, suit: Suit.spades, id: '7s' },
			], {
				result: "FOUR OF A KIND",
				value: -17
			}],

			[[
				{ rank: 2, suit: Suit.spades, id: '1s' },
				{ rank: 3, suit: Suit.spades, id: '13h' },
				{ rank: 4, suit: Suit.spades, id: '10d' },
				{ rank: 5, suit: Suit.spades, id: '5c' },
				{ rank: 6, suit: Suit.spades, id: '7s' },
			], {
				result: "STRAIGHT FLUSH",
				value: -9
			}],

			[[
				{ rank: 10, suit: Suit.hearts, id: '1s' },
				{ rank: 11, suit: Suit.hearts, id: '13h' },
				{ rank: 12, suit: Suit.hearts, id: '10d' },
				{ rank: 13, suit: Suit.hearts, id: '5c' },
				{ rank: 14, suit: Suit.hearts, id: '7s' },
			], {
				result: "ROYAL FLUSH",
				value: -1
			}]
		]
	)("should return the correct hand eval", async (hand, expected) => {
		// act
		const result = EvaluateHand(hand);

		// assert
		expect(result).toStrictEqual(expected);
	})

})