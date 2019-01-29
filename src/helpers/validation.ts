import { IMove } from "../interfaces/IMove";

export function isValidPosition(position: number): boolean {
	return (typeof(position) === 'number' && position > 0 && position <= 9);
}

export function isPositionOpen(position: number, moves: IMove[]): boolean {
	for (let move of moves) {
		if (move.position === position) {
			return false;
		}
	}
	return true;
}