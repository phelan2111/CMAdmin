import { sliceBreadcrumb } from '@/redux/slice';
import Model from './model';
import { useLayoutEffect } from 'react';
import { Helper } from '@/utils/helper';
import { useAppDispatch } from '@/hooks/redux';

function Dashboard() {
	const { func } = sliceBreadcrumb;
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		dispatch(
			func.onSetData({
				data: [
					{
						id: Helper.randomKey(),
						text: 'Dashboard',
					},
				],
			}),
		);
	}, [dispatch, func]);
	return <Model />;
}

export default Dashboard;
