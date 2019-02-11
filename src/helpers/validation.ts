import { IMove } from "../interfaces/IMove";
import { winningPatterns } from "./constants";

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

export function getMatchingPattern(moves: IMove[], marker: string) {
    for (let pattern of winningPatterns) {
		const patternArr = pattern.split(',').map(p => parseInt(p));
		const markerPositionsArr = moves.filter(m => m.marker === marker).map(m => m.position);
		// console.log('markerPositions', markerPositionsArr);
        // console.log('comparing:', pattern, markerPositionsArr.join(','));
        const cache = [];
        for (let pos of markerPositionsArr) {
            if (patternArr.includes(pos)) {
                cache.push(pos)
            }
		}
        // console.log('cache length: ', cache.length, 'patternArr', patternArr.length);
        if (cache.length === patternArr.length) {
            // console.log('Matching pattern found');
            return patternArr
        }
    }
    return []
}