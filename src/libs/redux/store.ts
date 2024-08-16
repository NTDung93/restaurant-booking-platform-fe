import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './rootReducer';

export const store = configureStore({
  reducer,
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
