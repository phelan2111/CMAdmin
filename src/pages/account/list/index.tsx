import ServiceGetListUser from '@/services/user/getList';
import Controller from './controller';
import { useLayoutEffect } from 'react';

function AccountListPage() {
	const { isLoadingGetListUserService, onGetListUser, response } = ServiceGetListUser();

	useLayoutEffect(() => {
		onGetListUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Controller isLoading={isLoadingGetListUserService} data={response} />;
}

export default AccountListPage;
