import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceArtistDetails from '@/services/music/artist/getDetails';
import ServiceUpdateInformationArtist from '@/services/music/artist/updateInformation';
import { useModal, useToast } from '@/hooks/useContext';
import { ToastType } from '@/contexts/toast';

function ArtistDetails() {
	const params = useParams();
	const { onCloseModal } = useModal();
	const { onToast } = useToast();

	const { isLoadingArtistDetailsService, onArtistDetails, response } = ServiceArtistDetails();

	const { isLoadingUpdateArtistService, onUpdateArtist } = ServiceUpdateInformationArtist({
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
			text: 'Artist',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.singerId,
		},
	]);

	return (
		<LoadingDialog loading={isLoadingUpdateArtistService}>
			<Controller
				isLoading={isLoadingArtistDetailsService}
				artistId={params.artistId as string}
				artistDetails={response}
				onGetTopicDetails={onArtistDetails}
				onUpdateArtist={onUpdateArtist}
			/>
		</LoadingDialog>
	);
}

export default ArtistDetails;
