/* eslint-disable react-hooks/exhaustive-deps */
import { sliceBreadcrumb } from '@/redux/slice';
import Model from './model';
import { useLayoutEffect } from 'react';
import { Helper } from '@/utils/helper';
import { useAppDispatch } from '@/hooks/redux';
import ServiceSummary from '@/services/other/summary';
import Loading from '@/components/root/loading/normal';

function Dashboard() {
	const { func } = sliceBreadcrumb;
	const dispatch = useAppDispatch();
	const { isLoadingSummaryService, onSummary, response } = ServiceSummary();

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
		onSummary();
	}, [func]);

	return (
		<Loading isLoading={isLoadingSummaryService}>
			<Model summary={response} />
		</Loading>
	);
}

export default Dashboard;
