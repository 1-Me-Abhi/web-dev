import { json, type RequestHandler } from '@sveltejs/kit';

export interface ScoreData {
	wins: number;
	losses: number;
	ties: number;
	totalGames: number;
	winRate: number;
}

// In a real application, you'd use a database
// For this demo, we'll use in-memory storage
let gameStats: ScoreData = {
	wins: 0,
	losses: 0,
	ties: 0,
	totalGames: 0,
	winRate: 0
};

function updateWinRate(stats: ScoreData): void {
	stats.winRate = stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0;
}

export const GET: RequestHandler = async () => {
	return json(gameStats);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { result } = await request.json();
		
		if (!result || !['win', 'lose', 'tie'].includes(result)) {
			return json({ error: 'Invalid result' }, { status: 400 });
		}
		
		gameStats.totalGames++;
		
		switch (result) {
			case 'win':
				gameStats.wins++;
				break;
			case 'lose':
				gameStats.losses++;
				break;
			case 'tie':
				gameStats.ties++;
				break;
		}
		
		updateWinRate(gameStats);
		
		return json(gameStats);
	} catch (error) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async () => {
	gameStats = {
		wins: 0,
		losses: 0,
		ties: 0,
		totalGames: 0,
		winRate: 0
	};
	
	return json(gameStats);
};