/* eslint-disable react-hooks/exhaustive-deps */
import ServiceArtistGetList from '@/services/music/artist/getSinger';
import Controller from './controller';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Helper } from '@/utils/helper';

function ArtistPage() {
	const { isLoadingGetListArtistService, onGetListArtist, response } = ServiceArtistGetList();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Artist',
		},
	]);

	return <Controller onGetListArtist={onGetListArtist} data={response} isLoading={isLoadingGetListArtistService} />;
}

export default ArtistPage;
