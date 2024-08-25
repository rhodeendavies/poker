import { NextResponse } from "next/server";
import { GET, ShuffledDeck, CreateDeck } from "./route";
import { Card, Suit } from "../../lib/card";

jest.mock("next/server", () => ({
	NextResponse: {
		json: jest.fn(),
		error: jest.fn()
	}
}));

describe("GET function", () => {
	let request: Request;

	beforeEach(() => {
		request = {
			url: "http://localhost:3000/api?handSize=5"
		} as Request;

		jest.clearAllMocks();
	});

	it("should return error if request is null", async () => {
		// act
		const response = await GET(null as any);

		// assert
		expect(NextResponse.error).toHaveBeenCalled();
	});

	it("should create a deck, shuffle it, and return a hand of specified size", async () => {
		// act
		const response = await GET(request);
		const responseData = (NextResponse.json as jest.Mock).mock.calls[0][0].content;

		// assert
		expect(NextResponse.json).toHaveBeenCalled();
		expect(responseData).toHaveLength(5);
		expect(responseData[0]).toHaveProperty('rank');
		expect(responseData[0]).toHaveProperty('suit');
		expect(responseData[0]).toHaveProperty('id');
	});

	it("should shuffle the deck when it is empty or smaller than handSize", async () => {
		// act
		const response = await GET(request);
		const firstResponseData = (NextResponse.json as jest.Mock).mock.calls[0][0].content;
		// assert
		expect(NextResponse.json).toHaveBeenCalled();

		// Call GET again to see if it uses the remaining deck and not reshuffle until needed
		// act
		const response2 = await GET(request);
		const secondResponseData = (NextResponse.json as jest.Mock).mock.calls[1][0].content;
		// assert
		expect(NextResponse.json).toHaveBeenCalledTimes(2);
		expect(firstResponseData).not.toEqual(secondResponseData);
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