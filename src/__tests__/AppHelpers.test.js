import jest from 'jest';
import { clearAllMoves, updateStateWithNewMove, updateStateWithNewMovesAndWinningPattern } from '../helpers/AppHelpers';

describe("App helpers", () => {
	it("clearAllMoves()", () => {
		const prevState = {
			moves: [{
				marker: "X",
				position: 1
			}, {
				marker: "O",
				position: 2
			}],
			highlightedPositions: [1, 2, 3]
		}
		const props = {};

		expect(clearAllMoves(prevState, props).moves.length).toEqual(0);
		expect(clearAllMoves(prevState, props).highlightedPositions.length).toEqual(0);
	});
	
	it("updateStateWithNewMove() called with a new move should update the next state's moves", () => {
		const newMove = {
			marker: "X",
			position: 5
		}

		const prevState = {
			moves: [],
			highlightedPositions: []
		}

		const props = {};

		const nextState = updateStateWithNewMove(prevState, props, newMove);

		expect(nextState.moves.length).toEqual(1);
		expect(nextState.moves).toContainEqual(newMove);
		expect(nextState.highlightedPositions.length).toEqual(0);
	});

	it("udpateStateWithNewMove() called with newMove that wins game should add move and update highlightedPositions", () => {
		const newMove = {
			marker: "X",
			position: 3
		};

		const prevState = {
			moves: [{
				marker: "X",
				position: 1
			}, {
				marker: "X",
				position: 2
			}]
		};

		const props = {};

		const nextState = updateStateWithNewMove(prevState, props, newMove);

		expect(nextState.moves.length).toEqual(3);
		expect(nextState.moves).toContainEqual(newMove);

		expect(nextState.highlightedPositions.length).toEqual(3);
		expect(nextState.highlightedPositions).toContain(1);
		expect(nextState.highlightedPositions).toContain(2);
		expect(nextState.highlightedPositions).toContain(3);
	});

	it("updateStateWithNewMovesAndWinningPattern() called with new moves array and with winning patterns array", () => {
		const prevState = {
			moves: [{ marker: "X", position: 1 }, { marker: "X", position: 2 }],
			highlightedPositions: []
		}
	
		const props = {};

		const newMoves = [{
			marker: "X",
			position: 1,
		}, {
			marker: "X",
			position: 2,
		}, {
			marker: "X",
			position: 3
		}];

		const winningPattern = [1, 2, 3];

		const nextState = updateStateWithNewMovesAndWinningPattern(prevState, props, newMoves, winningPattern);

		expect(nextState.moves.length).toEqual(newMoves.length);
		expect(nextState.moves).toContainEqual({ marker: "X", position: 1 });
		expect(nextState.moves).toContainEqual({ marker: "X", position: 2 });
		expect(nextState.moves).toContainEqual({ marker: "X", position: 3 });

		expect(nextState.highlightedPositions.length).toEqual(3);
		expect(nextState.highlightedPositions).toContain(1);
		expect(nextState.highlightedPositions).toContain(2);
		expect(nextState.highlightedPositions).toContain(3);
	});
});






























3




