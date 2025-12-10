import { writable } from 'svelte/store';
import type { Choice, GameResult } from '../routes/api/game/+server.js';
import type { ScoreData } from '../routes/api/stats/+server.js';
import type { GameHistoryEntry } from '../routes/api/history/+server.js';

export interface GameState {
	playerChoice: Choice | null;
	computerChoice: Choice | null;
	result: GameResult | null;
	message: string;
	isPlaying: boolean;
	isLoading: boolean;
}

export const gameState = writable<GameState>({
	playerChoice: null,
	computerChoice: null,
	result: null,
	message: '',
	isPlaying: false,
	isLoading: false
});

export const scoreData = writable<ScoreData>({
	wins: 0,
	losses: 0,
	ties: 0,
	totalGames: 0,
	winRate: 0
});

export const gameHistory = writable<GameHistoryEntry[]>([]);

export class GameService {
	static async playGame(playerChoice: Choice): Promise<void> {
		gameState.update(state => ({ ...state, isLoading: true, isPlaying: true }));
		
		try {
			const response = await fetch('/api/game', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ playerChoice })
			});
			
			if (!response.ok) {
				throw new Error('Failed to play game');
			}
			
			const gameResult = await response.json();
			
			gameState.update(state => ({
				...state,
				playerChoice: gameResult.playerChoice,
				computerChoice: gameResult.computerChoice,
				result: gameResult.result,
				message: gameResult.message,
				isLoading: false
			}));
			
			// Update stats
			await this.updateStats(gameResult.result);
			
			// Add to history
			await this.addToHistory(gameResult);
			
		} catch (error) {
			console.error('Game error:', error);
			gameState.update(state => ({
				...state,
				isLoading: false,
				message: 'Error playing game. Please try again.'
			}));
		}
	}
	
	static async updateStats(result: GameResult): Promise<void> {
		try {
			const response = await fetch('/api/stats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ result })
			});
			
			if (response.ok) {
				const stats = await response.json();
				scoreData.set(stats);
			}
		} catch (error) {
			console.error('Stats error:', error);
		}
	}
	
	static async addToHistory(gameResult: any): Promise<void> {
		try {
			const response = await fetch('/api/history', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(gameResult)
			});
			
			if (response.ok) {
				await this.loadHistory();
			}
		} catch (error) {
			console.error('History error:', error);
		}
	}
	
	static async loadStats(): Promise<void> {
		try {
			const response = await fetch('/api/stats');
			if (response.ok) {
				const stats = await response.json();
				scoreData.set(stats);
			}
		} catch (error) {
			console.error('Load stats error:', error);
		}
	}
	
	static async loadHistory(): Promise<void> {
		try {
			const response = await fetch('/api/history?limit=10');
			if (response.ok) {
				const history = await response.json();
				gameHistory.set(history);
			}
		} catch (error) {
			console.error('Load history error:', error);
		}
	}
	
	static async resetGame(): Promise<void> {
		gameState.update(state => ({
			...state,
			playerChoice: null,
			computerChoice: null,
			result: null,
			message: '',
			isPlaying: false
		}));
	}
	
	static async resetStats(): Promise<void> {
		try {
			const response = await fetch('/api/stats', { method: 'DELETE' });
			if (response.ok) {
				const stats = await response.json();
				scoreData.set(stats);
			}
		} catch (error) {
			console.error('Reset stats error:', error);
		}
	}
	
	static async clearHistory(): Promise<void> {
		try {
			const response = await fetch('/api/history', { method: 'DELETE' });
			if (response.ok) {
				gameHistory.set([]);
			}
		} catch (error) {
			console.error('Clear history error:', error);
		}
	}
}