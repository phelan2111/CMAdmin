import { IItemBreadcrumb } from '@/components/root/breadcrumb/normal';
import { sliceBreadcrumb } from '@/redux/slice';
import { useLayoutEffect } from 'react';
import { useAppDispatch } from './redux';

export const useBreadcrumb = (data: IItemBreadcrumb[]) => {
	const { func } = sliceBreadcrumb;
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		dispatch(
			func.onSetData({
				data,
			}),
		);
	}, [data, dispatch, func]);
};
