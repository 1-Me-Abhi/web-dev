import io, { Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store';
import { addMessage, updateMessage, setTyping } from '../store/slices/chatSlice';
import { updateContactStatus } from '../store/slices/contactsSlice';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  async initialize(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      this.socket = io(SOCKET_URL, {
        auth: {
          token,
        },
        transports: ['websocket'],
        timeout: 20000,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('Socket initialization failed:', error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    // Message events
    this.socket.on('new_message', (messageData) => {
      console.log('Received new message:', messageData);
      
      // Create conversation ID from sender and receiver
      const conversationId = messageData.senderId;
      
      store.dispatch(addMessage({
        conversationId,
        message: {
          id: messageData.id,
          senderId: messageData.senderId,
          receiverId: messageData.receiverId,
          encryptedContent: messageData.encryptedContent,
          messageType: messageData.messageType,
          iv: messageData.iv,
          keyId: messageData.keyId,
          isDelivered: false,
          isRead: false,
          createdAt: messageData.createdAt,
        },
      }));

      // Auto-send delivery confirmation
      this.sendMessageDelivered(messageData.id, messageData.senderId);
    });

    this.socket.on('message_delivered', (data) => {
      console.log('Message delivered:', data);
      
      // Find the conversation and update message status
      // This would require knowing which conversation the message belongs to
      // Implementation depends on your specific message handling logic
    });

    this.socket.on('message_read', (data) => {
      console.log('Message read:', data);
      
      // Update message read status
      // Implementation depends on your specific message handling logic
    });

    // Typing events
    this.socket.on('user_typing', (data) => {
      console.log('User typing:', data);
      
      store.dispatch(setTyping({
        conversationId: data.userId,
        userId: data.userId,
        isTyping: data.isTyping,
      }));
    });

    // User status events
    this.socket.on('user_status_changed', (data) => {
      console.log('User status changed:', data);
      
      store.dispatch(updateContactStatus({
        id: data.userId,
        isOnline: data.status === 'online',
        lastSeen: data.lastSeen,
      }));
    });

    // Key exchange events
    this.socket.on('key_exchange_request', (data) => {
      console.log('Key exchange request:', data);
      // Handle key exchange request
      // This would typically show a notification or automatically accept
    });

    this.socket.on('key_exchange_accepted', (data) => {
      console.log('Key exchange accepted:', data);
      // Handle key exchange acceptance
    });
  }

  // Message methods
  sendMessage(messageData: {
    receiverId: string;
    encryptedContent: string;
    messageType: string;
    iv: string;
    keyId: string;
  }): void {
    if (!this.isConnected || !this.socket) {
      throw new Error('Socket not connected');
    }

    this.socket.emit('send_message', messageData);
  }

  sendMessageDelivered(messageId: string, senderId: string): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('message_delivered', { messageId, senderId });
  }

  sendMessageRead(messageId: string, senderId: string): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('message_read', { messageId, senderId });
  }

  // Typing indicators
  sendTyping(receiverId: string, isTyping: boolean): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('typing', { receiverId, isTyping });
  }

  // Status updates
  updateStatus(status: 'online' | 'away' | 'busy' | 'offline'): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('status_update', { status });
  }

  // Key exchange
  sendKeyExchangeRequest(receiverId: string): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('key_exchange_request', { receiverId });
  }

  acceptKeyExchange(senderId: string): void {
    if (!this.isConnected || !this.socket) return;

    this.socket.emit('key_exchange_accepted', { senderId });
  }

  // Connection management
  connect(): void {
    if (this.socket && !this.isConnected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  isSocketConnected(): boolean {
    return this.isConnected;
  }

  cleanup(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

export const socketService = new SocketService();

// Export for app initialization
export const initializeSocket = async (): Promise<void> => {
  await socketService.initialize();
};
