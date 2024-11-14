import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceSongDetails from '@/services/music/song/getDetails';
import ServiceUpdateInformationSong from '@/services/music/song/updateInformation';

function AccountDetails() {
	const params = useParams();

	const { isLoadingSongDetailsService, onSongDetails, response } = ServiceSongDetails();

	const { isLoadingUpdateSongService, onUpdateSong } = ServiceUpdateInformationSong();

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
