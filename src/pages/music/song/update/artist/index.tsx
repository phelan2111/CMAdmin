import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetSongDetails } from '@/services/music/song/getDetails';
import ServiceUpdateInformationSong from '@/services/music/song/updateInformation';
export type UpdateInformationProps = {
	details: ResponseGetSongDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateArtistOfSong(props: UpdateInformationProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateSongService, onUpdateSong } = ServiceUpdateInformationSong({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_INTRO_SONG', content: 'UPDATE_INTRODUCE_SONG_SUCCESSFUL' });
			props.onSuccess();
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateSongService} loader={<LoaderScreen />}>
			<Controller onUpdateSong={onUpdateSong} {...props} />;
		</LoadingModal>
	);
}

export default UpdateArtistOfSong;
