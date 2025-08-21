import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  publicKey?: string;
  isOnline: boolean;
  lastSeen?: string;
  avatar?: string;
  isBlocked: boolean;
  addedAt: string;
}

interface ContactsState {
  contacts: { [key: string]: Contact };
  searchResults: Contact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: {},
  searchResults: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts[action.payload.id] = action.payload;
    },
    
    updateContact: (state, action: PayloadAction<{ id: string; updates: Partial<Contact> }>) => {
      const { id, updates } = action.payload;
      if (state.contacts[id]) {
        state.contacts[id] = { ...state.contacts[id], ...updates };
      }
    },
    
    removeContact: (state, action: PayloadAction<string>) => {
      delete state.contacts[action.payload];
    },
    
    blockContact: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      if (state.contacts[contactId]) {
        state.contacts[contactId].isBlocked = true;
      }
    },
    
    unblockContact: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      if (state.contacts[contactId]) {
        state.contacts[contactId].isBlocked = false;
      }
    },
    
    updateContactStatus: (state, action: PayloadAction<{ id: string; isOnline: boolean; lastSeen?: string }>) => {
      const { id, isOnline, lastSeen } = action.payload;
      if (state.contacts[id]) {
        state.contacts[id].isOnline = isOnline;
        if (lastSeen) {
          state.contacts[id].lastSeen = lastSeen;
        }
      }
    },
    
    setSearchResults: (state, action: PayloadAction<Contact[]>) => {
      state.searchResults = action.payload;
    },
    
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addContact,
  updateContact,
  removeContact,
  blockContact,
  unblockContact,
  updateContactStatus,
  setSearchResults,
  clearSearchResults,
  setLoading,
  setError,
  clearError,
} = contactsSlice.actions;

export default contactsSlice.reducer;
