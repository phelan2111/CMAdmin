import ServiceGetListUser from '@/services/user/getList';
import Controller from './controller';
import { useLayoutEffect } from 'react';
import Loading from '@/components/root/loading/normal';

function AccountListPage() {
	const { isLoadingGetListUserService, onGetListUser, response } = ServiceGetListUser();

	useLayoutEffect(() => {
		onGetListUser();
	}, []);

	return (
		<Loading isLoading={isLoadingGetListUserService}>
			<Controller key={`${isLoadingGetListUserService}`} isLoading={isLoadingGetListUserService} data={response[0]} />
		</Loading>
	);
}

export default AccountListPage;
