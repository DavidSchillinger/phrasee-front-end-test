import { configureStore } from '@reduxjs/toolkit';
import { router } from './router';
import { user } from './user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { patients } from './patients';

export const store = configureStore({
  reducer: { user, router, patients },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
