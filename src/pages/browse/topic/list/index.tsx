import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import Controller from './controller';
import ServiceGetListTopicOfBrowse from '@/services/browse/topic/getList';
import { Helper } from '@/utils/helper';

function TopicOfBrowsePage() {
	const { response, isLoadingGetListTopicOfBrowseService, onGetListTopicOfBrowse } = ServiceGetListTopicOfBrowse();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Browse',
			disabled: true,
		},
		{
			id: Helper.randomKey(),
			text: 'Topic',
		},
	]);

	return <Controller data={response} isLoading={isLoadingGetListTopicOfBrowseService} onRequestListTopic={onGetListTopicOfBrowse} />;
}

export default TopicOfBrowsePage;
