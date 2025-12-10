import { writable } from 'svelte/store';
import { io, type Socket } from 'socket.io-client';
import type { Choice } from '../routes/api/game/+server.js';
import type { Player, GameRoom, MultiplayerGameResult } from './multiplayerServer.js';

export interface MultiplayerState {
	isConnected: boolean;
	currentRoom: GameRoom | null;
	currentPlayer: Player | null;
	availableRooms: GameRoom[];
	isInGame: boolean;
	gameResult: MultiplayerGameResult | null;
	error: string | null;
	isLoading: boolean;
}

export const multiplayerState = writable<MultiplayerState>({
	isConnected: false,
	currentRoom: null,
	currentPlayer: null,
	availableRooms: [],
	isInGame: false,
	gameResult: null,
	error: null,
	isLoading: false
});

class MultiplayerService {
	private socket: Socket | null = null;
	private currentPlayerId: string | null = null;

	connect(): void {
		if (this.socket?.connected) return;

		this.socket = io('http://localhost:5173', {
			transports: ['websocket', 'polling']
		});

		this.socket.on('connect', () => {
			console.log('Connected to multiplayer server');
			multiplayerState.update(state => ({
				...state,
				isConnected: true,
				error: null
			}));
			this.getRooms();
		});

		this.socket.on('disconnect', () => {
			console.log('Disconnected from multiplayer server');
			multiplayerState.update(state => ({
				...state,
				isConnected: false,
				currentRoom: null,
				currentPlayer: null
			}));
		});

		this.socket.on('room-created', ({ room, playerId }) => {
			this.currentPlayerId = playerId;
			const currentPlayer = room.players.find((p: Player) => p.id === playerId);
			
			multiplayerState.update(state => ({
				...state,
				currentRoom: room,
				currentPlayer,
				isLoading: false
			}));
		});

		this.socket.on('room-joined', ({ room, playerId }) => {
			this.currentPlayerId = playerId;
			const currentPlayer = room.players.find((p: Player) => p.id === playerId);
			
			multiplayerState.update(state => ({
				...state,
				currentRoom: room,
				currentPlayer,
				isLoading: false
			}));
		});

		this.socket.on('room-updated', (room: GameRoom) => {
			multiplayerState.update(state => ({
				...state,
				currentRoom: room
			}));
		});

		this.socket.on('rooms-list', (rooms: GameRoom[]) => {
			multiplayerState.update(state => ({
				...state,
				availableRooms: rooms
			}));
		});

		this.socket.on('can-start-game', () => {
			// Both players are ready, show start button or auto-start
		});

		this.socket.on('game-started', (room: GameRoom) => {
			multiplayerState.update(state => ({
				...state,
				currentRoom: room,
				isInGame: true,
				gameResult: null
			}));
		});

		this.socket.on('player-chose', ({ playerId }) => {
			// Show that the other player has made their choice
			console.log(`Player ${playerId} made their choice`);
		});

		this.socket.on('round-result', (result: MultiplayerGameResult) => {
			multiplayerState.update(state => ({
				...state,
				gameResult: result,
				currentRoom: state.currentRoom ? {
					...state.currentRoom,
					round: result.round + 1
				} : null
			}));
		});

		this.socket.on('game-complete', ({ winner, finalScores }) => {
			multiplayerState.update(state => ({
				...state,
				isInGame: false,
				currentRoom: state.currentRoom ? {
					...state.currentRoom,
					isActive: false,
					winner
				} : null
			}));
		});

		this.socket.on('player-left', ({ playerId }) => {
			console.log(`Player ${playerId} left the game`);
			multiplayerState.update(state => ({
				...state,
				currentRoom: null,
				currentPlayer: null,
				isInGame: false
			}));
		});

		this.socket.on('error', ({ message }) => {
			multiplayerState.update(state => ({
				...state,
				error: message,
				isLoading: false
			}));
		});
	}

	disconnect(): void {
		if (this.currentPlayerId) {
			this.leaveRoom();
		}
		
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}

		multiplayerState.update(state => ({
			...state,
			isConnected: false,
			currentRoom: null,
			currentPlayer: null,
			isInGame: false,
			gameResult: null
		}));
	}

	createRoom(playerName: string, roomName: string, maxRounds: number = 5): void {
		if (!this.socket?.connected) {
			multiplayerState.update(state => ({
				...state,
				error: 'Not connected to server'
			}));
			return;
		}

		multiplayerState.update(state => ({ ...state, isLoading: true }));
		this.socket.emit('create-room', { playerName, roomName, maxRounds });
	}

	joinRoom(roomId: string, playerName: string): void {
		if (!this.socket?.connected) {
			multiplayerState.update(state => ({
				...state,
				error: 'Not connected to server'
			}));
			return;
		}

		multiplayerState.update(state => ({ ...state, isLoading: true }));
		this.socket.emit('join-room', { roomId, playerName });
	}

	getRooms(): void {
		if (!this.socket?.connected) return;
		this.socket.emit('get-rooms');
	}

	setPlayerReady(isReady: boolean): void {
		if (!this.socket?.connected || !this.currentPlayerId) return;
		this.socket.emit('player-ready', { playerId: this.currentPlayerId, isReady });
	}

	startGame(roomId: string): void {
		if (!this.socket?.connected) return;
		this.socket.emit('start-game', { roomId });
	}

	makeChoice(choice: Choice): void {
		if (!this.socket?.connected || !this.currentPlayerId) return;
		this.socket.emit('player-choice', { playerId: this.currentPlayerId, choice });
	}

	leaveRoom(): void {
		if (!this.socket?.connected || !this.currentPlayerId) return;
		this.socket.emit('leave-room', { playerId: this.currentPlayerId });
		
		this.currentPlayerId = null;
		multiplayerState.update(state => ({
			...state,
			currentRoom: null,
			currentPlayer: null,
			isInGame: false,
			gameResult: null
		}));
	}

	clearError(): void {
		multiplayerState.update(state => ({ ...state, error: null }));
	}

	getCurrentPlayerId(): string | null {
		return this.currentPlayerId;
	}
}

export const multiplayerService = new MultiplayerService();