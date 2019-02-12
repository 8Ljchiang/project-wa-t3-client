import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';
import { mockFetch } from './mockFetch';
//const wrapper = shallow(<App />);
//wrapper.instance().getRandomMoveFromServer
// const boardWrapper = wrapper.find("Board")

// expect(boardWrapper.prop("getRandomMoveFromServer"))
//   .toEqual(wrapper.instance().getRandomMoveFromServer);

describe("App", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /**
   * Testing component methods
   */
  describe("App methods", () => {   
    let appWrapper;
    const shallowRenderApp = () => {
      if (!appWrapper) {
        appWrapper = shallow(
          <App />
        );
      }
      return appWrapper;
    }

    beforeEach(() => {
      appWrapper = undefined;
    })
    
    beforeAll(() => {
      global.fetch = mockFetch
    });
    
    // Test for full board 
    it('addMove called for the last available position on the baord, it should only add one move', async () => {
      const wrapper = shallowRenderApp();
      const initialMoves = [{ marker: "X", position: 1 }, { marker: "O", position: 2 }, { marker: "O", position: 5}, { marker: "X", position: 4 }, { marker: "O", position: 7}, {marker: "X", position: 8 }, { marker: "X", position: 3 }, { marker: "O", position: 9 }];
      await wrapper.setState({ moves: initialMoves, highlightedPositions: [] });

      await wrapper.instance().addMove("X", 6);

      const appState = wrapper.state();
      expect(appState.moves.length).toEqual(initialMoves.length + 1);
      expect(appState.highlightedPositions.length).toEqual(0);
    });
    
    // Test for filled position.
    it('addMove called for a position that is taken, it should not add new move', async () => {
      const wrapper = shallowRenderApp();
      const initialMoves = [{ marker: "X", position: 1 }, { marker: "O", position: 4 }];
      await wrapper.setState({ moves: initialMoves, highlightedPositions: [] });

      await wrapper.instance().addMove("X", 1);

      const appState = wrapper.state();
      expect(appState.moves.length).toEqual(initialMoves.length);
      expect(appState.highlightedPositions.length).toEqual(0);
    });

    // Test for winning pattern created already.
    it('addMove called when there is already a win condition found, it should not add new move', async () => {
      const wrapper = shallowRenderApp();
      const initialMoves = [{ marker: "X", position: 1 }, { marker: "X", position: 4 }, { marker: "X", position: 7 }];
      await wrapper.setState({ moves: initialMoves, highlightedPositions: [1, 4, 7]})

      await wrapper.instance().addMove("X", 3);

      const appState = wrapper.state();
      expect(appState.moves.length).toEqual(initialMoves.length);
      expect(appState.highlightedPositions.length).toEqual(3);
    });

    it('addMove called with valid marker and position should add move(s)', async () => {
      const wrapper = shallowRenderApp();
      const initialMoves = [];
      await wrapper.setState({ moves: initialMoves, highlightedPositions: [] })
      
      await wrapper.instance().addMove("X", 1);

      const appState = wrapper.state();
      expect(appState.moves.length).toEqual(2);
      expect(appState.highlightedPositions.length).toEqual(0);
    });

    it('addMove called with a winning position should return only one additional move add have highlightedPositions set', async () => {
      const wrapper = shallowRenderApp();
      const initialMoves = [{ marker: "X", position: 1 }, { marker: "O", position: 3 }, { marker: "X", position: 4 }, { marker: "O", position: 6 }];
      await wrapper.setState({ moves: initialMoves, highlightedPositions: [] })
      
      await wrapper.instance().addMove("X", 7);

      const appState = wrapper.state();
      expect(appState.moves.length).toEqual(initialMoves.length + 1);
      expect(appState.highlightedPositions.length).toEqual(3);
    });
  
    it('clearAllMoves should clear state moves and highlighted positions', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ moves: [{ marker: "X", position: 1 }, { marker: "O", position: 2 }], highlightedPositions: [1, 2, 3] });
      wrapper.instance().clearAllMoves();
      const moves = wrapper.state('moves');
      expect(moves.length).toEqual(0);
    });
  })
})

