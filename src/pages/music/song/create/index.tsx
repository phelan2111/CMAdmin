import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useRedirect } from '@/hooks/useRedirect';
import ServiceCreateSong, { ResponseCreateSong } from '@/services/music/song/create';
import { PATH } from '@/routes/config';

function CreateSong() {
	const { redirectPage } = useRedirect();
	const { onCreateSong, isLoadingCreateSongService } = ServiceCreateSong({
		onSuccess: (res) => {
			const dataItem = res as ResponseCreateSong;
			redirectPage(`${PATH.MUSIC.SONG._}/${dataItem.songId}`);
		},
	});

	return (
		<LoadingModal loading={isLoadingCreateSongService} loader={<LoaderScreen />}>
			<Controller onCreateSong={onCreateSong} />
		</LoadingModal>
	);
}

export default CreateSong;
