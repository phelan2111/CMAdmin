/* eslint-disable react-hooks/exhaustive-deps */
import Controller from './controller';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Helper } from '@/utils/helper';
import ServiceSongGetList from '@/services/music/song/getSong';

function SongPage() {
	const { isLoadingGetListSongService, onGetListSong, response } = ServiceSongGetList();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Artist',
		},
	]);

	return <Controller onGetListArtist={onGetListSong} data={response} isLoading={isLoadingGetListSongService} />;
}

export default SongPage;
