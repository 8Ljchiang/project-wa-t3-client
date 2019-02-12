import React, { Component } from 'react';
import './App.css';

import { IMove } from './interfaces/IMove';

import Board from './components/Board';
import { isValidPosition, isPositionOpen, getMatchingPattern } from './helpers/validation';
import { SERVER_URL, RANDOM_MOVE_ROUTE } from './helpers/connection';
import { MARKER_2, MARKER_1 } from './helpers/constants';
import { getRandomMoveFromServer } from './helpers/apiCalls';
import { clearAllMoves } from './helpers/AppHelpers';

export interface AppProps { };
export interface AppState { moves: IMove[], highlightedPositions: number[], errorMessage: string };

let renderCount = 0;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      moves: [],
      highlightedPositions: [],
      errorMessage: '',
    }
  }

  addMove = async (marker: string, position: number) => {
    // const currentMoves = this.state.moves;
    // const newState = await getRandomMoveFromServer(currentMoves);
    // this.setState(newState);
    if (isValidPosition(position) && isPositionOpen(position, this.state.moves) && this.state.highlightedPositions.length === 0) {
      const newMove: IMove = {
        marker,
        position
      };

      let moves = [...this.state.moves, newMove];
      let winningPattern = getMatchingPattern(moves, MARKER_1);
      let error = '';
      
      try {
        if (moves.length < 9 && winningPattern.length === 0) {
          const options = {
            method: 'POST',
            body: JSON.stringify({ moves }),
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          };

          const newMoves = await getRandomMoveFromServer(SERVER_URL + RANDOM_MOVE_ROUTE, options);
          
          moves = newMoves ? newMoves : moves;
          winningPattern = getMatchingPattern(moves, MARKER_2);
        }        
      } catch (e) {
        error = e.message;
      } finally {
        this.setState({
          moves,
          highlightedPositions: winningPattern,
          errorMessage: error
        });
      }
    }
  }

  clearAllMoves = () => {
    this.setState(clearAllMoves);
  }

  render() {
    // renderCount += 1;
    // document.getElementById("renders")!.innerText =`renders: ${renderCount}`;
    const actions = {
      addMove: this.addMove,
      clearAllMoves: this.clearAllMoves,
    };

    return (
      <div className="page-container">
        <Board 
          moves={this.state.moves} 
          title="Tic Tac Toe" 
          // addMove={this.addMove}
          // clearAllMoves={this.clearAllMoves}
          // getRandomMoveFromServer={this.getRandomMoveFromServer}
          highlightedPositions={this.state.highlightedPositions}
          actions={actions}
          />
      </div>
    );
    // return React.createElement('div', { className: 'page-container'}, 
    // React.createElement('div', { className: 'board-container'}, 
    // React.createElement('div', { className: 'board-container__header'}, 
    // React.createElement('p', {}, 'Some header here'))));
  }
}

export default App;
