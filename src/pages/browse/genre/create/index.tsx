import Controller from './controller';
import LoadingDialog from '@/components/ui/loading/dialog';
import { useEffect } from 'react';
import ServiceGetListTopicOfBrowse from '@/services/browse/topic/getList';

function CreateGenreOfBrowse() {
	const { response, isLoadingGetListTopicOfBrowseService, onGetListTopicOfBrowse } = ServiceGetListTopicOfBrowse();

	useEffect(() => {
		onGetListTopicOfBrowse({
			from: 0,
		});
		return () => {};
	}, []);

	return (
		<LoadingDialog loading={isLoadingGetListTopicOfBrowseService}>
			<Controller response={response?.list} onCreateGenre={() => {}} onUploadImage={() => {}} />;
		</LoadingDialog>
	);
}

export default CreateGenreOfBrowse;
