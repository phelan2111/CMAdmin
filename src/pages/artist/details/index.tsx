import Controller from './controller';
import { useParams } from 'react-router-dom';
import ServiceUploadUser from '@/services/user/upload';
import ServiceUpdateInformationUser from '@/services/user/updateInformation';
import LoadingDialog from '@/components/ui/loading/dialog';
import { useMemo } from 'react';
import { Helper } from '@/utils/helper';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import ServiceArtistDetails from '@/services/artist/getDetails';

function AccountDetails() {
	const params = useParams();

	const { isLoadingArtistDetailsService, onArtistDetails, response } = ServiceArtistDetails();
	const { isLoadingUploadUserService, onUploadUser, responseUpload } = ServiceUploadUser();

	const { isLoadingUpdateUserService, onUpdateUser } = ServiceUpdateInformationUser();

	const loading = useMemo(() => {
		return isLoadingUpdateUserService || isLoadingUploadUserService;
	}, [isLoadingUpdateUserService, isLoadingUploadUserService]);

	useBreadcrumb([
		{
			id: Helper.randomKey(),
			text: 'Artist',
			hasPrev: true,
		},
		{
			id: Helper.randomKey(),
			text: response?.artistId,
		},
	]);

	return (
		<LoadingDialog loading={loading}>
			<Controller
				isLoading={isLoadingArtistDetailsService}
				artistId={params.artistId as string}
				responseUpload={responseUpload}
				artistDetails={response}
				onGetTopicDetails={onArtistDetails}
				onUpload={onUploadUser}
				onUpdateUser={onUpdateUser}
			/>
		</LoadingDialog>
	);
}

export default AccountDetails;
