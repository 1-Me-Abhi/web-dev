<script lang="ts">
	import type { ScoreData } from '../routes/api/stats/+server.js';
	
	export let scores: ScoreData;
</script>

<div class="score-container">
	<h3 class="score-title">Game Statistics</h3>
	
	<div class="score-grid">
		<div class="score-item wins">
			<div class="score-value">{scores.wins}</div>
			<div class="score-label">Wins</div>
		</div>
		
		<div class="score-item losses">
			<div class="score-value">{scores.losses}</div>
			<div class="score-label">Losses</div>
		</div>
		
		<div class="score-item ties">
			<div class="score-value">{scores.ties}</div>
			<div class="score-label">Ties</div>
		</div>
		
		<div class="score-item total">
			<div class="score-value">{scores.totalGames}</div>
			<div class="score-label">Total Games</div>
		</div>
	</div>
	
	<div class="win-rate">
		<div class="win-rate-label">Win Rate</div>
		<div class="win-rate-value">{scores.winRate}%</div>
		<div class="win-rate-bar">
			<div class="win-rate-fill" style="width: {scores.winRate}%"></div>
		</div>
	</div>
</div>

<style>
	.score-container {
		background: linear-gradient(135deg, #ffffff, #f8fafc);
		border-radius: 16px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}
	
	.score-title {
		text-align: center;
		margin: 0 0 1.5rem 0;
		color: #374151;
		font-size: 1.25rem;
		font-weight: 700;
	}
	
	.score-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	
	.score-item {
		text-align: center;
		padding: 1rem;
		border-radius: 12px;
		transition: transform 0.3s ease;
	}
	
	.score-item:hover {
		transform: translateY(-4px);
	}
	
	.score-item.wins {
		background: linear-gradient(135deg, #ecfdf5, #d1fae5);
		border: 2px solid #10b981;
	}
	
	.score-item.losses {
		background: linear-gradient(135deg, #fef2f2, #fecaca);
		border: 2px solid #ef4444;
	}
	
	.score-item.ties {
		background: linear-gradient(135deg, #fffbeb, #fef3c7);
		border: 2px solid #f59e0b;
	}
	
	.score-item.total {
		background: linear-gradient(135deg, #f0f9ff, #dbeafe);
		border: 2px solid #3b82f6;
	}
	
	.score-value {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 0.25rem;
	}
	
	.score-item.wins .score-value {
		color: #10b981;
	}
	
	.score-item.losses .score-value {
		color: #ef4444;
	}
	
	.score-item.ties .score-value {
		color: #f59e0b;
	}
	
	.score-item.total .score-value {
		color: #3b82f6;
	}
	
	.score-label {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
	}
	
	.win-rate {
		text-align: center;
	}
	
	.win-rate-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	.win-rate-value {
		font-size: 1.5rem;
		font-weight: 800;
		color: #374151;
		margin-bottom: 0.75rem;
	}
	
	.win-rate-bar {
		height: 8px;
		background: #e5e7eb;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
	}
	
	.win-rate-fill {
		height: 100%;
		background: linear-gradient(90deg, #10b981, #34d399);
		border-radius: 4px;
		transition: width 0.8s ease;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	@media (max-width: 640px) {
		.score-container {
			padding: 1rem;
		}
		
		.score-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}
		
		.score-item {
			padding: 0.75rem;
		}
		
		.score-value {
			font-size: 1.5rem;
		}
		
		.score-label {
			font-size: 0.75rem;
		}
	}
</style>