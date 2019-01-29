import React from 'react';
import { IMove } from '../interfaces/IMove';

import MovesGrid from './MovesGrid';

export interface BoardProps {
	title: string;
	moves: IMove[];
	actions: any;
}

const Board = (props: BoardProps) => {
	const { title, moves } = props;
	return (
		<div className="board-container">
			<div className="board-container__header">
				{title}
			</div>
			<div className="board-contrainer__body">
				<MovesGrid moves={moves}/>
			</div>
		</div>
	);
}

export default Board;