// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import { mount } from 'enzyme';
import MovesGrid from './components/MovesGrid';
import Board from './components/Board';

describe("Board", () => {
	let props;
	let mountedBoard;
	const mountBoard = () => {
		if (!mountedBoard) {
			mountedBoard = mount(
				<Board {...props} />
			);
		}
		return mountedBoard;
	}

	beforeEach(() => {
		props = {
			title: 'Tic Tac Toe',
			moves: [],
			actions: {},
		};
		mountedBoard = undefined;
	});

	// All tests will go here
	it("always renders a div", () => {
		const divs = mountBoard().find("div");
		expect(divs.length).toBeGreaterThan(0);
	});

	it("has a class of board-container", () => {
		const divs = mountBoard().find("div");
		const boardDiv = divs.first();

		expect(boardDiv.hasClass('board-container')).toBe(true);
	})

	describe("the rendered div", () => {
		it.skip("contains everything else that gets rendered", () => {
			// const divs = mountBoard().find("div");
			// When using .find, enzyme arranges the nodes in order such
			// that the outermost node is first in the list. So we can
			// use .first() to get the outermost div.
			// const wrappingDiv = divs.first();

			// Enzyme omits the outermost node when using the .children()
			// method on lockScreen(). This is annoying, but we can use it
			// to verify that wrappingDiv contains everything else this
			// component renders.
			// expect(wrappingDiv.children()).toEqual(mountBoard().children());
		});

		it("always renders a `MovesGrid`", () => {
			expect(mountBoard().find(MovesGrid).length).toBe(1);
		});
	});
});