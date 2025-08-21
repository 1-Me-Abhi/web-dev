import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  encryptedContent: string;
  decryptedContent?: string;
  messageType: 'text' | 'image' | 'file' | 'audio';
  iv: string;
  keyId: string;
  isDelivered: boolean;
  isRead: boolean;
  createdAt: string;
  deliveredAt?: string;
  readAt?: string;
  isTemporary?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: string;
  isTyping: boolean;
}

interface ChatState {
  conversations: { [key: string]: Conversation };
  messages: { [conversationId: string]: Message[] };
  activeConversation: string | null;
  isLoading: boolean;
  error: string | null;
  typingUsers: { [conversationId: string]: string[] };
}

const initialState: ChatState = {
  conversations: {},
  messages: {},
  activeConversation: null,
  isLoading: false,
  error: null,
  typingUsers: {},
};

// Async thunks
export const loadConversations = createAsyncThunk(
  'chat/loadConversations',
  async (_, { rejectWithValue }) => {
    try {
      // This would typically load from a local database or API
      // For now, return empty array
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load conversations');
    }
  }
);

export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      // This would load messages from local storage or API
      return { conversationId, messages: [] };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load messages');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      const { conversationId, message } = action.payload;
      
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      
      state.messages[conversationId].push(message);
      
      // Update conversation
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].lastMessage = message;
        if (message.receiverId === state.conversations[conversationId].participantId) {
          state.conversations[conversationId].unreadCount += 1;
        }
      }
    },
    
    updateMessage: (state, action: PayloadAction<{ conversationId: string; messageId: string; updates: Partial<Message> }>) => {
      const { conversationId, messageId, updates } = action.payload;
      const messages = state.messages[conversationId];
      
      if (messages) {
        const messageIndex = messages.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
          state.messages[conversationId][messageIndex] = {
            ...messages[messageIndex],
            ...updates
          };
        }
      }
    },
    
    markMessagesAsRead: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      const messages = state.messages[conversationId];
      
      if (messages) {
        messages.forEach(message => {
          if (!message.isRead) {
            message.isRead = true;
            message.readAt = new Date().toISOString();
          }
        });
      }
      
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].unreadCount = 0;
      }
    },
    
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations[action.payload.id] = action.payload;
    },
    
    updateConversation: (state, action: PayloadAction<{ id: string; updates: Partial<Conversation> }>) => {
      const { id, updates } = action.payload;
      if (state.conversations[id]) {
        state.conversations[id] = { ...state.conversations[id], ...updates };
      }
    },
    
    setTyping: (state, action: PayloadAction<{ conversationId: string; userId: string; isTyping: boolean }>) => {
      const { conversationId, userId, isTyping } = action.payload;
      
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = [];
      }
      
      const typingList = state.typingUsers[conversationId];
      const userIndex = typingList.indexOf(userId);
      
      if (isTyping && userIndex === -1) {
        typingList.push(userId);
      } else if (!isTyping && userIndex !== -1) {
        typingList.splice(userIndex, 1);
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    removeTemporaryMessages: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      if (state.messages[conversationId]) {
        state.messages[conversationId] = state.messages[conversationId].filter(
          message => !message.isTemporary
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        // Process loaded conversations
      })
      .addCase(loadConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;
        state.messages[conversationId] = messages;
      });
  },
});

export const {
  addMessage,
  updateMessage,
  markMessagesAsRead,
  setActiveConversation,
  addConversation,
  updateConversation,
  setTyping,
  clearError,
  removeTemporaryMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
