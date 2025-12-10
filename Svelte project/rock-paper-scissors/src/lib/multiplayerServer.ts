import { Server } from 'socket.io';
import type { Choice, GameResult } from '../routes/api/game/+server.js';
import { v4 as uuidv4 } from 'uuid';

export interface Player {
	id: string;
	socketId: string;
	name: string;
	isReady: boolean;
	choice: Choice | null;
	score: number;
}

export interface GameRoom {
	id: string;
	name: string;
	players: Player[];
	isActive: boolean;
	round: number;
	maxRounds: number;
	winner: Player | null;
	createdAt: Date;
	lastActivity: Date;
}

export interface MultiplayerGameResult {
	player1: Player;
	player2: Player;
	winner: Player | null;
	isDraw: boolean;
	round: number;
	gameComplete: boolean;
}

class GameRoomManager {
	private rooms: Map<string, GameRoom> = new Map();
	private playerToRoom: Map<string, string> = new Map();

	createRoom(playerName: string, roomName: string, maxRounds: number = 5): GameRoom {
		const roomId = uuidv4();
		const playerId = uuidv4();
		
		const player: Player = {
			id: playerId,
			socketId: '',
			name: playerName,
			isReady: false,
			choice: null,
			score: 0
		};

		const room: GameRoom = {
			id: roomId,
			name: roomName,
			players: [player],
			isActive: false,
			round: 0,
			maxRounds,
			winner: null,
			createdAt: new Date(),
			lastActivity: new Date()
		};

		this.rooms.set(roomId, room);
		this.playerToRoom.set(playerId, roomId);
		return room;
	}

	joinRoom(roomId: string, playerName: string, socketId: string): GameRoom | null {
		const room = this.rooms.get(roomId);
		if (!room || room.players.length >= 2) {
			return null;
		}

		const playerId = uuidv4();
		const player: Player = {
			id: playerId,
			socketId,
			name: playerName,
			isReady: false,
			choice: null,
			score: 0
		};

		room.players.push(player);
		room.lastActivity = new Date();
		this.playerToRoom.set(playerId, roomId);

		return room;
	}

	getAvailableRooms(): GameRoom[] {
		return Array.from(this.rooms.values())
			.filter(room => room.players.length === 1 && !room.isActive)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}

	getRoom(roomId: string): GameRoom | null {
		return this.rooms.get(roomId) || null;
	}

	getRoomByPlayerId(playerId: string): GameRoom | null {
		const roomId = this.playerToRoom.get(playerId);
		return roomId ? this.rooms.get(roomId) || null : null;
	}

	removePlayerFromRoom(playerId: string): boolean {
		const roomId = this.playerToRoom.get(playerId);
		if (!roomId) return false;

		const room = this.rooms.get(roomId);
		if (!room) return false;

		room.players = room.players.filter(p => p.id !== playerId);
		this.playerToRoom.delete(playerId);

		if (room.players.length === 0) {
			this.rooms.delete(roomId);
		}

		return true;
	}

	setPlayerReady(playerId: string, isReady: boolean): GameRoom | null {
		const room = this.getRoomByPlayerId(playerId);
		if (!room) return null;

		const player = room.players.find(p => p.id === playerId);
		if (player) {
			player.isReady = isReady;
			room.lastActivity = new Date();
		}

		return room;
	}

	setPlayerChoice(playerId: string, choice: Choice): GameRoom | null {
		const room = this.getRoomByPlayerId(playerId);
		if (!room || !room.isActive) return null;

		const player = room.players.find(p => p.id === playerId);
		if (player) {
			player.choice = choice;
			room.lastActivity = new Date();
		}

		return room;
	}

	canStartGame(roomId: string): boolean {
		const room = this.rooms.get(roomId);
		return room?.players.length === 2 && room.players.every(p => p.isReady) || false;
	}

	startGame(roomId: string): GameRoom | null {
		const room = this.rooms.get(roomId);
		if (!room || !this.canStartGame(roomId)) return null;

		room.isActive = true;
		room.round = 1;
		room.lastActivity = new Date();

		// Reset player states for new game
		room.players.forEach(player => {
			player.choice = null;
			player.score = 0;
		});

		return room;
	}

	evaluateRound(roomId: string): MultiplayerGameResult | null {
		const room = this.rooms.get(roomId);
		if (!room || room.players.length !== 2) return null;

		const [player1, player2] = room.players;
		if (!player1.choice || !player2.choice) return null;

		let winner: Player | null = null;
		let isDraw = false;

		if (player1.choice === player2.choice) {
			isDraw = true;
		} else {
			const winConditions: Record<Choice, Choice> = {
				rock: 'scissors',
				paper: 'rock',
				scissors: 'paper'
			};

			if (winConditions[player1.choice] === player2.choice) {
				winner = player1;
				player1.score++;
			} else {
				winner = player2;
				player2.score++;
			}
		}

		// Reset choices for next round
		player1.choice = null;
		player2.choice = null;

		const gameComplete = player1.score >= Math.ceil(room.maxRounds / 2) || 
						   player2.score >= Math.ceil(room.maxRounds / 2) ||
						   room.round >= room.maxRounds;

		if (gameComplete) {
			room.isActive = false;
			room.winner = player1.score > player2.score ? player1 : 
						 player2.score > player1.score ? player2 : null;
		} else {
			room.round++;
		}

		room.lastActivity = new Date();

		return {
			player1,
			player2,
			winner,
			isDraw,
			round: room.round - 1,
			gameComplete
		};
	}

	bothPlayersChosen(roomId: string): boolean {
		const room = this.rooms.get(roomId);
		return room?.players.length === 2 && 
			   room.players.every(p => p.choice !== null) || false;
	}

	updatePlayerSocket(playerId: string, socketId: string): boolean {
		const room = this.getRoomByPlayerId(playerId);
		if (!room) return false;

		const player = room.players.find(p => p.id === playerId);
		if (player) {
			player.socketId = socketId;
			return true;
		}

		return false;
	}

	// Clean up inactive rooms (called periodically)
	cleanupInactiveRooms(): void {
		const now = new Date();
		const timeoutMs = 30 * 60 * 1000; // 30 minutes

		for (const [roomId, room] of this.rooms.entries()) {
			if (now.getTime() - room.lastActivity.getTime() > timeoutMs) {
				// Remove player mappings
				room.players.forEach(player => {
					this.playerToRoom.delete(player.id);
				});
				this.rooms.delete(roomId);
			}
		}
	}
}

export const roomManager = new GameRoomManager();

export function initializeMultiplayerServer(server: any): Server {
	const io = new Server(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"]
		}
	});

	io.on('connection', (socket) => {
		console.log('Player connected:', socket.id);

		socket.on('create-room', ({ playerName, roomName, maxRounds }) => {
			try {
				const room = roomManager.createRoom(playerName, roomName, maxRounds);
				const player = room.players[0];
				player.socketId = socket.id;

				socket.join(room.id);
				socket.emit('room-created', { room, playerId: player.id });
				socket.emit('room-updated', room);

				// Broadcast updated room list
				socket.broadcast.emit('rooms-list', roomManager.getAvailableRooms());
			} catch (error) {
				socket.emit('error', { message: 'Failed to create room' });
			}
		});

		socket.on('join-room', ({ roomId, playerName }) => {
			try {
				const room = roomManager.joinRoom(roomId, playerName, socket.id);
				if (!room) {
					socket.emit('error', { message: 'Room not found or full' });
					return;
				}

				const player = room.players.find(p => p.socketId === socket.id);
				socket.join(room.id);
				socket.emit('room-joined', { room, playerId: player?.id });
				
				// Notify all players in room
				io.to(room.id).emit('room-updated', room);
				
				// Update room list for others
				socket.broadcast.emit('rooms-list', roomManager.getAvailableRooms());
			} catch (error) {
				socket.emit('error', { message: 'Failed to join room' });
			}
		});

		socket.on('get-rooms', () => {
			socket.emit('rooms-list', roomManager.getAvailableRooms());
		});

		socket.on('player-ready', ({ playerId, isReady }) => {
			try {
				const room = roomManager.setPlayerReady(playerId, isReady);
				if (room) {
					io.to(room.id).emit('room-updated', room);
					
					if (roomManager.canStartGame(room.id)) {
						io.to(room.id).emit('can-start-game');
					}
				}
			} catch (error) {
				socket.emit('error', { message: 'Failed to update ready status' });
			}
		});

		socket.on('start-game', ({ roomId }) => {
			try {
				const room = roomManager.startGame(roomId);
				if (room) {
					io.to(room.id).emit('game-started', room);
				}
			} catch (error) {
				socket.emit('error', { message: 'Failed to start game' });
			}
		});

		socket.on('player-choice', ({ playerId, choice }) => {
			try {
				const room = roomManager.setPlayerChoice(playerId, choice);
				if (!room) return;

				// Notify room that player made a choice (without revealing it)
				socket.to(room.id).emit('player-chose', { playerId });

				// Check if both players have chosen
				if (roomManager.bothPlayersChosen(room.id)) {
					const result = roomManager.evaluateRound(room.id);
					if (result) {
						io.to(room.id).emit('round-result', result);
						
						if (result.gameComplete) {
							io.to(room.id).emit('game-complete', {
								winner: room.winner,
								finalScores: {
									[result.player1.id]: result.player1.score,
									[result.player2.id]: result.player2.score
								}
							});
						}
					}
				}
			} catch (error) {
				socket.emit('error', { message: 'Failed to process choice' });
			}
		});

		socket.on('leave-room', ({ playerId }) => {
			try {
				const room = roomManager.getRoomByPlayerId(playerId);
				if (room) {
					socket.leave(room.id);
					socket.to(room.id).emit('player-left', { playerId });
					roomManager.removePlayerFromRoom(playerId);
					
					// Update room list
					io.emit('rooms-list', roomManager.getAvailableRooms());
				}
			} catch (error) {
				console.error('Error leaving room:', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('Player disconnected:', socket.id);
			// Find and remove player from any room they were in
			// This is a cleanup operation - in production you'd want better tracking
		});
	});

	// Clean up inactive rooms every 10 minutes
	setInterval(() => {
		roomManager.cleanupInactiveRooms();
		io.emit('rooms-list', roomManager.getAvailableRooms());
	}, 10 * 60 * 1000);

	return io;
}