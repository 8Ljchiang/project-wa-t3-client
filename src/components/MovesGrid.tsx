import React, { Component } from 'react';

import { MARKER_1, OPEN_SPACE } from '../helpers/constants';
import { IMove } from '../interfaces/IMove';

export interface MovesGridProps {
	actions: any;
	moves: IMove[];
}

interface MovesGridState {}

export default class MovesGrid extends Component<MovesGridProps, MovesGridState> {

	renderCell(move: IMove) {
		return 
	}

	renderGrid() {
		const { moves, actions } = this.props;
		const cells = [];
		for (let i = 1; i <= 9; i++) {
			const movePosition = moves.filter(move => move.position === i);
			if (movePosition.length > 0) {
				cells.push(<div key={i} className="grid__cell">{movePosition[0].marker}</div>);
			} else {
				cells.push(<div key={i} className="grid__cell" onClick={() => actions.addMove(MARKER_1, i)}>{OPEN_SPACE}</div>);
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