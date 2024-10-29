import { ResponseGetUserDetails } from '@/services/user/getDetails';
import Controller from './controller';
import ServiceUpdateInformationUser from '@/services/user/updateInformation';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
export type UpdateInformationProps = {
	details: ResponseGetUserDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateInformation(props: UpdateInformationProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateUserService, onUpdateUser } = ServiceUpdateInformationUser({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_INTRODUCE_ACCOUNT', content: 'UPDATE_INTRODUCE_ACCOUNT_SUCCESSFUL' });
			props.onSuccess();
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateUserService} loader={<LoaderScreen />}>
			<Controller onUpdateUser={onUpdateUser} {...props} />;
		</LoadingModal>
	);
}

export default UpdateInformation;
