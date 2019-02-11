import { AppState, AppProps } from "../App";
import { IMove } from "../interfaces/IMove";
import { getMatchingPattern } from "./validation";
import { winningPatterns } from "./constants";

export function clearAllMoves(prevState: AppState, props: AppProps) {
	return {
		moves: [],
		highlightedPositions: []
	}
}

export function updateStateWithNewMove(prevState: AppState, props: AppProps, move: IMove) {
	const newMoves: IMove[] = [...prevState.moves, move];
	const winningPattern = getMatchingPattern(newMoves, move.marker);

	if (winningPatterns.length > 0, prevState.moves.length < 9) {
		return {
			moves: newMoves,
			highlightedPositions: winningPattern,
		}
	}

	return null;
}

export function updateStateWithNewMovesAndWinningPattern(prevState: AppState, props: AppProps, moves: IMove[], winningPattern: number[]) {
	return {
		moves: moves,
		highlightedPositions: winningPattern
	}
}

export function playRound() {
	
}