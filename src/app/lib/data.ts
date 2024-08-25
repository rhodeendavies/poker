import { EvaluatedHand } from "poker-evaluator/lib/types";
import { Card } from "./card";

export async function fetchHand(handSize: string): Promise<Card[]> {
	try {
		const response = await fetch(`/api/dealHand?handSize=${handSize}`);
		const data = await response.json();
		if (response.ok) {
			return data.content;
		} else {
			console.error("Failed to deal: ", data.error);
			return [];
		}
	} catch (error) {
		console.error("An error occurred: ", error);
		return [];
	}
};

export async function fetchEvaluation(handToEval: Card[]): Promise<EvaluatedHand | null> {
	try {
		const response = await fetch('/api/evaluateHand', {
			method: "POST",
			body: JSON.stringify(handToEval)
		});
		const data = await response.json();
		if (response.ok) {
			return data.content;
		} else {
			console.error("Failed to deal: ", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("An error occurred: ", error);
		return null;
	}
}