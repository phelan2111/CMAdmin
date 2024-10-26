import CreateTopicService, { PayloadCreateTopic } from '@/services/browse/topic/create';
import Controller from './controller';
import { ToastType } from '@/contexts/toast';
import { useModal, useToast } from '@/hooks/useContext';
import { useState } from 'react';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';

function CreateTopic() {
	const { onToast } = useToast();
	const { onCloseModal } = useModal();

	const [loading, setLoading] = useState<boolean>(false);

	const { onCreateTopicOfBrowse } = CreateTopicService({
		onSuccess: () => {
			setLoading(false);
			onToast({ theme: ToastType.success, label: 'CREATE_TOPIC', content: 'CREATE_SUCCESSFUL_TOPIC' });
			onCloseModal();
		},
		onSystemError: () => {
			setLoading(false);
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	const handleCreate = (dataItem: PayloadCreateTopic) => {
		setLoading(true);
		onCreateTopicOfBrowse(dataItem);
	};

	return (
		<LoadingModal loading={loading} loader={<LoaderScreen />}>
			<Controller onCreate={handleCreate} loading={loading} />;
		</LoadingModal>
	);
}

export default CreateTopic;
