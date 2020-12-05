import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import fileDataReducer from './reducer';

export const store = configureStore({
    reducer: fileDataReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
