import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slice/modal';
import langueReducer from './slice/langue';

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		langue: langueReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
