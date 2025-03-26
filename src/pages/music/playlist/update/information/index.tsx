import Controller from './controller';
import { ResponsePlaylistDetails } from '@/services/music/playlist/details';
import ServiceUpdatePlaylist from '@/services/music/playlist/update';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';

export type UpdateStatusProps = {
	details: ResponsePlaylistDetails;
	onSuccess: VoidFunction;
};

function UpdateInformationPlaylist(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateService, onUpdatePlayList } = ServiceUpdatePlaylist({
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
		<LoadingModal loading={isLoadingUpdateService} loader={<LoaderScreen />}>
			<Controller onUpdatePlayList={onUpdatePlayList} {...props} />;
		</LoadingModal>
	);
}

export default UpdateInformationPlaylist;
