import { json, type RequestHandler } from '@sveltejs/kit';

export type Choice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'lose' | 'tie';

export interface GameResponse {
	playerChoice: Choice;
	computerChoice: Choice;
	result: GameResult;
	message: string;
}

function getRandomChoice(): Choice {
	const choices: Choice[] = ['rock', 'paper', 'scissors'];
	return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice: Choice, computerChoice: Choice): GameResult {
	if (playerChoice === computerChoice) {
		return 'tie';
	}
	
	const winConditions: Record<Choice, Choice> = {
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
	};
	
	return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
}

function getResultMessage(result: GameResult, playerChoice: Choice, computerChoice: Choice): string {
	if (result === 'tie') {
		return `It's a tie! Both chose ${playerChoice}`;
	}
	
	const actionMap: Record<Choice, string> = {
		rock: 'crushes',
		paper: 'covers',
		scissors: 'cuts'
	};
	
	if (result === 'win') {
		return `You win! ${playerChoice} ${actionMap[playerChoice]} ${computerChoice}`;
	} else {
		return `You lose! ${computerChoice} ${actionMap[computerChoice]} ${playerChoice}`;
	}
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { playerChoice } = await request.json();
		
		if (!playerChoice || !['rock', 'paper', 'scissors'].includes(playerChoice)) {
			return json({ error: 'Invalid choice' }, { status: 400 });
		}
		
		const computerChoice = getRandomChoice();
		const result = determineWinner(playerChoice, computerChoice);
		const message = getResultMessage(result, playerChoice, computerChoice);
		
		const response: GameResponse = {
			playerChoice,
			computerChoice,
			result,
			message
		};
		
		return json(response);
	} catch (error) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}
};