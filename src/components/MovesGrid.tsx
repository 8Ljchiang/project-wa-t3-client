import React, { Component } from 'react';

import { MARKER_1, OPEN_SPACE } from '../helpers/constants';
import { IMove } from '../interfaces/IMove';

export interface MovesGridProps {
	// addMove: (marker: string, position: number) => any;
	// clearAllMoves: () => any;
	// getRandomMoveFromServer: (moves: IMove[]) => any;
	highlightedPositions: number[];
	moves: IMove[];
	actions: any;
}

interface MovesGridState {}

export default class MovesGrid extends Component<MovesGridProps, MovesGridState> {
	renderGrid() {
		const { moves, actions, highlightedPositions } = this.props;
		const cells = [];
		for (let i = 1; i <= 9; i++) {
			const movePosition = moves.filter(move => move.position === i);
			const milliDelay = 150 * i;
			const highlightClass = highlightedPositions.includes(i) ? 'highlighted' : '';
			const classString = 'grid__cell animated fadeInDown ' + highlightClass;
			if (movePosition.length > 0) {
				cells.push(
					<div key={i} className={classString} style={{ animationDelay: `${milliDelay}ms`}}>
						<p>{movePosition[0].marker}</p>
					</div>
				);
			} else {
				cells.push(
					<div key={i} className={classString} style={{ animationDelay: `${milliDelay}ms`}} onClick={() => actions.addMove(MARKER_1, i)}>
						<p>{OPEN_SPACE}</p>
					</div>
				);
			}
		}
		return cells;
	}

	render() {
		return (
			<div className="grid">
				{this.renderGrid()}
			</div>
		);
	}
}