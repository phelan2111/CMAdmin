/* eslint-disable react-hooks/exhaustive-deps */
import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetGenreDetailsOfBrowse } from '@/services/browse/genre/getDetails';
import ServiceUpdateInformationGenreOfBrowse from '@/services/browse/genre/updateInformation';
import ServiceGetListTopicOfBrowse from '@/services/browse/topic/getList';
import ServiceUploadGenreOfBrowse from '@/services/browse/genre/upload';
import { useEffect, useMemo } from 'react';

export type UpdateInformationProps = {
	details: ResponseGetGenreDetailsOfBrowse;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateInformation(props: UpdateInformationProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { response, isLoadingGetListTopicOfBrowseService, onGetListTopicOfBrowse } = ServiceGetListTopicOfBrowse();
	const { isLoadingUploadGenreOfBrowseService, onUploadGenreOfBrowse, responseUpload } = ServiceUploadGenreOfBrowse();

	const { isLoadingUpdateGenreDetailsOfBrowseService, onUpdateGenreDetailsOfBrowse } = ServiceUpdateInformationGenreOfBrowse({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_SUCCESSFUL_TOPIC' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	useEffect(() => {
		onGetListTopicOfBrowse({
			from: 0,
		});
		return () => {};
	}, []);

	const loading = useMemo(() => {
		return isLoadingGetListTopicOfBrowseService || isLoadingUpdateGenreDetailsOfBrowseService || isLoadingUploadGenreOfBrowseService;
	}, [isLoadingGetListTopicOfBrowseService, isLoadingUpdateGenreDetailsOfBrowseService, isLoadingUploadGenreOfBrowseService]);

	return (
		<LoadingModal loading={loading} loader={<LoaderScreen />}>
			<Controller
				response={response?.list}
				responseUpload={responseUpload}
				onUpdateInformation={onUpdateGenreDetailsOfBrowse}
				onUploadImage={onUploadGenreOfBrowse}
				{...props}
			/>
			;
		</LoadingModal>
	);
}

export default UpdateInformation;
