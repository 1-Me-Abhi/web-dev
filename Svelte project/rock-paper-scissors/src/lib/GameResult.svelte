<script lang="ts">
	import type { GameResult } from '../routes/api/game/+server.js';
	
	export let result: GameResult | null;
	export let message: string;
	
	$: resultClass = result === 'win' ? 'win' : result === 'lose' ? 'lose' : 'tie';
	$: resultEmoji = result === 'win' ? '🎉' : result === 'lose' ? '😞' : '🤝';
</script>

{#if result && message}
	<div class="result-container" class:show={!!result}>
		<div class="result-emoji">
			{resultEmoji}
		</div>
		<div class="result-text {resultClass}">
			{message}
		</div>
	</div>
{/if}

<style>
	.result-container {
		text-align: center;
		margin: 2rem 0;
		padding: 1.5rem;
		border-radius: 16px;
		background: linear-gradient(135deg, #ffffff, #f8fafc);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.5s ease;
	}
	
	.result-container.show {
		opacity: 1;
		transform: translateY(0);
	}
	
	.result-emoji {
		font-size: 3rem;
		margin-bottom: 1rem;
		animation: bounce 0.8s ease infinite alternate;
	}
	
	.result-text {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		transition: color 0.3s ease;
	}
	
	.result-text.win {
		color: #10b981;
		text-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
	}
	
	.result-text.lose {
		color: #ef4444;
		text-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
	}
	
	.result-text.tie {
		color: #f59e0b;
		text-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
	}
	
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-10px);
		}
	}
	
	@media (max-width: 640px) {
		.result-container {
			margin: 1rem 0;
			padding: 1rem;
		}
		
		.result-emoji {
			font-size: 2.5rem;
		}
		
		.result-text {
			font-size: 1rem;
		}
	}
</style>