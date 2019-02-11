import React from 'react';
import { mount } from 'enzyme';
import MovesGrid from '../components/MovesGrid';

describe.skip("MovesGrid", () => {
  let props;
  let mountedMovesGrid;
  const mountMovesGrid = () => {
	if (!mountedMovesGrid) {
		mountedMovesGrid = mount(
			<MovesGrid {...props} />
		);
	}
	return mountedMovesGrid;
  }

  beforeEach(() => {
    props = {
      title: 'Tic Tac Toe',
      moves: [],
      actions: {},
    };
    mountedMovesGrid = undefined;
  });
  
  it("always renders a div", () => {
    const divs = mountMovesGrid().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("has a class named 'grid'", () => {
    const divs = mountMovesGrid().find("div");
    const gridDiv = divs.first();
    expect(gridDiv.hasClass('grid')).toBe(true);
  });

  it("always renders 9 divs for grid cells", () => {
    const divs = mountMovesGrid().find("div");
    const gridDiv = divs.first();
    expect(gridDiv.children().length).toEqual(9);
  });

  describe("The grid cells", () => {
    it("has class named 'grid__cell", () => {
      const divs = mountMovesGrid().find("div");
      const gridDiv = divs.first();
      const gridCells = gridDiv.children();
      for (let i = 0; i < gridCells.length; i++) {
        expect(gridDiv.childAt(i).hasClass('grid__cell')).toBe(true);
      }
    });
  })
});