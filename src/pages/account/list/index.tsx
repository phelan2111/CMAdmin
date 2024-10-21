import ServiceGetListUser from '@/services/user/getList';
import Controller from './controller';
import { useLayoutEffect } from 'react';

function AccountListPage() {
	const { isLoadingGetListUserService, onGetListUser, response } = ServiceGetListUser();

	useLayoutEffect(() => {
		onGetListUser();
	}, []);

	return <Controller isLoading={isLoadingGetListUserService} data={response[0]} />;
}

export default AccountListPage;
