import '@testing-library/jest-dom';
import Game from '@/app/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Card, Suit } from '@/app/lib/card';
import { EvaluatedHand } from "poker-evaluator/lib/types";
import React from 'react';

// Mock the fetch function globally
const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as jest.Mock;
jest.spyOn(console, "error").mockImplementation();

describe('Game Component', () => {
	it('renders correctly', () => {
		// act
		render(<Game />);

		// assert
		expect(screen.getByText('Poker')).toBeInTheDocument();
		expect(screen.getByLabelText('Hand size')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Deal hand/i })).toBeInTheDocument();
	});
});

describe('Hand size selection', () => {
	it('allows the user to change the hand size', () => {
		// act
		render(<Game />);
		const select = screen.getByLabelText('Hand size') as HTMLSelectElement;
		fireEvent.change(select, { target: { value: '7' } });

		// assert
		expect(select.value).toBe('7');
	});
});

describe('Deal hand functionality', () => {
	afterEach(() => {
		mockFetch.mockClear();
	});

	it('fetches and displays a new hand when the button is clicked', async () => {
		// arrange
		const mockHand: Card[] = [
			{ id: 'AS', rank: 1, suit: Suit.spades },
			{ id: '2H', rank: 2, suit: Suit.hearts }
		];
		const mockEvaluation: EvaluatedHand = {
			handName: 'high card',
			value: 10,
			handRank: 0,
			handType: 0
		};

		// Mock fetch responses
		mockFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ content: mockHand })
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ content: mockEvaluation })
			});

		// act
		render(<Game />);
		const dealButton = screen.getByRole('button', { name: /Deal hand/i });
		fireEvent.click(dealButton);

		// assert
		await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
		expect(screen.getByText('high card!')).toBeInTheDocument();
	});

	it('handles API errors gracefully', async () => {
		// arrange
		// Mock failed fetch response
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: 'Server error',
			json: async () => ({ error: 'Shuffling failed' })
		});

		// act
		render(<Game />);
		const dealButton = screen.getByRole('button', { name: /Deal hand/i });
		fireEvent.click(dealButton);

		// assert
		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith('Failed to deal: ', 'Shuffling failed');
		});
	});

	it('handles unexpected errors gracefully', async () => {
		// arrange
		const error = new Error();
		// Mock failed fetch response
		mockFetch.mockImplementation(() => {
			throw error
		});

		// act
		render(<Game />);
		const dealButton = screen.getByRole('button', { name: /Deal hand/i });
		fireEvent.click(dealButton);

		// assert
		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith('An error occurred: ', error);
		});
	});
});

describe('Best hand update logic', () => {
	afterEach(() => {
		mockFetch.mockClear();
	});

	it('updates the best hand if the new hand is better', async () => {
		// arrange
		const initialBestHand: EvaluatedHand = {
			handName: 'one pair',
			handRank: 0,
			handType: 0,
			value: 2
		};
		const setState = jest.fn();
		jest.spyOn(React, "useState")
			.mockImplementationOnce(() => ([initialBestHand, setState]))
			.mockImplementationOnce(() => ([[], setState]))
			.mockImplementationOnce(() => ([initialBestHand, setState]))
			.mockImplementationOnce(() => (["5", setState]))
			.mockImplementationOnce(() => ([false, setState]));

		const newHand = [{ id: 'KS', value: 'K', suit: 'S' }, { id: 'KH', value: 'K', suit: 'H' }];
		const betterEvaluation: EvaluatedHand = {
			handName: 'three of a kind',
			handRank: 0,
			handType: 0,
			value: 30
		};

		// Mock fetch responses
		mockFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ content: newHand })
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ content: betterEvaluation })
			});

		// act
		render(<Game />);
		const dealButton = screen.getByRole('button', { name: /Deal hand/i });
		fireEvent.click(dealButton);

		// assert
		await waitFor(() => expect(setState.mock.calls).toStrictEqual([
			[true],
			[newHand],
			[betterEvaluation],
			[betterEvaluation],
			[false],
		]))
	});

	it('handles API errors gracefully', async () => {
		// arrange
		const newHand = [{ id: 'KS', value: 'K', suit: 'S' }, { id: 'KH', value: 'K', suit: 'H' }];

		// Mock failed fetch response
		mockFetch
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ content: newHand })
			})
			.mockResolvedValueOnce({
				ok: false,
				statusText: 'Server error',
				json: async () => ({ error: 'Shuffling failed' })
			});

		// act
		render(<Game />);
		const dealButton = screen.getByRole('button', { name: /Deal hand/i });
		fireEvent.click(dealButton);

		// assert
		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith('Failed to deal: ', 'Shuffling failed');
		});
	});
});

describe('Hand rendering', () => {
	it('renders the correct number of cards in the hand', async () => {
		// arrange
		const mockHand: Card[] = [
			{ id: 'AS', rank: 1, suit: Suit.spades },
			{ id: '2H', rank: 2, suit: Suit.hearts },
			{ id: '3D', rank: 3, suit: Suit.diamonds },
			{ id: '4C', rank: 4, suit: Suit.clubs },
			{ id: '5S', rank: 5, suit: Suit.spades }
		];

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ content: mockHand })
		});

		// act
		render(<Game />);
		fireEvent.click(screen.getByRole('button', { name: /Deal hand/i }));

		// assert
		await waitFor(() => {
			expect(screen.getByTestId('AS')).toBeInTheDocument();
			expect(screen.getByTestId('2H')).toBeInTheDocument();
			expect(screen.getByTestId('3D')).toBeInTheDocument();
			expect(screen.getByTestId('4C')).toBeInTheDocument();
			expect(screen.getByTestId('5S')).toBeInTheDocument();
		});
	});
});