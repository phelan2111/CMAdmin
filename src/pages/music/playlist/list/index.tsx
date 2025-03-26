/* eslint-disable react-hooks/exhaustive-deps */
import Controller from './controller';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Helper } from '@/utils/helper';
import ServiceGetListPlaylist from '@/services/music/playlist/getPlaylist';

function PlaylistPage() {
	const { isLoadingCreateSongService, onGetPlayList, response } = ServiceGetListPlaylist();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Artist',
		},
	]);

	return <Controller onGetPlaylist={onGetPlayList} data={response} isLoading={isLoadingCreateSongService} />;
}

export default PlaylistPage;
