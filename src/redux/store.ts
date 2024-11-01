import { configureStore } from '@reduxjs/toolkit';
import langueReducer from './slice/langue';
import breadcrumbReducer from './slice/breadcrumb';

export const store = configureStore({
	reducer: {
		langue: langueReducer,
		breadcrumb: breadcrumbReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
