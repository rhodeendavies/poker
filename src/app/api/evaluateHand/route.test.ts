import { NextResponse } from 'next/server';
import { POST } from './route';
import { Suit } from '@/app/lib/card';
import * as Utils from '@/app/lib/utils';

jest.mock('next/server', () => ({
	NextResponse: {
		json: jest.fn(),
	},
}));

jest.mock('../../lib/utils', () => {
	return {
		__esModule: true,
		...jest.requireActual('../../lib/utils')
	};
});

describe('POST function', () => {
	let request: any;

	beforeEach(() => {
		request = {
			json: jest.fn(),
		} as unknown as Request;

		jest.clearAllMocks();
	});

	it("should return the correct hand eval", async () => {
		// arrange
		request.json.mockResolvedValue([
			{ rank: 14, suit: Suit.spades, id: '1s' },
			{ rank: 13, suit: Suit.hearts, id: '13h' },
			{ rank: 10, suit: Suit.diamonds, id: '10d' },
			{ rank: 5, suit: Suit.clubs, id: '5c' },
			{ rank: 7, suit: Suit.spades, id: '7s' },
		]);
		jest.spyOn(Utils, "EvaluateHand").mockReturnValue({
			result: "High Card",
			value: 1
		});

		// act
		await POST(request);

		// assert
		expect(NextResponse.json).toHaveBeenCalledWith({
			content: {
				result: "High Card",
				value: 1
			}
		});
	});
});

