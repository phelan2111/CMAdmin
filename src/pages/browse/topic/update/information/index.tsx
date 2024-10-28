import { ResponseGetTopicDetailsOfBrowse } from '@/services/browse/topic/getDetails';
import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import ServiceUpdateInformationTopicOfBrowse from '@/services/browse/topic/updateInformation';

export type UpdateInformationProps = {
	details: ResponseGetTopicDetailsOfBrowse;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateInformation(props: UpdateInformationProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateTopicDetailsOfBrowseService, onUpdateTopicDetailsOfBrowse } = ServiceUpdateInformationTopicOfBrowse({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_TOPIC_INFORMATION', content: 'UPDATE_SUCCESSFUL_TOPIC' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateTopicDetailsOfBrowseService} loader={<LoaderScreen />}>
			<Controller onUpdateInformation={onUpdateTopicDetailsOfBrowse} {...props} />;
		</LoadingModal>
	);
}

export default UpdateInformation;
