import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetUserDetails } from '@/services/user/getDetails';
import ServiceUpdateStatusUser from '@/services/user/updateStatus';

export type UpdateStatusProps = {
	details: ResponseGetUserDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatus(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateStatusUserService, onUpdateStatusUser } = ServiceUpdateStatusUser({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_SUCCESSFUL_USER' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateStatusUserService} loader={<LoaderScreen />}>
			<Controller onUpdateStatus={onUpdateStatusUser} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatus;
