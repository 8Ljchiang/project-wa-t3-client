import React from 'react';
import { IMove } from '../interfaces/IMove';

import MovesGrid from './MovesGrid';

export interface BoardProps {
	// addMove: (marker: string, position: number) => any;
	// getRandomMoveFromServer: (moves: IMove[]) => any;
	// clearAllMoves: () => any;
	highlightedPositions: number[];
	title: string;
	moves: IMove[];
	actions: any;
}

const Board = (props: BoardProps) => {
	const { title, moves, actions, highlightedPositions } = props;
	return (
		<div className="board-container">
			<div className="board-container__header">
				<p className="header__title">{title}</p>
				<p className="header__reset" onClick={() => actions.clearAllMoves()}>Reset Game</p>
			</div>
			<div className="board-contrainer__body">
				<MovesGrid moves={moves} highlightedPositions={highlightedPositions} actions={actions}/>
			</div>
		</div>
	);
}

export default Board;