import { NextResponse } from 'next/server';
import { POST } from './route';
import { Card, Suit } from '@/app/lib/card';
import { RankNumberToRankString } from '@/app/lib/utils';
import { evalHand } from 'poker-evaluator';

jest.mock('next/server', () => ({
	NextResponse: {
		json: jest.fn(),
	},
}));

jest.mock('poker-evaluator', () => ({
	evalHand: jest.fn(),
}));

describe('POST function', () => {
	let request: any;

	beforeEach(() => {
		request = {
			json: jest.fn(),
		} as unknown as Request;

		jest.clearAllMocks();
	});

	it('should convert the hand to a string representation and evaluate it', async () => {
		// arrange
		const hand: Card[] = [
			{ rank: 1, suit: Suit.spades, id: '1s' },
			{ rank: 13, suit: Suit.hearts, id: '13h' },
			{ rank: 10, suit: Suit.diamonds, id: '10d' },
			{ rank: 5, suit: Suit.clubs, id: '5c' },
			{ rank: 7, suit: Suit.spades, id: '7s' },
		];

		request.json.mockResolvedValue(hand);
		(evalHand as jest.Mock).mockReturnValue({ value: 42 });

		// act
		await POST(request);

		// assert
		expect(evalHand).toHaveBeenCalledWith(['As', 'Kh', 'Td', '5c', '7s']);
		expect(NextResponse.json).toHaveBeenCalledWith({ content: { value: 42 } });
	});
});

