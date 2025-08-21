import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface SessionKey {
  contactId: string;
  sessionKey: string;
  ephemeralPublicKey: string;
  ratchetKey?: string;
  chainKey: string;
  messageNumber: number;
  previousChainLength: number;
  createdAt: string;
  expiresAt: string;
}

interface EncryptionState {
  userKeyPair: KeyPair | null;
  sessionKeys: { [contactId: string]: SessionKey };
  isInitialized: boolean;
  error: string | null;
}

const initialState: EncryptionState = {
  userKeyPair: null,
  sessionKeys: {},
  isInitialized: false,
  error: null,
};

const encryptionSlice = createSlice({
  name: 'encryption',
  initialState,
  reducers: {
    setUserKeyPair: (state, action: PayloadAction<KeyPair>) => {
      state.userKeyPair = action.payload;
    },
    
    addSessionKey: (state, action: PayloadAction<SessionKey>) => {
      state.sessionKeys[action.payload.contactId] = action.payload;
    },
    
    updateSessionKey: (state, action: PayloadAction<{ contactId: string; updates: Partial<SessionKey> }>) => {
      const { contactId, updates } = action.payload;
      if (state.sessionKeys[contactId]) {
        state.sessionKeys[contactId] = { ...state.sessionKeys[contactId], ...updates };
      }
    },
    
    removeSessionKey: (state, action: PayloadAction<string>) => {
      delete state.sessionKeys[action.payload];
    },
    
    incrementMessageNumber: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      if (state.sessionKeys[contactId]) {
        state.sessionKeys[contactId].messageNumber += 1;
      }
    },
    
    rotateChainKey: (state, action: PayloadAction<{ contactId: string; newChainKey: string; newRatchetKey?: string }>) => {
      const { contactId, newChainKey, newRatchetKey } = action.payload;
      if (state.sessionKeys[contactId]) {
        state.sessionKeys[contactId].previousChainLength = state.sessionKeys[contactId].messageNumber;
        state.sessionKeys[contactId].messageNumber = 0;
        state.sessionKeys[contactId].chainKey = newChainKey;
        if (newRatchetKey) {
          state.sessionKeys[contactId].ratchetKey = newRatchetKey;
        }
      }
    },
    
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    clearAllKeys: (state) => {
      state.userKeyPair = null;
      state.sessionKeys = {};
      state.isInitialized = false;
    },
  },
});

export const {
  setUserKeyPair,
  addSessionKey,
  updateSessionKey,
  removeSessionKey,
  incrementMessageNumber,
  rotateChainKey,
  setInitialized,
  setError,
  clearError,
  clearAllKeys,
} = encryptionSlice.actions;

export default encryptionSlice.reducer;
