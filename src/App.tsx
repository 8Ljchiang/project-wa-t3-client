import React, { Component } from 'react';
import './App.css';

import { IMove } from './interfaces/IMove';

import { isValidPosition, isPositionOpen } from './helpers/validation';

export interface AppProps { [key: string]: any };
export interface AppState { moves: IMove[] };

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      moves: []
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
    return (
      <div className="page-container">

      </div>
    );
  }
}

export default App;
