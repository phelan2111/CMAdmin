import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceUpdateInformationArtist from '@/services/music/artist/updateInformation';
import ServiceGetPlaylistDetails from '@/services/music/playlist/details';

function PlaylistDetails() {
	const params = useParams();

	const { onPlayListDetails, isLoadingPlaylistDetailsService, response } = ServiceGetPlaylistDetails();

	const { isLoadingUpdateArtistService, onUpdateArtist } = ServiceUpdateInformationArtist();

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Playlist',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.playlistId,
		},
	]);

	return (
		<LoadingDialog loading={isLoadingUpdateArtistService}>
			<Controller
				isLoading={isLoadingPlaylistDetailsService}
				playlistId={params.playlistId as string}
				playlistDetails={response}
				onPlayListDetails={onPlayListDetails}
				onUpdateArtist={onUpdateArtist}
			/>
		</LoadingDialog>
	);
}

export default PlaylistDetails;
