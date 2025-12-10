import { json, type RequestHandler } from '@sveltejs/kit';
import type { Choice, GameResult } from '../game/+server.js';

export interface GameHistoryEntry {
	id: string;
	playerChoice: Choice;
	computerChoice: Choice;
	result: GameResult;
	timestamp: string;
}

// In a real application, you'd use a database
let gameHistory: GameHistoryEntry[] = [];

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') || '10');
	const recent = gameHistory.slice(-limit).reverse();
	return json(recent);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { playerChoice, computerChoice, result } = await request.json();
		
		if (!playerChoice || !computerChoice || !result) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}
		
		const entry: GameHistoryEntry = {
			id: crypto.randomUUID(),
			playerChoice,
			computerChoice,
			result,
			timestamp: new Date().toISOString()
		};
		
		gameHistory.push(entry);
		
		// Keep only last 100 games to prevent memory issues
		if (gameHistory.length > 100) {
			gameHistory = gameHistory.slice(-100);
		}
		
		return json(entry);
	} catch (error) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async () => {
	gameHistory = [];
	return json({ message: 'Game history cleared' });
};