import ServiceGetListUser from '@/services/user/getList';
import Controller from './controller';

function AccountListPage() {
	const { isLoadingGetListUserService, response, onGetListUser } = ServiceGetListUser();

	return <Controller isLoading={isLoadingGetListUserService} data={response} onRequestListUser={onGetListUser} />;
}

export default AccountListPage;
