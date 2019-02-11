import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';
//const wrapper = shallow(<App />);
//wrapper.instance().getRandomMoveFromServer
// const boardWrapper = wrapper.find("Board")

// expect(boardWrapper.prop("getRandomMoveFromServer"))
//   .toEqual(wrapper.instance().getRandomMoveFromServer);

describe("App", () => {
  let props;
  
  beforeEach(() => {
    props = {
      
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /**
   * Testing component methods
   */
  describe("App methods", () => {    
    it.skip('addMove called with valid marker and position should add move(s)', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ moves: [{ marker: "X", position: 1 }, { marker: "O", position: 2 }], highlightedPositions: [] });
      wrapper.instance().addMove("X", 3);
      const appMoves = wrapper.state('moves');
      expect
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

