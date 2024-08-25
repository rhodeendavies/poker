import { NextResponse } from "next/server";
import { GET } from "./route";

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

