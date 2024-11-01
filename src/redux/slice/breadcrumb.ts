import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';

export interface IBreadcrumbState {
	data: IItemBreadcrumb[];
}

const initialState: IBreadcrumbState = {
	data: [],
};

export const breadcrumbSlice = createSlice({
	name: 'breadcrumbSlice',
	initialState,
	reducers: {
		onSetData: (state, action: PayloadAction<IBreadcrumbState>) => {
			state.data = action.payload.data;
		},
	},
});

export const funcBreadcrumb = breadcrumbSlice.actions;

export const dataBreadcrumb = (state: RootState) => state.breadcrumb;

export default breadcrumbSlice.reducer;
