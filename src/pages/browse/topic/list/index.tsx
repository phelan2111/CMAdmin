/* eslint-disable react-hooks/exhaustive-deps */
import Controller from './controller';
import ServiceGetListTopicOfBrowse from '@/services/browse/topic/getList';

function TopicOfBrowsePage() {
	const { response, isLoadingGetListTopicOfBrowseService, onGetListTopicOfBrowse } = ServiceGetListTopicOfBrowse();

	return <Controller data={response} isLoading={isLoadingGetListTopicOfBrowseService} onRequestListTopic={onGetListTopicOfBrowse} />;
}

export default TopicOfBrowsePage;
