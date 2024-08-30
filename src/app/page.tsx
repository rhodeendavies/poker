'use client';

import styles from "./page.module.scss";
import React from "react";
import { Card, EvaluatedHand } from "./lib/card";
import { fetchHand, fetchEvaluation } from "./lib/data";
import CardView from "./ui/card/cardView";
import Image from 'next/image';

export default function Game() {
	const [bestHand, setBestHand] = React.useState<EvaluatedHand | null>(null);
	const [hand, setHand] = React.useState<Card[]>([]);
	const [result, setResult] = React.useState<EvaluatedHand | null>(null);
	const [handSize, setHandSize] = React.useState<string>("5");
	const [loading, setLoading] = React.useState<boolean>(false);

	// possible supported hand sizes (poker-hand-evaluator does not support hand sizes other than 5)
	const handSizeOptions = ["3", "5", "6", "7"];

	function handleHandSize(newHandSize: string) {
		setHandSize(newHandSize);
	}

	function determineBestHand(result: EvaluatedHand) {
		if (bestHand == null || bestHand?.value == null || result.value > bestHand?.value) {
			setBestHand(result);
		}
	}

	async function updateHand() {
		setLoading(true);
		// fetch new hand
		const newHand: Card[] = await fetchHand(handSize);
		setHand(newHand);
		// fetch hand evaluation
		const newResult: EvaluatedHand | null = await fetchEvaluation(newHand);
		setResult(newResult);
		// set best result based on new evaluation
		if (newResult != null) {
			determineBestHand(newResult);
		}
		setLoading(false);
	}

	return (
		<div className={styles.board}>
			<div className={styles['game-wrapper']}>
				<div className={styles.heading}>
					Poker
				</div>
				<div className={styles.actions}>
					<div className="select-group">
						{/* <label htmlFor="handSizeOptions">Hand size</label>
						<select id="handSizeOptions" value={handSize} onChange={e => handleHandSize(e.target.value)}>
							{handSizeOptions.map(x => {
								return (
									<option value={x} key={x}>{x}</option>
								)
							})}
						</select> */}
					</div>
					<button onClick={updateHand}>
						Deal hand
					</button>

				</div>

				{loading &&
					<div className={styles.loading}>
						<Image
							src="/CardShuffle.gif"
							width={450}
							height={270}
							alt="Shuffling loading animation"
						/>
						<div>
							SHUFFLING...
						</div>
					</div>
				}
				{!loading &&
					<>
						<div className={styles.hand}>
							{hand.map((x, i) => {
								return (<CardView key={x.id} card={x} index={i} />)
							})}
						</div>
						{result != null &&
							<div className={styles.result}>{result?.result}!</div>
						}
						{bestHand != null && bestHand.result != null &&
							<div className={styles['best-hand']}>
								<div>Best Hand</div>
								<div>{bestHand.result}</div>
							</div>
						}
					</>
				}
			</div>
		</div>
	)
}