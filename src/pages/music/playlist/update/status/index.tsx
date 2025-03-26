import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponsePlaylistDetails } from '@/services/music/playlist/details';
import ServiceUpdateStatusPlaylist from '@/services/music/playlist/updateStatus';

export type UpdateStatusProps = {
	details: ResponsePlaylistDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatusPlaylist(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateStatusService, onUpdateStatusPlayList } = ServiceUpdateStatusPlaylist({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_STATUS_PLAYLIST_SUCCESSFUL' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateStatusService} loader={<LoaderScreen />}>
			<Controller onUpdateStatusPlayList={onUpdateStatusPlayList} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatusPlaylist;
