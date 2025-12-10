<script lang="ts">
	import type { Choice } from '../routes/api/game/+server.js';
	
	export let choice: Choice;
	export let isSelected = false;
	export let isRevealed = false;
	export let isDisabled = false;
	export let onClick: ((choice: Choice) => void) | undefined = undefined;
	
	const emojis: Record<Choice, string> = {
		rock: '🪨',
		paper: '📄',
		scissors: '✂️'
	};
	
	const labels: Record<Choice, string> = {
		rock: 'Rock',
		paper: 'Paper',
		scissors: 'Scissors'
	};
	
	function handleClick() {
		if (!isDisabled && onClick) {
			onClick(choice);
		}
	}
</script>

<button 
	class="choice-button"
	class:selected={isSelected}
	class:revealed={isRevealed}
	class:disabled={isDisabled}
	on:click={handleClick}
	disabled={isDisabled}
>
	<div class="choice-emoji">
		{emojis[choice]}
	</div>
	<div class="choice-label">
		{labels[choice]}
	</div>
</button>

<style>
	.choice-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 120px;
		border: 3px solid #e2e8f0;
		border-radius: 16px;
		background: linear-gradient(135deg, #f8fafc, #f1f5f9);
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: inherit;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	
	.choice-button:hover:not(.disabled) {
		border-color: #3b82f6;
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
	}
	
	.choice-button.selected {
		border-color: #10b981;
		background: linear-gradient(135deg, #ecfdf5, #d1fae5);
		transform: scale(1.05);
	}
	
	.choice-button.revealed {
		border-color: #f59e0b;
		background: linear-gradient(135deg, #fffbeb, #fef3c7);
		animation: reveal 0.6s ease-out;
	}
	
	.choice-button.disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none !important;
	}
	
	.choice-emoji {
		font-size: 2.5rem;
		margin-bottom: 8px;
		transition: transform 0.3s ease;
	}
	
	.choice-button:hover:not(.disabled) .choice-emoji {
		transform: scale(1.2) rotate(10deg);
	}
	
	.choice-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	@keyframes reveal {
		0% {
			transform: scale(0.8) rotate(-10deg);
			opacity: 0;
		}
		50% {
			transform: scale(1.1) rotate(5deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
			opacity: 1;
		}
	}
	
	@media (max-width: 640px) {
		.choice-button {
			width: 100px;
			height: 100px;
		}
		
		.choice-emoji {
			font-size: 2rem;
		}
		
		.choice-label {
			font-size: 0.75rem;
		}
	}
</style>