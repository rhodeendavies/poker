import { Suit } from "./card";
import { CreateDeck, GetCardFace, GetSuitUnicode, RankNumberToRankString, ShuffledDeck, SuitToSuitString } from "./utils";

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
			[1, "A"],
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
			[1, "A"],
			[2, "2"],
			[3, "3"],
			[10, "T"],
			[11, "J"],
			[12, "Q"],
			[13, "K"],
		]
	)("returns the correct rank string for %i for the poker eval function", (rank, expected) => {
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

describe('SuitToSuitString function', () => {
	it('should return the correct suit string for each suit', () => {
		expect(SuitToSuitString(Suit.clubs)).toBe('c');
		expect(SuitToSuitString(Suit.hearts)).toBe('h');
		expect(SuitToSuitString(Suit.diamonds)).toBe('d');
		expect(SuitToSuitString(Suit.spades)).toBe('s');
	});

	it('should return an empty string for an unknown suit', () => {
		expect(SuitToSuitString('unknown' as Suit)).toBe('');
	});
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