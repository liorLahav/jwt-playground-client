import { configureStore } from '@reduxjs/toolkit';
import authOptionsReducer from './authOptionsSlice';

export const store = configureStore({
  reducer: {
    authOptions: authOptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;