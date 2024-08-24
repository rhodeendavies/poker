'use client';

import { useState } from "react"
import { Card } from "../lib/card"
import { EvaluatedHand } from "poker-evaluator/lib/types";
import CardView from "../ui/card/cardView";
import styles from "./page.module.scss";

export default function Game() {
	const [bestHand, setBestHand] = useState<EvaluatedHand | null>(null);
	const [hand, setHand] = useState<Card[]>([]);
	const [result, setResult] = useState<EvaluatedHand>();
	const [handSize, setHandSize] = useState<string>("5");

	const handSizeOptions = ["3", "5", "6", "7"];

	const fetchHand = async () => {
		try {
			const response = await fetch(`/api/dealHand?handSize=${handSize}`);
			const data = await response.json();
			if (response.ok) {
				setHand(data.content);
				await fetchEvaluation(data.content);
			} else {
				console.error("Failed to deal: ", data.error);
			}
		} catch (error) {
			console.error("An error occurred: ", error);

		}
	};

	const fetchEvaluation = async (handToEval: Card[]) => {
		try {
			const response = await fetch('/api/evaluateHand', {
				method: "POST",
				body: JSON.stringify(handToEval)
			});
			if (response.ok) {
				const data = await response.json();
				if (data.content.value > (bestHand?.value ?? 0)) {
					setBestHand(data.content);
				}
				setResult(data.content);
			} else {
				console.error("Failed to deal: ", response.statusText);
			}
		} catch (error) {
			console.error("An error occurred: ", error);

		}
	}

	function handleHandSize(newHandSize: string) {
		setHandSize(newHandSize);
	}

	return (
		<div className={styles.board}>
			<div className={styles['game-wrapper']}>
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
					<button onClick={fetchHand}>
						Deal hand
					</button>
					<div className={styles['best-hand']}>
						<div>Best Hand</div>
						<div>{bestHand?.handName ?? "-"}</div>
					</div>
				</div>

				<div className={styles.hand}>
					{hand.map(x => {
						return (<CardView key={x.id} card={x} />)
					})}
				</div>

				<div className={styles.result}>{result?.handName}!</div>
			</div>
		</div>
	)
}