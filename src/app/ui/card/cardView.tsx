import clsx from "clsx";
import { Card, Suit } from "../../lib/card";
import styles from "./card.module.scss";
import { GetCardFace, GetSuitUnicode, RankNumberToRankString } from "@/app/lib/utils";
import Image from 'next/image';

export default function CardView({ card }: { card: Card }) {
	const suitIcons: string[][] = [];
	const suitIcon = GetSuitUnicode(card.suit);
	if (card.rank == 1) {
		suitIcons.push([suitIcon]);
	} else if (card.rank <= 10) {
		const iconsPerCol = card.rank <= 3 ? 0 : Math.round(card.rank / 2.3);
		const suits = [];
		for (let suit = 0; suit < iconsPerCol; suit++) {
			suits.push(suitIcon);
		}

		const middleCol = card.rank - (iconsPerCol * 2);
		suitIcons.push(suits);
		const middleSuits = [];
		for (let suit = 0; suit < middleCol; suit++) {
			middleSuits.push(suitIcon);
		}
		suitIcons.push(middleSuits);

		suitIcons.push(suits);
	}

	let suit = null;
	if (card.rank <= 10) {
		suit = (
			<div className={styles.suits}>
				{suitIcons.map((y, iy) => {
					return (
						<div key={iy} className={styles['suit-column']}>
							{y.map((x, i) => {
								return (
									<div key={i} className={styles.suit}>
										{x}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		)
	} else {
		const { src, alt } = GetCardFace(card);
		suit = (
			<div className={styles['suit-image']}>
				<Image
					src={src}
					width={200}
					height={200}
					alt={alt}
				/>
			</div>
		)
	}

	return (
		<div className={clsx(
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