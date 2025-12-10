<script lang="ts">
	import { onMount } from 'svelte';
	import ChoiceButton from '$lib/ChoiceButton.svelte';
	import GameResult from '$lib/GameResult.svelte';
	import ScoreDisplay from '$lib/ScoreDisplay.svelte';
	import GameHistory from '$lib/GameHistory.svelte';
	import { gameState, scoreData, gameHistory, GameService } from '$lib/gameService.js';
	import type { Choice } from './api/game/+server.js';
	
	const choices: Choice[] = ['rock', 'paper', 'scissors'];
	
	onMount(() => {
		GameService.loadStats();
		GameService.loadHistory();
	});
	
	async function playGame(playerChoice: Choice) {
		await GameService.playGame(playerChoice);
	}
	
	async function resetGame() {
		await GameService.resetGame();
	}
	
	async function resetStats() {
		if (confirm('Are you sure you want to reset all statistics?')) {
			await GameService.resetStats();
		}
	}
	
	async function clearHistory() {
		if (confirm('Are you sure you want to clear game history?')) {
			await GameService.clearHistory();
		}
	}
</script>

<svelte:head>
	<title>Rock Paper Scissors - Ultimate Game</title>
	<meta name="description" content="Play the classic Rock Paper Scissors game with modern design and full statistics tracking!" />
</svelte:head>

<div class="container">
	<header class="header">
		<h1 class="title">🎮 Rock Paper Scissors</h1>
		<p class="subtitle">Choose your weapon and battle the computer!</p>
	</header>
	
	<main class="main-content">
		<div class="game-section">
			<div class="game-area">
				<div class="player-section">
					<h3 class="section-title">Your Choice</h3>
					<div class="choices-container">
						{#each choices as choice}
							<ChoiceButton 
								{choice}
								isSelected={$gameState.playerChoice === choice}
								isDisabled={$gameState.isLoading}
								onClick={playGame}
							/>
						{/each}
					</div>
				</div>
				
				{#if $gameState.isPlaying}
					<div class="vs-section">
						<div class="vs-text">VS</div>
					</div>
					
					<div class="computer-section">
						<h3 class="section-title">Computer's Choice</h3>
						<div class="computer-choice">
							{#if $gameState.isLoading}
								<div class="loading-spinner">🎲</div>
								<p class="loading-text">Computer is thinking...</p>
							{:else if $gameState.computerChoice}
								<ChoiceButton 
									choice={$gameState.computerChoice}
									isRevealed={true}
									isDisabled={true}
								/>
							{/if}
						</div>
					</div>
				{/if}
			</div>
			
			<GameResult result={$gameState.result} message={$gameState.message} />
			
			{#if $gameState.result}
				<div class="action-buttons">
					<button class="action-btn primary" on:click={resetGame}>
						Play Again
					</button>
				</div>
			{/if}
		</div>
		
		<div class="stats-section">
			<ScoreDisplay scores={$scoreData} />
			
			<div class="control-buttons">
				<button class="control-btn reset" on:click={resetStats}>
					Reset Stats
				</button>
				<button class="control-btn clear" on:click={clearHistory}>
					Clear History
				</button>
			</div>
			
			<GameHistory history={$gameHistory} />
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		color: #374151;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
	}
	
	.header {
		text-align: center;
		margin-bottom: 3rem;
		color: white;
	}
	
	.title {
		font-size: 3rem;
		font-weight: 800;
		margin: 0;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		animation: glow 2s ease-in-out infinite alternate;
	}
	
	.subtitle {
		font-size: 1.25rem;
		margin: 0.5rem 0 0 0;
		opacity: 0.9;
		font-weight: 500;
	}
	
	@keyframes glow {
		from {
			text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		}
		to {
			text-shadow: 0 4px 20px rgba(255, 255, 255, 0.4);
		}
	}
	
	.main-content {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 2rem;
		align-items: start;
	}
	
	.game-section {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24px;
		padding: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}
	
	.stats-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.game-area {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-bottom: 2rem;
	}
	
	.player-section,
	.computer-section {
		text-align: center;
	}
	
	.section-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1.5rem 0;
		color: #374151;
	}
	
	.choices-container {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	
	.vs-section {
		text-align: center;
		margin: 1rem 0;
	}
	
	.vs-text {
		font-size: 2rem;
		font-weight: 900;
		color: #6b7280;
		letter-spacing: 0.1em;
		animation: pulse 1.5s ease-in-out infinite;
	}
	
	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}
	
	.computer-choice {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 160px;
	}
	
	.loading-spinner {
		font-size: 4rem;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}
	
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.loading-text {
		font-size: 1.125rem;
		color: #6b7280;
		font-weight: 600;
		margin: 0;
	}
	
	.action-buttons {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}
	
	.action-btn {
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
	}
	
	.action-btn.primary {
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
	}
	
	.action-btn.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
	}
	
	.control-buttons {
		display: flex;
		gap: 0.75rem;
	}
	
	.control-btn {
		flex: 1;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
	}
	
	.control-btn.reset {
		background: linear-gradient(135deg, #f59e0b, #d97706);
		color: white;
	}
	
	.control-btn.clear {
		background: linear-gradient(135deg, #6b7280, #4b5563);
		color: white;
	}
	
	.control-btn:hover {
		transform: translateY(-2px);
		filter: brightness(110%);
	}
	
	@media (max-width: 1024px) {
		.main-content {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.stats-section {
			order: -1;
		}
	}
	
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
		
		.title {
			font-size: 2rem;
		}
		
		.subtitle {
			font-size: 1rem;
		}
		
		.game-section {
			padding: 1.5rem;
		}
		
		.choices-container {
			gap: 1rem;
		}
		
		.game-area {
			gap: 1.5rem;
		}
		
		.vs-text {
			font-size: 1.5rem;
		}
	}
	
	@media (max-width: 640px) {
		.container {
			padding: 0.5rem;
		}
		
		.header {
			margin-bottom: 2rem;
		}
		
		.title {
			font-size: 1.75rem;
		}
		
		.game-section {
			padding: 1rem;
			border-radius: 16px;
		}
		
		.section-title {
			font-size: 1.25rem;
		}
		
		.control-buttons {
			flex-direction: column;
		}
	}
</style>
