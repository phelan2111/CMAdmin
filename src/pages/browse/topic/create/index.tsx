import CreateTopicService, { PayloadCreateTopic } from '@/services/browse/topic/create';
import Controller from './controller';
import { ToastType } from '@/contexts/toast';
import { useModal, useToast } from '@/hooks/useContext';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';

function CreateTopic() {
	const { onToast } = useToast();
	const { onCloseModal } = useModal();

	const { onCreateTopicOfBrowse, isLoadingCreateTopic } = CreateTopicService({
		onSuccess: () => {
			onToast({ theme: ToastType.success, label: 'CREATE_TOPIC', content: 'CREATE_SUCCESSFUL_TOPIC' });
			onCloseModal();
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	const handleCreate = (dataItem: PayloadCreateTopic) => {
		onCreateTopicOfBrowse(dataItem);
	};

	return (
		<LoadingModal loading={isLoadingCreateTopic} loader={<LoaderScreen />}>
			<Controller onCreate={handleCreate} />;
		</LoadingModal>
	);
}

export default CreateTopic;
