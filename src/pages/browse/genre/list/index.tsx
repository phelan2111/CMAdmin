/* eslint-disable react-hooks/exhaustive-deps */
import Controller from './controller';
import { useLayoutEffect } from 'react';
import ServiceGetListGenreOfBrowse from '@/services/browse/genre/getList';

function GenreOfBrowsePage() {
	const { response, isLoadingGetListGenreOfBrowseService, onGetListGenreOfBrowse } = ServiceGetListGenreOfBrowse();

	useLayoutEffect(() => {
		onGetListGenreOfBrowse();
	}, []);

	return <Controller data={response} isLoading={isLoadingGetListGenreOfBrowseService} />;
}

export default GenreOfBrowsePage;
