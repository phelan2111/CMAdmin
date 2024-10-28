import Controller from './controller';
import { useParams } from 'react-router-dom';
import ServiceGetDetailsGenreOfBrowse from '@/services/browse/genre/getDetails';

function GenreDetails() {
	const params = useParams();

	const { isLoadingGetListTopicDetailsOfBrowseService, onGetListTopicDetailsOfBrowse, response } = ServiceGetDetailsGenreOfBrowse();

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
