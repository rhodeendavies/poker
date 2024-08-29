import clsx from "clsx";
import { Card, Suit } from "../../lib/card";
import styles from "./card.module.scss";
import { GetCardFace, GetSuitUnicode, RankNumberToRankString } from "@/app/lib/utils";
import Image from 'next/image';

export default function CardView({ card }: { card: Card }) {
	// each card is made up of columns with icons
	const suitIcons: string[][] = [];
	const suitIcon = GetSuitUnicode(card.suit);

	if (card.rank == 14) {
		// if the card is an ace, it has only 1 column with 1 icon inside
		suitIcons.push([suitIcon]);
	} else if (card.rank <= 10) {
		// if the card is a number card, it has 3 columns with varying icons in each column

		// the number of icons in the first and last columns are the same
		// dividing by 2.3 is the most universal value to achieve the traditional card layout, the only exception being the value 3
		const iconsPerCol = card.rank <= 3 ? 0 : Math.round(card.rank / 2.3);

		// the number of icons in the first and last columns == iconsPerCol
		const suits = [];
		for (let suit = 0; suit < iconsPerCol; suit++) {
			suits.push(suitIcon);
		}

		// first column
		suitIcons.push(suits);

		// middle column
		// the number of icons in the middle column is equal to whatever is left from the first and last column
		const middleCol = card.rank - (iconsPerCol * 2);
		const middleSuits = [];
		for (let suit = 0; suit < middleCol; suit++) {
			middleSuits.push(suitIcon);
		}
		suitIcons.push(middleSuits);

		// last column
		suitIcons.push(suits);
	}

	let suit = null;
	if (card.rank <= 10 || card.rank == 14) {
		// number cards build the columns
		suit = (
			<div className={styles.suits}>
				{suitIcons.map((column, columnIndex) => {
					return (
						<div
							key={`${card.id}-column${columnIndex}`}
							data-testid={`${card.id}-column${columnIndex}`}
							className={styles['suit-column']}>
							{column.map((icon, iconId) => {
								return (
									<div
										key={`${card.id}-column${columnIndex}-${iconId}`}
										data-testid={`${card.id}-column${columnIndex}-${iconId}`}
										className={styles.suit}>
										{icon}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		)
	} else {
		// face cards use images
		const { src, alt } = GetCardFace(card);
		suit = (
			<div className={styles['suit-image']}>
				{src && alt &&
					<Image
						src={src}
						width={200}
						height={200}
						alt={alt}
					/>
				}
			</div>
		)
	}

	return (
		<div data-testid={card.id} className={clsx(
			styles.card,
			{
				[styles.hearts]: card.suit == Suit.hearts,
				[styles.diamonds]: card.suit == Suit.diamonds,
				[styles.spades]: card.suit == Suit.spades,
				[styles.clubs]: card.suit == Suit.clubs
			}
		)}>
			<div className={styles.rank}>{RankNumberToRankString(card.rank, false)}</div>
			{suit}
			<div className={styles.rank}>{RankNumberToRankString(card.rank, false)}</div>
		</div>
	);
}