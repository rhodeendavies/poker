'use client';

import { EvaluatedHand } from "poker-evaluator/lib/types";
import styles from "./page.module.scss";
import React from "react";
import { Card } from "./lib/card";
import { fetchHand, fetchEvaluation } from "./lib/data";
import CardView from "./ui/card/cardView";

export default function Game() {
	const [bestHand, setBestHand] = React.useState<EvaluatedHand | null>(null);
	const [hand, setHand] = React.useState<Card[]>([]);
	const [result, setResult] = React.useState<EvaluatedHand | null>(null);
	const [handSize, setHandSize] = React.useState<string>("5");
	const [loading, setLoading] = React.useState<boolean>(false);

	const handSizeOptions = ["3", "5", "6", "7"];

	function determineBestHand(result: EvaluatedHand) {
		if (result.value > (bestHand?.value ?? 0)) {
			setBestHand(result);
		}
	}

	function handleHandSize(newHandSize: string) {
		setHandSize(newHandSize);
	}

	async function updateHand() {
		setLoading(true);
		const newHand: Card[] = await fetchHand(handSize);
		setHand(newHand);
		const newResult: EvaluatedHand | null = await fetchEvaluation(newHand);
		setResult(newResult);
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
						<label htmlFor="handSizeOptions">Hand size</label>
						<select id="handSizeOptions" value={handSize} onChange={e => handleHandSize(e.target.value)}>
							{handSizeOptions.map(x => {
								return (
									<option value={x} key={x}>{x}</option>
								)
							})}
						</select>
					</div>
					<button onClick={updateHand}>
						Deal hand
					</button>
					<div className={styles['best-hand']}>
						<div>Best Hand</div>
						<div>{bestHand?.handName ?? "-"}</div>
					</div>
				</div>

				{loading &&
					<div className={styles.loading}>Dealing...</div>
				}
				{!loading &&
					<>
						<div className={styles.hand}>
							{hand.map(x => {
								return (<CardView key={x.id} card={x} />)
							})}
						</div>
						{result != null &&
							<div className={styles.result}>{result?.handName}!</div>
						}
					</>
				}
			</div>
		</div>
	)
}