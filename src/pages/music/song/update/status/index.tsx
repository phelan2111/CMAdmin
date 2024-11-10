import Controller from './controller';
import LoadingModal from '@/components/root/loading/modal';
import LoaderScreen from '@/components/ui/loader/screen';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';
import { ResponseGetArtistDetails } from '@/services/music/artist/getDetails';
import ServiceUpdateStatusArtist from '@/services/music/artist/updateStatus';

export type UpdateStatusProps = {
	details: ResponseGetArtistDetails;
	title: string;
	content: string;
	onSuccess: VoidFunction;
};

function UpdateStatusArtist(props: UpdateStatusProps) {
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingUpdateStatusSingerService, onUpdateStatusSinger } = ServiceUpdateStatusArtist({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_STATUS', content: 'UPDATE_SUCCESSFUL_USER' });
			props.onSuccess();
		},
		onSystemError: () => {
			onCloseModal();
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	return (
		<LoadingModal loading={isLoadingUpdateStatusSingerService} loader={<LoaderScreen />}>
			<Controller onUpdateStatusSinger={onUpdateStatusSinger} {...props} />;
		</LoadingModal>
	);
}

export default UpdateStatusArtist;
