import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceUpdateInformationArtist from '@/services/music/artist/updateInformation';
import ServiceSongDetails from '@/services/music/song/getDetails';

function AccountDetails() {
	const params = useParams();

	const { isLoadingSongDetailsService, onSongDetails, response } = ServiceSongDetails();

	const { isLoadingUpdateArtistService, onUpdateArtist } = ServiceUpdateInformationArtist();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Artist',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.songId,
		},
	]);

	return (
		<LoadingDialog loading={isLoadingUpdateArtistService}>
			<Controller
				isLoading={isLoadingSongDetailsService}
				songId={params.songId as string}
				songDetails={response}
				onSongDetails={onSongDetails}
				onUpdateArtist={onUpdateArtist}
			/>
		</LoadingDialog>
	);
}

export default AccountDetails;
