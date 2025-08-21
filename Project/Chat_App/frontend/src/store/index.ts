import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import chatSlice from './slices/chatSlice';
import contactsSlice from './slices/contactsSlice';
import encryptionSlice from './slices/encryptionSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'contacts', 'encryption'], // Only persist these slices
  blacklist: ['chat'], // Don't persist chat messages for security
};

const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
  contacts: contactsSlice,
  encryption: encryptionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
