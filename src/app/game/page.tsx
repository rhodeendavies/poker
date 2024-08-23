'use client';

import { useState } from "react"
import { Card } from "../lib/card"
import { RankNumberToRankString } from "../lib/utils";

export default function Game() {
	const [hand, setHand] = useState<Card[]>([]);
	const [result, setResult] = useState();

	const fetchHand = async () => {
		try {
			const response = await fetch('/api/dealHand?handSize=5');
			const data = await response.json();
			if (response.ok) {
				setHand(data.content);
			} else {
				console.error("Failed to deal: ", data.error);
			}
		} catch (error) {
			console.error("An error occurred: ", error);

		}
	};

	const fetchEvaluation = async () => {
		try {
			const handString = hand.map(x => `${RankNumberToRankString(x.rank)}${x.suit}`);
			const response = await fetch(`/api/evaluateHand?hand=${handString}`);
			const data = await response.json();
			if (response.ok) {
				setHand(data.content);
			} else {
				console.error("Failed to deal: ", data.error);
			}
		} catch (error) {
			console.error("An error occurred: ", error);

		}
	}

	return (
		<div>
			<button onClick={fetchHand}>
				Deal hand
			</button>

			<button onClick={fetchEvaluation}>
				Evaluate hand
			</button>

			<div>
				{hand.map(x => {
					return (<div key={x.id}>{x.rank}{x.suit}</div>)
				})}
			</div>

			<div>{result}</div>
		</div>
	)
}