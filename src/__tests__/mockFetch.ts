// import jest from 'jest-mock';

export const additionalMove = { marker: "O", position: 2 };

export const mockFetch = jest.fn((url: string, options: { body: string, headers: any, method: 'POST' | 'GET' }) => {
	const currentMoves = JSON.parse(options.body).moves;
	const p = new Promise((resolve, reject) => {
		const newMoves = currentMoves.length < 9 ? [...currentMoves, additionalMove] : currentMoves;
		const response = {
			body: JSON.stringify({
				moves: newMoves
			}),
			json: () => {
				return new Promise((resolve, reject) => {
					resolve ({ moves: newMoves });
				});
			}
		};
		resolve(response);
	});

	return p;
});