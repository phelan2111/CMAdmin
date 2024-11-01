import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import Controller from './controller';
import ServiceGetListGenreOfBrowse from '@/services/browse/genre/getList';
import { Helper } from '@/utils/helper';

function GenreOfBrowsePage() {
	const { response, isLoadingGetListGenreOfBrowseService, onGetListGenreOfBrowse } = ServiceGetListGenreOfBrowse();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Browse',
			disabled: true,
		},
		{
			id: Helper.randomKey(),
			text: 'Genre',
		},
	]);

	return <Controller data={response} isLoading={isLoadingGetListGenreOfBrowseService} onRequestListGenre={onGetListGenreOfBrowse} />;
}

export default GenreOfBrowsePage;
