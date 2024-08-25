import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CardView from './cardView';
import { Card, Suit } from '@/app/lib/card';

describe('Card View Component', () => {
	it('renders correctly for a face card', () => {
		// arrange
		const card: Card = {
			rank: 13,
			suit: Suit.clubs,
			id: "13C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('K');
		expect(ranks.length).toBe(2);

		// image of rank
		expect(screen.getByAltText("King of Clubs")).toBeInTheDocument();
	});

	it('renders correctly for an Ace card', () => {
		// arrange
		const card: Card = {
			rank: 1,
			suit: Suit.clubs,
			id: "1C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('A');
		expect(ranks.length).toBe(2);

		// only 1 column
		expect(screen.getByTestId('1C-column0')).toBeInTheDocument();

		// only 1 icon in the column
		expect(screen.getByTestId('1C-column0').children.length).toBe(1);
		expect(screen.getByTestId('1C-column0-0')).toBeInTheDocument();
	});

	it('renders correctly for a 2 card', () => {
		// arrange
		const card: Card = {
			rank: 2,
			suit: Suit.clubs,
			id: "2C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('2');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('2C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('2C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('2C-column2')).toBeInTheDocument();

		// first column with no icons
		expect(screen.getByTestId('2C-column0').children.length).toBe(0);

		// second column with 2 icons
		expect(screen.getByTestId('2C-column1').children.length).toBe(2);
		expect(screen.getByTestId('2C-column1-0')).toBeInTheDocument();
		expect(screen.getByTestId('2C-column1-1')).toBeInTheDocument();

		// last column with no icons
		expect(screen.getByTestId('2C-column2').children.length).toBe(0);
	});

	it('renders correctly for a 3 card', () => {
		// arrange
		const card: Card = {
			rank: 3,
			suit: Suit.clubs,
			id: "3C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('3');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('3C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('3C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('3C-column2')).toBeInTheDocument();

		// first column with no icons
		expect(screen.getByTestId('3C-column0').children.length).toBe(0);

		// second column with 3 icons
		expect(screen.getByTestId('3C-column1').children.length).toBe(3);
		expect(screen.getByTestId('3C-column1-0')).toBeInTheDocument();
		expect(screen.getByTestId('3C-column1-1')).toBeInTheDocument();
		expect(screen.getByTestId('3C-column1-2')).toBeInTheDocument();

		// last column with no icons
		expect(screen.getByTestId('3C-column2').children.length).toBe(0);
	});

	it('renders correctly for a 4 card', () => {
		// arrange
		const card: Card = {
			rank: 4,
			suit: Suit.clubs,
			id: "4C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('4');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('4C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('4C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('4C-column2')).toBeInTheDocument();

		// first column with 2 icons
		expect(screen.getByTestId('4C-column0').children.length).toBe(2);
		expect(screen.getByTestId('4C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('4C-column0-1')).toBeInTheDocument();

		// second column with 0 icons
		expect(screen.getByTestId('4C-column1').children.length).toBe(0);

		// last column with 2 icons
		expect(screen.getByTestId('4C-column2').children.length).toBe(2);
		expect(screen.getByTestId('4C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('4C-column2-1')).toBeInTheDocument();
	});

	it('renders correctly for a 5 card', () => {
		// arrange
		const card: Card = {
			rank: 5,
			suit: Suit.clubs,
			id: "5C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('5');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('5C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('5C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('5C-column2')).toBeInTheDocument();

		// first column with 2 icons
		expect(screen.getByTestId('5C-column0').children.length).toBe(2);
		expect(screen.getByTestId('5C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('5C-column0-1')).toBeInTheDocument();

		// second column with 1 icon
		expect(screen.getByTestId('5C-column1').children.length).toBe(1);
		expect(screen.getByTestId('5C-column1-0')).toBeInTheDocument();

		// last column with 2 icons
		expect(screen.getByTestId('5C-column2').children.length).toBe(2);
		expect(screen.getByTestId('5C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('5C-column2-1')).toBeInTheDocument();
	});

	it('renders correctly for a 6 card', () => {
		// arrange
		const card: Card = {
			rank: 6,
			suit: Suit.clubs,
			id: "6C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('6');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('6C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column2')).toBeInTheDocument();

		// first column with 3 icons
		expect(screen.getByTestId('6C-column0').children.length).toBe(3);
		expect(screen.getByTestId('6C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column0-1')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column0-2')).toBeInTheDocument();

		// second column with 0 icons
		expect(screen.getByTestId('6C-column1').children.length).toBe(0);

		// last column with 3 icons
		expect(screen.getByTestId('6C-column2').children.length).toBe(3);
		expect(screen.getByTestId('6C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column2-1')).toBeInTheDocument();
		expect(screen.getByTestId('6C-column2-2')).toBeInTheDocument();
	});

	it('renders correctly for a 7 card', () => {
		// arrange
		const card: Card = {
			rank: 7,
			suit: Suit.clubs,
			id: "7C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('7');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('7C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column2')).toBeInTheDocument();

		// first column with 3 icons
		expect(screen.getByTestId('7C-column0').children.length).toBe(3);
		expect(screen.getByTestId('7C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column0-1')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column0-2')).toBeInTheDocument();

		// second column with 1 icon
		expect(screen.getByTestId('7C-column1').children.length).toBe(1);
		expect(screen.getByTestId('7C-column1-0')).toBeInTheDocument();

		// last column with 3 icons
		expect(screen.getByTestId('7C-column2').children.length).toBe(3);
		expect(screen.getByTestId('7C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column2-1')).toBeInTheDocument();
		expect(screen.getByTestId('7C-column2-2')).toBeInTheDocument();
	});

	it('renders correctly for a 8 card', () => {
		// arrange
		const card: Card = {
			rank: 8,
			suit: Suit.clubs,
			id: "8C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('8');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('8C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column2')).toBeInTheDocument();

		// first column with 3 icons
		expect(screen.getByTestId('8C-column0').children.length).toBe(3);
		expect(screen.getByTestId('8C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column0-1')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column0-2')).toBeInTheDocument();

		// second column with 2 icons
		expect(screen.getByTestId('8C-column1').children.length).toBe(2);
		expect(screen.getByTestId('8C-column1-0')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column1-1')).toBeInTheDocument();

		// last column with 3 icons
		expect(screen.getByTestId('8C-column2').children.length).toBe(3);
		expect(screen.getByTestId('8C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column2-1')).toBeInTheDocument();
		expect(screen.getByTestId('8C-column2-2')).toBeInTheDocument();
	});

	it('renders correctly for a 9 card', () => {
		// arrange
		const card: Card = {
			rank: 9,
			suit: Suit.clubs,
			id: "9C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('9');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('9C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column2')).toBeInTheDocument();

		// first column with 4 icons
		expect(screen.getByTestId('9C-column0').children.length).toBe(4);
		expect(screen.getByTestId('9C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column0-1')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column0-2')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column0-3')).toBeInTheDocument();

		// second column with 1 icon
		expect(screen.getByTestId('9C-column1').children.length).toBe(1);
		expect(screen.getByTestId('9C-column1-0')).toBeInTheDocument();

		// last column with 4 icons
		expect(screen.getByTestId('9C-column2').children.length).toBe(4);
		expect(screen.getByTestId('9C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column2-1')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column2-2')).toBeInTheDocument();
		expect(screen.getByTestId('9C-column2-3')).toBeInTheDocument();
	});

	it('renders correctly for a 10 card', () => {
		// arrange
		const card: Card = {
			rank: 10,
			suit: Suit.clubs,
			id: "10C"
		};

		// act
		render(<CardView card={card} />);

		// assert
		// 2 divs with rank value
		const ranks = screen.getAllByText('10');
		expect(ranks.length).toBe(2);

		// 3 columns
		expect(screen.getByTestId('10C-column0')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column1')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column2')).toBeInTheDocument();

		// first column with 4 icons
		expect(screen.getByTestId('10C-column0').children.length).toBe(4)
		expect(screen.getByTestId('10C-column0-0')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column0-1')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column0-2')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column0-3')).toBeInTheDocument();

		// second column with 2 icons
		expect(screen.getByTestId('10C-column1').children.length).toBe(2)
		expect(screen.getByTestId('10C-column1-0')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column1-1')).toBeInTheDocument();

		// last column with 4 icons
		expect(screen.getByTestId('10C-column2').children.length).toBe(4)
		expect(screen.getByTestId('10C-column2-0')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column2-1')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column2-2')).toBeInTheDocument();
		expect(screen.getByTestId('10C-column2-3')).toBeInTheDocument();
	});
});