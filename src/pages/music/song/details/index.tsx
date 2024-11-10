import Controller from './controller';
import { useParams } from 'react-router-dom';
import LoadingDialog from '@/components/ui/loading/dialog';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceArtistDetails from '@/services/music/artist/getDetails';
import ServiceUpdateInformationArtist from '@/services/music/artist/updateInformation';

function AccountDetails() {
	const params = useParams();

	const { isLoadingArtistDetailsService, onArtistDetails, response } = ServiceArtistDetails();

	const { isLoadingUpdateArtistService, onUpdateArtist } = ServiceUpdateInformationArtist();

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

export default AccountDetails;
