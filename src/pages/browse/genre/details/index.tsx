import Controller from './controller';
import { useParams } from 'react-router-dom';
import ServiceGetDetailsGenreOfBrowse from '@/services/browse/genre/getDetails';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Helper } from '@/utils/helper';

function GenreDetails() {
	const params = useParams();

	const { isLoadingGetListTopicDetailsOfBrowseService, onGetListTopicDetailsOfBrowse, response } = ServiceGetDetailsGenreOfBrowse();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Browse',
			disabled: true,
		},
		{
			id: Helper.randomKey(),
			text: 'Genre',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.genreId,
		},
	]);

	return (
		<Controller
			genreId={params.genreId as string}
			isLoading={isLoadingGetListTopicDetailsOfBrowseService}
			data={response}
			onGetTopicDetails={onGetListTopicDetailsOfBrowse}
		/>
	);
}

export default GenreDetails;
