import CreateTopicService, { PayloadCreateTopic } from '@/services/browse/topic/create';
import Controller from './controller';
import { ToastType } from '@/contexts/toast';
import { useModal, useToast } from '@/hooks/useContext';
import LoadingDialog from '@/components/ui/loading/dialog';

type CreateTopicProps = {
	onRefreshRequest: VoidFunction;
};

function CreateTopic(props: CreateTopicProps) {
	const { onToast } = useToast();
	const { onCloseModal } = useModal();

	const { onCreateTopicOfBrowse, isLoadingCreateTopic } = CreateTopicService({
		onSuccess: () => {
			onToast({ theme: ToastType.success, label: 'CREATE_TOPIC', content: 'CREATE_SUCCESSFUL_TOPIC' });
			onCloseModal();
			props.onRefreshRequest();
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	const handleCreate = (dataItem: PayloadCreateTopic) => {
		onCreateTopicOfBrowse(dataItem);
	};

	return (
		<LoadingDialog loading={isLoadingCreateTopic}>
			<Controller onCreate={handleCreate} />;
		</LoadingDialog>
	);
}

export default CreateTopic;
