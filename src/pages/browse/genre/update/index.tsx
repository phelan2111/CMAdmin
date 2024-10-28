import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';
import ServiceUpdateStatusGenreOfBrowse from '@/services/browse/genre/updateStatus';

export type UpdateStatusProps = {
	details: ResponseGetGenreDetailsOfBrowse;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatus(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateGenreDetailsOfBrowseService, onUpdateGenreDetailsOfBrowse } = ServiceUpdateStatusGenreOfBrowse({
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
		<LoadingModal loading={isLoadingUpdateGenreDetailsOfBrowseService} loader={<LoaderScreen />}>
			<Controller onUpdateStatus={onUpdateGenreDetailsOfBrowse} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatus;
