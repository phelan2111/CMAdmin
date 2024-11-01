import ServiceGetListUser from '@/services/user/getList';
import Controller from './controller';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

function AccountListPage() {
	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Account',
		},
	]);

	const { isLoadingGetListUserService, response, onGetListUser } = ServiceGetListUser();

	return <Controller isLoading={isLoadingGetListUserService} data={response} onRequestListUser={onGetListUser} />;
}

export default AccountListPage;
