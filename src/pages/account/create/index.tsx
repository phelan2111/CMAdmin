import ServiceCreateUser, { ResponseCreate } from '@/services/user/createAccount';
import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { breadcrumbCreateAccount } from '../variables';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

function CreateAccount() {
	useBreadcrumb(breadcrumbCreateAccount);

	const { redirectPage } = useRedirect();
	const { onCreateUser, isLoadingCreateUserService } = ServiceCreateUser({
		onSuccess: (res) => {
			const dataItem = res as ResponseCreate;
			redirectPage(`${PATH.ACCOUNT._}/${dataItem.userId}`);
		},
	});

	return (
		<LoadingModal loading={isLoadingCreateUserService} loader={<LoaderScreen />}>
			<Controller onCreateUser={onCreateUser} />;
		</LoadingModal>
	);
}

export default CreateAccount;
