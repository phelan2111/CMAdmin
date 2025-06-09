import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceSongDetails from '@/services/music/song/getDetails';
import ServiceUpdateInformationSong from '@/services/music/song/updateInformation';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';

function AccountDetails() {
	const params = useParams();
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingSongDetailsService, onSongDetails, response } = ServiceSongDetails();

	const { isLoadingUpdateSongService, onUpdateSong } = ServiceUpdateInformationSong({
		onSuccess: () => {
			onCloseModal();
			onToast({ theme: ToastType.success, label: 'UPDATE_IMAGES', content: 'UPDATE_IMAGE_SUCCESS' });
		},
		onSystemError: () => {
			onToast({ theme: ToastType.error, label: 'SYSTEM_ERROR', content: 'SOMETHING_WERE_WRONG' });
		},
	});

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Song',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.songId,
		},
	]);

	return (
		<LoadingDialog loading={isLoadingUpdateSongService}>
			<Controller
				isLoading={isLoadingSongDetailsService}
				songId={params.songId as string}
				songDetails={response}
				onSongDetails={onSongDetails}
				onUpdateSong={onUpdateSong}
			/>
		</LoadingDialog>
	);
}

export default AccountDetails;
