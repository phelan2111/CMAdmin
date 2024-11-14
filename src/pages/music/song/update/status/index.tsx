import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetSongDetails } from '@/services/music/song/getDetails';
import ServiceUpdateStatusSong from '@/services/music/song/updateStatus';

export type UpdateStatusProps = {
	details: ResponseGetSongDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatusSong(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateStatusSongService, onUpdateStatusSong } = ServiceUpdateStatusSong({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_STATUS_SONG_SUCCESSFUL' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateStatusSongService} loader={<LoaderScreen />}>
			<Controller onUpdateStatusSong={onUpdateStatusSong} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatusSong;
