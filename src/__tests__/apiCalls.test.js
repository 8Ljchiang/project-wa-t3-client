// import jest from 'jest-mock';
import { mockFetch, additionalMove } from '../helpers/mockFetch';
import { getRandomMoveFromServer } from '../helpers/apiCalls';

describe("api call functions", () => {
	beforeEach(() => {
		global.fetch = mockFetch;
	});

	it("getRandomMoveFromServer() called should return an array with an additional move", async () => {
		const initialMoves = [
			{
				marker: "X",
				position: 1
			}
		];

		const fakeUrl = "http://example.com:5000/random-move";
		const fakeOptions = {
			method: 'POST',
			body: JSON.stringify({ moves: initialMoves }),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}

		const resultMoves = await getRandomMoveFromServer(fakeUrl, fakeOptions);
		expect(resultMoves.length).toEqual(2);
		expect(resultMoves).toContainEqual(additionalMove);
		expect(resultMoves).toContainEqual({ marker: "X", position: 1 });
	});

	it("getRandomMoveFromServer() called with full array should return an array with no additional move", async () => {
		const initialMoves = [
			{ marker: "X", position: 1 }, { marker: "O", position: 2 }, { marker: "X", position: 3 }, { marker: "O", position: 4 }, { marker: "X", position: 5 }, { marker: "O", position: 6 }, { marker: "X", position: 7 }, { marker: "O", position: 8 }, { marker: "X", position: 9 }
		];

		const fakeUrl = "http://example.com:5000/random-move";
		const fakeOptions = {
			method: 'POST',
			body: JSON.stringify({ moves: initialMoves }),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}

		const resultMoves = await getRandomMoveFromServer(fakeUrl, fakeOptions);
		expect(resultMoves.length).toEqual(9);
	});
});