import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import localforage from 'localforage';

// reducers

import authReducer from './features/auth/authReducer';
import { baseApi } from './api/baseApi';

// reducers
const getStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localforage.config({
        driver: localforage.INDEXEDDB,
        name: 'nitto-ponno-client',
      });
      return localforage;
    } catch (error) {
      console.warn(
        'IndexedDB is not available. Falling back to local storage.',
      );
      return createWebStorage('local');
    }
  }
  return createWebStorage('local');
};

const storage = getStorage();

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuthReducer,
};

export const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredActionPaths: [
        'meta.arg',
        'payload.timestamp',
        'calendar.currentDate',
        'baseApi.queries.getMyEvents.originalArgs',
      ],
    },
  }).concat(baseApi.middleware);
