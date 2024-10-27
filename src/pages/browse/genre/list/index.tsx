import Controller from './controller';
import ServiceGetListGenreOfBrowse from '@/services/browse/genre/getList';

function GenreOfBrowsePage() {
	const { response, isLoadingGetListGenreOfBrowseService, onGetListGenreOfBrowse } = ServiceGetListGenreOfBrowse();

	return <Controller data={response} isLoading={isLoadingGetListGenreOfBrowseService} onRequestListGenre={onGetListGenreOfBrowse} />;
}

export default GenreOfBrowsePage;
