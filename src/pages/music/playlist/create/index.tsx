/* eslint-disable react-hooks/exhaustive-deps */
import ServiceCreatePlaylist, { ResponseCreatePlaylist } from '@/services/music/playlist/create';
import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

const PlaylistCreate = () => {
	const { redirectPage } = useRedirect();

	const { isLoadingCreateSongService, onCreatePlayList } = ServiceCreatePlaylist({
		onSuccess: (res) => {
			const dataItem = res as ResponseCreatePlaylist;
			redirectPage(`${PATH.MUSIC.PLAYLIST._}/${dataItem.playlistId}`);
		},
	});
	return (
		<LoadingModal loading={isLoadingCreateSongService} loader={<LoaderScreen />}>
			<Controller onCreate={onCreatePlayList} />
		</LoadingModal>
	);
};

export default PlaylistCreate;
