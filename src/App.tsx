import React, { Component } from 'react';
import './App.css';

import { IMove } from './interfaces/IMove';

import Board from './components/Board';
import { isValidPosition, isPositionOpen } from './helpers/validation';

export interface AppProps { [key: string]: any };
export interface AppState { moves: IMove[] };

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      moves: [{ marker: 'X', position: 1 }, { marker: 'X', position: 2}]
    }
  }

  addMove(marker: string, position: number) {
    if (isValidPosition(position) && isPositionOpen(position, this.state.moves)) {
      const newMove: IMove = {
        marker,
        position
      };

      this.setState({
        moves: [...this.state.moves, newMove]
      });
    }
  }

  clearAllMoves() {
    this.setState({
      moves: []
    });
  }

  render() {
    const actions = {
      addMove: this.addMove.bind(this),
      clearAllMoves: this.clearAllMoves.bind(this)
    }
    return (
      <div className="page-container">
        <Board moves={this.state.moves} title={"Tic Tac Toe"} actions={actions}/>
      </div>
    );
  }
}

export default App;
