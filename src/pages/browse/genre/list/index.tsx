/* eslint-disable react-hooks/exhaustive-deps */
import ServiceGetListBrowse from '@/services/browse/getList';
import Controller from './controller';
import { useLayoutEffect } from 'react';

function GenreOfBrowsePage() {
	const { response, isLoadingGetListBrowseService, onGetListBrowse } = ServiceGetListBrowse();

	useLayoutEffect(() => {
		onGetListBrowse();
	}, []);

	return <Controller data={response[0]} isLoading={isLoadingGetListBrowseService} />;
}

export default GenreOfBrowsePage;
