import Controller from './controller';
import { useParams } from 'react-router-dom';
import ServiceUserDetails from '@/services/user/getDetails';
import ServiceUploadUser from '@/services/user/upload';
import ServiceUpdateInformationUser from '@/services/user/updateInformation';
import LoadingDialog from '@/components/ui/loading/dialog';
import { useMemo } from 'react';

function AccountDetails() {
	const params = useParams();

	const { isLoadingUserDetailsService, onUserDetails, response } = ServiceUserDetails();
	const { isLoadingUploadUserService, onUploadUser, responseUpload } = ServiceUploadUser();

	const { isLoadingUpdateUserService, onUpdateUser } = ServiceUpdateInformationUser();

	const loading = useMemo(() => {
		return isLoadingUpdateUserService || isLoadingUploadUserService;
	}, [isLoadingUpdateUserService, isLoadingUploadUserService]);

	return (
		<LoadingDialog loading={loading}>
			<Controller
				isLoading={isLoadingUserDetailsService}
				userId={params.userId as string}
				responseUpload={responseUpload}
				userDetails={response}
				onGetTopicDetails={onUserDetails}
				onUpload={onUploadUser}
				onUpdateUser={onUpdateUser}
			/>
		</LoadingDialog>
	);
}

export default AccountDetails;
