import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import Controller from './controller';
import ServiceUpdateStatusTopicOfBrowse from '@/services/browse/topic/updateStatus';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';

export type UpdateStatusProps = {
	details: ResponseGetTopicDetailsOfBrowse;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatus(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateTopicDetailsOfBrowseService, onUpdateTopicDetailsOfBrowse } = ServiceUpdateStatusTopicOfBrowse({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_SUCCESSFUL_TOPIC' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateTopicDetailsOfBrowseService} loader={<LoaderScreen />}>
			<Controller onUpdateStatus={onUpdateTopicDetailsOfBrowse} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatus;
