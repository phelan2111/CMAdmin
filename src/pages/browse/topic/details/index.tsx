import ServiceGetDetailsTopicOfBrowse from '@/services/browse/topic/getDetails';
import Controller from './controller';
import { useParams } from 'react-router-dom';

function TopicDetails() {
	const params = useParams();

	const { isLoadingGetListTopicDetailsOfBrowseService, onGetListTopicDetailsOfBrowse, response } = ServiceGetDetailsTopicOfBrowse();

	return (
		<Controller
			topicId={params.topicId as string}
			isLoading={isLoadingGetListTopicDetailsOfBrowseService}
			data={response}
			onGetTopicDetails={onGetListTopicDetailsOfBrowse}
		/>
	);
}

export default TopicDetails;
