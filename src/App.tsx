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
export interface AppState { moves: IMove[], highlightedPositions: number[] };

let renderCount = 0;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      moves: [],
      highlightedPositions: [],
    }
  }

  addMove = async (marker: string, position: number) => {
    if (isValidPosition(position) && isPositionOpen(position, this.state.moves) && this.state.highlightedPositions.length === 0) {
      const newMove: IMove = {
        marker,
        position
      };

      let moves = [...this.state.moves, newMove];
      let winningPattern = getMatchingPattern(moves, MARKER_1);

      try {
        if (moves.length < 9 && winningPattern.length === 0) {
          const options = {
            method: 'POST',
            body: JSON.stringify({ moves }),
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          }
          const newMoves = await getRandomMoveFromServer(SERVER_URL + RANDOM_MOVE_ROUTE, options);
          // const newMoves = await this.getRandomMoveFromServer(moves);
          // if (randomPosition != null) {
          //   const randomMove = { marker: MARKER_2, position: randomPosition };
          //   newMoves = newMoves.concat(randomMove);
          // }
          moves = newMoves ? newMoves : moves;
          winningPattern = getMatchingPattern(moves, MARKER_2);
        }
        this.setState({
          moves: moves,
          highlightedPositions: winningPattern
        });
      } catch (e) {
        console.error(`${e.message}`);
      }
    }
  }

  clearAllMoves = () => {
    this.setState(clearAllMoves);
  }

  // getRandomMoveFromServer = async (currentMoves: IMove[]): Promise<IMove[] | void> => {
  //   // const takenPositions = moves.map((m: IMove) => m.position).join(',')
  //   const options = {
  //       method: 'POST',
  //       body: JSON.stringify({moves:currentMoves}),
  //       headers: new Headers({
  //           'Content-Type': 'application/json',
  //           // 'Access-Control-Allow-Origin': '*',
  //       })
  //   }
    
  //   try {
  //     const res = await fetch(SERVER_URL + RANDOM_MOVE_ROUTE, options);
  //     console.log(res);
  //     const responseJson = await res.json();
  //     return responseJson.moves;
  //   } catch(error) {
  //     throw error;
  //     // console.log(`${error}`);
  //   }
  // }

  render() {
    renderCount += 1;
    // console.log(JSON.stringify(this.state));
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
