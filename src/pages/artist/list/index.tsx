/* eslint-disable react-hooks/exhaustive-deps */
import ServiceArtistGetList from '@/services/artist/getSinger';
import Controller from './controller';
import { useLayoutEffect } from 'react';

function ArtistPage() {
	const { isLoadingGetListArtistService, onGetListArtist, response } = ServiceArtistGetList();

	useLayoutEffect(() => {
		onGetListArtist();
	}, []);
	return <Controller data={response[0]} isLoading={isLoadingGetListArtistService} />;
}

export default ArtistPage;
