import Controller from './controller';
import LoadingDialog from '@/components/ui/loading/dialog';
import { useEffect, useMemo } from 'react';
import ServiceGetListTopicOfBrowse from '@/services/browse/topic/getList';
import ServiceCreateGenreOfBrowse from '@/services/browse/genre/create';
import ServiceUploadGenreOfBrowse from '@/services/browse/genre/upload';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';

type CreateGenreOfBrowseProps = {
	onRefreshRequest: VoidFunction;
};
function CreateGenreOfBrowse(props: CreateGenreOfBrowseProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { response, isLoadingGetListTopicOfBrowseService, onGetListTopicOfBrowse } = ServiceGetListTopicOfBrowse();
	const { isLoadingCreateGenreOfBrowseService, onCreateGenreOfBrowse } = ServiceCreateGenreOfBrowse({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'CREATE_GENRE', content: 'CREATE_GENRE_SUCCESSFUL' });
			props.onRefreshRequest();
		},
	});
	const { isLoadingUploadGenreOfBrowseService, onUploadGenreOfBrowse, responseUpload } = ServiceUploadGenreOfBrowse();

	const loading = useMemo(() => {
		return isLoadingGetListTopicOfBrowseService || isLoadingCreateGenreOfBrowseService || isLoadingUploadGenreOfBrowseService;
	}, [isLoadingGetListTopicOfBrowseService, isLoadingCreateGenreOfBrowseService, isLoadingUploadGenreOfBrowseService]);

	useEffect(() => {
		onGetListTopicOfBrowse({
			from: 0,
		});
		return () => {};
	}, []);

	return (
		<LoadingDialog loading={loading}>
			<Controller response={response?.list} responseUpload={responseUpload} onCreateGenre={onCreateGenreOfBrowse} onUploadImage={onUploadGenreOfBrowse} />
		</LoadingDialog>
	);
}

export default CreateGenreOfBrowse;
