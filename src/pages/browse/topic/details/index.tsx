import ServiceGetDetailsTopicOfBrowse from '@/services/browse/topic/getDetails';
import Controller from './controller';
import { useParams } from 'react-router-dom';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Helper } from '@/utils/helper';

function TopicDetails() {
	const params = useParams();

	const { isLoadingGetListTopicDetailsOfBrowseService, onGetListTopicDetailsOfBrowse, response } = ServiceGetDetailsTopicOfBrowse();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Browse',
			disabled: true,
		},
		{
			id: Helper.randomKey(),
			text: 'Topic',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.topicId,
		},
	]);

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
