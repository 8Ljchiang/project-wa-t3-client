import { IMove } from "../interfaces/IMove";
import { SERVER_URL, RANDOM_MOVE_ROUTE } from "./connection";

export async function getRandomMoveFromServer(url: string, options: { method: string, body: string, headers: any}) {
	// const takenPositions = currentMoves.map((m: IMove) => m.position).join(',')
	// const options = {
	// 	method: 'POST',
	// 	body: JSON.stringify({moves:currentMoves}),
	// 	headers: new Headers({
	// 		'Content-Type': 'text/plain',
	// 	})
	// }
	
	try {
		const res = await fetch(url, options);
		const responseJson = await res.json();
		return responseJson.moves;
	} catch(error) {
		// throw error;
		console.log(`${error}`);
	}
}