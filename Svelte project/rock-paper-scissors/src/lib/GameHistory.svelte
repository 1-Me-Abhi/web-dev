<script lang="ts">
	import type { GameHistoryEntry } from '../routes/api/history/+server.js';
	
	export let history: GameHistoryEntry[];
	
	const emojis = {
		rock: '🪨',
		paper: '📄',
		scissors: '✂️'
	};
	
	const resultEmojis = {
		win: '🟢',
		lose: '🔴',
		tie: '🟡'
	};
	
	function formatTime(timestamp: string): string {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
	
	function formatDate(timestamp: string): string {
		const date = new Date(timestamp);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);
		
		if (date.toDateString() === today.toDateString()) {
			return 'Today';
		} else if (date.toDateString() === yesterday.toDateString()) {
			return 'Yesterday';
		} else {
			return date.toLocaleDateString();
		}
	}
</script>

<div class="history-container">
	<h3 class="history-title">Recent Games</h3>
	
	{#if history.length === 0}
		<div class="empty-state">
			<div class="empty-emoji">🎮</div>
			<p>No games played yet. Start playing to see your history!</p>
		</div>
	{:else}
		<div class="history-list">
			{#each history as game (game.id)}
				<div class="history-item" class:win={game.result === 'win'} class:lose={game.result === 'lose'} class:tie={game.result === 'tie'}>
					<div class="game-choices">
						<div class="player-choice">
							<span class="choice-emoji">{emojis[game.playerChoice]}</span>
							<span class="choice-label">You</span>
						</div>
						
						<div class="vs-divider">VS</div>
						
						<div class="computer-choice">
							<span class="choice-emoji">{emojis[game.computerChoice]}</span>
							<span class="choice-label">CPU</span>
						</div>
					</div>
					
					<div class="game-result">
						<span class="result-emoji">{resultEmojis[game.result]}</span>
						<span class="result-text">{game.result.toUpperCase()}</span>
					</div>
					
					<div class="game-time">
						<div class="time">{formatTime(game.timestamp)}</div>
						<div class="date">{formatDate(game.timestamp)}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.history-container {
		background: linear-gradient(135deg, #ffffff, #f8fafc);
		border-radius: 16px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}
	
	.history-title {
		text-align: center;
		margin: 0 0 1.5rem 0;
		color: #374151;
		font-size: 1.25rem;
		font-weight: 700;
	}
	
	.empty-state {
		text-align: center;
		padding: 2rem 1rem;
		color: #6b7280;
	}
	
	.empty-emoji {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	
	.history-list {
		max-height: 400px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #cbd5e1 transparent;
	}
	
	.history-list::-webkit-scrollbar {
		width: 6px;
	}
	
	.history-list::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.history-list::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 3px;
	}
	
	.history-item {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 12px;
		margin-bottom: 0.5rem;
		transition: all 0.3s ease;
		border-left: 4px solid;
	}
	
	.history-item:hover {
		transform: translateX(4px);
	}
	
	.history-item.win {
		background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
		border-left-color: #10b981;
	}
	
	.history-item.lose {
		background: linear-gradient(135deg, #fef2f2, #fef7f7);
		border-left-color: #ef4444;
	}
	
	.history-item.tie {
		background: linear-gradient(135deg, #fffbeb, #fefcf3);
		border-left-color: #f59e0b;
	}
	
	.game-choices {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.player-choice,
	.computer-choice {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.choice-emoji {
		font-size: 1.5rem;
	}
	
	.choice-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
	}
	
	.vs-divider {
		font-size: 0.75rem;
		font-weight: 800;
		color: #9ca3af;
		letter-spacing: 0.1em;
	}
	
	.game-result {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.result-emoji {
		font-size: 1.25rem;
	}
	
	.result-text {
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}
	
	.history-item.win .result-text {
		color: #10b981;
	}
	
	.history-item.lose .result-text {
		color: #ef4444;
	}
	
	.history-item.tie .result-text {
		color: #f59e0b;
	}
	
	.game-time {
		text-align: right;
		font-size: 0.75rem;
		color: #6b7280;
	}
	
	.time {
		font-weight: 600;
		margin-bottom: 0.125rem;
	}
	
	.date {
		font-weight: 400;
	}
	
	@media (max-width: 640px) {
		.history-container {
			padding: 1rem;
		}
		
		.history-item {
			grid-template-columns: 1fr;
			gap: 0.75rem;
			text-align: center;
		}
		
		.game-choices {
			justify-content: center;
		}
		
		.game-time {
			text-align: center;
		}
		
		.choice-emoji {
			font-size: 1.25rem;
		}
		
		.vs-divider {
			margin: 0 0.25rem;
		}
	}
</style>