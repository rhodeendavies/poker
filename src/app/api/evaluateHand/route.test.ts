import { NextResponse } from 'next/server';
import { POST, SuitToSuitString } from './route';
import { Card, Suit } from '@/app/lib/card';
import { RankNumberToRankString } from '@/app/lib/utils';
import { evalHand } from 'poker-evaluator';

jest.mock('next/server', () => ({
	NextResponse: {
		json: jest.fn(),
	},
}));

jest.mock('../../lib/utils', () => ({
	RankNumberToRankString: jest.fn(),
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
		(RankNumberToRankString as jest.Mock).mockImplementation((rank: number) => rank.toString());
		(evalHand as jest.Mock).mockReturnValue({ value: 42 });

		// act
		await POST(request);

		// assert
		expect(RankNumberToRankString).toHaveBeenCalledTimes(hand.length);
		expect(evalHand).toHaveBeenCalledWith(['1s', '13h', '10d', '5c', '7s']);
		expect(NextResponse.json).toHaveBeenCalledWith({ content: { value: 42 } });
	});
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
